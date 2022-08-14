import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { CurrentUserService } from '@app/core/services/current-user.service';
import { ConfigTable } from '@shared/interfaces/database';
import { UserTable } from '@shared/interfaces/database/user.table';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly db: PouchDB.Database;
  private readonly remoteDBLink = 'http://localhost:5984/';
  private readonly localeLink = 'locale';

  constructor(
    private currentUserService: CurrentUserService
  ) {
    this.db = new PouchDB(this.localeLink);
    this.syncDB();
    this.createBasicDocuments();
  }

  get instance(): PouchDB.Database {
    return this.db;
  }

  private createBasicDocuments(): void {
    this.generateUsers();
    this.generateConfigPerUser('admin');
  }

  generateConfigPerUser(username: string): void {
    this.db.get(`config_${username}`).catch(err => {
      const userConfig: ConfigTable = {
        _id: `config_${username}`,
        lastSyncDate: null
      }
      this.db.put(userConfig);
    });
  }

  private generateUsers(): void {
    this.db.get('user_admin').catch(err => {
      if (err.name === 'not_found') {
        const userDoc: UserTable = {
          _id: 'user_admin',
          username: 'admin',
          password: 'admin',
          role: 0
        };
        this.db.put(userDoc);
      }
    });
  }

  private syncDB(): void {
    this.db.sync(`${this.remoteDBLink}${this.localeLink}`, {
      live: true,
      retry: true,
    })
      .on('active', () => {
        console.log('DB connection active')
        this.updateSyncTime();
      })
      .on('change', (change) => {
        console.log('DB Synced')
        this.updateSyncTime();
    }).on('paused',  (info) => {
      console.log('DB Connection paused');
    }).on('error', function (err) {
      console.log('DB Connection error', err);
    }).on("denied", err => {
      console.log('DB Connection denied', err);
    }).catch(err => console.log('DB Connection error', err));
  }

  private updateSyncTime(): void {
    if (this.currentUserService.user) {
      this.db.get<ConfigTable>(`config_${this.currentUserService.user.username}`).then(conf => {
        conf.lastSyncDate = new Date().getTime();
      })
    }
  }
}
