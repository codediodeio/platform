import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HigherOrderFirestoreService } from './firestore/services/ho-firestore.service';


interface Note {
  content: string;
  size: string;
}


@Component({
  selector: 'mh-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  private notesCollection: AngularFirestoreCollection<any>;
  // public notes: Observable<any[]>;

  public notes: Observable<Note[]>;


  constructor(private hoAfs: HigherOrderFirestoreService) {}

  ngOnInit() {
    // this.notesCollection = this.afs.collection('notes');
    // this.notes = this.notesCollection.valueChanges();

  }
}
