import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { HttpUtilService } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly PATH: string = env.baseApiUrl + 'user/';
  private readonly GET: string = this.PATH + 'email/{email}';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  buscarUsuarioPorEmail(email: string): Observable<any> {
    return this.http.get(this.GET.replace('{email}', email), this.httpUtil.headers());
  }
}
