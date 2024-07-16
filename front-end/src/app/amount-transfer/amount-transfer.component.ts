import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/alert';
import { HomeService } from '@app/home/home.service';

@Component({
  selector: 'app-amount-transfer',
  templateUrl: './amount-transfer.component.html',
  styleUrls: ['./amount-transfer.component.scss']
})
export class AmountTransferComponent {

  currentBalance = '';
  isLoading = false;
  userAccounts = [] as any;
  transactionAmountError = 'Transaction Amount is required';

  amountTransferForm!: FormGroup

  constructor(private homeService: HomeService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
      this.createForm();
      this.getAccounts();
  }

  getBalance() {
    this.homeService.getbalance(this.amountTransferForm.value.fromAccId).subscribe((response: any)=> {
      if (response && response.data) {
        this.currentBalance = response.data || '';
      }
    }, (error: any) => {
      this.alertService.error('Error getting user current balance', {autoClose: true});
    })
  }

  validateAmount() {
    if (this.amountTransferForm.value.transactionAmount > this.currentBalance) {
      this.amountTransferForm.controls['transactionAmount'].setErrors({'incorrect': true});
      this.transactionAmountError = 'Transfer amount is greater than current balance';
    }
  }

  transferAmount() {
    this.isLoading = true;

    const transferDetails = {
      from_acc_id: this.amountTransferForm.value.fromAccId,
      to_acc_id: this.amountTransferForm.value.toAccId,
      transaction_amount: this.amountTransferForm.value.transactionAmount 
    }

    if (transferDetails.transaction_amount > this.currentBalance) {
      this.isLoading = false;
      this.amountTransferForm.controls['transactionAmount'].setErrors({'incorrect': true});
      this.transactionAmountError = 'Transfer amount is greater than current balance';

    } else {
      this.homeService.transferAmount(transferDetails).subscribe((response: any) => {
        this.isLoading = false;
        this.alertService.success('Transaction Successfull', {autoClose: true});

      }, () => {
        this.alertService.error('Error in transferring amount to beneficiary account', {autoClose: true});
        this.isLoading = false;
      });
    }
  }

  resetDetails() {
    this.amountTransferForm.reset();
    this.currentBalance = '';
  }

  private getAccounts() {
    this.homeService.getAccounts().subscribe((response: any) => {
      if (response && response.data) {
        this.userAccounts = response.data || [];
      } else {
        this.alertService.error('Error in getting user accounts', {autoClose: true});
      }
    }, (error: any) => {
      this.alertService.error('Error in getting user accounts', {autoClose: true});
    })
  }

  private createForm() {
    this.amountTransferForm = this.formBuilder.group({
      fromAccId: ['', Validators.required],
      toAccId: ['', Validators.required],
      transactionAmount: ['', Validators.required],
    });
  }

}