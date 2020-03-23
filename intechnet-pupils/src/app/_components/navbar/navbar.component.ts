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

  public contactLinkRoute = `${environment.moderatorFrontUrl}/${RouteName.CONTACT_EXTERNAL}`;

  public homepageLinkRoute = `/${RouteName.HOMEPAGE}`;

  public loginLinkRoute = `/${RouteName.LOGIN}`;

  public profilLinkRoute = `/${RouteName.BOARD}`;

  public registerLinkRoute = `/${RouteName.REGISTER}`;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {  }

  disconnect(): void {
    this.authenticationService.logout();
    this.router.navigate([`/${RouteName.HOMEPAGE}`]);
  }

  goHome(): void {
    this.authenticationService.isPupilLoggedIn
      ? this.router.navigate([`/${RouteName.BOARD}`])
      : this.router.navigate([`/${RouteName.HOMEPAGE}`]);
  }

}
