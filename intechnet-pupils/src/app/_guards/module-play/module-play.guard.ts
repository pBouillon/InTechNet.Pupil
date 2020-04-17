import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ModuleService } from 'src/app/_services/module/module.service';
import { RouteName } from 'src/app/routing/route-name';
import { map, catchError } from 'rxjs/operators';

/**
 * @summary prevent the user from accessing the module play logic
 *          until he started one
 */
@Injectable({
  providedIn: 'root'
})
export class ModulePlayGuard implements CanActivate {
  /**
   * @summary Default constructor
   * @param moduleService module service
   * @param router angular router
   */
  constructor(
    private moduleService: ModuleService,
    private router: Router,
  ) { }

  /**
   * Evaluate if the user is allowed to reach this route
   * @param next route to handle
   * @param state route state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    _: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Retrieve the ID of the current hub from route
    const idHub = +next.paramMap.get('idHub');

    // If the user has a module in progress, he is allowed to reach the modules pages
    return this.moduleService.getCurrentResource(idHub)
      .pipe(
        map(() => true),
        catchError(() => {
          // Redirect to modules selection
          this.router.navigate([RouteName.HUBS, idHub]);

          return of(false);
    }));
  }

}
