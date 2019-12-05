import { Injectable } from "@angular/core";
import { IUser } from "../models/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";

@Injectable()
export class AuthService {
  public currentUser: IUser;
  constructor(private http: HttpClient) {}
  loginUser(userName: string, password: string) {
    const loginInfo = { username: userName, password };
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http
      .post("/api/login", loginInfo, options)
      .pipe(
        tap(data => {
          this.currentUser = data["user"] as IUser;
        })
      )
      .pipe(
        catchError(err => {
          return of(false);
        })
      );
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  checkAutheticationStatus() {
    this.http
      .get("/api/currentIdentity")
      .pipe(
        tap(data => {
          if (data instanceof Object) {
            this.currentUser = data as IUser;
          }
        })
      )
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    return this.http.put(
      `/api/users/${this.currentUser.id}`,
      this.currentUser,
      options
    );
  }

  logout(): Observable<any> {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    this.currentUser = undefined;
    return this.http.post("/api/logout", {}, options);
  }
}
