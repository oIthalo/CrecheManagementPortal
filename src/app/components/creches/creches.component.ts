import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { CrecheResponse } from '../../responses/creche/creche.response';
import { SidebarComponent } from "../sidebar/sidebar.component";
import {
  LucideAngularModule,
  School,
  Phone,
  MapPin,
  ArrowRight,
  Trash
} from 'lucide-angular';
import { CrechesService } from '../../services/creches.service';
import { ErrorResponse } from '../../responses/default/error.response';
import { CreateCrecheComponent } from "./create-creche/create-creche.component";
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-creches',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule,
    CreateCrecheComponent,
    ToastComponent
],
  templateUrl: './creches.component.html'
})
export class CrechesComponent implements OnInit {
  readonly schoolIcon = School
  readonly phoneIcon = Phone
  readonly mapPinIcon = MapPin
  readonly arrowRightIcon = ArrowRight
  readonly trashIcon = Trash

  crecheToDelete?: CrecheResponse | null;
  creches: CrecheResponse[] = [];
  errorResponse?: ErrorResponse;
  showAddCrecheModal = false;
  showDeleteConfirm = false;
  isLoading = false;
  isError = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  toastTrigger = 0;

  constructor(
    private _crechesService: CrechesService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loadCreches();
  }

  loadCreches() {
    this.isLoading = true;

    this._crechesService.getCreches()
      .subscribe({
        next: res => {
          this.creches = res?.data ?? [];
          this.isLoading = false;
        },
        error: res => {
          this.errorResponse = res;
          this.isLoading = false;
          this.isError = true;
        }
      })
  }

  openAddCrecheModal() {
    this.showAddCrecheModal = true;
  }

  closeAddCrecheModal() {
    this.showAddCrecheModal = false;
    this.loadCreches();
  }

  confirmDelete(creche: any) {
    this.crecheToDelete = creche;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.crecheToDelete = null;
    this.showDeleteConfirm = false;
  }

  delete() {
    if (!this.crecheToDelete)
      return;

    this._crechesService.deleteCreche(this.crecheToDelete.identifier).subscribe({
      next: () => {
        this.loadCreches();

        this.toastType = 'success';
        this.toastMessage = 'Creche removida com sucesso';
        this.toastTrigger++;

        this.crecheToDelete = null;
        this.showDeleteConfirm = false;
      },
      error: () => {
        this.toastType = 'error';
        this.toastMessage = 'Erro ao remover creche';
        this.toastTrigger++;
      }
    });
  }

  onCrecheCreated() {
    this.toastType = 'success';
    this.toastMessage = 'Creche criada com sucesso';
    this.toastTrigger++;
  }

  onCrecheCreatedError() {
    this.toastType = 'error';
    this.toastMessage = 'Erro ao registrar nova creche';
    this.toastTrigger++;
  }

  navigateToCreche(creche: CrecheResponse) {
    this._crechesService.setSelectedCreche(creche);
    this._crechesService.setCurrentCrecheIdentifier(creche.identifier);
    this._router.navigate(["creches", creche.identifier, "dashboard"]);
  }
}
