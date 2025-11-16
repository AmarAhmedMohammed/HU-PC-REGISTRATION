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
import { saveStudent } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import { Loader2 } from 'lucide-react';
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

    setLoading(true);

    try {
      /* ---------- save locally ---------- */
      saveStudent(formData);

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