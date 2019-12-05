import { Component, OnInit, AfterViewInit } from "@angular/core";
import { AuthService } from "../user/service/auth.service";
import { ISessions, IEvent } from "../events/shared/event.model";
import { EventService } from "../events/shared/event.service";

@Component({
  selector: "app-nav",
  templateUrl: "./navbar.component.html",
  styles: [
    `
      .nav.navbar-nav {
        font-size: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }

      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }
      li > a.active {
        color: #f97924;
      }
    `
  ]
})
export class NavBarComponent implements AfterViewInit {
  public searchTerm = "";
  public foundSessions: ISessions[];
  public events: IEvent[];
  constructor(public auth: AuthService, private eventService: EventService) {}

  ngAfterViewInit() {
    this.eventService.getEvents().subscribe(event => {
      this.events = event;
    });
  }

  searchSesssions(searchTerm: string) {
    this.eventService.searchSessions(this.searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    });
  }
}
