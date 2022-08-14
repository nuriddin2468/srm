import { A } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/services/database.service';
import { UserTable } from '@shared/interfaces/database';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  user?: UserTable;

  constructor() { }
}
