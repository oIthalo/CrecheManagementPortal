import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

import { AuthResponse } from '../../../responses/auth/auth.response';
import { ErrorResponse } from '../../../responses/default/error.response';
import { LoginRequest } from '../../../requests/auth/login.request';
import { AuthService } from '../../../services/auth.service';
import { ToastComponent } from '../../toast/toast.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ToastComponent,
    CommonModule
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
  isLoading = false;

  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  toastTrigger = 0;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  submit(form: NgForm) {
    if (form.invalid)
      return;

    this.isLoading = true;

    this._authService
      .login(this.request)
      .subscribe({
        next: res => {
          this.authResponse = res.data;
          this.isLoading = false;
          this._authService.saveUser(this.authResponse);

          this.toastType = 'success';
          this.toastMessage = 'Login realizado com sucesso';
          this.toastTrigger++;

          this._router.navigate(["/creches"]);
        },
        error: res => {
          this.isLoading = false;

          const error: ErrorResponse = res.error;

          if (error?.errors?.length > 0) {
            this.errorResponse = error;
            return;
          }

          this.toastType = 'error';
          this.toastMessage = error?.errorMessage || 'Erro ao realizar login';
          this.toastTrigger++;
        }
      })
  }
}
