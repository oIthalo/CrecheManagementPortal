import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardResponse } from '../../responses/dashboard/dashboard.response';
import {
  LucideAngularModule,
  School
} from 'lucide-angular';
import { CrecheResponse } from '../../responses/creche/creche.response';
import { CrechesService } from '../../services/creches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorResponse } from '../../responses/default/error.response';

@Component({
  selector: 'app-dashboard',
  imports: [
    LucideAngularModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  readonly schoolIcon = School;

  errorResponse?: ErrorResponse
  dashboard!: DashboardResponse;
  crecheIdentifier!: string;
  creche!: CrecheResponse;
  isLoading = false;
  isError = false;

  constructor(
    private _crechesService: CrechesService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.crecheIdentifier = this._crechesService.getCurrentCrecheIdentifier()!;
    this.loadCrecheAndDashboard();
  }

  loadCrecheAndDashboard() {
    this.isLoading = true;

    if (this.crecheIdentifier) {
      this._crechesService.getCreche(this.crecheIdentifier).subscribe({
        next: res => {
          this.creche = res.data;
          this.isLoading = false;
          this.loadDashboard();
        },
        error: () => this._router.navigate(['/creches'])
      })
    } else {
      this._router.navigate(['/creches']);
    }
  }

  loadDashboard() {
    this.isLoading = true;

    this._crechesService.getDashboard(this.crecheIdentifier)
      .subscribe({
        next: res => {
          this.dashboard = res.data;
          this.isLoading = false;
        },
        error: res => {
          this.errorResponse = res;
          this.isError = true;
          this.isLoading = false;
        }
      })
  }
}
