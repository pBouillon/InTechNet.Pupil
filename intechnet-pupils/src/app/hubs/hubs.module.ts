import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubJoinComponent } from './hub-join/hub-join.component';
import { HubDetailsComponent } from './hub-details/hub-details.component';

@NgModule({
  declarations: [HubJoinComponent, HubDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class HubsModule { }
