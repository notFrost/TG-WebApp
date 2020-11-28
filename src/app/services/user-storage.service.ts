import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private key: string = "ng-auth";
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isUserLoggedIn.next(this.isAuthenticated);
  }

  get access_token(): string {
    let user = localStorage.getItem(this.key);

    if (user) {
      let objUser = JSON.parse(user);
      return objUser.token;
    }

    return null;
  }

  get user(): any {
    let user = localStorage.getItem(this.key);

    if (user) {
      let objUser = JSON.parse(user);
      return objUser.user as any;
    }
    return null;
  }

  get token(): string {
    let user = localStorage.getItem(this.key);

    if (user) {
      let objUser = JSON.parse(user);
      return objUser.token;
    }
    return null;
  }

  get type(): string {
    let user = localStorage.getItem(this.key);

    if (user) {
      let objUser = JSON.parse(user);
      return objUser.type;
    }
    return null;
  }

  get isAuthenticated(): boolean {
    return localStorage.getItem(this.key) !== null;
  }

  set(object): void {
    localStorage.setItem(
      this.key,
      JSON.stringify(object)
    );
    this.isUserLoggedIn.next(true);
  }

  destroy(): void {
    this.isUserLoggedIn.next(false);
    localStorage.removeItem(this.key);
  }
}