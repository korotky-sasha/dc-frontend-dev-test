import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { MessageService } from "./services/message.service";
import { Message } from "./models/models";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "dc-frontend-dev-test";
  messages$: Observable<Message[]>;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages$ = this.messageService.getMessages();
  }
}
