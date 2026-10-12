import React, { useState } from 'react';
import { TabType, Student, Faculty, ActivityItem } from './types';
import { INITIAL_STUDENTS, FACULTIES_DATA, RECENT_ACTIVITIES } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast, ToastData } from './components/Toast';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { StudentModal } from './components/modals/StudentModal';
import { DeleteConfirmModal } from './components/modals/DeleteConfirmModal';
import { StudentDetailModal } from './components/modals/StudentDetailModal';
import { QuickActionModal, QuickActionType } from './components/modals/QuickActionModal';

// Screens
import { AuthScreen } from './components/screens/AuthScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { StudentManagementScreen } from './components/screens/StudentManagementScreen';
import { FacultiesScreen } from './components/screens/FacultiesScreen';
import { GradesScreen } from './components/screens/GradesScreen';
import { FinanceScreen } from './components/screens/FinanceScreen';

import Courses from './components/Courses';

export default function App() {
  // Navigation & Screen View State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Data State
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [faculties] = useState<Faculty[]>(FACULTIES_DATA);
  const [activities] = useState<ActivityItem[]>(RECENT_ACTIVITIES);

  // Modals State
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentModalMode, setStudentModalMode] = useState<'add' | 'edit'>('add');
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState<Student | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [studentDetail, setStudentDetail] = useState<Student | null>(null);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState<QuickActionType>(null);

  // Toast Notification State
  const [toast, setToast] = useState<ToastData | null>(null);

  const triggerToast = (title: string, message: string, isError = false) => {
    setToast({
      title,
      message,
      type: isError ? 'error' : 'success',
    });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Student CRUD Operations
  const handleOpenAddStudent = () => {
    setStudentModalMode('add');
    setSelectedStudentForEdit(null);
    setIsStudentModalOpen(true);
  };

  const handleOpenEditStudent = (student: Student) => {
    setStudentModalMode('edit');
    setSelectedStudentForEdit(student);
    setIsStudentModalOpen(true);
  };

  const handleOpenDeleteStudent = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const handleOpenStudentDetail = (student: Student) => {
    setStudentDetail(student);
    setIsDetailModalOpen(true);
  };

  const handleSaveStudent = (data: Partial<Student>) => {
    if (studentModalMode === 'add') {
      const newStudent = data as Student;
      setStudents([newStudent, ...students]);
      triggerToast('Thành công', `Đã thêm mới hồ sơ sinh viên ${newStudent.name} (${newStudent.id}).`);
    } else {
      setStudents(
        students.map((s) => (s.id === selectedStudentForEdit?.id ? { ...s, ...data } : s))
      );
      triggerToast('Cập nhật thành công', `Hồ sơ sinh viên ${data.name || ''} đã được lưu.`);
    }
    setIsStudentModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter((s) => s.id !== studentToDelete.id));
      triggerToast('Đã xóa sinh viên', `Hồ sơ ${studentToDelete.id} - ${studentToDelete.name} đã được gỡ khỏi hệ thống.`);
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  // Switch between Auth screen and Main App
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121316]">
        <Toast toast={toast} onClose={() => setToast(null)} />
        <AuthScreen
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setCurrentTab('dashboard');
          }}
          onTriggerToast={triggerToast}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121316] text-[#e3e2e6] selection:bg-[#adc6ff] selection:text-[#00285d] font-sans">
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Quick Screen Switcher Bar (Discreet preview tool to easily jump between screens) */}
      <div className="fixed bottom-3 left-3 z-50 flex items-center gap-1.5 p-1 bg-[#1b1b1f]/90 backdrop-blur-md border border-[#272a34] rounded-full shadow-2xl text-[11px] font-medium">
        <span className="px-2 text-[#8c909f] font-mono">Màn hình:</span>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-2.5 py-1 rounded-full text-[#adc6ff] hover:bg-[#292a2d] transition-colors"
          title="Xem trang đăng nhập EduCore"
        >
          1. Đăng nhập
        </button>
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`px-2.5 py-1 rounded-full transition-colors ${
            currentTab === 'dashboard'
              ? 'bg-[#4d8eff] text-[#00285d] font-bold'
              : 'text-[#c2c6d6] hover:bg-[#292a2d]'
          }`}
        >
          2. Tổng quan
        </button>
        <button
          onClick={() => setCurrentTab('quan-ly-sinh-vien')}
          className={`px-2.5 py-1 rounded-full transition-colors ${
            currentTab === 'quan-ly-sinh-vien'
              ? 'bg-[#4d8eff] text-[#00285d] font-bold'
              : 'text-[#c2c6d6] hover:bg-[#292a2d]'
          }`}
        >
          3. Quản lý SV
        </button>
      </div>

      {/* Main Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onLogout={() => {
          setIsAuthenticated(false);
          triggerToast('Đã đăng xuất', 'Phiên làm việc quản trị đã kết thúc an toàn.');
        }}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Container */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Dynamic Route View Content */}
        <main className="w-full pt-16 flex-1 pb-16">
          {currentTab === 'dashboard' && (
            <DashboardScreen
              students={students}
              faculties={faculties}
              activities={activities}
              onOpenAddStudent={handleOpenAddStudent}
              onOpenQuickAction={(type) => setQuickActionType(type)}
              onSelectStudent={handleOpenStudentDetail}
              onNavigateToStudents={() => setCurrentTab('quan-ly-sinh-vien')}
              onTriggerToast={triggerToast}
            />
          )}

          {currentTab === 'quan-ly-sinh-vien' && (
            <StudentManagementScreen
              students={students}
              onOpenAddModal={handleOpenAddStudent}
              onOpenEditModal={handleOpenEditStudent}
              onOpenDeleteModal={handleOpenDeleteStudent}
              onOpenDetailModal={handleOpenStudentDetail}
              onTriggerToast={triggerToast}
            />
          )}

          {currentTab === 'khoa-va-nganh-hoc' && (
            <FacultiesScreen
              faculties={faculties}
              onTriggerToast={triggerToast}
            />
          )}

          {currentTab === 'hoc-tap-va-diem-so' && (
            <GradesScreen onTriggerToast={triggerToast} />
          )}

          {currentTab === 'hoc-phi-va-tai-chinh' && (
            <FinanceScreen onTriggerToast={triggerToast} />
          )}
        </main>
      </div>

      {/* Modals */}
      {/* 1. Add / Edit Student Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        mode={studentModalMode}
        initialData={selectedStudentForEdit}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={handleSaveStudent}
      />

      {/* 2. Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        student={studentToDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* 3. Student Detailed Profile Drawer/Modal */}
      <StudentDetailModal
        isOpen={isDetailModalOpen}
        student={studentDetail}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={(s) => {
          setIsDetailModalOpen(false);
          handleOpenEditStudent(s);
        }}
      />

      {/* 4. Global Search Modal (⌘K) */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        students={students}
        onSelectStudent={handleOpenStudentDetail}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      {/* 5. Quick Actions Modal */}
      <QuickActionModal
        type={quickActionType}
        isOpen={Boolean(quickActionType)}
        students={students}
        onClose={() => setQuickActionType(null)}
        onTriggerToast={triggerToast}
        onOpenStudentDetail={handleOpenStudentDetail}
      />
      
      <Courses />
    </div>
  );
}
