import { Component, OnInit } from '@angular/core';
import { HubService } from 'src/app/_services/hub/hub.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteName } from 'src/app/routing/route-name';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hub-join',
  templateUrl: './hub-join.component.html',
  styleUrls: ['./hub-join.component.scss']
})
export class HubJoinComponent implements OnInit {

  /**
   * @summary string identifying the hub to be joined
   */
  private hubToJoin: string;

  constructor(
    private hubService: HubService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>
      this.hubToJoin = params.get('link'));

    if (!this.hubToJoin) {
      this.router.navigate([`/${RouteName.BOARD}`]);
      // The link is not valid or the hub does not exist
      this.toastr.error(
        'Le hub que vous avez tenté de rejoindre n\'existe pas',
        'Erreur lors de l\'inscription');
    }

    this.joinHub();
  }

  /**
   * @summary Add the pupil to the hub
   */
  private joinHub() {
    this.hubService.joinHub(this.hubToJoin)
      .subscribe(_ => {
        // Display information on success
        this.toastr.success('Vous pouvez maintenant accéder au hub', 'Hub rejoint !');

        // Redirection to the pupil's board
        this.router.navigate([`/${RouteName.BOARD}`]);
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

        // Redirection to the pupil's board
        this.router.navigate([`/${RouteName.BOARD}`]);
      }
    );
  }

}
