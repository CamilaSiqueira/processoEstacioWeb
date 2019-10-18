import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Usuario } from '../../usuario';
import { HttpUtilService } from '../../shared';

@Injectable()
export class AdminService {
  private readonly PATH: string = env.baseApiUrl + 'user/';
  private readonly POST: string = this.PATH + 'save/';
  private readonly PUT: string = this.PATH + 'update/';
  private readonly DELETE: string = this.PATH + 'delete/{id}';


  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  cadastrar(usuario: Usuario): Observable<any> {
    return this.http.post(this.POST, usuario, this.httpUtil.headers());
  }

  listarTodos(): Observable<any> {
    console.log("Tentando listar todos");
    return this.http.get(this.PATH, this.httpUtil.headers());
  } 
  
  buscarUsuarioPorId(id: string): Observable<any> {
    return this.http.get(this.PATH + id.toString(), this.httpUtil.headers());
  }

  apagarUsuario(id: string): Observable<any> {
    return this.http.delete(this.DELETE.replace('{id}', id.toString()), this.httpUtil.headers());
  }

  atualizarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(this.PUT, usuario, this.httpUtil.headers());
  }
}
