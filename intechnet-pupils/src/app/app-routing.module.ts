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
import { ModulePlayComponent } from './module/module-play/module-play.component';
import { ModulePlayGuard } from './_guards/module-play/module-play.guard';

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
  {
    path: `${RouteName.HUBS}`,
    canActivate: [ AuthenticationGuard ],
    // Children routes relative to hub content
    children: [
      // Hub board
      { path: '', component: HubJoinComponent },
      // Hub join
      { path: RouteName.JOIN, component: HubJoinComponent },
      // Hub details
      {
        path: RouteName.HUB_DETAILS,
        // Children routes relative to hub details and modules
        children: [
          // Details of the hub
          { path: '', component: HubDetailsComponent },
          // Play a module of a hub
          {
            path: `${RouteName.MODULES}/${RouteName.MODULE_DETAILS}`,
            component: ModulePlayComponent,
            canActivate: [ ModulePlayGuard ],
          },
        ],
      },
    ],
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
