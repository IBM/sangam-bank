import { Component } from '@angular/core';
import { AlertService } from '@app/alert';
import { HomeService } from '@app/home/home.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent {
  isBeneficiaryError = false;

  accountObj = {
    userid: '',
    bankid: 1,
    cif: 0,
    acc_type: 1,
  }

  constructor(private homeService: HomeService,
    private alertSerive: AlertService) {
    this.populateCif();
  }


  createAccount() {
    if (!this.accountObj.userid || Number(this.accountObj.userid) <= 0) {
      this.isBeneficiaryError = true;

    } else {
      this.isBeneficiaryError = false;

      this.homeService.createAccount(this.accountObj).subscribe((response: any) => {
        this.alertSerive.success('Account created successfully', {autoClose: true});
      }, (error: any) => {
        this.alertSerive.error('Error in creating account', {autoClose: true});
      })
    }
  }

  populateCif() {
    this.accountObj.cif = this.homeService.generateCif();
  }

  resetAccountObj() {
    this.accountObj = {
      userid: '',
      bankid: 1,
      cif: 0,
      acc_type: 1,
    }

    this.populateCif();
  }
}
