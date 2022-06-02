import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSessionComponent } from './pages/add-session/add-session.component';
import { DetailComponent } from './pages/detail/detail.component';
import { SessionsComponent } from './pages/sessions/sessions.component';

const routes: Routes = [
  { path: '', component: SessionsComponent, },
  { path: 'add', component: AddSessionComponent, },
  { path: 'table/:id', component: DetailComponent, },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
