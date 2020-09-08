import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  messages: Message[];
  editForm: FormGroup;
  isModal = false;
  modalTitle: string;
  body = "";
  selectedMessageIndex: number;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMessages();
    this.buildForm();
  }

  getMessages() {
    this.messages$ = this.messageService.getMessages();
    this.messages$.subscribe((value) => {
      this.messages = value;
    });
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      heading: ["", [Validators.required]],
      subHeading: ["", [Validators.required]],
      active: [false, [Validators.required]],
    });
  }

  submit() {
    // @ts-ignore
    this.body = tinymce.get("tinymceeditor").save();
    let newMessage = this.messages[this.selectedMessageIndex];
    newMessage = {
      ...newMessage,
      Heading: this.editForm.value.heading,
      SubHeading: this.editForm.value.subHeading,
      IsActive: this.editForm.value.active,
      Body: this.body,
      Date: new Date(),
    };
    if (this.selectedMessageIndex || this.selectedMessageIndex === 0) {
      this.messages[this.selectedMessageIndex] = newMessage;
    } else {
      this.messages.push(newMessage);
    }
    this.closeModal();
  }

  openModal(initialValue?: Message, index?: number) {
    this.isModal = true;
    this.modalTitle = index || index === 0 ? "Edit message" : "Add new message";
    if (index || index === 0) {
      this.body = initialValue.Body;
      this.selectedMessageIndex = index;
      this.editForm.setValue({
        heading: initialValue.Heading,
        subHeading: initialValue.SubHeading,
        active: initialValue.IsActive,
      });
      // @ts-ignore
      tinymce.get("tinymceeditor").setContent(this.body);
    } else {
      this.body = "";
      this.selectedMessageIndex = null;
      this.editForm.setValue({
        heading: "",
        subHeading: "",
        active: "",
      });
      // @ts-ignore
      tinymce.get("tinymceeditor").setContent(this.body);
    }
  }

  closeModal() {
    this.isModal = false;
  }
}
