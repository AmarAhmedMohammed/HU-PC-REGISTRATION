import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { findStudentByStudentId, searchStudents, Student } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import { Search, Camera, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
    <div className="min-h-screen bg-gradient-to-br from-hu-gray via-white to-hu-gray">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">
            Student ID Scanner
          </h1>

          <Card className="p-6 mb-6 animate-fade-in">
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
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-success animate-scan-line shadow-lg shadow-success/50"></div>
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
          </Card>

          {result && (
            <Card className="p-6 bg-success/10 border-success animate-scale-in">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
                <h2 className="text-2xl font-bold text-success">REGISTERED</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
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
            </Card>
          )}

          {notFound && (
            <Card className="p-6 bg-destructive/10 border-destructive animate-scale-in">
              <div className="flex items-center space-x-3 mb-4">
                <XCircle className="h-8 w-8 text-destructive" />
                <h2 className="text-2xl font-bold text-destructive">NOT REGISTERED</h2>
              </div>
              <p className="text-muted-foreground mb-4">
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
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Scanner;
