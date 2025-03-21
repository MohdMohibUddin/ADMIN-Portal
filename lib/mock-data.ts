export const mockAnalytics = {
  studentDistribution: [
    { department: "Computer Science", count: 300 },
    { department: "Electronics", count: 250 },
    { department: "Mechanical", count: 200 },
    { department: "Civil", count: 180 },
  ],
  admissionTrends: [
    { year: 2020, admissions: 450 },
    { year: 2021, admissions: 500 },
    { year: 2022, admissions: 520 },
    { year: 2023, admissions: 580 },
  ],
  performanceTrends: [
    { semester: "Fall 2023", avgScore: 85 },
    { semester: "Spring 2024", avgScore: 87 },
  ]
}

export const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    rollNumber: "2023CS001",
    department: "Computer Science",
    semester: 3,
    attendance: 85,
    imageUrl: "/placeholder.svg?height=100&width=100",
    resultFileUrl: "/mock-result.pdf",
    fees: {
      total: 50000,
      paid: 35000,
      pending: 15000
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNumber: "2023IT001",
    department: "Information Technology",
    semester: 3,
    attendance: 90,
    imageUrl: "/placeholder.svg?height=100&width=100",
    resultFileUrl: "/mock-result.pdf",
    fees: {
      total: 50000,
      paid: 50000,
      pending: 0
    }
  }
]

export const mockFaculty = [
  {
    id: 1,
    name: "Dr. James Smith",
    department: "Computer Science",
    phone: "+1234567890",
    email: "james.smith@college.edu",
    staffRoomNumber: "CS-101",
    subjects: ["Data Structures", "Algorithms"]
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    department: "Information Technology",
    phone: "+1234567891",
    email: "sarah.johnson@college.edu",
    staffRoomNumber: "IT-201",
    subjects: ["Database Systems", "Web Development"]
  }
]

export const mockDepartments = [
  {
    id: 1,
    name: "Computer Science",
    hod: "Dr. James Smith",
    totalFaculty: 15,
    totalStudents: 300,
    courses: ["B.Tech", "M.Tech"],
    rooms: ["CS-101", "CS-102", "CS-103"],
    events: [
      {
        id: 1,
        title: "Technical Symposium",
        date: "2024-02-15",
        venue: "Main Auditorium"
      }
    ]
  },
  {
    id: 2,
    name: "Information Technology",
    hod: "Dr. Sarah Johnson",
    totalFaculty: 12,
    totalStudents: 240,
    courses: ["B.Tech", "M.Tech"],
    rooms: ["IT-201", "IT-202", "IT-203"],
    events: [
      {
        id: 1,
        title: "IT Workshop",
        date: "2024-02-20",
        venue: "IT Seminar Hall"
      }
    ]
  }
]

export const mockReports = {
  studentPerformance: [
    {
      department: "Computer Science",
      averageScore: 85,
      passPercentage: 92,
      totalStudents: 300
    },
    {
      department: "Information Technology",
      averageScore: 82,
      passPercentage: 90,
      totalStudents: 240
    }
  ],
  attendanceStats: [
    {
      department: "Computer Science",
      averageAttendance: 85,
      below75: 20
    },
    {
      department: "Information Technology",
      averageAttendance: 88,
      below75: 15
    }
  ],
  feeCollection: [
    {
      department: "Computer Science",
      totalFees: 15000000,
      collectedFees: 13500000,
      pendingFees: 1500000
    },
    {
      department: "Information Technology",
      totalFees: 12000000,
      collectedFees: 11000000,
      pendingFees: 1000000
    }
  ]
}

export const mockTimetable = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  timeSlots: [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:15 AM - 12:15 PM",
    "12:15 PM - 1:15 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM"
  ],
  classes: [
    {
      id: 1,
      day: "Monday",
      timeSlot: "9:00 AM - 10:00 AM",
      subject: "Data Structures",
      class: "CS-2A",
      room: "CS-101"
    },
    {
      id: 2,
      day: "Monday",
      timeSlot: "10:00 AM - 11:00 AM",
      subject: "Algorithms",
      class: "CS-3B",
      room: "CS-102"
    },
    // Add more classes...
  ]
}

export const mockStudentDetails = {
  "2023CS001": {
    personalInfo: {
      name: "John Doe",
      department: "Computer Science",
      semester: 3,
      image: "/placeholder.svg?height=100&width=100"
    },
    semesterMarks: [
      {
        semester: 1,
        subjects: [
          { name: "Mathematics", internal: 45, external: 85, total: 130 },
          { name: "Physics", internal: 42, external: 78, total: 120 },
          { name: "Programming", internal: 48, external: 88, total: 136 }
        ]
      },
      {
        semester: 2,
        subjects: [
          { name: "Data Structures", internal: 47, external: 82, total: 129 },
          { name: "Digital Logic", internal: 44, external: 79, total: 123 },
          { name: "Web Development", internal: 46, external: 85, total: 131 }
        ]
      }
    ],
    attendance: {
      overall: 85,
      subjects: [
        { name: "Data Structures", present: 42, total: 45, percentage: 93.33 },
        { name: "Digital Logic", present: 38, total: 45, percentage: 84.44 },
        { name: "Web Development", present: 40, total: 45, percentage: 88.89 }
      ]
    }
  }
}

export const mockFacultyProfiles = {
  "FAC001": {
    id: "FAC001",
    name: "Dr. James Smith",
    username: "james.smith",
    contactNumber: "+1234567890",
    email: "james.smith@college.edu",
    department: "Computer Science",
    roomNumber: "CS-101",
    profilePicture: "/placeholder.svg?height=200&width=200",
    timetable: [
      {
        day: "Monday",
        classes: [
          {
            time: "9:00 AM - 10:00 AM",
            subject: "Data Structures",
            class: "CS-2A",
            room: "CS-101"
          }
        ]
      }
      // Add more days...
    ]
  }
}

