import { FirebaseFirestore } from '@firebase/firestore-types';
import { firestoreDB } from 'factories';
import { WebSocket } from 'factories/websocket';
import { DataStore } from './dataStore';
import { UIStore } from './uiStore';

export class RootStore {
  firestoreDB: FirebaseFirestore;

  dataStore: DataStore;

  uiStore: UIStore;

  wsClient: WebSocket;

  constructor() {
    this.firestoreDB = firestoreDB;
    this.dataStore = new DataStore(this);
    this.uiStore = new UIStore(this);
    this.wsClient = new WebSocket();
  }
}
