import { TokensDto } from "../../dtos/tokens.dto";

export interface AuthResponse {
  username: string,
  email: string,
  tokens: TokensDto
}
