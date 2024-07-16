import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/alert';
import { HomeService } from '@app/home/home.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  isLoading = false;
  userCreateForm!: FormGroup;

  constructor(private homeService: HomeService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
      this.createForm();
    }

  resetUserObj() {
    this.userCreateForm.reset();
  }

  createUser () {
    this.isLoading = true;
    const userObj = {
      username: this.userCreateForm.value.userName,
      user_type_id: this.userCreateForm.value.userTypeId,
      gender_id: this.userCreateForm.value.genederId,
      dob: this.userCreateForm.value.dob,
      address: this.userCreateForm.value.address,
      state: this.userCreateForm.value.state,
      country: this.userCreateForm.value.country,
      pincode: this.userCreateForm.value.pincode,
      passwd: this.userCreateForm.value.password,
      email: this.userCreateForm.value.userEmailId
    }

    this.homeService.createUser(userObj).subscribe((response: any) => {
      this.isLoading = false;
      this.userCreateForm.markAsPristine();
      this.alertService.success('User created successfully', {autoClose: true});
    }, 
    (error: any) => {
      this.alertService.error('Error in creating the user', {autoClose: true});
      this.isLoading = false;
    });
  }

  private createForm() {
    this.userCreateForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmailId: ['', Validators.required],
      password: ['', Validators.required],
      userTypeId: ['', Validators.required],
      genederId: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }
}
