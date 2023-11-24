import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { configChat } from '../config-chat';

@Injectable({
  providedIn: 'root'
})
export class TelegramMessageService {
  public apiUrl = `https://api.telegram.org/bot${configChat.bot_token}`;

  constructor(private http: HttpClient) {}

  public sendMessage(text: string): Observable<any> {
    const url = `${this.apiUrl}/sendMessage`;
    const payload = {
      chat_id: configChat.chat_id,
      text: text
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, payload, { headers: headers });
  }
}
