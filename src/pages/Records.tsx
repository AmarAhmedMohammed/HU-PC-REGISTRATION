import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudents, searchStudents, exportToCSV, Student } from '@/lib/storage';
import Navigation from '@/components/Navigation';
import { Download, Search } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-hu-gray via-white to-hu-gray">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-xl shadow-xl p-6 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary">Registration Records</h1>
              <p className="text-muted-foreground">
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
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('fullName')}
                  >
                    Student Name {sortField === 'fullName' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('studentId')}
                  >
                    Student ID {sortField === 'studentId' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>PC Serial</TableHead>
                  <TableHead>PC Type</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('registrationDate')}
                  >
                    Registered {sortField === 'registrationDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{student.fullName}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.pcSerialNumber}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          student.pcType === 'Laptop' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-secondary/10 text-secondary'
                        }`}>
                          {student.pcType}
                        </span>
                      </TableCell>
                      <TableCell>
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
