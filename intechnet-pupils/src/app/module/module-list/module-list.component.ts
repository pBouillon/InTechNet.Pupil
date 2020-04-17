import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Module } from 'src/app/_models/entities/module/module';

/**
 * @summary displays all available modules for the current pupil
 */
@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {

  /**
   * @summary array of all available modules
   */
  @Input()
  public availableModules: Array<Module>;

  /**
   * @summary whether this list is available for selection or not
   */
  @Input()
  public enabled: boolean;

  /**
   * @summary size of the sub arrays of modules to be made
   */
  private modulesGroupsSize = 3;

  /**
   * @summary emit the selected module on click
   */
  @Output()
  public selectedModule = new EventEmitter<Module>();

  /**
   * @summary default constructor
   */
  constructor() { }

  /**
   * @summary initialize content
   */
  ngOnInit(): void { }

  /**
   * @summary toggle the card status for this hub
   */
  public onModuleCardClick(module: Module): void {
    if (this.enabled) {
      this.selectedModule.emit(module);
    }
  }

  /**
   * @summary Rearrange an array of module into an array of modules grouped in another array
   * @param toGroup array of modules to group
   * @param groupSize size of the groupes to be done, default value is `modulesGroupsSize`
   * @returns An array of sub arrays of modules with up to groupSize elements per sub array
   */
  public toGroupedModules(toGroup: Array<Module>, groupSize: number = this.modulesGroupsSize): Array<Array<Module>> {
    const groupedModules = [];

    toGroup.map((el, index) =>
      index % groupSize === 0
        ? groupedModules.push([el])
        : groupedModules[groupedModules.length - 1].push(el));

    return groupedModules;
  }

}
