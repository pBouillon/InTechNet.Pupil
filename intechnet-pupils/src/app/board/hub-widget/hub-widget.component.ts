import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import * as feather from 'feather-icons';
import { PupilHub } from 'src/app/_models/entities/hub/pupil-hub';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-name';

@Component({
  selector: 'app-hub-widget',
  templateUrl: './hub-widget.component.html',
  styleUrls: ['./hub-widget.component.scss']
})
export class HubWidgetComponent implements OnInit, AfterViewInit {

  /**
   * @summary Content to display
   */
  @Input()
  public pupilHub: PupilHub;

  constructor(
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void { }

  /**
   * @summary Redirect the user to the hub details board associated to its hub
   */
  public onHubDetails(): void {
    const hubDetailsLink = `${RouteName.HUBS}/${RouteName.HUB_DETAILS}`
      .replace(
        RouteName.HUB_DETAILS,
        this.pupilHub.id.toString());

    this.router.navigate([hubDetailsLink]);
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
