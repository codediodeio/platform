import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HigherOrderFirestoreService } from './firestore/services/ho-firestore.service';

interface Note {
  content: string;
  size: string;
}

const FACTS_URL = 'https://non-ssr-angular.firebaseio.com/facts.json';

@Component({
  selector: 'mh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private notesCollection: AngularFirestoreCollection<any>;
  // public notes: Observable<any[]>;
  public ref: AngularFirestoreCollection<Note>;
  public notes: Observable<Note[]>;
  public facts: Observable<any>;

  constructor(private http: HttpClient, private hoAfs: HigherOrderFirestoreService) {}

  ngOnInit() {
    // this.notesCollection = this.afs.collection('notes');
    // this.notes = this.notesCollection.valueChanges();
    console.log(this.hoAfs.inspectCol('notes'));
    this.facts = this.http.get(FACTS_URL);
  }
}
