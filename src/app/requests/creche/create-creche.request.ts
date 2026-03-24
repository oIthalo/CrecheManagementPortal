import { AddressDto } from "../../dtos/address.dto";

export interface CreateCrecheRequest {
  name: string;
  cnpj: string;
  email: string;
  contactNumber: string;
  address: AddressDto
}
