import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followerText'
})
export class FollowerTextPipe implements PipeTransform {

  transform(value: number): string {
    if(value === 0) {
      return `${value} followers`
    }
    if(value === 1) {
      return `${value} follower`
    }
    else {
      return `${value} followers`
    }
  }

}
