import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB('locale');
  }
}
