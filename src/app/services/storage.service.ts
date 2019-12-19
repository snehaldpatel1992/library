import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap } from 'idb';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  db: any;

  constructor() { }


  async createDB() {
    this.db = await openDB('Library System', 1, {
      upgrade(upgradeDB) {
        const store = upgradeDB.createObjectStore('books', {
          keyPath: 'id',
          autoIncrement: true,
        });
      },
    });
  }

  async initDataStore() {
      const tx = this.db.transaction('books', 'readwrite');

      tx.store.add({
        title: 'Rich dad poor dad', classification: 'Business and Finance', year: '2019'
      });
      tx.store.add({
        title: 'Zero to one', classification: 'Business and Finance', year: '2019'
      });
      tx.store.add({
        title: 'Business @ the speed of thought', classification: 'Business and Finance', year: '2019'
      });
      tx.store.add({
        title: 'Emotional Intelligence', classification: 'Business and Finance', year: '2019'
      });
      tx.store.add({
        title: 'Think and grow rich', classification: 'Business and Finance', year: '2019'
      });
      tx.store.add({
        title: 'Elon Musk: Tesla, Spacex, And The Quest For A Fantastic Future', classification: 'Biography', year: '2019'
      });

      await tx.done;
  }

  async getAll() {
    return await this.db.getAll('books');
  }


  async add() {
    await this.db.add('books', {
      title: 'Rich dad poor dad', classification: 'Business and Finance', year: '2019'
    });
  }

  async edit() {
    await this.db.put('books', {
      title: 'Rich dad poor dad1', classification: 'Business and Finance', year: '2019', id: 1
    });
  }

  async delete() {
    await this.db.delete('books', 1);
  }


}
