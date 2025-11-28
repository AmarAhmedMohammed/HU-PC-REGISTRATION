import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { findStudentByStudentId, searchStudents, Student } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import { Search, Camera, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import huLogo from '@/assets/hu-logo.png';

const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Student | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanning = async () => {
    setResult(null);
    setNotFound(false);
    setLoading(true);
    setScanning(true);

    // Wait for DOM to render the reader element
    setTimeout(async () => {
      try {
        const html5QrCode = new Html5Qrcode("reader", {
          verbose: false,
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
          ]
        });
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            const student = findStudentByStudentId(decodedText);
            if (student) {
              setResult(student);
              setNotFound(false);
              toast({
                title: 'Student Found!',
                description: `${student.fullName} is registered`,
                className: 'bg-success text-success-foreground',
              });
            } else {
              setNotFound(true);
              setResult(null);
              toast({
                title: 'Not Registered',
                description: 'This student ID is not in the system',
                variant: 'destructive',
              });
            }
            stopScanning();
          },
          () => {
            // Scanning in progress
          }
        );

        setLoading(false);
      } catch (err: any) {
        console.error("Error starting scanner:", err);
        setLoading(false);
        setScanning(false);
        toast({
          title: 'Camera Error',
          description: err?.message || 'Unable to access camera. Please check permissions.',
          variant: 'destructive',
        });
      }
    }, 100);
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setScanning(false);
    setLoading(false);
  };

  const handleManualSearch = () => {
    if (!searchQuery.trim()) return;

    const students = searchStudents(searchQuery);
    if (students.length > 0) {
      setResult(students[0]);
      setNotFound(false);
    } else {
      setNotFound(true);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <Navigation />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6 text-center">
            Student ID Scanner
          </h1>

          <div className="glass-card backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 mb-6 animate-fade-in">
            <div className="space-y-4">
              {!scanning && !result && !notFound && (
                <Button
                  onClick={startScanning}
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Initializing Camera...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-5 w-5" />
                      Start Scanning
                    </>
                  )}
                </Button>
              )}

              {scanning && (
                <>
                  <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden shadow-2xl border-4 border-primary">
                    <div id="reader" className="w-full h-full"></div>
                    <div className="absolute inset-0 pointer-events-none z-10">
                      <div 
                        className="absolute top-0 left-0 right-0 h-0.5 animate-scan-line" 
                        style={{ 
                          background: 'linear-gradient(to bottom, transparent, #22c55e, #22c55e, transparent)',
                          boxShadow: '0 0 30px 5px rgba(34, 197, 94, 0.9), 0 0 60px 10px rgba(34, 197, 94, 0.6)',
                          height: '3px'
                        }}
                      ></div>
                    </div>
                  </div>
                  <Button
                    onClick={stopScanning}
                    variant="destructive"
                    className="w-full"
                    size="lg"
                  >
                    Stop Scanning
                  </Button>
                </>
              )}

              {!scanning && (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Search by Student ID or Name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
                    />
                    <Button onClick={handleManualSearch}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className="glass-card backdrop-blur-xl bg-emerald-500/10 border-emerald-500/30 rounded-2xl p-6 animate-scale-in">
              <div className="flex flex-col items-center mb-4">
                {result.photoUrl ? (
                  <img
                    src={result.photoUrl}
                    alt={result.fullName}
                    className="w-40 h-40 rounded-full object-cover border-4 border-success mb-3 shadow-lg"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-muted border-4 border-success mb-3 flex items-center justify-center">
                    <CheckCircle className="h-20 w-20 text-success" />
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">REGISTERED</h2>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2 text-white">
                  <span className="font-semibold">Full Name:</span>
                  <span>{result.fullName}</span>
                  <span className="font-semibold">Student ID:</span>
                  <span>{result.studentId}</span>
                  <span className="font-semibold">Department:</span>
                  <span>{result.department}</span>
                  <span className="font-semibold">College:</span>
                  <span>{result.college}</span>
                  <span className="font-semibold">Year:</span>
                  <span>{result.yearOfStudy}</span>
                  <span className="font-semibold">PC Type:</span>
                  <span>{result.pcType}</span>
                  <span className="font-semibold">PC Serial:</span>
                  <span>{result.pcSerialNumber}</span>
                  <span className="font-semibold">Phone:</span>
                  <span>{result.phoneNumber}</span>
                </div>
              </div>
              <Button 
                onClick={() => {
                  setResult(null);
                  setNotFound(false);
                }} 
                className="w-full mt-4"
              >
                Scan Another
              </Button>
            </div>
          )}

          {notFound && (
            <div className="glass-card backdrop-blur-xl bg-red-500/10 border-red-500/30 rounded-2xl p-6 animate-scale-in">
              <div className="flex items-center space-x-3 mb-4">
                <XCircle className="h-8 w-8 text-red-400" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">NOT REGISTERED</h2>
              </div>
              <p className="text-slate-300 mb-4">
                This student ID is not registered in the system. Please proceed to registration.
              </p>
              <Button 
                onClick={() => {
                  setResult(null);
                  setNotFound(false);
                }} 
                className="w-full"
              >
                Scan Another
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Scanner;
