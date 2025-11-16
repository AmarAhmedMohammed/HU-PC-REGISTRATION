export interface Student {
  id: string;
  fullName: string;
  studentId: string;
  department: string;
  college: string;
  yearOfStudy: string;
  pcSerialNumber: string;
  pcType: 'Laptop' | 'Desktop';
  phoneNumber: string;
  email?: string;
  registrationDate: string;
}

const STORAGE_KEY = 'hu_pc_registration_students';

export const getStudents = (): Student[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveStudent = (student: Omit<Student, 'id' | 'registrationDate'>): Student => {
  const students = getStudents();
  const newStudent: Student = {
    ...student,
    id: Date.now().toString(),
    registrationDate: new Date().toISOString(),
  };
  students.push(newStudent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  return newStudent;
};

export const updateStudent = (id: string, data: Partial<Student>): void => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }
};

export const deleteStudent = (id: string): void => {
  const students = getStudents();
  const filtered = students.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const findStudentByStudentId = (studentId: string): Student | undefined => {
  const students = getStudents();
  return students.find(s => s.studentId.toLowerCase() === studentId.toLowerCase());
};

export const searchStudents = (query: string): Student[] => {
  const students = getStudents();
  const lowerQuery = query.toLowerCase();
  return students.filter(
    s =>
      s.fullName.toLowerCase().includes(lowerQuery) ||
      s.studentId.toLowerCase().includes(lowerQuery) ||
      s.pcSerialNumber.toLowerCase().includes(lowerQuery)
  );
};

export const exportToCSV = (): void => {
  const students = getStudents();
  const headers = ['Student Name', 'Student ID', 'Department', 'College', 'PC Serial', 'PC Type', 'Phone', 'Email', 'Registration Date'];
  const rows = students.map(s => [
    s.fullName,
    s.studentId,
    s.department,
    s.college,
    s.pcSerialNumber,
    s.pcType,
    s.phoneNumber,
    s.email || '',
    new Date(s.registrationDate).toLocaleDateString(),
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hu_pc_registrations_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
