import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RegisterRequest } from '../../../requests/auth/register.request';
import { AuthResponse } from '../../../responses/auth/auth.response';
import { ErrorResponse } from '../../../responses/default/error.response';
import { AuthService } from '../../../services/auth.service';
import { ToastComponent } from '../../toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    ToastComponent
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
  isLoading = false;

  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  toastTrigger = 0;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  submit(form: NgForm) {
    if (form.invalid)
      return;

    this.isLoading = true;

    this._authService.register(this.request).subscribe({
      next: res => {
        this.authResponse = res.data;
        this.isLoading = false;
        this._authService.saveUser(this.authResponse);

        this.toastType = 'success';
        this.toastMessage = 'Cadastro realizado com sucesso';
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
        this.toastMessage = error?.errorMessage || 'Erro ao cadastrar';
        this.toastTrigger++;
      }
    });
  }

  getFieldError(field: string): string | null {
    return this.errorResponse?.errors
      ?.find(x => x.field.toLowerCase() === field.toLowerCase())
      ?.message || null;
  }
}
