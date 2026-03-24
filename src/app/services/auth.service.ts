import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RegisterRequest } from '../requests/auth/register.request';
import { AuthResponse } from '../responses/auth/auth.response';
import { TokensDto } from '../dtos/tokens.dto';
import { LoginRequest } from '../requests/auth/login.request';
import { BaseResponse } from '../responses/default/base.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL_BASE = environment.api + '/auth';
  private KEY_ACCESSTOKEN = "access_token";
  private KEY_REFRESHTOKEN = "refresh_token";

  constructor(private _client: HttpClient) { }

  register(request: RegisterRequest) {
    var endpoint = this.URL_BASE + '/register';
    return this._client.post<BaseResponse<AuthResponse>>(endpoint, request);
  }

  login(request: LoginRequest){
    var endpoint = this.URL_BASE + '/login';
    return this._client.post<BaseResponse<AuthResponse>>(endpoint, request);
  }

  saveTokens(tokens: TokensDto){
    localStorage.setItem(this.KEY_ACCESSTOKEN, tokens.accessToken);
    localStorage.setItem(this.KEY_REFRESHTOKEN, tokens.refreshToken);
  }
}
