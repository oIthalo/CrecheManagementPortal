import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { RegisterRequest } from '../../../requests/auth/register.request';
import { AuthResponse } from '../../../responses/auth/auth.response';
import { ErrorResponse } from '../../../responses/default/error.response';
import { CommonModule } from '@angular/common';

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
    username: "",
    email: "",
    password: "",
    keepalive: false
  };

  successResponse: AuthResponse = {
    email: "",
    username: "",
    tokens: {
      accessToken: "",
      refreshToken: ""
    }
  };

  errorResponse: ErrorResponse = {
    errorMessage: "",
    errorCode: "",
    statusCode: 0,
    errors: []
  }

  isLoading = false
  isError = false
}
