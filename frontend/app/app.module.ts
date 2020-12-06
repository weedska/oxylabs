import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';
 
import { FbInit } from './init/fb.service'

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { PostTextPipe } from './pipes/post-text.pipe';
import { PhotoTextPipe } from './pipes/photo-text.pipe';
import { FollowerTextPipe } from './pipes/follower-text.pipe';
import { DateFormatAgoPipe } from './pipes/date-format-ago.pipe';
import { StarProfileComponent } from './star-profile/star-profile.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




const routes: Routes = [{
  path: 'login',
  component: UserAuthComponent,
},
{
  path: 'dashboard',
  component: AppComponent,
},
{
  path: '',
  redirectTo: '',
  pathMatch: 'full'
}];

export function tokenGetter() {
  return localStorage.getItem('id_token');
}


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PostTextPipe,
    PhotoTextPipe,
    FollowerTextPipe,
    DateFormatAgoPipe,
    StarProfileComponent,
    UserAuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        headerName: 'x-auth-token'

      }
    })
  ],
  exports: [
    RouterModule
  ],

  providers: [{ provide: APP_INITIALIZER, useFactory: FbInit, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

