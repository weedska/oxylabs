import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatAgo'
})
export class DateFormatAgoPipe implements PipeTransform {

  transform(postDate: string): string {
    const dateNow = Date();
    const milNow = Date.parse(dateNow)
    const minAgo = (milNow - Date.parse(postDate)) / 60000
    if (minAgo < 60) {
      const time = `${Math.round(minAgo)} min ago`
      return time
    }
    if (minAgo > 60 && minAgo < 90) {
      const time = `${Math.round(minAgo/60)} hour ago`
      return time
    }
    if (minAgo > 90 && minAgo < 1440) {
      const time = `${Math.round(minAgo/60)} hours ago`
      return time
    }
    if (minAgo > 1440 && minAgo < 2160) {
      const time = `${Math.round(minAgo/1440)} day ago`
      return time
    }
    if (minAgo > 2160 && minAgo < 525600) {
      const time = `${Math.round(minAgo/1440)} days ago`
      return time
    }
    if (minAgo > 525600 && minAgo < 788400) {
      const time = `${Math.round(minAgo/525600)} year ago`
      return time
    }
    if (minAgo > 788400) {
      const time = `${Math.round(minAgo/525600)} years ago`
      return time
    }
  }

}
