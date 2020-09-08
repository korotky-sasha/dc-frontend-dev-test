import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: "htmlSanitize",
})
export class HtmlSanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string, args?: any): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
}
