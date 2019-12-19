import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';

export interface Book {
  id: number;
  title: string;
  classification: string;
  year: string;
}

const ELEMENT_DATA: Book[] = [
  { id: 1, title: 'Rich dad poor dad', classification: 'Business and Finance', year: '2019' },
  { id: 2, title: 'Zero to one', classification: 'Business and Finance', year: '2019' },
  { id: 3, title: 'Business @ the speed of thought', classification: 'Business and Finance', year: '2019' },
  { id: 4, title: 'Emotional Intelligence', classification: 'Business and Finance', year: '2019' },
  { id: 5, title: 'Think and grow rich', classification: 'Business and Finance', year: '2019' },
  { id: 6, title: 'Elon Musk: Tesla, Spacex, And The Quest For A Fantastic Future', classification: 'Biography', year: '2019' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'classification', 'year'];
  dataSource;

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    await this.storageService.createDB();
    this.dataSource = await this.storageService.getAll();
    await this.storageService.edit();
    this.dataSource = await this.storageService.getAll();
    await this.storageService.delete();
    this.dataSource = await this.storageService.getAll();
    // await this.storageService.add();
    // await this.storageService.initDataStore();
    this.dataSource = await this.storageService.getAll();
  }

}
