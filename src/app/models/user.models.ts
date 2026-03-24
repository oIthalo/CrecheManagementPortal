import { TokensDto } from "../dtos/tokens.dto";

export interface User {
  username: string,
  email: string,
  tokens: TokensDto
}
