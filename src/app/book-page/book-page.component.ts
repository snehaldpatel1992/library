import { Component, OnInit } from '@angular/core';
import { BookEditDialogComponent } from '../book-edit-dialog/book-edit-dialog.component';
import { StorageService, StoreNames } from '../services/storage.service';
import { MatDialog } from '@angular/material';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  books;
  constructor(
    private storageService: StorageService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.storageService.createDB();
    await this.storageService.initDataStore();
    this.books = await this.storageService.getAll(StoreNames.BOOKS);
    this.storageService.storeUpdated$.subscribe(async () => {
      this.books = await this.storageService.getAll(StoreNames.BOOKS);
    });
  }

  onAddNewBook() {
    this.dialog.open(BookEditDialogComponent, {
      width: '400px',
      data: {
        title: 'Add new book',
        edit: false,
        book: new Book()
      }
    });
  }

}
