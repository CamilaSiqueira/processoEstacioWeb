import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../../../usuario';
import { MatSnackBar } from '@angular/material';
import { UsuarioService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  roles: Role[] = [
    { value: 'ROLE_ADMIN', viewValue: 'Administrador' },
    { value: 'ROLE_USER', viewValue: 'Usuário' }
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.gerarForm();
    this.obterDados(localStorage['email']);
  }

  gerarForm() {
    this.form = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      password: [''],
      cpf: [''],
      tel: [''],
      role: ['']
    });
  }

  obterDados(id: string) {
    this.usuarioService.buscarUsuarioPorEmail(id)
      .subscribe(
        data => {
          const usuario = data['data'] as Usuario;
          this.form.get('id').setValue(usuario.id);
          this.form.get('name').setValue(usuario.name);
          this.form.get('email').setValue(usuario.email);
          this.form.get('password').setValue(usuario.password);
          this.form.get('cpf').setValue(usuario.cpf);
          this.form.get('tel').setValue(usuario.tel);
          this.form.get('role').setValue(usuario.role);
        }, err => {
          console.log(err);
          this.snackBar.open('Erro ao carregar usuário.', 'Erro', { duration: 5000 });
          this.router.navigate(['/admin']);
        }
      );
  }
}
