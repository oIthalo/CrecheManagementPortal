import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { CreatedCrecheResponse } from './../../../responses/creche/created-creche.response';
import { CrechesService } from '../../../services/creches.service';
import { CreateCrecheRequest } from '../../../requests/creche/create-creche.request';
import { ErrorResponse } from '../../../responses/default/error.response';

@Component({
  selector: 'app-create-creche',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-creche.component.html'
})
export class CreateCrecheComponent {
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();

  form: FormGroup;
  errorResponse?: ErrorResponse
  isLoading = false;
  isError = false;

  constructor(
    private _crechesService: CrechesService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cnpj: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      address: this.fb.group({
        zipCode: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        district: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
      }),
    });
  }

  submit() {
    if (!this.form.valid)
      return;

    this.isLoading = true;

    const request: CreateCrecheRequest = this.form.value;

    this._crechesService.createCreche(request).subscribe({
      next: () => {
        this.isLoading = false;
        this.closeModal();
        this.success.emit();
      },
      error: res => {
        this.errorResponse = res
        this.isLoading = false;
        this.isError = true;
        this.error.emit();
      }
    });
  }

  closeModal() {
    this.close.emit();
  }

  cnpjValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.replace(/\D/g, '');
      if (!value) return null;
      if (value.length !== 14 || new Set(value).size === 1) return { cnpjInvalid: true };

      const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      let sum = 0;
      for (let i = 0; i < 12; i++) sum += +value[i] * weights1[i];
      let d1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (+value[12] !== d1) return { cnpjInvalid: true };

      sum = 0;
      for (let i = 0; i < 13; i++) sum += +value[i] * weights2[i];
      let d2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (+value[13] !== d2) return { cnpjInvalid: true };

      return null;
    };
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phone = control.value?.replace(/\D/g, '');
      if (!phone) return null;
      const regex = /^\d{2}9\d{8}$/; // 2 dígitos DDD + 9 + 8 dígitos
      return regex.test(phone) ? null : { phoneInvalid: true };
    };
  }

  cepValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.replace(/\D/g, '');
      if (!value) return null;
      return /^\d{8}$/.test(value) ? null : { cepInvalid: true };
    };
  }
}
