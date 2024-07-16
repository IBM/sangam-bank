import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {
  private apiURL = 'https://watsonx-bankingdemo.apps.cluster-01.generative-ai-power-demos.ibm.net/data';

  constructor(private http: HttpClient) { }

  getAgentResponse(query: string): Observable<any> {
    const url = `${this.apiURL}?query=${encodeURIComponent(query)}`;
    return this.http.get<any>(url);
  }
}
