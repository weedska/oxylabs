import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postText'
})
export class PostTextPipe implements PipeTransform {

  transform(value: number): string {
    if(value === 1) {
      return `${value} post`
    }
    else {
      return `${value} posts`
    }
  }

}
