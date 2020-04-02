import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/app/routing/route-name';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * @summary convenience getter for easy access to form fields
   */
  public get f() { return this.loginForm.controls; }

  /**
   * @summary login form login
   */
  loginForm: FormGroup;

  /**
   * @summary link to the registration page for moderators
   */
  public loginLinkModerator = `${environment.moderatorFrontUrl}${RouteName.LOGIN_MODERATOR_EXTERNAL}`;

    /**
     * @summary link to the registration page
     */
  public registerLink = `/${RouteName.REGISTER}`;

  /**
   * @summary default constructor
   * @param authenticationService authentication service
   * @param formBuilder form builder service
   * @param router angular router
   * @param toastr toastr service
   */
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    // If the user is already logged in, redirect it
    if (this.authenticationService.isPupilLoggedIn) {
      this.router.navigate([`/${RouteName.BOARD}`]);
    }

    // Form creation
    this.createForm();
  }

  /**
   * @summary populate the form
   */
  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return this.loginForm.get(field).invalid
      && (this.loginForm.get(field).dirty
        || this.loginForm.get(field).touched);
  }

  /**
   * @summary form submission's logic
   */
  OnSubmitForm() {
    this.authenticationService
      .login(this.f.login.value, this.f.password.value)
      .subscribe(
        () => {
          this.router.navigate([`/${RouteName.BOARD}`]);
        },
        (error) => {
          this.toastr.error(
            'Une erreur est survenue lors de la connexion au serveur',
            'Erreur de connexion au serveur');
          this.loginForm.setErrors({ server: error });
        });
  }
}