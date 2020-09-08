import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { MessageService } from "./services/message.service";
import { HtmlSanitizePipe } from "./pipes/html-sanitize.pipe";

@NgModule({
  declarations: [AppComponent, HtmlSanitizePipe],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
