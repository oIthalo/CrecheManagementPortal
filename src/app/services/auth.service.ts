import { TokensDto } from './../dtos/tokens.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment.development';
import { RegisterRequest } from '../requests/auth/register.request';
import { AuthResponse } from '../responses/auth/auth.response';
import { LoginRequest } from '../requests/auth/login.request';
import { BaseResponse } from '../responses/default/base.response';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _urlBase = environment.api + '/auth';
  private _keyAccessToken = "access_token";
  private _keyRefreshToken = "refresh_token";
  private _keyUser = "user";

  isRefreshLoopActive = false;

  constructor(
    private _client: HttpClient,
    private _router: Router
  ) { }

  getUser(): User {
    var userStorage = localStorage.getItem(this._keyUser);
    if (!userStorage) {
      this._router.navigate(["/login"])
      throw new Error("Unauthorized.");
    }

    return JSON.parse(userStorage);
  }

  getTokens(): TokensDto | null {
    var accessToken = localStorage.getItem(this._keyAccessToken);
    var refreshToken = localStorage.getItem(this._keyRefreshToken);

    if (!accessToken || !refreshToken)
      return null;

    return {
      accessToken,
      refreshToken
    };
  }

  register(request: RegisterRequest) {
    var endpoint = this._urlBase + '/register';
    return this._client.post<BaseResponse<AuthResponse>>(endpoint, request);
  }

  login(request: LoginRequest) {
    var endpoint = this._urlBase + '/login';
    return this._client.post<BaseResponse<AuthResponse>>(endpoint, request);
  }

  refreshToken(refreshToken: string) {
    var params = new HttpParams().set("token", refreshToken);
    var endpoint = this._urlBase + '/refresh'
    return this._client.post<BaseResponse<TokensDto>>(endpoint, null, { params })
  }

  isLoggedIn() {
    const tokens = this.getTokens();
    const accessToken = tokens?.accessToken;

    if (!accessToken)
      return false;

    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp > now;
    } catch {
      return false;
    }
  }

  logout() {
    // var endpoint = this._urlBase + '/logout'
    // this._client.post(endpoint, null)

    localStorage.removeItem(this._keyUser);
    localStorage.removeItem(this._keyAccessToken);
    localStorage.removeItem(this._keyRefreshToken);
  }

  saveUser(request: AuthResponse) {
    var user: User = {
      email: request.email,
      username: request.username,
      tokens: request.tokens
    }

    this.saveTokens(request.tokens);
    localStorage.setItem(this._keyUser, JSON.stringify(user));
  }

  saveTokens(tokens: TokensDto) {
    localStorage.setItem(this._keyAccessToken, tokens.accessToken);
    localStorage.setItem(this._keyRefreshToken, tokens.refreshToken);
  }
}
