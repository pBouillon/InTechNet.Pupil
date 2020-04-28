import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Pupil } from 'src/app/_models/entities/pupil/pupil';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as feather from 'feather-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { PupilService } from 'src/app/_services/pupil/pupil.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

    /**
     * @summary Current pupil
     */
    public currentPupil: Pupil;

    /**
     * @summary default constructor
     * @param authenticationService authentication service
     * @param pupilService pupil service
     * @param router angular router
     * @param toastr toastr service
     */
    constructor(
      private authenticationService: AuthenticationService,
      private pupilService: PupilService,
      private router: Router,
      private toastr: ToastrService
    ) { }

    ngAfterViewInit(): void {
      this.useFeatherIcons();
    }

    ngOnInit(): void {
      // Fetch the current subscription plan
      this.currentPupil = this.authenticationService.currentPupil;
    }

    /**
     * @summary Delete the current account of the logged pupil
     */
    public onAccountDeletion(): void {
      this.pupilService.deleteCurrentAccount()
        .subscribe(
          () => {
            // logout the current user
            this.authenticationService.logout();
  
            // Confirm the account deletion
            this.toastr.success(
              'Votre compte a été supprimé avec succès',
              'Compte supprimé');
  
            // Redirect to homepage
            this.router.navigate(['/']);
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(
              'Une erreur est survenue lors de la communication avec le serveur',
              'Erreur de connexion');
          });
  
      document.getElementById('closeAccountDeletionModal').click();
    }

    /**
     * @summary Replace the feather icons tag by svg source
     */
    private useFeatherIcons(): void {
      feather.replace();
    }
}
