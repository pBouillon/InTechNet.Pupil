import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleListComponent } from './module-list/module-list.component';

@NgModule({
  declarations: [
    ModuleListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModuleListComponent
  ]
})
export class ModuleModule { }
