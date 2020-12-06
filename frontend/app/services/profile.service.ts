import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private firstUrl = 'https://www.pprzzi.com:8000/'
  private userUrl = `${this.firstUrl}users/users/user_detail/`

  private headers = new HttpHeaders({
    
    'Content-type': 'application/json',
    Authorization: ''
  });

  constructor(
    private httpClient: HttpClient
  ) { }

  getProfileData() {
    return this.httpClient.get(this.userUrl, {headers: this.headers}).toPromise()
  };
  }