import { Injectable } from '@angular/core';
import { ResponseItem, TableItem } from '@app/models/table-item';

@Injectable({
  providedIn: 'root'
})
export class ResponseProcessingService {

  constructor() { }

  formatResponse(response: ResponseItem): ResponseItem {
    const formattedResponse: ResponseItem = { ...response }; // Copy original response
  
    // Mapping object for property names
    const propertyMapping: { [key: string]: string } = {
      acc_id: 'Account ID',
      acc_type_id: 'Account Type ID',
      address: 'Address',
      balance: 'Balance',
      bank_id: 'Bank ID',
      cif: 'CIF',
      country: 'Country',
      dob: 'DOB',
      email: 'Email',
      first_name: 'First Name',
      gender_id: 'Gender ID',
      last_name: 'Last Name',
      passwd: 'Password',
      pincode: 'Pincode',
      state: 'State',
      user_id: 'User ID',
      user_type_id: 'User Type ID',
      username: 'Username',
      fraud_category: 'Fraud Category',
      fraud_score: 'Fraud Score',
      from_acc_id: 'From Account ID',
      status_type_id: 'Status Type ID',
      to_acc_id: 'To Account ID',
      tran_date: 'Transaction Date',
      tran_type_id: 'Transaction Type ID',
      transaction_amount: 'Transaction Amount',
      transaction_id: 'Transaction ID'
    };
  
    // Add table headers to the formatted response as an object
    const tableHeaders: { [key: string]: string } = {};
    const firstDataSection = formattedResponse.sections.find(section => section.type === 'table')?.data[0];
    if (firstDataSection) {
      Object.keys(firstDataSection[0]).forEach(key => {
        if (propertyMapping[key]) {
          tableHeaders[key] = propertyMapping[key];
        }
      });
    }
  
    formattedResponse.sections.unshift({
      data: tableHeaders,
      type: 'table_headers'
    });
  
    return formattedResponse;
  }
}
