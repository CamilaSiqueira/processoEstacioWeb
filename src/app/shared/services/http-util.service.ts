import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtilService {

  constructor() { }

  headers() {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if (localStorage['token']) {
      httpHeaders = httpHeaders.set(
        'authorization', 'Bearer ' + localStorage['token']
      );
      httpHeaders.get("Authorization");
    }

    return { headers: httpHeaders };
  }

  obterIdUsuario(): string {
    if (!localStorage['token']) {
      return '';
    }

    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.id : '';
  }

  obterPerfil(): string {
    if (!localStorage['token']) {
      return '';
    }
    
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.role : '';
  }

  obterDadosUsuario() {
    if (!localStorage['token']) {
      return '';
    }
    return JSON.parse(atob(localStorage['token'].split('.')[1]));
  }
}
