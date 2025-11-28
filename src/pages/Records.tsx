import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudents, searchStudents, exportToCSV, Student } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import { Download, Search } from 'lucide-react';
import huLogo from '@/assets/hu-logo.png';

const Records = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Student>('registrationDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const data = getStudents();
    setStudents(data);
    setFilteredStudents(data);
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchStudents(searchQuery);
      setFilteredStudents(results);
    } else {
      setFilteredStudents(students);
    }
  }, [searchQuery, students]);

  const handleSort = (field: keyof Student) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sorted = [...filteredStudents].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredStudents(sorted);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <Navigation />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="glass-card backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl p-6 border border-white/10 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Registration Records</h1>
              <p className="text-slate-400">
                Total: {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={exportToCSV} variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:bg-white/10 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold"
                    onClick={() => handleSort('fullName')}
                  >
                    Student Name {sortField === 'fullName' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-white/10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold"
                    onClick={() => handleSort('studentId')}
                  >
                    Student ID {sortField === 'studentId' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-bold">Department</TableHead>
                  <TableHead className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">PC Serial</TableHead>
                  <TableHead className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-bold">PC Type</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-white/10 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold"
                    onClick={() => handleSort('registrationDate')}
                  >
                    Registered {sortField === 'registrationDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-white/10 border-white/10">
                      <TableCell className="font-medium text-white">{student.fullName}</TableCell>
                      <TableCell className="text-slate-300">{student.studentId}</TableCell>
                      <TableCell className="text-slate-300">{student.department}</TableCell>
                      <TableCell className="text-slate-300">{student.pcSerialNumber}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          student.pcType === 'Laptop' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-secondary/10 text-secondary'
                        }`}>
                          {student.pcType}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(student.registrationDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Records;
