"use client"

import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimeSlot {
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday?: string
}

interface TimetableProps {
  timetable: {
    department: string
    slots: TimeSlot[]
  }
  readOnly?: boolean
}

export function DepartmentTimetable({ timetable, readOnly = false }: TimetableProps) {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{timetable.department} Department Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-primary/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[150px] font-bold">Time</TableHead>
                  {dayLabels.slice(0, days.length).map((day) => (
                    <TableHead key={day} className="font-bold">
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetable.slots.map((slot, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium bg-muted/30">{slot.time}</TableCell>
                    {days.map((day) => {
                      const content = slot[day as keyof TimeSlot] as string
                      const isLunch = content?.toLowerCase().includes("lunch")
                      const isFree = content?.toLowerCase().includes("free") || !content

                      return (
                        <TableCell
                          key={day}
                          className={`
                            ${isLunch ? "bg-orange-100 dark:bg-orange-950" : ""} 
                            ${isFree ? "bg-green-50 dark:bg-green-950" : ""}
                          `}
                        >
                          {content || "Free Period"}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

