import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
