import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RouteName } from './routing/route-name';
import { BoardComponent } from './board/board/board.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthenticationGuard } from './_guards/authentication-guard/authentication.guard';
import { HubJoinComponent } from './hubs/hub-join/hub-join.component';
import { HubDetailsComponent } from './hubs/hub-details/hub-details.component';

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

  // Hubs management
  // ----------
  // Hub board
  {
    path: `${RouteName.HUBS}/${RouteName.JOIN}`,
    component: HubJoinComponent,
    canActivate: [ AuthenticationGuard ]
  },
  // Hub details
  {
    path: RouteName.HUB_DETAILS,
    component: HubDetailsComponent,
    canActivate: [AuthenticationGuard]
  },

  // Global
  // ----------
  // Redirect the user to the homepage on '/'
  {
    path: RouteName.ROOT,
    redirectTo: RouteName.BOARD,
    pathMatch: 'full'
  },

  // Errors
  // ----------
  // 404 error page
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
