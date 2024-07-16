import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  userId: number,
  username: string;
  userTypeId: number,
  genderId: number,
  dob: string,
  address: string,
  state: string,
  country: string,
  pincode: string,
  email: string
  remember?: boolean;
  token?: string
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  // login(context: LoginContext): Observable<Credentials> {
  //   // Replace by proper authentication call
  //   const data = {
  //     username: context.username,
  //     token: '123456',
  //   };
  //   this.credentialsService.setCredentials(data, context.remember);
  //   return of(data);
  // }
  
  login(context: LoginContext) {
    context.token = '123456';
    // Replace by proper authentication call
    this.credentialsService.setCredentials(context, context.remember);
  }


  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
