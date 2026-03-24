export interface ClassroomResponse {
  identifier: string,
  name: string,
  year: number,
  students: ClassroomStudent[]
}

export interface ClassroomStudent{
  identifier: string,
  registrationId: string,
  name: string,
}
