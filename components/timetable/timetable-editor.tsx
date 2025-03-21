"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DialogFooter } from "@/components/ui/dialog"

interface TimeSlot {
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday?: string
}

interface TimetableEditorProps {
  department: string
  onSave: (timetable: any) => void
  existingTimetable?: any
}

export function TimetableEditor({ department, onSave, existingTimetable }: TimetableEditorProps) {
  const [includeSaturday, setIncludeSaturday] = useState(existingTimetable?.slots?.[0]?.saturday !== undefined)
  const [slots, setSlots] = useState<TimeSlot[]>(
    existingTimetable?.slots || [
      { time: "9:00 AM - 10:00 AM", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
      { time: "10:00 AM - 11:00 AM", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
      { time: "11:15 AM - 12:15 PM", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
      {
        time: "12:15 PM - 1:15 PM",
        monday: "Lunch Break",
        tuesday: "Lunch Break",
        wednesday: "Lunch Break",
        thursday: "Lunch Break",
        friday: "Lunch Break",
        saturday: "Lunch Break",
      },
      { time: "1:15 PM - 2:15 PM", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
      { time: "2:15 PM - 3:15 PM", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
      { time: "3:30 PM - 4:30 PM", monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "" },
    ],
  )

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const handleAddTimeSlot = () => {
    setSlots([
      ...slots,
      {
        time: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
      },
    ])
  }

  const handleRemoveTimeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index))
  }

  const handleTimeChange = (index: number, value: string) => {
    const newSlots = [...slots]
    newSlots[index].time = value
    setSlots(newSlots)
  }

  const handleCellChange = (index: number, day: string, value: string) => {
    const newSlots = [...slots]
    newSlots[index][day as keyof TimeSlot] = value
    setSlots(newSlots)
  }

  const handleSave = () => {
    // If Saturday is not included, remove it from all slots
    let finalSlots = [...slots]
    if (!includeSaturday) {
      finalSlots = finalSlots.map(({ saturday, ...rest }) => rest)
    }

    onSave({
      department,
      slots: finalSlots,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="includeSaturday"
            checked={includeSaturday}
            onChange={(e) => setIncludeSaturday(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="includeSaturday">Include Saturday</label>
        </div>
        <Button onClick={handleAddTimeSlot} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Time Slot
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Time</TableHead>
              {dayLabels.slice(0, includeSaturday ? 6 : 5).map((day) => (
                <TableHead key={day}>{day}</TableHead>
              ))}
              <TableHead className="w-[60px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slots.map((slot, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={slot.time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    placeholder="e.g., 9:00 AM - 10:00 AM"
                  />
                </TableCell>
                {days.slice(0, includeSaturday ? 6 : 5).map((day) => (
                  <TableCell key={day}>
                    <Input
                      value={slot[day as keyof TimeSlot] as string}
                      onChange={(e) => handleCellChange(index, day, e.target.value)}
                      placeholder="Subject / Activity"
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTimeSlot(index)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogFooter>
        <Button onClick={handleSave}>Save Timetable</Button>
      </DialogFooter>
    </div>
  )
}

