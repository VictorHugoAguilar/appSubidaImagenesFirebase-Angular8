import { Component, OnInit } from '@angular/core';
// Acceso a firebase 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { nombre: string; url: string; };

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  private itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {

    this.itemCollection = afs.collection<Item>('img');
    this.items = this.itemCollection.valueChanges();

  }

  ngOnInit() {
  }

}
