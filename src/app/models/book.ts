export class Book {

  title: string;
  classification: string;
  year: number;
  authorId: number;

  constructor() {
    this.title = '';
    this.classification = '';
    this.year = null;
    this.authorId = null;
  }
}
