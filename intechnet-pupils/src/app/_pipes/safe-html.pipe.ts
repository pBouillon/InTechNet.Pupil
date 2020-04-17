import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @summary allow the provided content to bypass Angular sanitizer checks
 */
@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  /**
   * @summary default constructor
   */
  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  /**
   * @summary allow the provided content to bypass Angular sanitizer checks
   * @param value raw HTML to provide
   * @returns the raw HTML
   */
  transform(value: string) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
