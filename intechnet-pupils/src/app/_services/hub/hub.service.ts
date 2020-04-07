import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PupilHub } from 'src/app/_models/entities/hub/pupil-hub';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Hub } from 'src/app/_models/entities/hub/hub';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * @summary Service for hub related operations and API calls
 */
@Injectable({
  providedIn: 'root'
})
export class HubService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) { }

  /**
   * @summary Get a hub the current pupil has joined by its link
   * @param link the link of the hub
   * @returns an observable of the hub requested
   */
  public getHubByLink(link: string): Observable<PupilHub> {
    return this.http.get<PupilHub>(
      `${environment.apiUrl}/Pupils/me/Hubs/${link}`);
  }

  /**
   * @summary get all managed hub by the current moderator
   * @returns an observable of a collection of light representation of all hubs
   *          managed by the current pupil
   */
  public getHubs(): Observable<Array<PupilHub>> {
    return this.http.get<Array<PupilHub>>(
      `${environment.apiUrl}/Pupils/me/Hubs`);
  }

  /**
   * @summary given its id, retrieve all data of a hub
   * @param id id of the hub to retrieve
   * @returns an observable holding all the data of the requested hub
   */
  public getHub(id: number): Observable<Hub> {
    return this.http.get<Hub>(
      `${environment.apiUrl}/Hubs/${id}`);
  }

  /**
   * @summary add a pupil to a hub
   * @param link link of the hub
   * @returns the result of the request
   */
  public joinHub(link: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${environment.apiUrl}/Pupils/me/Hubs/join?link=${link}`, { });
  }

  /**
   * @summary remove the attendance of a pupil for a hub
   * @param idHub id of the hub to leave
   */
  public leaveHub(idHub: number): Observable<any> {
    const notSpecified = 0;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: notSpecified,
        idPupil: this.authenticationService.currentPupil.id,
        idHub
      },
    };

    return this.http.delete<any>(
      `${environment.apiUrl}/Pupils/me/Hubs/${idHub}`, options);
  }

}
