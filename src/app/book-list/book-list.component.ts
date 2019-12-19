import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BookEditDialogComponent } from '../book-edit-dialog/book-edit-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  @Input() books;
  displayedColumns: string[] = ['id', 'title', 'classification', 'year', 'edit'];

  constructor(
    public dialog: MatDialog
  ) {}

  onEdit(book) {
    this.dialog.open(BookEditDialogComponent, {
      width: '400px',
      data: {
        title: 'Edit book',
        edit: true,
        book
      }
    });
  }

}
