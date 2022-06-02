import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/servicefirebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends ServiceFirebase<Session> {

  constructor(firestore: AngularFirestore) {
    super(Session, firestore, 'session');
  }
}
