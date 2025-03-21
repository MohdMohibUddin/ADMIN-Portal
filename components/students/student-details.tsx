"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { mockStudentDetails } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function StudentDetails() {
  const [studentId, setStudentId] = useState("")
  const [studentData, setStudentData] = useState<any>(null)

  const handleSearch = () => {
    const data = mockStudentDetails[studentId]
    setStudentData(data)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Enter Student ID..."
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      {studentData && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{studentData.personalInfo.name}</CardTitle>
              <CardDescription>
                {studentData.personalInfo.department} - Semester {studentData.personalInfo.semester}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={studentData.personalInfo.image || "/placeholder.svg"}
                  alt={studentData.personalInfo.name}
                  className="h-24 w-24 rounded-full"
                />
                <div>
                  <p>Overall Attendance: {studentData.attendance.overall}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="marks">
            <TabsList>
              <TabsTrigger value="marks">Semester Marks</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            <TabsContent value="marks">
              {studentData.semesterMarks.map((semester: any) => (
                <Card key={semester.semester} className="mt-4">
                  <CardHeader>
                    <CardTitle>Semester {semester.semester}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Internal</TableHead>
                          <TableHead>External</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {semester.subjects.map((subject: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{subject.name}</TableCell>
                            <TableCell>{subject.internal}</TableCell>
                            <TableCell>{subject.external}</TableCell>
                            <TableCell>{subject.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Subject-wise Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentData.attendance.subjects.map((subject: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{subject.name}</TableCell>
                          <TableCell>{subject.present}</TableCell>
                          <TableCell>{subject.total}</TableCell>
                          <TableCell>{subject.percentage.toFixed(2)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

