import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './_components/footer/footer.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { ToastrModule } from 'ngx-toastr';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          maxOpened: 3,
          preventDuplicates: true,
          progressBar: true,
          progressAnimation: 'decreasing',
          resetTimeoutOnDuplicate: true,
        }),
      ],
      declarations: [
        AppComponent,
        FooterComponent,
        NavbarComponent,
        LoginComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
