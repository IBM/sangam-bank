import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService, LoginContext } from './authentication.service';
import { HomeService } from '@app/home/home.service';
import { AlertService } from '@app/alert';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private homeService: HomeService,
    private alertService: AlertService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;

    const loginDetails = {
      email_id: this.loginForm.value.userEmailId,
      passwd: this.loginForm.value.password
    }

    this.homeService.loginUser(loginDetails).subscribe((response: any) => {
      if (response) {
       if (response.data) {
        this.homeService.getUserDetails({email_id: this.loginForm.value.userEmailId}).subscribe((response) => {
          if (response && response.data[0]) {
            this.storeUser(response.data[0]);
            this.loginForm.markAsPristine();
            this.isLoading = false;

            this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
          } else {
            this.alertService.error('Error retrieving the user', {autoClose: true});
            this.isLoading = false;
            
          }
        }, (error: any) => {
            this.alertService.error('error in retrieving the user details:', {autoClose: true});
            this.isLoading = false;
        })
       } else {
          this.alertService.error('Email Id or Password is incorrect', {autoClose: true});
          this.isLoading = false;
       }
      }
    }, (error: any) => {
      this.alertService.error('Error in logging in user', {autoClose: true});
      this.isLoading = false;
    })


    // this.isLoading = true;
    // const login$ = this.authenticationService.login(this.loginForm.value);
    // login$
    //   .pipe(
    //     finalize(() => {
    //       this.loginForm.markAsPristine();
    //       this.isLoading = false;
    //     }),
    //     untilDestroyed(this)
    //   )
    //   .subscribe(
    //     (credentials) => {
    //       log.debug(`${credentials.username} successfully logged in`);
    //       this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
    //     },
    //     (error) => {
    //       log.debug(`Login error: ${error}`);
    //       this.error = error;
    //     }
    //   );
  }

  storeUser(user: any) {
    let userObj: LoginContext 

    userObj = {
      username: user.Username,
      userTypeId: user.User_type_id,
      genderId: user.Gender_id,
      dob: user.Dob,
      address: user.Address,
      state: user.State,
      country: user.Country,
      pincode: user.Pincode,
      email: user.Email,
      userId: user.UserId,
      remember: this.loginForm.value.remember
    }

    this.authenticationService.login(userObj);
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      userEmailId: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
