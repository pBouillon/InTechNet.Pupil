import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-name';
import { environment } from 'src/environments/environment';

/**
 * @summary 404 error page
 */
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  /**
   * @summary default constructor
   */
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { }

  /**
   * @summary redirect the user to the contact page
   */
  toContact() {
    window.location.href = (`${environment.moderatorFrontUrl}/${RouteName.CONTACT_EXTERNAL}`);
  }

  /**
   * @summary redirect the user to its homepage
   */
  toHomepage() {
    this.router.navigate([RouteName.BOARD]);
  }

}
