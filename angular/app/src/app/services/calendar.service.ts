import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalendarEvent} from '../model/event.model';
import {AuthService} from './auth.service';
import {User} from '../model/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  constructor(private http: HttpClient,
              private authService: AuthService) {}


  // TODO replace username
  saveEvents(events: CalendarEvent[]) {
    const username = 'test';
    const url = `http://localhost:8762/calendar/${username}/save`;
    return this.http.post<CalendarEvent[]>(url,
      events, {observe: 'response'}).pipe(map(res => {
        return this.createResponseObjects(res.body);
    }));
  }

  getEvents(start: string, end: string, username?: string) {
    if (!username) {
      username = `${this.authService.user.getValue().sub}`;
    }
    const url = `http://localhost:8762/calendar/${username}/${start}/${end}`;
    return this.http.get<CalendarEvent[]>(url, {observe: 'response'})
      .pipe(map(res => {
        return this.createResponseObjects(res.body);
      }));
  }

  deleteEvents(events: CalendarEvent[]) {
    return this.http.post('http://localhost:8762/calendar/delete', events, {observe: 'response'});
  }


  private createResponseObjects(data: CalendarEvent[]) {
    const tmp: CalendarEvent[] = [];
    for (const e of data) {
      tmp.push(new CalendarEvent(e.id, e.title, e.groupId , new Date(e.start), (e.end ? new Date(e.end) : null),
        e.backgroundColor, e.textColor, e.allDay, e.user));
    }
    return tmp;
  }

}
