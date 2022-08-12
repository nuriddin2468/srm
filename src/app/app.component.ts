import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './core/services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'personal';

  constructor(
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.db.log();
  }
}
