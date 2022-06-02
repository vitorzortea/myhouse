import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/servicefirebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService extends ServiceFirebase<Table> {

  constructor(firestore: AngularFirestore) {
    super(Table, firestore, 'table');
  }
}
