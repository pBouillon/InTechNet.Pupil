import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/app/routing/route-name';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ContainsDigit } from 'src/app/_validators/containsDigit.validator';
import { ContainsLowercase } from 'src/app/_validators/containsLowercase.validator';
import { ContainsUppercase } from 'src/app/_validators/containsUppercase.validator';
import { CredentialsChecks } from 'src/app/_models/entities/credentials-checks/CredentialsChecks';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /**
   * @summary convenience getter for easy access to form fields
   */
  public get f() {
    return this.registerForm.controls;
  }

  /**
   * @summary boolean for the email
   */
  public isEmailTaken = false;

  /**
   * @summary boolean for the nickname
   */
  public isNicknameTaken = false;

  /**
   * @summary link to the login page
   */
  public loginLink = `/${RouteName.LOGIN}`;

  /**
   * @summary link to the moderator login page
   */
  public registerLink = `${environment.moderatorFrontUrl}/${RouteName.REGISTER_MODERATOR_EXTERNAL}`;

  /**
   * @summary register form
   */
  registerForm: FormGroup;
  /**
   * @summary boolean for the nickname
   */
  public showNicknameTooltip = false;

  /**
   * @summary boolean for the password
   */
  public showPasswordTooltip = false;

  /**
   * @summary default constructor
   * @param authenticationService authentication service
   * @param formBuilder form builder service
   * @param router angular router
   */
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    // If the user is already logged in, redirect them
    if (this.authenticationService.isPupilLoggedIn) {
      this.router.navigate([`/${RouteName.BOARD}`]);
    }

    // Form creation
    this.createForm();
  }

  /**
   * @summary check if any credential is in use
   * @returns true if either the email or the nickname is already taken
   */
  areIdentifiersInUse(): boolean {
    return this.isEmailTaken || this.isNicknameTaken;
  }

  /**
   * @summary check if the password verification field is OK
   */
  arePasswordsMismatched() {
    const passwordVerificationField = this.registerForm.get(
      'passwordVerification'
    );

    return (
      passwordVerificationField.value !==
      this.registerForm.get('password').value
    );
  }

  /**
   * @summary populate the form
   */
  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      nickname: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(32)]
      ],
      email: ['', Validators.email],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          ContainsDigit,
          ContainsLowercase,
          ContainsUppercase
        ]
      ],
      passwordVerification: ['', Validators.required]
    });
  }

  /**
   * @summary check if the field given in parameter is valid
   * @param field the field to check
   */
  isFieldInvalid(field: string) {
    const formField = this.registerForm.get(field);

    return formField.invalid && (formField.dirty || formField.touched);
  }

  /**
   * @summary check is the password verification field is valid
   */
  isPasswordVerificationFieldInvalid() {
    const field = this.registerForm.get('passwordVerification');
    return field.invalid && (field.dirty || field.touched);
  }

  /**
   * @summary check if the validator given is OK for the password field
   * @param validatorToCheck the validator to check
   */
  isPasswordOk(validatorToCheck: string) {
    const passwordField = this.registerForm.get('password');
    return (
      passwordField.value &&
      (!this.f.password.errors || !this.f.password.errors[validatorToCheck])
    );
  }

  /**
   * @summary On blur event for the email input
   */
  onBlurEmail() {
    this.authenticationService.isEmailInUse(this.f.email.value).subscribe(
      data => {
        const fetchedChecksResult = new CredentialsChecks(data);
        this.isEmailTaken = !fetchedChecksResult.areUnique;
      },
      error => {
        this.registerForm.setErrors({ server: error });
      }
    );
  }

  /**
   * @summary On blur event for the nickname input
   */
  onBlurNickname() {
    this.showNicknameTooltip = false;
    this.authenticationService.isNickNameInUse(this.f.nickname.value).subscribe(
      data => {
        const fetchedChecksResult = new CredentialsChecks(data);
        this.isNicknameTaken = !fetchedChecksResult.areUnique;
      },
      error => {
        this.registerForm.setErrors({ server: error });
      }
    );
  }

  /**
   * @summary On focus event for the nickname input
   */
  onFocusNickname() {
    this.showNicknameTooltip = true;
  }

  /**
   * @summary On blur event for the password input
   */
  onBlurPassword() {
    this.showPasswordTooltip = false;
  }

  /**
   * @summary On focus event for the password input
   */
  onFocusEmail() {
    this.isEmailTaken = false;
  }

  /**
   * @summary On focus event for the password input
   */
  onFocusPassword() {
    this.showPasswordTooltip = true;
  }

  /**
   * @summary form submission's logic
   */
  OnSubmitForm() {
    this.authenticationService
      .register(
        this.f.nickname.value,
        this.f.email.value,
        this.f.password.value
      )
      .subscribe(
        () => {
          this.router.navigate([`/${RouteName.BOARD}`]);
        },
        error => {
          this.toastr.error(
            'Une erreur est survenue lors de votre inscription',
            'Erreur de connexion au serveur');
          this.registerForm.setErrors({ server: error });
        }
      );
  }

}
