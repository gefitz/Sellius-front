import { TestBed } from '@angular/core/testing';

import { Cookie } from './cookie.service';

describe('CookieService', () => {
  let service: Cookie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cookie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
