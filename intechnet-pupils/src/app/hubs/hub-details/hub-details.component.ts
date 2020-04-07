import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

import { Hub } from 'src/app/_models/entities/hub/hub';
import { HubService } from 'src/app/_services/hub/hub.service';
import { Module } from 'src/app/_models/entities/module/module';
import { ModuleService } from 'src/app/_services/module/module.service';
import { RouteName } from 'src/app/routing/route-name';

import * as feather from 'feather-icons';

/**
 * @summary hub details component
 */
@Component({
  selector: 'app-hub-details',
  templateUrl: './hub-details.component.html',
  styleUrls: ['./hub-details.component.scss']
})
export class HubDetailsComponent implements OnInit, AfterViewInit {

  /**
   * @summary array of all available modules
   */
  public availableModules: Array<Module> = [];

  /**
   * @summary Data of the current hub to be displayed
   */
  public hub: Hub;

  /**
   * @summary default constructor
   */
  constructor(
    private hubService: HubService,
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void {
    // Retrieve the ID of the current route
    this.route.paramMap.subscribe(_ => {
      this.hub = new Hub();
      this.hub.id = +_.get('id');

      // Retrieve the current hub's data
      this.retrieveHubData();
    });

    // Retrieve the associated modules
    this.retrieveHubModules();
  }

  /**
   * @summary redirect the user to the previous page
   */
  public onBack(): void {
    this.router.navigate([RouteName.BOARD]);
  }

  /**
   * @summary Remove the attendance of the current pupil for this hub
   */
  public onHubLeaving(): void {
    // Close the modal
    document.getElementById('closeHubLeavingModal').click();

    // Delete the attendance
    this.hubService.leaveHub(this.hub.id)
      .subscribe(
        () => {
          // Inform of the success of this operation
          this.toastr.success(
            `Vous avez bien quitté le hub "${this.hub.name}"`,
            'Hub quitté ');

          // Redirect the user to its board
          this.router.navigate([RouteName.BOARD]);
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(
            'Une erreur est survenue lors de la désinscription',
            'Erreur de communication avec le serveur');
        },
      );
  }

  /**
   * @summary Retrieve the details of the current hub
   *          from it's id provided in the route on
   *          init
   */
  private retrieveHubData(): void {
    this.hubService.getHub(this.hub.id)
      .subscribe(
        (hubData: Hub) => {
          this.hub = hubData;
        },
        (error: HttpErrorResponse) => {
          this.router.navigate([RouteName.BOARD]);
          this.toastr.error(
            'Impossible de récupérer les données du hub',
            'Erreur de connexion au serveur'
          );
        },
      );
  }

  private retrieveHubModules(): void {
    this.moduleService.getAvailableModulesForHub(this.hub.id)
      .subscribe(
        (modules: Array<Module>) => {
          this.availableModules = modules;
        },
        (_: HttpErrorResponse) => {
          this.toastr.error(
            'Impossible de récupérer les modules de ce hub',
            'Erreur de communication avec le serveur');
        }
      );
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
