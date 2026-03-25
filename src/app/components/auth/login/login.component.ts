import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

import { AuthResponse } from '../../../responses/auth/auth.response';
import { ErrorResponse } from '../../../responses/default/error.response';
import { LoginRequest } from '../../../requests/auth/login.request';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  request: LoginRequest = {
    email: "",
    password: "",
    keepalive: false
  };

  authResponse?: AuthResponse;
  errorResponse?: ErrorResponse;
  isLoading = false
  isError = false

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  onSubmit(){
    this.isLoading = true;

    this._authService
      .login(this.request)
      .subscribe({
        next: res => {
          this.authResponse = res.data;
          this.isLoading = false;
          this._authService.saveUser(this.authResponse);
          this._router.navigate(["/creches"])
        },
        error: res => {
          this.errorResponse = res;
          this.isLoading = false;
          this.isError = true;
        }
      })

  }
}
