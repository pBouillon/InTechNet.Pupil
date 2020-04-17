import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePlayComponent } from './module-play.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { SafeHtmlPipe } from 'src/app/_pipes/safe-html.pipe';

describe('ModulePlayComponent', () => {
  let component: ModulePlayComponent;
  let fixture: ComponentFixture<ModulePlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModulePlayComponent,
        SafeHtmlPipe
      ],
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
    fixture = TestBed.createComponent(ModulePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
