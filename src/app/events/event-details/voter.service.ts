import { Injectable } from '@angular/core';
import { ISessions } from '../shared/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class VoterService {
  constructor(private http: HttpClient) {}
  deleteVoter(eventId: number, session: ISessions, voterName: string) {
    this.http
      .delete(this.getEndpoint(eventId, session.id, voterName))
      .pipe(catchError(this.handleError('deleteVoter')))
      .subscribe();
  }

  addVoter(eventId: number, session: ISessions, voterName: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': '/application/json' })
    };
    this.http
      .post(this.getEndpoint(eventId, session.id, voterName), {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  userHasVoted(
    eventId: number,
    session: ISessions,
    voterName: string
  ): boolean {
    return session.voters.some(voter => voter === voterName);
  }

  private getEndpoint(
    eventId: number,
    sessionId: number,
    voterName: string
  ): string {
    return `/api/events/${eventId}/sessions/${sessionId}/voters/${voterName}`;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
