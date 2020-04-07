import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from 'src/app/_models/entities/module/module';
import { environment } from 'src/environments/environment';

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
   * @summary retrieve all available modules for this hub
   * @param idHub id of the concerned hub
   * @returns an observable containing a collection of all the modules of this hub
   */
  public getAvailableModulesForHub(idHub: number): Observable<Array<Module>> {
    return this.http.get<Array<Module>>(
      `${environment.apiUrl}/Pupils/me/Hubs/${idHub}/Modules`);
  }
}
