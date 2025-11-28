import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudents, deleteStudent, updateStudent, Student } from '@/lib/storage';
import { validateAdminLogin, changeAdminPassword, changeAdminUsername, getAdminCredentials } from '@/lib/adminAuth';
import { toast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { Trash2, Edit, LogOut, Users, Clock, Settings, KeyRound } from 'lucide-react';
import huLogo from '@/assets/hu-logo.png';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState<Partial<Student>>({});
  
  // Password change states
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Username change states
  const [showUsernameDialog, setShowUsernameDialog] = useState(false);
  const [passwordForUsername, setPasswordForUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadStudents();
    }
  }, [isLoggedIn]);

  const loadStudents = () => {
    setStudents(getStudents());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdminLogin(username, password)) {
      setIsLoggedIn(true);
      toast({
        title: 'Login Successful',
        description: 'Welcome to Admin Panel',
        className: 'bg-success text-success-foreground',
      });
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
      loadStudents();
      toast({
        title: 'Deleted',
        description: 'Student record deleted successfully',
      });
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setEditForm(student);
  };

  const handleUpdate = () => {
    if (editingStudent && editForm) {
      updateStudent(editingStudent.id, editForm);
      loadStudents();
      setEditingStudent(null);
      toast({
        title: 'Updated',
        description: 'Student record updated successfully',
        className: 'bg-success text-success-foreground',
      });
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    const result = changeAdminPassword(currentPassword, newPassword);
    
    if (result.success) {
      toast({
        title: 'Success',
        description: result.message,
        className: 'bg-success text-success-foreground',
      });
      setShowPasswordDialog(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  const handleChangeUsername = () => {
    const result = changeAdminUsername(passwordForUsername, newUsername);
    
    if (result.success) {
      toast({
        title: 'Success',
        description: result.message,
        className: 'bg-success text-success-foreground',
      });
      setShowUsernameDialog(false);
      setPasswordForUsername('');
      setNewUsername('');
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (!isLoggedIn) {
    const credentials = getAdminCredentials();
    
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <Navigation />
        
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="glass-card backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 animate-fade-in">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6 text-center">Admin Login</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              <p className="text-xs text-slate-400 text-center mt-4">
                Default: {credentials.username} / {credentials.password}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const recentRegistrations = students.slice(0, 5);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <Navigation />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Dialog open={showUsernameDialog} onOpenChange={setShowUsernameDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Change Username
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Username</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      value={passwordForUsername}
                      onChange={(e) => setPasswordForUsername(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                  <div>
                    <Label className="text-white">New Username</Label>
                    <Input
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Enter new username"
                    />
                  </div>
                  <Button onClick={handleChangeUsername} className="w-full">
                    Change Username
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <KeyRound className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <Label className="text-white">New Password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Confirm New Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button onClick={handleChangePassword} className="w-full">
                    Change Password
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 rounded-2xl p-6 text-white animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Total Registered</p>
                <p className="text-4xl font-bold">{students.length}</p>
              </div>
              <Users className="h-12 w-12 text-white/50" />
            </div>
          </div>

          <div className="glass-card backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30 rounded-2xl p-6 text-white animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Recent (Today)</p>
                <p className="text-4xl font-bold">
                  {students.filter(s => 
                    new Date(s.registrationDate).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <Clock className="h-12 w-12 text-white/50" />
            </div>
          </div>
        </div>

        <div className="glass-card backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">All Students</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold">Name</TableHead>
                  <TableHead className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">Student ID</TableHead>
                  <TableHead className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-bold">Department</TableHead>
                  <TableHead className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">PC Serial</TableHead>
                  <TableHead className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} className="border-white/10">
                    <TableCell className="font-medium text-white">{student.fullName}</TableCell>
                    <TableCell className="text-slate-300">{student.studentId}</TableCell>
                    <TableCell className="text-slate-300">{student.department}</TableCell>
                    <TableCell className="text-slate-300">{student.pcSerialNumber}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(student)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Student</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-white">Full Name</Label>
                                <Input
                                  value={editForm.fullName || ''}
                                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label className="text-white">Student ID</Label>
                                <Input
                                  value={editForm.studentId || ''}
                                  onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label className="text-white">PC Serial Number</Label>
                                <Input
                                  value={editForm.pcSerialNumber || ''}
                                  onChange={(e) => setEditForm({ ...editForm, pcSerialNumber: e.target.value })}
                                />
                              </div>
                              <Button onClick={handleUpdate} className="w-full">
                                Save Changes
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
