export interface DashboardResponse {
  crecheName: string
  totalStudents: number
  totalClassrooms: number
  presentToday: number
  absentToday: number
  attendanceRate: number
  classrooms: ClassroomSummary[]
}

export interface ClassroomSummary {
  id: string
  name: string
  totalStudents: number
  present: number
  absent: number
}
