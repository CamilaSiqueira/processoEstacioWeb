import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../usuario';
import { CpfValidator } from '../../../shared/validators';
import { AdminService } from '../../services';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit {
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
    private adminService: AdminService) { }

  ngOnInit() {
    this.gerarForm();
    this.obterDados(this.route.snapshot.paramMap.get('id'));
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

  obterDados(id: string) {
    this.adminService.buscarUsuarioPorId(id)
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

  alterarUsuario() {
    if (this.form.invalid) {
      return;
    }

    const usuario: Usuario = this.form.value;
    this.adminService.atualizarUsuario(usuario)
      .subscribe(
        data => {
          alert("Usuário Atualizado com Sucesso!")
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
