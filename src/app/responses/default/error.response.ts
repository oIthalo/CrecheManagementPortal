export interface ErrorResponse {
  statusCode: number,
  errorCode?: string,
  errorMessage: string,
  errors: ErrorValidation[]
}

export interface ErrorValidation {
  field: string,
  message: string
}
