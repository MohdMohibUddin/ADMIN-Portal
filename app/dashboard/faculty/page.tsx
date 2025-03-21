"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FacultyDialog } from "@/components/faculty/faculty-dialog"
import { useStore } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"
import { DepartmentTimetable } from "@/components/timetable/department-timetable"

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null)
  const { faculty, deleteFaculty, timetables } = useStore()
  const { toast } = useToast()

  const filteredFaculty = faculty.filter((f) => f.staffId?.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleEdit = (faculty: any) => {
    setSelectedFaculty(faculty)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    deleteFaculty(id)
    toast({
      title: "Success",
      description: "Faculty deleted successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Faculty Management</h2>
        <Button
          onClick={() => {
            setSelectedFaculty(null)
            setIsDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Faculty
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by staff ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 border-primary/20 focus:border-primary"
          />
        </div>
      </div>

      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Staff Id</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFaculty.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell>
                  <img
                    src={faculty.profilePicture || "/placeholder.svg?height=40&width=40"}
                    alt={faculty.name}
                    className="h-10 w-10 rounded-full"
                  />
                </TableCell>
                <TableCell className="font-medium">{faculty.name}</TableCell>
                <TableCell>{faculty.department}</TableCell>
                <TableCell>{faculty.staffId}</TableCell>
                <TableCell>{faculty.phone}</TableCell>
                <TableCell>{faculty.email}</TableCell>
                <TableCell>{faculty.roomNumber || faculty.staffRoomNumber}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(faculty)}>
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(faculty.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Display department timetables */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Department Timetables</h3>
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

      <FacultyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} faculty={selectedFaculty} />
    </div>
  )
}

