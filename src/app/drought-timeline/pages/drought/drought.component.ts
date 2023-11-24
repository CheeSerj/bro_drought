import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TelegramMessageService } from '../../services/telegram-message.service';
import {interval, Observable} from "rxjs";
import {map, shareReplay, startWith} from "rxjs/operators";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-drought',
  templateUrl: './drought.component.html',
  styleUrls: ['./drought.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DroughtComponent implements OnInit {
  public basicInputStr = ''
  constructor(
    private telegramMessageService: TelegramMessageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.checkTimeAndSendMessage();
    }, 60000);
  }

  public checkTimeAndSendMessage() {
    const now = new Date();
    const moscowTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
    if (moscowTime.getHours() === 0 && moscowTime.getMinutes() === 0) {
      this.sendMessageAboutDrought();
    } else {
      return;
    }
  }

  public getDroughtDays(): number {
    const dateStart = new Date('2023-11-18');
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - dateStart.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  public sendMessageAboutDrought() {
    const message = `Дней в завязке - ${this.getDroughtDays()}`;
    this.telegramMessageService.sendMessage(message).subscribe(
      response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Сообщение отправленно',
          detail: `${response.result.text}`,
          key: 'app'
        });
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка запроса',
          detail: `${error.error.description}  ${error.error.error_code}`,
          key: 'app'
        });
      }
    );
  }

  public sendCustomMessage(inputStr: string){
    this.telegramMessageService.sendMessage(inputStr).subscribe(
      response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Сообщение отправленно',
          detail: `${response.result.text}`,
          key: 'app'
        });
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка запроса',
          detail: `${error.error.description}  ${error.error.error_code}`,
          key: 'app'
        });
      }
    );
  }

  public isMoscowDate: Observable<Date> = interval(1000).pipe(
    startWith(''),
    map(() => {
      const UTC_HOUR = new Date().getUTCHours();
      const MOSCOW_DATE = new Date();
      MOSCOW_DATE.setHours(UTC_HOUR + 3);
      return MOSCOW_DATE;
    }),
    shareReplay()
  );

  public isLocalDate: Observable<Date> = interval(1000).pipe(
    startWith(''),
    map(() => new Date()),
    shareReplay()
  );
}
