import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RegisterRequest } from '../../../requests/auth/register.request';
import { AuthResponse } from '../../../responses/auth/auth.response';
import { ErrorResponse } from '../../../responses/default/error.response';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  request: RegisterRequest = {
    email: "",
    password: "",
    username: "",
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

  onSubmit() {
    this.isLoading = true;

    this._authService
      .register(this.request)
      .subscribe({
        next: res => {
          this.authResponse = res.data;
          this.isLoading = false;

          this._authService.saveUser(this.authResponse);
        },
        error: res => {
          this.errorResponse = res;
          this.isLoading = false;
          this.isError = true;
        }
      })

      this._router.navigate(["/creches"])
  }
}
