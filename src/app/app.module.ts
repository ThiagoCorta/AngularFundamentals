import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { CollapsibleWellComponent } from "./common/collapsible-well.component";
import { JQUERY_TOKEN } from "./common/jQuery.service";
import { ModalTriggerDirective } from "./common/modalTrigger.directive";
import { SimpleModalComponent } from "./common/simpleModal.component";
import { Toastr, TOASTR_TOKEN } from "./common/toastr.service";
import { Error404Component } from "./errors/404.component";
import { EventsAppComponent } from "./events-app.component";
import { CreateEventComponent } from "./events/create-event.component";
import { LocationValidatorDirective } from "./events/directive/locationValidator.directive";
import { CreateSessionComponent } from "./events/event-details/create-session.component";
import { EventDetailComponent } from "./events/event-details/event-details.component";
import { SessionListComponent } from "./events/event-details/sessionList/session-list.component";
import { UpvoteComponent } from "./events/event-details/upvote/upvote.component";
import { VoterService } from "./events/event-details/voter.service";
import { EventListResolver } from "./events/event-list-resolver.service";
import { EventResolver } from "./events/event-resolver.service";
import { EventThumbnailComponent } from "./events/event-thumbnail.component";
import { EventListComponent } from "./events/events-list.component";
import { DurationPipe } from "./events/shared/duration.pipe";
import { EventService } from "./events/shared/event.service";
import { NavBarComponent } from "./nav/navbar.component";
import { appRoutes } from "./routes";
import { AuthService } from "./user/service/auth.service";

const toastr: Toastr = window["toastr"];
const jQuery = window["$"];
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidatorDirective
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQUERY_TOKEN, useValue: jQuery },

    EventListResolver,
    {
      provide: "canDeactivateCreateEvent",
      useValue: checkDirtyState
    },
    EventListResolver,
    EventResolver,
    AuthService,
    VoterService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm(
      "No guardaste el evento, seguro que queres cancelar?"
    );
  }
  return true;
}
