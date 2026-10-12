export type TabType = 
  | 'dashboard' 
  | 'quan-ly-sinh-vien' 
  | 'khoa-va-nganh-hoc' 
  | 'hoc-tap-va-diem-so' 
  | 'hoc-phi-va-tai-chinh';

export type StudentStatus = 'active' | 'paused' | 'graduated' | 'warning';

export interface Student {
  id: string; // SV202401
  name: string;
  avatar?: string;
  gender: 'Nam' | 'Nữ';
  cohort: string; // Khóa 18, Khóa 19
  email: string;
  studentClass: string; // K18-CNTT1
  facultyId: string; // cntt, ktpm, etc.
  facultyName: string;
  phone: string;
  status: StudentStatus;
  statusLabel?: string;
  gpa: number; // 3.45 / 4.0
  tuitionStatus: 'paid' | 'pending' | 'exempt';
  enrolledDate: string;
  identityCard: string;
  address: string;
  dossierStatus: 'Đã hoàn tất' | 'Chờ duyệt ảnh' | 'Thiếu học bạ';
}

export interface ActivityItem {
  id: string;
  type: 'grade' | 'registration' | 'profile' | 'tuition';
  title: string;
  timeAgo: string;
  description: string;
  icon: string;
  color: string;
}

export interface Faculty {
  id: string;
  code: string;
  name: string;
  dean: string;
  studentsCount: number;
  classesCount: number;
  percentage: number;
  color: string;
}

export interface CourseGrade {
  courseCode: string;
  courseName: string;
  credits: number;
  lecturer: string;
  midterm: number;
  final: number;
  total: number;
  letterGrade: string;
  status: 'Đạt' | 'Chưa đạt' | 'Chờ điểm';
}
