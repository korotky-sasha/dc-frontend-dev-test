import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, pluck } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Message } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get(this.baseUrl + "/getNotification").pipe(
      pluck("message"),
      catchError((err) => {
        console.error(err);
        return [];
      })
    );
  }
}
