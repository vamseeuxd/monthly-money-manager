import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {BehaviorSubject, map, Observable, of, Subject, tap} from 'rxjs';
import {IUser} from "./value-objects/Iuser.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private _logInUser: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  get logInUser() {
    return this._logInUser.asObservable();
  }

  constructor(
    private router: Router,
    public http: HttpClient,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.logInUser.pipe(map(d => (!!d)));
  }

  isLogin(): Observable<{ data: IUser, message: string }> {
    return this.http.get<{ data: IUser, message: string }>('api/isLogin').pipe(tap(data => {
      this._logInUser.next(data.data);
    }));
  }

  register(data: IUser): Observable<{ data: IUser, message: string }> {
    return this.http.post<{ data: IUser, message: string }>('api/users', {...data});
  }

  login(email: string, password: string): Observable<{ data: IUser, message: string }> {
    return this.http.post<{ data: IUser, message: string }>('api/login', {email, password}).pipe(tap(data => {
      this._logInUser.next(data.data);
    }))
  }

  logout(): Observable<boolean> {
    const isConfirm = confirm('Are you sure! Do you want to logout?');
    if (isConfirm) {
      return this.http.post<any>('api/logout', {}).pipe(map(d => true)).pipe(tap(data => {
        this._logInUser.next(null);
      }))
    } else {
      return of(false);
    }
  }
}
