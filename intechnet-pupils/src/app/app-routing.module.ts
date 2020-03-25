import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RouteName } from './routing/route-name';
import { BoardComponent } from './board/board/board.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthenticationGuard } from './_guards/authentication-guard/authentication.guard';

const routes: Routes = [
  // Authentication
  // ----------
  { path: RouteName.LOGIN, component: LoginComponent },

  // Register
  // ----------
  { path: RouteName.REGISTER, component: RegisterComponent },

  // Board and management
  // ----------
  // Main board
  {
    path: RouteName.BOARD,
    component: BoardComponent,
    canActivate: [ AuthenticationGuard ]
  },

  // Global
  // ----------
  // Redirect the user to the homepage on '/'
  {
    path: RouteName.ROOT,
    redirectTo: RouteName.HOMEPAGE,
    pathMatch: 'full'
  },
  // 404 error page
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
