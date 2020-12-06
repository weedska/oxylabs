import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private firstUrl = 'https://www.pprzzi.com:8000/'
  private baseUrl = `${this.firstUrl}posts/posts/`
  private savedPostsListUrl = `${this.firstUrl}users/saved_posts/`
  private saveUrl = `${this.firstUrl}users/saved_posts/`
  private followUserUrl = `${this.firstUrl}users/followers/`
  private followStarUrl = `${this.firstUrl}star/followers/`

  private headers = new HttpHeaders({
    
    'Content-type': 'application/json',
    Authorization: ''
  });

  constructor(
    private httpClient: HttpClient
  ) { }

  getFeed() {
    return this.httpClient.get(this.baseUrl, {headers: this.headers}).toPromise()
  };

  getSave(id) {
    return this.httpClient.get(`${this.savedPostsListUrl}${id}/user_saved`, {headers: this.headers}).toPromise()
  };

  saveRemove(id) {
    return this.httpClient.post(`${this.saveUrl}${id}/save/`, {}, {headers: this.headers}).toPromise()
  };

  checkFollowUser(id) {
    return this.httpClient.get(`${this.followUserUrl}${id}/is_following`, {headers: this.headers}).toPromise()
  };

  followUser(id) {
    return this.httpClient.post(`${this.followUserUrl}${id}/follow/`, {}, {headers: this.headers}).toPromise()
  };

  checkFollowStar(id) {
    return this.httpClient.get(`${this.followStarUrl}${id}/is_following`, {headers: this.headers}).toPromise()
  };

  followStar(id) {
    return this.httpClient.post(`${this.followStarUrl}${id}/follow/`, {}, {headers: this.headers}).toPromise()
  };
  }
