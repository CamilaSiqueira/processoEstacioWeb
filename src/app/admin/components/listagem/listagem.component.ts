import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import {
  MatTableDataSource,
  MatSnackBar,
  MatSort,
  MatPaginator,
  Sort
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AdminService } from '../../services';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Usuario>;
  colunas: string[] = ['id', 'email', 'tel', 'perfil', 'acao'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isLoadingResults = true;

  constructor(
    private snackBar: MatSnackBar,
    // private router: Router,
    private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.listarTodos().subscribe(
      data => {
        const usuarios = data['data'] as Usuario[];
        console.log("usuarios: ", usuarios);
        this.dataSource = new MatTableDataSource<Usuario>(usuarios);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoadingResults = false;
      },
      err => {
        const msg: string = "Erro ao obter Usuários.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
        this.isLoadingResults = false;
      }
    );
  }

  isNotActualUser(email: string): boolean {
    return email != localStorage['email'];
  }

  apagarUsuario(name: string, id: string) {
    if (confirm('Deseja excluir o usuário ' + name + '?')) {
      this.adminService.apagarUsuario(id).subscribe(
        data => {
          location.reload();
        },
        err => {
          console.log(err);
          this.snackBar.open('Erro ao excluir o usuário ' + name, "Erro", { duration: 5000 });
        }
      );
    }
  }

  obterPerfil(perfil: string): string {
    if (perfil.includes('ADMIN')) {
      return 'Administrador';
    }

    return 'Usuário';
  }

}
