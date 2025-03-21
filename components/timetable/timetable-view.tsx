"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockDepartments, mockTimetable } from "@/lib/mock-data"
import { TimetableDialog } from "./timetable-dialog"
import { useToast } from "@/components/ui/use-toast"

interface TimetableEntry {
  id: string
  day: string
  timeSlot: string
  subject: string
  class: string
  room: string
  department: string
}

export function TimetableView({ department = "" }: { department?: string }) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(department || mockDepartments[0].name)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(null)
  const [timetableData, setTimetableData] = useState<TimetableEntry[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (department) {
      setSelectedDepartment(department)
    }
  }, [department])

  // Filter timetable entries by department
  const departmentClasses = timetableData.filter((entry) => entry.department === selectedDepartment)

  // Create a matrix for the timetable
  const timetableMatrix = mockTimetable.timeSlots.map((timeSlot) => {
    const row = { timeSlot, classes: {} as Record<string, TimetableEntry> }
    mockTimetable.days.forEach((day) => {
      row.classes[day] = departmentClasses.find((c) => c.day === day && c.timeSlot === timeSlot)
    })
    return row
  })

  const handleSave = async (data: TimetableEntry) => {
    const newEntry = {
      ...data,
      id: selectedEntry?.id || `${Date.now()}`,
    }

    if (selectedEntry) {
      setTimetableData((prev) => prev.map((entry) => (entry.id === selectedEntry.id ? newEntry : entry)))
    } else {
      setTimetableData((prev) => [...prev, newEntry])
    }

    toast({
      title: "Success",
      description: selectedEntry ? "Timetable entry updated successfully" : "New class added to timetable",
    })
    setIsDialogOpen(false)
  }

  const handleEdit = (entry: TimetableEntry) => {
    setSelectedEntry(entry)
    setIsDialogOpen(true)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Timetable</CardTitle>
            <CardDescription>Manage department-wise class schedules</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[200px] border-primary/20">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <AnimatePresence>
                  {mockDepartments.map((dept) => (
                    <motion.div key={dept.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <SelectItem value={dept.name}>{dept.name}</SelectItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setSelectedEntry(null)
                setIsDialogOpen(true)
              }}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Class
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-primary/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[150px] font-bold">Time</TableHead>
                  {mockTimetable.days.map((day) => (
                    <TableHead key={day} className="font-bold">
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {timetableMatrix.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium bg-muted/30">{row.timeSlot}</TableCell>
                      {mockTimetable.days.map((day) => (
                        <TableCell key={day} className="p-0">
                          <motion.div whileHover={{ scale: 0.98 }} className="h-full">
                            {row.classes[day] ? (
                              <div
                                className="p-3 h-full cursor-pointer hover:bg-accent transition-colors rounded-md"
                                onClick={() => handleEdit(row.classes[day])}
                              >
                                <div className="font-medium text-primary">{row.classes[day].subject}</div>
                                <div className="text-sm text-muted-foreground">
                                  {row.classes[day].class} • {row.classes[day].room}
                                </div>
                              </div>
                            ) : (
                              <div
                                className="h-full min-h-[80px] cursor-pointer hover:bg-accent/50 transition-colors p-2 flex items-center justify-center text-muted-foreground"
                                onClick={() => {
                                  setSelectedEntry({
                                    id: "",
                                    day,
                                    timeSlot: row.timeSlot,
                                    department: selectedDepartment,
                                    subject: "",
                                    class: "",
                                    room: "",
                                  })
                                  setIsDialogOpen(true)
                                }}
                              >
                                <Plus className="h-4 w-4" />
                              </div>
                            )}
                          </motion.div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <TimetableDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} entry={selectedEntry} onSave={handleSave} />
    </motion.div>
  )
}

