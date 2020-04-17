import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-name';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public homepageLinkRoute = `/${RouteName.BOARD}`;

  public loginLinkRoute = `/${RouteName.LOGIN}`;

  public registerLinkRoute = `/${RouteName.REGISTER}`;

  /**
   * @summary default constructor
   */
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {  }

  /**
   * @summary disconnect the user
   */
  disconnect(): void {
    this.authenticationService.logout();
    this.router.navigate([`/${RouteName.LOGIN}`]);
  }

  /**
   * @summary redirect the user to its homepage
   */
  goHome(): void {
    this.authenticationService.isPupilLoggedIn
      ? this.router.navigate([`/${RouteName.BOARD}`])
      : this.router.navigate([`/${RouteName.LOGIN}`]);
  }

}
