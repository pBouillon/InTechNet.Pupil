import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PupilHub } from 'src/app/_models/entities/hub/pupil-hub';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  constructor(
    private http: HttpClient
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
   * @summary add a pupil to a hub
   * @param link link of the hub
   * @returns the result of the request
   */
  public joinHub(link: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${environment.apiUrl}/Pupils/me/Hubs/join?link=${link}`, { });
  }
}
