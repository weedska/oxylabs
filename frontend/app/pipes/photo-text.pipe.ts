import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'photoText'
})
export class PhotoTextPipe implements PipeTransform {

  transform(value: number): string {
    if(value === 1) {
      return `${value} photo`
    }
    else {
      return `${value} photos`
    }
  }

}
