import { TestBed } from '@angular/core/testing';

import { ModulePlayGuard } from './module-play.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ModulePlayGuard', () => {
  let guard: ModulePlayGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    guard = TestBed.inject(ModulePlayGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
