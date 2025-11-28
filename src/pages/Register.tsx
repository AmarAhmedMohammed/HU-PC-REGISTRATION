import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { saveStudent, checkDuplicateRegistration } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import { Loader2, Camera, X } from 'lucide-react';
import QRCode from 'qrcode';               // <-- NEW IMPORT
import emailjs from 'emailjs-com';

/* --------------------------------------------------------------
   REPLACE THESE WITH YOUR EMAILJS CREDENTIALS
   -------------------------------------------------------------- */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
/* -------------------------------------------------------------- */

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrBase64, setQrBase64] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    department: '',
    college: '',
    yearOfStudy: '',
    pcSerialNumber: '',
    pcType: 'Laptop' as 'Laptop' | 'Desktop',
    phoneNumber: '',
    email: '',
  });

  /* --------------------------------------------------------------
     Generate QR code on a hidden canvas whenever studentId changes
     -------------------------------------------------------------- */
  useEffect(() => {
    if (!formData.studentId) {
      setQrBase64(null);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    QRCode.toCanvas(
      canvas,
      formData.studentId,
      {
        width: 256,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
        errorCorrectionLevel: 'H',
      },
      (err) => {
        if (err) {
          console.error('QR generation error:', err);
          return;
        }
        setQrBase64(canvas.toDataURL('image/png'));
      }
    );
  }, [formData.studentId]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    console.log('Starting camera...');
    setShowCamera(true);
    
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true
      });
      
      console.log('Camera stream obtained:', stream);
      streamRef.current = stream;
      
      // Wait for DOM to update before setting video source
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log('Video source set');
      } else {
        console.error('Video ref is null');
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      let errorMessage = 'Unable to access camera. ';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage += 'Please allow camera permissions.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage += 'Camera is already in use by another application.';
      } else if (err.message) {
        errorMessage += err.message;
      }
      
      toast({
        title: 'Camera Error',
        description: errorMessage,
        variant: 'destructive',
      });
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = photoCanvasRef.current;
    if (!video || !canvas) return;

    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const offsetX = (video.videoWidth - size) / 2;
      const offsetY = (video.videoHeight - size) / 2;
      
      ctx.drawImage(video, offsetX, offsetY, size, size, 0, 0, size, size);
      const photoData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedPhoto(photoData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const removePhoto = () => {
    setCapturedPhoto(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* ---------- validation ---------- */
    if (
      !formData.fullName ||
      !formData.studentId ||
      !formData.department ||
      !formData.college ||
      !formData.yearOfStudy ||
      !formData.pcSerialNumber ||
      !formData.phoneNumber ||
      !formData.email
    ) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    /* ---------- check photo is captured ---------- */
    if (!capturedPhoto) {
      toast({
        title: 'Photo Required',
        description: 'Please capture student photo before registering',
        variant: 'destructive',
      });
      return;
    }

    /* ---------- check for duplicates ---------- */
    const duplicateCheck = checkDuplicateRegistration({
      studentId: formData.studentId,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      pcSerialNumber: formData.pcSerialNumber,
    });

    if (duplicateCheck) {
      toast({
        title: 'Already Registered',
        description: `${duplicateCheck.field} "${duplicateCheck.value}" is already registered in the system.`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      /* ---------- save locally ---------- */
      saveStudent({ ...formData, photoUrl: capturedPhoto || undefined });

      /* give canvas a tiny moment to finish */
      await new Promise((r) => setTimeout(r, 300));

      if (!qrBase64) throw new Error('QR code not ready');

      /* ---------- send email ---------- */
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          student_name: formData.fullName,
          student_id: formData.studentId,
          qr_code: qrBase64,          // <-- real PNG base64
          to_email: formData.email,
        },
        PUBLIC_KEY
      );

      toast({
        title: 'Success!',
        description: `Registered & QR Code sent to ${formData.email}`,
        className: 'bg-success text-success-foreground',
      });

      /* ---------- reset ---------- */
      setFormData({
        fullName: '',
        studentId: '',
        department: '',
        college: '',
        yearOfStudy: '',
        pcSerialNumber: '',
        pcType: 'Laptop',
        phoneNumber: '',
        email: '',
      });
      setCapturedPhoto(null);

      setTimeout(() => navigate('/records'), 1500);
    } catch (err: any) {
      console.error(err);
      toast({
        title: 'Error',
        description: err?.text || 'Failed to send email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hu-gray via-white to-hu-gray">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl shadow-xl p-8 border border-border animate-fade-in">
            <h1 className="text-3xl font-bold text-primary mb-2">PC Registration</h1>
            <p className="text-muted-foreground mb-6">
              Fill in all required information
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hidden canvas – never shown to the user */}
              <canvas
                ref={canvasRef}
                style={{ position: 'absolute', left: '-9999px' }}
                width={256}
                height={256}
              />
              <canvas
                ref={photoCanvasRef}
                style={{ position: 'absolute', left: '-9999px' }}
              />

              {/* ------------------- Photo Capture ------------------- */}
              <div className="flex flex-col items-center space-y-3 pb-4 border-b">
                {!showCamera && (
                  <div className="relative">
                    {capturedPhoto ? (
                      <>
                        <img
                          src={capturedPhoto}
                          alt="Student"
                          className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-lg"
                        />
                        <Button
                          type="button"
                          onClick={removePhoto}
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 rounded-full h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-muted border-4 border-dashed border-primary flex items-center justify-center">
                        <Camera className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                )}

                {!capturedPhoto && !showCamera && (
                  <Button type="button" onClick={startCamera} variant="outline" className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Student Photo
                  </Button>
                )}

                {showCamera && (
                  <div className="relative flex flex-col items-center space-y-3">
                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2 w-full">
                      <Button type="button" onClick={capturePhoto} className="flex-1">
                        <Camera className="mr-2 h-4 w-4" />
                        Capture
                      </Button>
                      <Button type="button" onClick={stopCamera} variant="destructive" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* ------------------- Form Fields ------------------- */}
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentId">Student ID *</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    placeholder="e.g., UGPR1234/16"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="yearOfStudy">Year of Study *</Label>
                  <Select
                    value={formData.yearOfStudy}
                    onValueChange={(v) =>
                      setFormData({ ...formData, yearOfStudy: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {['1', '2', '3', '4', '5'].map((y) => (
                        <SelectItem key={y} value={y}>
                          {y === '1' ? '1st' : y === '2' ? '2nd' : y === '3' ? '3rd' : `${y}th`} Year
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="college">College *</Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(e) =>
                      setFormData({ ...formData, college: e.target.value })
                    }
                    placeholder="e.g., Computing & Informatics"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pcSerialNumber">PC Serial Number *</Label>
                  <Input
                    id="pcSerialNumber"
                    value={formData.pcSerialNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pcSerialNumber: e.target.value,
                      })
                    }
                    placeholder="Enter serial number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="pcType">PC Type *</Label>
                  <Select
                    value={formData.pcType}
                    onValueChange={(v: 'Laptop' | 'Desktop') =>
                      setFormData({ ...formData, pcType: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laptop" disabled>Select PC</SelectItem>
                      <SelectItem value="HP">HP</SelectItem>
                      <SelectItem value="Dell">Dell</SelectItem>
                      <SelectItem value="Lenovo">Lenovo</SelectItem>
                      <SelectItem value="Apple">Apple (MacBook)</SelectItem>
                      <SelectItem value="ASUS">ASUS</SelectItem>
                      <SelectItem value="Acer">Acer</SelectItem>
                      <SelectItem value="Microsoft">Microsoft (Surface)</SelectItem>
                      <SelectItem value="Samsung">Samsung</SelectItem>
                      <SelectItem value="Toshiba">Toshiba</SelectItem>
                      <SelectItem value="MSI">MSI</SelectItem>
                      <SelectItem value="Razer">Razer</SelectItem>
                      <SelectItem value="Huawei">Huawei</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    placeholder="09XXXXXX"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="student@gmail.com"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering & Sending Email...
                  </>
                ) : (
                  'Register PC'
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;