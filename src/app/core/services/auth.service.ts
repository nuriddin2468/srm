import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '@app/core/services/current-user.service';
import { DatabaseService } from '@app/core/services/database.service';
import { UserTable } from '@shared/interfaces/database/user.table';
import { catchError, from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private db: DatabaseService,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {
    this.getFromDBCurrentUser();
  }

  signIn(username: string, password: string): Observable<boolean> {
    return from(this.db.instance.get<UserTable>(`user_${username}`))
      .pipe(
        catchError((err) => of(false)
        ),
        map(res => {
          if(typeof res === 'boolean') { return false }
          if (password === res.password) {
            this.setCurrentUser(res);
            return true;
          }
          return false;
        })
      );
  }

  setCurrentUser(res: UserTable): void {
    this.currentUserService.user = res;
    this.db.instance.put({
      ...res,
      _rev: undefined,
      _id: '_local/currentUser',
    }).then();
  }

  getFromDBCurrentUser(): void {
    this.db.instance.get<UserTable>('_local/currentUser').then(res => {
      return this.db.instance.get<UserTable>(`user_${res.username}`)
    }).then(res => {
      this.currentUserService.user = res;
      this.router.navigate(['/']);
    });
  }

}
