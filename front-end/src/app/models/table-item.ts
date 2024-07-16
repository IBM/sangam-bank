export interface TableItem {
  // Common properties
  acc_id?: number;
  acc_type_id?: number;
  address?: string;
  balance?: number;
  bank_id?: number;
  cif?: string;
  country?: string;
  dob?: string | null;
  email?: string;
  first_name?: string;
  from_acc_id?: number;
  gender_id?: number;
  passwd?: string;
  pincode?: string;
  last_name?: string;
  state?: string;
  status_type_id?: number;
  to_acc_id?: number;
  tran_date?: string;
  tran_type_id?: number;
  user_id?: number;
  user_type_id?: number;
  username?: string;

  // Properties specific to fraudulent data
  fraud_score?: number;
  transaction_amount?: number;
  transaction_id?: number;
}

  // Interface for the content section within a response item
  export interface ContentSection {
    data: string | TableItem[] | { [key: string]: string };
    type: string;
  }
  
  
  export interface ResponseItem {
    sections: ContentSection[];
    type: string;
  }