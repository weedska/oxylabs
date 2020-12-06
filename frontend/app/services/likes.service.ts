import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private firstUrl = 'https://www.pprzzi.com:8000/'
  private feedUrl = `${this.firstUrl}posts/posts/`
  private commentUrl = `${this.firstUrl}posts/comments/`

  private headers = new HttpHeaders({
    
    'Content-type': 'application/json',
    Authorization: ''
  });

  constructor(
    private httpClient: HttpClient
  ) { }

  getPost(id) {
    return this.httpClient.get(`${this.feedUrl}${id}`, {headers: this.headers}).toPromise()
  };

  checkLike(id) {
    return this.httpClient.get(`${this.feedUrl}${id}/user_liked/`, {headers: this.headers}).toPromise()
  };

  checkDislike(id) {
    return this.httpClient.get(`${this.feedUrl}${id}/user_disliked/`, {headers: this.headers}).toPromise()
  };

  like(id) {
    return this.httpClient.post(`${this.feedUrl}${id}/like/`, {}, {headers: this.headers}).toPromise()
  };

  dislike(id) {
    return this.httpClient.post(`${this.feedUrl}${id}/dislike/`, {}, {headers: this.headers}).toPromise()
  };

  checkCommentLike(id) {
    return this.httpClient.get(`${this.commentUrl}${id}/user_liked/`, {headers: this.headers}).toPromise()
  };

  checkCommentDislike(id) {
    return this.httpClient.get(`${this.commentUrl}${id}/user_disliked/`, {headers: this.headers}).toPromise()
  };
  }
