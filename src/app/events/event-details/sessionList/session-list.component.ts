import { ISessions } from '../../shared/event.model';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/service/auth.service';
import { VoterService } from '../voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges, OnInit {
  @Input() sessions: ISessions[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number | string;
  public visibleSessions: ISessions[] = [];
  public isLogged: boolean;

  constructor(private auth: AuthService, private voter: VoterService) {}
  ngOnChanges(): void {
    if (!this.sessions) { return; }
    this.filterSessions();
    this.sortVisibleSessions();
  }

  ngOnInit() {
    this.isLogged = this.auth.isAuthenticated();
  }

  sortVisibleSessions() {
    this.sortBy === 'name'
      ? this.visibleSessions.sort(sortByNameAsc)
      : this.visibleSessions.sort(sortyByVotesDesc);
  }

  filterSessions() {
    if (this.filterBy === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(s => {
        return s.level.toLocaleLowerCase() === this.filterBy;
      });
    }
  }

  toggleVote(session: ISessions) {
    const userName = this.auth.currentUser.userName;
    if (!this.userHasVoted(session)) {
      this.voter.addVoter(+this.eventId, session, userName);
    }
    else { this.voter.deleteVoter(+this.eventId, session, userName); }
    if (this.sortBy === 'votes') { this.visibleSessions.sort(sortyByVotesDesc); }
  }

  userHasVoted(session: ISessions) {
    return this.voter.userHasVoted(
      +this.eventId,
      session,
      this.auth.currentUser.userName
    );
  }
}

function sortByNameAsc(s1: ISessions, s2: ISessions): number {
  if (s1.name > s2.name) { return 1; }
  else if (s1.name === s2.name) { return 0; }
  return -1;
}

function sortyByVotesDesc(s1: ISessions, s2: ISessions): number {
  return s2.voters.length - s1.voters.length;
}
