import { AddressDto } from "../../dtos/address.dto"

export interface CrecheResponse {
  identifier: string
  name: string
  email: string
  contactNumber: string
  address: AddressDto
}
