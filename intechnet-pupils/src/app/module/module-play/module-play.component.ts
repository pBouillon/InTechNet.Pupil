import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Module } from 'src/app/_models/entities/module/module';
import { ModuleService } from 'src/app/_services/module/module.service';
import { Resource } from 'src/app/_models/entities/module/resource';
import { RouteName } from 'src/app/routing/route-name';

import * as feather from 'feather-icons';

@Component({
  selector: 'app-module-play',
  templateUrl: './module-play.component.html',
  styleUrls: ['./module-play.component.scss']
})
export class ModulePlayComponent implements OnInit, AfterViewInit {

  /**
   * @summary current resource to be displayed
   */
  public resource: Resource;

  /**
   * @summary Id of the current hub
   */
  private idCurrentHub: number;

  /**
   * @summary Id of the current module
   */
  private idCurrentModule: number;

  /**
   * @summary current module
   */
  public module: Module;

  /**
   * @summary default constructor
   * @param moduleService module service
   * @param toastr toastr service
   * @param route route service
   */
  constructor(
    private moduleService: ModuleService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.resource = new Resource();

    this.route.paramMap.subscribe(_ =>
      this.idCurrentModule = +_.get('idModule'));

    this.route.paramMap.subscribe(_ =>
      this.idCurrentHub = +_.get('idHub'));

    // Retrieve the current module
    this.module = new Module();
    this.retrieveCurrentModule(this.idCurrentHub, this.idCurrentModule);

    // Retrieve the current resource
    this.resource = new Resource();
    this.retrieveCurrentResource(this.idCurrentHub);
  }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  /**
   * @summary Retrieve the current resource of the attendee for this module
   */
  private retrieveCurrentModule(idHub: number, idModule: number): void {
    this.moduleService.getModule(idHub, idModule)
      .subscribe(
        (currentModule: Module) => this.module = currentModule,
        () => this.toastr.error('Impossible de récupérer la module courant'),
      );
  }

  /**
   * @summary Retrieve the current resource of the attendee for this module
   */
  private retrieveCurrentResource(idHub: number): void {
    this.moduleService.getCurrentResource(idHub)
      .subscribe(
        (currentResource: Resource) => {
          this.resource = currentResource;
        },
        () => this.toastr.error('Impossible de récupérer la ressource courante'),
      );
  }

  /**
   * @summary redirect the user to the modules listing page
   */
  public goBack(): void {
    this.router.navigate([RouteName.HUBS, this.idCurrentHub]);
  }

  /**
   * @summary close the modal and perform "back to hub" action
   */
  public onBackRequest(): void {
    // Close the modal
    document.getElementById('closeLeaveModuleModal').click();

    // Go back to the modules
    this.goBack();
  }

  /**
   * @summary abort the current module and return to the module listing page
   */
  public giveUp() {
    this.moduleService.deleteState(this.idCurrentHub)
      .subscribe(
        () => {
          this.goBack();
        },
        () => this.toastr.error('Échec lors de l\'abandon'),
      );
  }

  /**
   * @summary close the modal and perform "module give up" action
   */
  public onGiveUpRequest(): void {
    // Close the modal
    document.getElementById('closeAbortModuleModal').click();

    // Give up module
    this.giveUp();
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
