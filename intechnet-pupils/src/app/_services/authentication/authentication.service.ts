import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { map } from 'rxjs/operators';
import { Pupil } from 'src/app/_models/entities/pupil/pupil';
import { LocalStorageKeys } from 'src/app/_models/entities/local-storage/local-storage-keys';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CredentialsChecks } from 'src/app/_models/entities/credentials-checks/CredentialsChecks';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

   /**
    * @summary default constructor
    * @param http http service for HTTP requests
    * @param storageService service for local storage queries
    */
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
  ) { }

  /**
   * @summary get current pupil
   * @returns a Pupil DTO
   */
  public get currentPupil(): Pupil {
    const parsedValue = JSON.parse(
      this.storageService.get(LocalStorageKeys.CURRENT_PUPIL));

    return (parsedValue != null && parsedValue !== {})
      ? new Pupil(parsedValue)
      : null;
  }

  /**
   * @summary Check if the email is in use
   * @param email user's provided login value
   * @returns a boolean
   */
  isEmailInUse(email: string): Observable<CredentialsChecks> {
    const parameters = new HttpParams()
      .set('email', email);

    return this.http.get<CredentialsChecks>(
      `${environment.apiUrl}/Pupils/identifiers-checks`,
      { params: parameters });
  }

  /**
   * @summary Check if the nickname is in use
   * @param nickname user's provided login value
   * @returns a boolean
   */
  isNickNameInUse(nickname: string): Observable<CredentialsChecks> {
    const parameters = new HttpParams()
      .set('nickname', nickname);

    return this.http.get<CredentialsChecks>(
      `${environment.apiUrl}/Pupils/identifiers-checks`,
      { params: parameters });
  }

  /**
   * @summary get the current pupil login state
   * @returns true if connected; false otherwise
   */
  public get isPupilLoggedIn(): boolean {
    return this.currentPupil
      && !!this.currentPupil.token;
  }

  /**
   * @summary given its information, log in the pupil
   * @param login user's provided login value
   * @param password user's provided password value
   */
  login(login: string, password: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/Pupils/authenticate`,
      { login, password })
      .pipe(
        map(user => {

          if (user && user.token) {
            this.storageService.store(
              LocalStorageKeys.CURRENT_PUPIL, user);
          }

          return user;
      }));
  }

  /**
   * @summary log out the user
   */
  logout() {
    this.storageService.clear(LocalStorageKeys.CURRENT_PUPIL);
  }

  /**
   * @summary given their information, register the pupil and log them in
   * @param login user's provided login value
   * @param email user's provided email value
   * @param password user's provided password value
   */
  register(nickname: string, email: string, password: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/Pupils`,
      { nickname, email, password })
      .pipe(
        map(user => {

          if (user && user.token) {
            this.storageService.store(
              LocalStorageKeys.CURRENT_PUPIL, user);
          }

          return user;
      }));
  }

}
