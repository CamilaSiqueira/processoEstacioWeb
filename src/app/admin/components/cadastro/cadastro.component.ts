import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Usuario } from '../../../usuario';
import { CpfValidator } from '../../../shared/validators';
import { AdminService } from '../../services';

interface Role {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  roles: Role[] = [
    { value: 'ROLE_ADMIN', viewValue: 'Administrador' },
    { value: 'ROLE_USER', viewValue: 'Usuário' }
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      tel: ['', [Validators.required]],
      role: ['', Validators.required]
    });
  }

  cadastrar() {
    if (this.form.invalid) {
      return;
    }

    const usuario: Usuario = this.form.value;
    this.adminService.cadastrar(usuario)
      .subscribe(
        data => {
          alert("Usuário Cadastrado com Sucesso!")
          this.router.navigate(['/admin']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }
}
