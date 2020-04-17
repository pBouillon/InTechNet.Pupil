import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from 'src/app/_models/entities/module/module';
import { environment } from 'src/environments/environment';
import { Resource } from 'src/app/_models/entities/module/resource';

/**
 * @summary service for modules related operations and API calls
 */
@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  /**
   * @summary default constructor
   * @param http http service for HTTP requests
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * @summary delete the state of a pupil for the current module in this hub
   * This method is either called when the pupil gives up or they finish the module
   * @param idHub id of the concerned hub
   * @returns a 204 HTTP status on successful deletion
   */
  public deleteState(idHub: number) {
    return this.http.delete<any>(
      `${environment.apiUrl}/Pupils/me/Hubs/${idHub}/Modules/current/States/current`);
  }

  /**
   * @summary retrieve all available modules for this hub
   * @param idHub id of the concerned hub
   * @returns an observable containing a collection of all the modules of this hub
   */
  public getAvailableModulesForHub(idHub: number): Observable<Array<Module>> {
    return this.http.get<Array<Module>>(
      `${environment.apiUrl}/Pupils/me/Hubs/${idHub}/Modules`);
  }

  /**
   * @summary retrieve the current resource of the attendee for this hub
   * @param idHub id of the attendee's hub
   * @returns an observable of the resource
   */
  public getCurrentResource(idHub: number): Observable<Resource> {
    return this.http.get<Resource>(
      `${environment.apiUrl}/Pupils/me/Hubs/${idHub}/Modules/current/Resources/current`);
  }

  /**
   * @summary Get a specific module of a hub
   * @param idHub id of the hub from which the modules are fetched
   * @param idModule id of the module to retrieve
   * @returns an observable of the fetched module
   */
  public getModule(idHub: number, idModule: number): Observable<Module> {
    return this.http.get<Module>(
      `${environment.apiUrl}/Pupils/me/Hubs/${idHub}/Modules/${idModule}`);
  }

  /**
   * @summary start a module for an attendee
   * @param idHub id of the hub in which the module is
   * @param idModule id of the module to be started
   */
  public startModule(idHub: number, idModule: number): Observable<Resource> {
    return this.http.post<Resource>(
      `${environment.apiUrl}/Pupils/me/Hubs/${idHub}/Modules/${idModule}/States/current`,
      { });
  }

}
