import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubWidgetComponent } from './hub-widget.component';
import { FormBuilder } from '@angular/forms';
import { PupilHub } from 'src/app/_models/entities/hub/pupil-hub';

describe('HubWidgetComponent', () => {
  let component: HubWidgetComponent;
  let fixture: ComponentFixture<HubWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubWidgetComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
