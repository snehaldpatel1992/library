import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { BehaviorSubject } from 'rxjs';
import { authorDataSet, bookDataSet, libraryDataSet } from '../dataset/index';

export enum StoreNames {
  BOOKS = 'books',
  LIBRARIES = 'libraries',
  AUTHORS = 'authors'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  db: any;
  private storeUpdated = new BehaviorSubject<any>([]);
  public storeUpdated$ = this.storeUpdated.asObservable();

  constructor() { }

  async createDB() {
    this.db = await openDB('Library System', 1, {
      upgrade(upgradeDB) {
        const bookStore = upgradeDB.createObjectStore(StoreNames.BOOKS, {
          keyPath: 'id',
          autoIncrement: true,
        });

        const libraryStore = upgradeDB.createObjectStore(StoreNames.LIBRARIES, {
          keyPath: 'id',
          autoIncrement: true,
        });

        const authorStore = upgradeDB.createObjectStore(StoreNames.AUTHORS, {
          keyPath: 'id',
          autoIncrement: true,
        });
      },
    });
  }

  async initDataStore() {
    let tx;
    if ((await this.getAll(StoreNames.AUTHORS)).length === 0) {
      tx = this.db.transaction(StoreNames.AUTHORS, 'readwrite');
      authorDataSet.forEach(item => {
        tx.store.add(item);
      });
      await tx.done;
    }
    if ((await this.getAll(StoreNames.BOOKS)).length === 0) {
      tx = this.db.transaction(StoreNames.BOOKS, 'readwrite');
      bookDataSet.forEach(item => {
        tx.store.add(item);
      });
      await tx.done;
    }
    if ((await this.getAll(StoreNames.LIBRARIES)).length === 0) {
      tx = this.db.transaction(StoreNames.LIBRARIES, 'readwrite');
      libraryDataSet.forEach(item => {
        tx.store.add(item);
      });
      await tx.done;
    }
  }

  async getAll(storeName) {
    const results = await this.db.getAll(storeName);
    return results;
  }

  async add(storeName, storeItem) {
    await this.db.add(storeName, storeItem);
    this.storeUpdated.next(storeName);
  }

  async edit(storeName, storeItem) {
    await this.db.put(storeName, storeItem);
    this.storeUpdated.next(storeName);
  }

  async delete(storeName, id) {
    await this.db.delete(storeName, id);
    this.storeUpdated.next(storeName);
  }

}
