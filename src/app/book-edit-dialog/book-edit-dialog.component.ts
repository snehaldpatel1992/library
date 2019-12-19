import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StorageService, StoreNames } from '../services/storage.service';

@Component({
  selector: 'app-book-edit-dialog',
  templateUrl: './book-edit-dialog.component.html',
  styleUrls: ['./book-edit-dialog.component.css']
})
export class BookEditDialogComponent implements OnInit {

  book; authors; title; edit;

  constructor(
    public dialogRef: MatDialogRef<BookEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    const { book , title, edit } = this.data;
    this.book = book;
    this.title = title;
    this.edit = edit;
    this.authors = await this.storageService.getAll(StoreNames.AUTHORS);
  }

  async onSave() {
    if (this.edit) {
      await this.storageService.edit(StoreNames.BOOKS, this.book);
    } else {
      await this.storageService.add(StoreNames.BOOKS, this.book);
    }
    this.dialogRef.close();
  }

  async onDelete() {
    await this.storageService.delete(StoreNames.BOOKS, this.book.id);
    this.dialogRef.close();
  }

}
