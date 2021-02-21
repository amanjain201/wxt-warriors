import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string, stringSize?: number): string {
    stringSize = 28;
    let modifiedText: string;
    if (value.length > stringSize) {
      modifiedText = value.substring(0, stringSize-1);
      modifiedText = modifiedText + "..."
    } else {
      modifiedText = value;
    }

    return modifiedText;
  }

}
