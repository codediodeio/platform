import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private notesCollection: AngularFirestoreCollection<any>;
  public notes: Observable<any[]>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.notesCollection = this.afs.collection('notes');
    this.notes = this.notesCollection.valueChanges();
  }
}
