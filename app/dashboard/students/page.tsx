"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StudentDialog } from "@/components/students/student-dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStore } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DepartmentTimetable } from "@/components/timetable/department-timetable"

const MotionTableRow = motion(TableRow)

export default function StudentsPage() {
  const [rollNumberSearch, setRollNumberSearch] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const { students, deleteStudent, updateStudent, timetables } = useStore()
  const { toast } = useToast()

  const filteredStudents = students.filter(
    (student) => student.rollNumber.toLowerCase().includes(rollNumberSearch.toLowerCase()) || rollNumberSearch === "",
  )

  // Calculate department statistics
  const departmentStats = students.reduce(
    (acc, student) => {
      const department = student?.department || "Uncategorized"
      if (!acc[department]) {
        acc[department] = {
          total: 0,
          feePending: 0,
          feePaid: 0,
          lowAttendance: 0,
        }
      }

      acc[department].total++
      if (student?.fees?.pending > 0) {
        acc[department].feePending++
      } else {
        acc[department].feePaid++
      }
      if (student?.attendance && student.attendance < 50) {
        acc[department].lowAttendance++
      }

      return acc
    },
    {} as Record<string, { total: number; feePending: number; feePaid: number; lowAttendance: number }>,
  )

  const handleDelete = (id: number) => {
    deleteStudent(id)
    toast({
      title: "Success",
      description: "Student deleted successfully",
    })
  }

  const handleFeeStatusChange = (id: number, status: string) => {
    const student = students.find((s) => s.id === id)
    if (student) {
      const updatedFees = {
        total: student.fees.total,
        paid: status === "Paid" ? student.fees.total : 0,
        pending: status === "Paid" ? 0 : student.fees.total,
      }

      updateStudent(id, { fees: updatedFees })

      toast({
        title: "Success",
        description: `Fee status updated to ${status}`,
      })
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        >
          Student Management
        </motion.h2>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Button
            onClick={() => {
              setSelectedStudent(null)
              setIsDialogOpen(true)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </motion.div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-primary/10 p-1">
          <TabsTrigger
            value="list"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Student List
          </TabsTrigger>
          <TabsTrigger
            value="statistics"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Department Statistics
          </TabsTrigger>
          <TabsTrigger
            value="timetables"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Timetables
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by roll number..."
                value={rollNumberSearch}
                onChange={(e) => setRollNumberSearch(e.target.value)}
                className="pl-8 border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="rounded-md border border-primary/20 mt-4 overflow-hidden bg-gradient-to-b from-card to-card/50">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/5 hover:bg-primary/5">
                  <TableHead className="text-primary font-semibold">Profile</TableHead>
                  <TableHead className="text-primary font-semibold">Name</TableHead>
                  <TableHead className="text-primary font-semibold">Roll Number</TableHead>
                  <TableHead className="text-primary font-semibold">Department</TableHead>
                  <TableHead className="text-primary font-semibold">Semester</TableHead>
                  <TableHead className="text-primary font-semibold">Attendance</TableHead>
                  <TableHead className="text-primary font-semibold">Fee Status</TableHead>
                  <TableHead className="text-primary font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredStudents.map((student, index) => (
                    <MotionTableRow
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-primary/5"
                    >
                      <TableCell>
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={student.imageUrl || "/placeholder.svg"}
                          alt={student.name}
                          className="h-10 w-10 rounded-full ring-2 ring-primary/20"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.semester}</TableCell>
                      <TableCell>
                        <Badge variant={student.attendance < 50 ? "destructive" : "success"}>
                          {student.attendance}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          defaultValue={student.fees.pending === 0 ? "Paid" : "Pending"}
                          onValueChange={(value) => handleFeeStatusChange(student.id, value)}
                        >
                          <SelectTrigger className="h-8 w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Convenient Quota">Convenient Quota</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedStudent(student)
                              setIsDialogOpen(true)
                            }}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(student.id)}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </MotionTableRow>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="statistics">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {Object.entries(departmentStats).map(([department, stats], index) => (
              <motion.div
                key={department}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-primary/20 bg-gradient-to-b from-card to-card/50">
                  <CardHeader>
                    <CardTitle className="text-primary">{department}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="space-y-2"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                    >
                      {[
                        { label: "Total Students", value: stats.total, color: "text-primary" },
                        { label: "Fees Paid", value: stats.feePaid, color: "text-green-600" },
                        { label: "Fees Pending", value: stats.feePending, color: "text-red-600" },
                        { label: "Low Attendance", value: stats.lowAttendance, color: "text-orange-500" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          className="flex justify-between items-center p-2 rounded-md hover:bg-primary/5"
                        >
                          <span>{item.label}:</span>
                          <span className={`font-bold ${item.color}`}>{item.value}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="timetables">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Department Timetables</h3>
            {timetables.length > 0 ? (
              timetables.map((timetable) => (
                <div key={timetable.department} className="mb-6">
                  <DepartmentTimetable timetable={timetable} readOnly />
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">
                No timetables available. Timetables can be created in the College Management section.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <StudentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} student={selectedStudent} />
    </motion.div>
  )
}

