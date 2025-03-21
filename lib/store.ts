import { create } from "zustand"
import { mockFaculty, mockStudents, mockDepartments } from "./mock-data"
import type { Student, Faculty } from "./types"

interface Store {
  faculty: Faculty[]
  students: Student[]
  departments: any[] // Using any for simplicity, should be properly typed
  timetables: any[] // Department timetables
  addFaculty: (faculty: Omit<Faculty, "id">) => void
  updateFaculty: (id: number, faculty: Partial<Faculty>) => void
  deleteFaculty: (id: number) => void
  addStudent: (student: Omit<Student, "id">) => void
  updateStudent: (id: number, student: Partial<Student>) => void
  deleteStudent: (id: number) => void
  addDepartment: (department: any) => void
  addEvent: (departmentName: string, event: any) => void
  addTimetable: (timetable: any) => void
}

export const useStore = create<Store>((set) => ({
  faculty: mockFaculty,
  students: mockStudents,
  departments: mockDepartments,
  timetables: [],
  addFaculty: (faculty) =>
    set((state) => ({
      faculty: [...state.faculty, { ...faculty, id: state.faculty.length + 1 }],
    })),
  updateFaculty: (id, faculty) =>
    set((state) => ({
      faculty: state.faculty.map((f) => (f.id === id ? { ...f, ...faculty } : f)),
    })),
  deleteFaculty: (id) =>
    set((state) => ({
      faculty: state.faculty.filter((f) => f.id !== id),
    })),
  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, { ...student, id: state.students.length + 1 }],
    })),
  updateStudent: (id, student) =>
    set((state) => ({
      students: state.students.map((s) => (s.id === id ? { ...s, ...student } : s)),
    })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((s) => s.id !== id),
    })),
  addDepartment: (department) =>
    set((state) => ({
      departments: [...state.departments, department],
    })),
  addEvent: (departmentName, event) =>
    set((state) => ({
      departments: state.departments.map((dept) =>
        dept.name === departmentName ? { ...dept, events: [...dept.events, event] } : dept,
      ),
    })),
  addTimetable: (timetable) =>
    set((state) => {
      const existingIndex = state.timetables.findIndex((t) => t.department === timetable.department)

      if (existingIndex >= 0) {
        // Update existing timetable
        const updatedTimetables = [...state.timetables]
        updatedTimetables[existingIndex] = timetable
        return { timetables: updatedTimetables }
      } else {
        // Add new timetable
        return { timetables: [...state.timetables, timetable] }
      }
    }),
}))

