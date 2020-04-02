import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication/authentication.service';

/**
 * @summary HTTP Interceptor to add the JWT bearer as authorization header
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  /**
   * Default constructor
   * @param authenticationService Authentication service to fetch the current pupil
   * @see AuthenticationService
   */
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Intercept any request to add the JWT as a bearer authorization
   * @param request Request to intercept
   * @param next Http handler for the intercepted request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isPupilLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.currentPupil.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
