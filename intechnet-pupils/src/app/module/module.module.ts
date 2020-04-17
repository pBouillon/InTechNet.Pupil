import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleListComponent } from './module-list/module-list.component';
import { ModulePlayComponent } from './module-play/module-play.component';
import { DirectiveModule } from '../_directives/directive.module';
import { PipeModule } from '../_pipes/pipe.module';

@NgModule({
  declarations: [
    ModuleListComponent,
    ModulePlayComponent
  ],
  imports: [
    CommonModule,
    DirectiveModule,
    PipeModule,
  ],
  exports: [
    ModuleListComponent
  ]
})
export class ModuleModule { }
