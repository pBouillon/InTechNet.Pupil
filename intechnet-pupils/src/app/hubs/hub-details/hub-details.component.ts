import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
export class HubDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * @summary array of all available modules
   */
  public availableModules: Array<Module> = [];

  /**
   * @summary retrieve the current module if any
   */
  public currentModule: Module;

  /**
   * @summary Data of the current hub to be displayed
   */
  public hub: Hub;

  /**
   * @summary delay between each refresh in ms
   */
  private refreshInterval = 3_000;

  /**
   * @summary timeout for content refresh
   */
  private refreshTimeout;

  /**
   * @summary module selected by the user
   */
  public selectedModule: Module;

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
      this.hub.id = +_.get('idHub');

      // Retrieve the current hub's data
      this.retrieveHubData();
    });

    // Initialize the displayed module object
    this.selectedModule = new Module();

    // Retrieve the associated modules
    this.retrieveHubModules();

    // Activate the refresh timer
    this.refreshTimeout = setInterval(() =>
      this.refreshModuleCards(),
      this.refreshInterval);
  }

  /**
   * @summary clear refresh timeout
   */
  ngOnDestroy(): void {
    clearInterval(this.refreshTimeout);
  }

  /**
   * @summary refresh the module cards
   */
  private refreshModuleCards(): void {
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
            `Vous avez bien quitté le hub '${this.hub.name}'`,
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
   * @summary resume the current module
   */
  public onResumeModuleRequest(): void {
    if (!this.currentModule) {
      this.toastr.error('Vous n\'avez aucun module à continuer');
      return;
    }

    const modulePlayLink = `${RouteName.MODULES}/${RouteName.MODULE_DETAILS}`
      .replace(
        RouteName.MODULE_DETAILS,
        this.currentModule.id.toString());

    this.router.navigate([modulePlayLink], { relativeTo: this.route });
  }

  /**
   * @summary start the module
   */
  public async onModuleStart() {
    // Assert the user can start a new module
    if (this.currentModule) {
      this.toastr.error(
        'Vous avez déjà un module en cours dans ce hub',
        'Impossible de commencer le module'
      );
      return;
    }

    // Close the module start modal
    document.getElementById('closeModuleStartModal').click();

    // Start the module
    this.moduleService
      .startModule(this.hub.id, this.selectedModule.id)
      .subscribe(
        // On module start successful, redirect the user to its first resource
        () => {
          // Redirect the user to the selected module
          const modulePlayLink = `${RouteName.MODULES}/${RouteName.MODULE_DETAILS}`.replace(
            RouteName.MODULE_DETAILS,
            this.selectedModule.id.toString()
          );

          this.router.navigate([modulePlayLink], { relativeTo: this.route });
        },
        // On failure, notify the user
        (_: HttpErrorResponse) =>
          this.toastr.error('Impossible de lancer ce module')
      );
  }

  /**
   * @summary catch the module start request and open confirmation
   */
  public onModuleStartRequest(module: Module): void {
    this.selectedModule = module;
    document.getElementById('openModuleStartModal').click();
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

  /**
   * @summary retrieve all modules allowed for the current pupil
   *          and assign them to the `availableModules` property
   */
  private retrieveHubModules(): void {
    this.moduleService.getAvailableModulesForHub(this.hub.id)
      .subscribe(
        (modules: Array<Module>) => {
          this.availableModules = modules;
          this.currentModule = this.availableModules.filter(_ => _.isOnGoing)[0];
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
