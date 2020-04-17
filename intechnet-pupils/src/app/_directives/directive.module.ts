import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunScriptDirective } from './run-script.directive';

@NgModule({
  declarations: [
    RunScriptDirective,
  ],
  exports: [
    RunScriptDirective,
  ],
  imports: [
    CommonModule,
  ]
})
export class DirectiveModule { }
