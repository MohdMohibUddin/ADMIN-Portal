"use client"

import { useState } from "react"
import { Plus, Calendar, Clock } from "lucide-react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DepartmentTimetable } from "@/components/timetable/department-timetable"
import { TimetableEditor } from "@/components/timetable/timetable-editor"

const departmentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  hod: z.string().min(2, "HOD name is required"),
  courses: z.string().min(2, "Courses are required"),
  rooms: z.string().min(2, "Rooms are required"),
})

const eventFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  date: z.string().min(2, "Date is required"),
  venue: z.string().min(2, "Venue is required"),
  department: z.string().min(2, "Department is required"),
})

export default function CollegePage() {
  const [activeTab, setActiveTab] = useState("departments")
  const [isDeptDialogOpen, setIsDeptDialogOpen] = useState(false)
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isTimetableDialogOpen, setIsTimetableDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const { students, faculty, departments, addDepartment, addEvent, timetables, addTimetable } = useStore()
  const { toast } = useToast()

  // Calculate department statistics from real data
  const departmentStats = departments.map((dept) => {
    const deptStudents = students.filter((s) => s.department === dept.name)
    const deptFaculty = faculty.filter((f) => f.department === dept.name)

    return {
      ...dept,
      totalStudents: deptStudents.length,
      totalFaculty: deptFaculty.length,
    }
  })

  const deptForm = useForm<z.infer<typeof departmentFormSchema>>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: "",
      hod: "",
      courses: "",
      rooms: "",
    },
  })

  const eventForm = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      date: "",
      venue: "",
      department: departments[0]?.name || "",
    },
  })

  const handleAddDepartment = (values: z.infer<typeof departmentFormSchema>) => {
    const newDepartment = {
      id: departments.length + 1,
      name: values.name,
      hod: values.hod,
      totalFaculty: 0,
      totalStudents: 0,
      courses: values.courses.split(",").map((c) => c.trim()),
      rooms: values.rooms.split(",").map((r) => r.trim()),
      events: [],
    }

    addDepartment(newDepartment)
    toast({
      title: "Success",
      description: "Department added successfully",
    })
    setIsDeptDialogOpen(false)
    deptForm.reset()
  }

  const handleAddEvent = (values: z.infer<typeof eventFormSchema>) => {
    const newEvent = {
      id: Date.now(),
      title: values.title,
      date: values.date,
      venue: values.venue,
      department: values.department,
    }

    addEvent(values.department, newEvent)
    toast({
      title: "Success",
      description: "Event added successfully",
    })
    setIsEventDialogOpen(false)
    eventForm.reset()
  }

  const handleOpenTimetableEditor = (department: string) => {
    setSelectedDepartment(department)
    setIsTimetableDialogOpen(true)
  }

  const handleTimetableSave = (timetableData: any) => {
    addTimetable({
      department: selectedDepartment,
      ...timetableData,
    })

    toast({
      title: "Success",
      description: "Timetable updated successfully",
    })

    setIsTimetableDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">College Management</h2>
        <Button onClick={() => setIsDeptDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Department
        </Button>
      </div>

      <Tabs defaultValue="departments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="timetables">Timetables</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {departmentStats.map((dept) => (
              <Card key={dept.id}>
                <CardHeader>
                  <CardTitle>{dept.name}</CardTitle>
                  <CardDescription>HOD: {dept.hod}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Faculty:</span>
                      <span>{dept.totalFaculty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span>{dept.totalStudents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Courses:</span>
                      <span>{dept.courses.join(", ")}</span>
                    </div>
                    <div className="mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleOpenTimetableEditor(dept.name)}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Manage Timetable
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsEventDialogOpen(true)}>
              <Calendar className="mr-2 h-4 w-4" /> Add New Event
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Venue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.flatMap((dept) =>
                    dept.events.map((event) => (
                      <TableRow key={`${dept.id}-${event.id}`}>
                        <TableCell>{dept.name}</TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.venue}</TableCell>
                      </TableRow>
                    )),
                  )}
                  {departments.flatMap((dept) => dept.events).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No events scheduled. Add a new event to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timetables" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Department Timetables</h3>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedDepartment && (
            <div className="mb-4">
              <Button onClick={() => handleOpenTimetableEditor(selectedDepartment)}>
                <Clock className="mr-2 h-4 w-4" /> Update Timetable
              </Button>
            </div>
          )}

          {timetables.length > 0 ? (
            timetables
              .filter((t) => !selectedDepartment || t.department === selectedDepartment)
              .map((timetable) => (
                <div key={timetable.department} className="mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{timetable.department} Department Timetable</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DepartmentTimetable timetable={timetable} />
                    </CardContent>
                  </Card>
                </div>
              ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  No timetables available. Select a department and click "Update Timetable" to create one.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Department Dialog */}
      <Dialog open={isDeptDialogOpen} onOpenChange={setIsDeptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Department</DialogTitle>
          </DialogHeader>
          <Form {...deptForm}>
            <form onSubmit={deptForm.handleSubmit(handleAddDepartment)} className="space-y-4">
              <FormField
                control={deptForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={deptForm.control}
                name="hod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Head of Department</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={deptForm.control}
                name="courses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Courses (comma separated)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="B.Tech, M.Tech" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={deptForm.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rooms (comma separated)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="101, 102, 103" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Add Department</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <Form {...eventForm}>
            <form onSubmit={eventForm.handleSubmit(handleAddEvent)} className="space-y-4">
              <FormField
                control={eventForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={eventForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={eventForm.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={eventForm.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Add Event</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Timetable Editor Dialog */}
      <Dialog open={isTimetableDialogOpen} onOpenChange={setIsTimetableDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {selectedDepartment} Timetable</DialogTitle>
          </DialogHeader>
          <TimetableEditor
            department={selectedDepartment}
            onSave={handleTimetableSave}
            existingTimetable={timetables.find((t) => t.department === selectedDepartment)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

