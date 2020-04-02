import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { HubService } from 'src/app/_services/hub/hub.service';
import { Pupil } from 'src/app/_models/entities/pupil/pupil';
import { PupilHub } from 'src/app/_models/entities/hub/pupil-hub';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

import { ToastrService } from 'ngx-toastr';
import * as feather from 'feather-icons';
import { Router } from '@angular/router';
import { RouteName } from 'src/app/routing/route-name';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit, OnInit {

  /**
   * @summary Current pupil representation
   */
  public currentPupil: Pupil;

  /**
   * @summary hub join form
   */
  public hubJoinForm: FormGroup;

  /**
   * @summary Collection of all hubs owned by the current pupil
   */
  public pupilHubs: Array<PupilHub>;

  /**
   * @summary convenience getter for easy access to form fields
   */
  public get f() { return this.hubJoinForm.controls; }

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private hubService: HubService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.useFeatherIcons();
  }

  ngOnInit(): void {
    this.loadPupilHubs();
    this.currentPupil = this.authenticationService.currentPupil;

    // Form creation
    this.createForm();
  }

  /**
   * @summary populate the form
   */
  private createForm(): void {
    this.hubJoinForm = this.formBuilder.group({
      inputJoinHub: ['', Validators.required],
    });
  }

  /**
   * @summary Retrieve PupilHub representation of all hubs the
   *          current pupil is subscribed to
   */
  private loadPupilHubs(): void {
    // Initialize the collection of hubs
    this.pupilHubs = [];

    // Retrieve user's hubs
    this.hubService.getHubs()
      .subscribe(
        (data: Array<PupilHub>) => {
          // Convert each raw hub representation to the PupilHub object
          // to populate the array
          data.map(raw =>
            this.pupilHubs.push(new PupilHub(raw)));

          // Sort the pupil's hubs
          this.sortPupilHubs();
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(
            'Une erreur est survenue lors de la récupération de vos hubs',
            'Erreur de connexion');
        });
  }

  public onJoinHub() {
    // Value of the input field in the modal
    const invitationLink: string = this.f.inputJoinHub.value;

    // Value of the hub's hash
    const hubHash = invitationLink.split('?link=')[1];

    // Check if a hash has been found
    // If no hash was found display an error
    if (!hubHash) {
      this.toastr.error(
        'Veuillez rentrer un lien valide',
        'Erreur lors de l\'inscription');

      // Clear the field on invalid input
      this.f.inputJoinHub.setValue('');
    // Else a hash has been found
    } else {
      this.hubService.joinHub(hubHash)
      .subscribe(_ => {
        // Display information on success
        this.toastr.success('Vous pouvez maintenant accéder au hub', 'Hub rejoint !');

        // Reset the modal on success
        this.f.inputJoinHub.setValue('');
        document.getElementById('closeHubJoinModal').click();

        // Add the new hub to the list
        this.hubService.getHubByLink(hubHash)
          .subscribe((hub: PupilHub) => {
            this.pupilHubs.push(hub);

            // Sort the pupil's hubs
            this.sortPupilHubs();
          },
          () => {
            this.toastr.error(
              'Erreur lors de la récupération des données du hub, votre inscription a cependant réussi',
              'Erreur serveur');
          });
      },
      (error: HttpErrorResponse) => {
        // All possible errors returned by the API
        // The link is not valid or the hub does not exist
        if (error.status === 400) {
          this.toastr.error(
            'Le hub que vous avez tenté de rejoindre n\'existe pas',
            'Erreur lors de l\'inscription');
        }
        // The pupil is already an attendee of this hub
        if (error.status === 401) {
          this.toastr.error(
            'Vous avez déjà rejoint ce hub',
            'Erreur lors de l\'inscription');
        }
        // The hub requested is realdy at maximum capacity
        if (error.status === 409) {
          this.toastr.error(
            'Le hub que vous tentez de rejoindre est plein',
            'Erreur lors de l\'inscription');
        }

        // Clear the field on error
        this.f.inputJoinHub.setValue('');
      });
    }
  }

  /**
   * @summary Sort the hubs of the current pupil according
   *          to the comparator defined in `compareHubs`
   */
  private sortPupilHubs() {
    this.pupilHubs.sort(this.compareHubs);
  }

   /**
    * @summary Compare two `PupilHub` to sort them by moderator name
    *          then by hub name
    * @param a First `PupilHub` to compare
    * @param b Second `PupilHub` to compare
    * @returns A positive value if a's moderator name or hub's name
    *          is alphabetically more than b;
    *          0 if equals;
    *          A negative value if b's moderator name or hub's name
    *          is alphabetically more than a;
    */
  private compareHubs(a: PupilHub, b: PupilHub): number {
    return (a.moderatorNickname.toLowerCase() > b.moderatorNickname.toLowerCase()) ? 1 :
      (a.moderatorNickname.toLowerCase() < b.moderatorNickname.toLowerCase()) ? -1 :
        (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0;
  }

  /**
   * @summary Replace the feather icons tag by svg source
   */
  private useFeatherIcons(): void {
    feather.replace();
  }

}
