import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubJoinComponent } from './hub-join.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('HubJoinComponent', () => {
  let component: HubJoinComponent;
  let fixture: ComponentFixture<HubJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubJoinComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          maxOpened: 3,
          preventDuplicates: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          resetTimeoutOnDuplicate: true,
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
