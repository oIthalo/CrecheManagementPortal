import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { BaseResponse } from '../responses/default/base.response';
import { CrecheResponse } from '../responses/creche/creche.response';
import { BehaviorSubject } from 'rxjs';
import { CreateCrecheRequest } from '../requests/creche/create-creche.request';
import { CreatedCrecheResponse } from '../responses/creche/created-creche.response';

@Injectable({
  providedIn: 'root'
})
export class CrechesService {
  private URL_BASE = environment.api + "/creches"
  private selectedCrecheSubject = new BehaviorSubject<CrecheResponse | null>(null);

  selectedCreche = this.selectedCrecheSubject.asObservable();

  constructor(private _client: HttpClient) { }

  getCreches() {
    return this._client.get<BaseResponse<CrecheResponse[]>>(this.URL_BASE);
  }

  createCreche(request: CreateCrecheRequest) {
    return this._client.post<BaseResponse<CreatedCrecheResponse>>(this.URL_BASE, request);
  }

  setSelectedCreche(creche: CrecheResponse) {
    this.selectedCrecheSubject.next(creche);
  }
}
