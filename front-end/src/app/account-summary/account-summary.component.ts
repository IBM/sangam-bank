import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/alert';
import { HomeService } from '@app/home/home.service';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {
  isLoading = false;
  transactions = [] as any;
  userAccounts = [] as any;
  transactionTableHeaders =  ['Sl No', 'From Account', 'Beneficiary Account', ' Transaction Date', 'Transaction Amount', 'Transaction Type'];
  accountForm!: FormGroup;
  currentBalance = -1;

  constructor(
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.createForm();
  }

  getAccountSummary() {
    const summaryObj = {
      acc_id: this.accountForm.value.accountId
    }
    this.homeService.getAccountSummary(summaryObj).subscribe((response: any) => {
      if (response && response.data && response.data[0]) {
        this.currentBalance = response.data[0]['Balance'];
      }

    }, (error: any) => {
      this.alertService.error('Error in getting current account balance', {autoClose: true});
    })
  }

  getTransactions() {
    this.transactions = [];

    this.isLoading = true;
    this.getAccountSummary();

    this.homeService.getTransactions(this.accountForm.value.accountId).subscribe((response: any) => {
      this.isLoading = false;
      this.accountForm.markAsPristine();

      if (response && response.data) {
        this.transactions = response.data || [];
      }

    }, (error: any) => {
      this.alertService.error('Error in fetching transactions', {autoClose: true});
    })
  }

  resetDetails() {
    this.accountForm.reset();
    this.transactions = [];
  }

  private getAccounts() {
    this.homeService.getAccounts().subscribe((response: any) => {
      if (response && response.data) {
        this.userAccounts = response.data || [];
      } else {
        console.error('Error in getting accounts');
      }
    }, (error: any) => {
      this.alertService.error('Error in getting user accounts', {autoClose: true});
    })
  }

  ngOnInit() {
    this.getAccounts();
  }

  private createForm() {
    this.accountForm = this.formBuilder.group({
      accountId: ['', Validators.required],
    });
  }
}
