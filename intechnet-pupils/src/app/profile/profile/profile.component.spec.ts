import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Pupil } from 'src/app/_models/entities/pupil/pupil';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: AuthenticationService;

  class MockAuthenticationServive {
      currentPupil() {
          return new Pupil();
      }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          maxOpened: 3,
          preventDuplicates: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          resetTimeoutOnDuplicate: true,
        }),
      ],
      providers: [
          ProfileComponent,
          { provide: AuthenticationService, useClass: MockAuthenticationServive }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
