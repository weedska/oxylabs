import { NodeWithI18n } from '@angular/compiler';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { LikesService } from '../services/likes.service';
import { CommentLikesService } from '../services/comment-likes.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})


export class FeedComponent implements OnInit  {
  now  = Date()
  dateNow = Date.parse(this.now)
  postNow = Date.parse("2020-05-24T14:13:30Z")


  feed: any = [];
  getdata: any;
  profile: any;
  likes = new Map()
  dislikes = new Map()
  followsUser = new Map()
  followsStar = new Map()
  savedList = new Map()
  commentForm;

  constructor(

    private appService: AppService, 
    private formBuilder: FormBuilder,
    private likesService: LikesService,
    private commentLikesService: CommentLikesService,
    private profileService: ProfileService,
    ) 
    
    {
      this.commentForm = this.formBuilder.group({
        comment: '',
      });
    }

  onSubmit(customerData, postid, i) {
    const date = new Date().toISOString();
    const promise = this.commentLikesService.postComment(postid, customerData.comment, date);
      promise
      .then(()=>{
        return this.commentLikesService.getPost(postid);
      }
      )
      .then((data)=>{
        this.feed[i] = data;
      }
      )
    this.commentForm.reset();
    
  }

  ngOnInit(): void {


    this.profileService.getProfileData()
    .then((data)=>{
      this.profile = data;
    }
    )
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
    )


    this.appService.getFeed()
    .then((data)=>{
      this.feed = data;
    }
    )
    .then(()=>{
      this.checkLikesOnInit();
      this.checkUserFallowsOninit();
      this.checkStarFallowsOninit()
      this.checkSavedPostListOnInit()
    }
    )
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
    )
  }


  checkUserFallowsOninit() {
    for (let i in this.feed) {
      this.appService.checkFollowUser(this.feed[i].user.id)
      .then((data)=>{
        this.getdata = data;
        this.followsUser.set(this.feed[i].user.id, this.getdata.follow);
      }
      )
      .catch((error)=>{
        console.log("Promise rejected with " + JSON.stringify(error));
      }
      )
      
  }
  }


  checkStarFallowsOninit() {
    for (let i in this.feed) {
      this.appService.checkFollowStar(this.feed[i].star.id)
      .then((data)=>{
        this.getdata = data;
        this.followsStar.set(this.feed[i].star.id, this.getdata.follow);
      }
      )
      .catch((error)=>{
        console.log("Promise rejected with " + JSON.stringify(error));
      }
    )
  }
  }


  checkLikesOnInit() {
    for (let i in this.feed) {
      this.likesService.checkLike(this.feed[i].id)
      .then((data)=>{
        this.getdata = data;
        this.likes.set(this.feed[i].id, this.getdata.like);
      })
      .then(()=>{
        this.likesService.checkDislike(this.feed[i].id)
        .then((data)=>{
          this.getdata = data;
          this.dislikes.set(this.feed[i].id, this.getdata.dislike);
        })
      })
      .catch((error)=>{
        console.log("Promise rejected with " + JSON.stringify(error));
      }
    )
  }
  }

  checkSavedPostListOnInit() {
    for (let i in this.feed) {
      this.appService.getSave(this.feed[i].id)
      .then((data)=>{
        this.getdata = data;
        this.savedList.set(this.feed[i].id, this.getdata.save);
      }
      )
      .catch((error)=>{
        console.log("Promise rejected with " + JSON.stringify(error));
      }
    )
  }
  }


  checkLike(id) {
    // checking post current user likes status
    this.likesService.checkLike(id)
    .then((data)=>{
      this.getdata = data;
      this.likes.set(id, this.getdata.like)
    }
    )
    .then(()=>{
      return this.likesService.checkDislike(id)
      .then((data)=>{
        this.getdata = data;
        this.dislikes.set(id, this.getdata.dislike)
      }
      )
    }
    )
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
  )
  }


  checkSavedPostsList(id) {
    // checking post or comment current user likes status
    this.appService.getSave(id)
    .then((data)=>{
      console.log(id)
      this.getdata = data;
      this.savedList.set(id, this.getdata.save)
    }
    )
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
  )
  }


  like(id, i) {
    const promise = this.likesService.like(id);
    promise
    .then(()=>{
      return this.checkLike(id);
    })
    .then(()=>{
      return this.likesService.getPost(id);
    })
    .then((data)=>{
      this.feed[i] = data;
      console.log(this.feed)
    })
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
  )
  }


  dislike(id, i) {
    const promise = this.likesService.dislike(id);
    promise
    .then(()=>{
      return this.checkLike(id);
    })
    .then(()=>{
      return this.likesService.getPost(id);
    })
    .then((data)=>{
      this.feed[i] = data;
      console.log(this.feed)
    })
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
  )
  }

  saveRemove(id) {
    this.appService.saveRemove(id)
    .then(()=>{
      this.checkSavedPostsList(id)
      console.log(this.savedList)
    })
  }

  checkFollowUser(id) {
    this.appService.checkFollowUser(id)
    .then((data)=>{
      this.getdata = data;
      this.followsUser.set(id, this.getdata.follow)
    })
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
  )
  }


  followUser(id) {
    const promise = this.appService.followUser(id);
    promise
    .then(()=>{
      return this.checkFollowUser(id);
    })
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
    )
  }
  

  checkFollowStar(id) {
    this.appService.checkFollowStar(id)
    .then((data)=>{
      this.getdata = data;
      this.followsStar.set(id, this.getdata.follow)
    })
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
  )
  }


  followStar(id) {
    const promise = this.appService.followStar(id);
    promise
    .then(()=>{
      return this.checkFollowStar(id);
    })
    .catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    }
    )
  }
  }