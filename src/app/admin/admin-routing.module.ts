import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtualizacaoComponent, CadastroComponent, ListagemComponent, AdminComponent } from './components';
import { AdminGuard } from './services';

export const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                component: ListagemComponent
            },
            {
                path: 'cadastro',
                component: CadastroComponent
            },
            {
                path: 'atualizacao/:id',
                component: AtualizacaoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
