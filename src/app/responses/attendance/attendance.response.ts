export interface AttendanceResponse {
  studentName: string,
  registeredBy: string,
  date: Date,
  status: string,
  justification?: string
}
