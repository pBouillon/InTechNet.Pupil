import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-name';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  toContact() {
    window.location.href = (`${environment.moderatorFrontUrl}/${RouteName.CONTACT_EXTERNAL}`);
  }

  toHomepage() {
    this.router.navigate([RouteName.HOMEPAGE]);
  }

}
