import { TestBed } from '@angular/core/testing';

import { PupilService } from './pupil.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PupilService', () => {
  let service: PupilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ]});
    service = TestBed.inject(PupilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
