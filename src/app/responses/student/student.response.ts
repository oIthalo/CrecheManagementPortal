export interface StudentResponse {
  identifier: string;
  classroom?: string;
  name: string;
  cpf: string;
  contactNumber?: string;
  birthDate: Date;
  gender: string;
  registrationId: string;
  dateRegistration: Date;
  active: boolean;
  documents: string[];
}
