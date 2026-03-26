import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { BaseResponse } from '../responses/default/base.response';
import { CrecheResponse } from '../responses/creche/creche.response';
import { BehaviorSubject } from 'rxjs';
import { CreateCrecheRequest } from '../requests/creche/create-creche.request';
import { CreatedCrecheResponse } from '../responses/creche/created-creche.response';
import { DashboardResponse } from '../responses/dashboard/dashboard.response';

@Injectable({
  providedIn: 'root'
})
export class CrechesService {
  private _urlBase = environment.api + "/creches"
  private _selectedCrecheSubject = new BehaviorSubject<CrecheResponse | null>(null);
  private _keyCurrentCreche = "current_creche_identifier";

  selectedCreche = this._selectedCrecheSubject.asObservable();

  constructor(private _client: HttpClient) { }

  getCreches() {
    return this._client.get<BaseResponse<CrecheResponse[]>>(this._urlBase);
  }

  getCreche(identifier: string) {
    var endpoint = `${this._urlBase}/${identifier}`
    return this._client.get<BaseResponse<CrecheResponse>>(endpoint);
  }

  getDashboard(identifier: string) {
    var endpoint = `${this._urlBase}/${identifier}/dashboard`
    return this._client.get<BaseResponse<DashboardResponse>>(endpoint)
  }

  createCreche(request: CreateCrecheRequest) {
    return this._client.post<BaseResponse<CreatedCrecheResponse>>(this._urlBase, request);
  }

  deleteCreche(identifier: string) {
    var endpoint = `${this._urlBase}/${identifier}`
    return this._client.delete(endpoint);
  }

  getCurrentCrecheIdentifier() {
    return sessionStorage.getItem(this._keyCurrentCreche);
  }

  setCurrentCrecheIdentifier(identifier: string) {
    sessionStorage.setItem(this._keyCurrentCreche, identifier);
  }

  setSelectedCreche(creche: CrecheResponse) {
    this._selectedCrecheSubject.next(creche);
  }
}
