import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { SubjectService } from "./subject.service";
import { Book } from "../model/book.model";

@Component({
    template: `
        <h2>Behavior Subject</h2>

        <input type="text" [(ngModel)]="query" (ngModelChange)="onQuery($event)">

        <p-dataTable [value]="service.books | async">
            <p-column *ngFor="let col of cols" [field]="col.field" [header]="col.header"></p-column>
            <p-column field="smallThumbnail" header="Small Thumbnail">
                <ng-template let-col let-book="rowData" pTemplate="body">
                    <img src="{{book.volumeInfo.imageLinks[col.field]}}" *ngIf="book.volumeInfo.imageLinks">
                </ng-template>
            </p-column>
        </p-dataTable>
    `,
    providers: [SubjectService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectComponent implements OnDestroy {

    books: Book[];
    cols: any[];

    query: string = '';

    constructor(private service: SubjectService, private ref: ChangeDetectorRef) {
        this.cols = [
            {field: 'volumeInfo.title', header: 'Title'},
            {field: 'saleInfo.listPrice.amount', header: 'Amount'},
            {field: 'searchInfo.textSnippet', header: 'Text Snippet'}
        ];

        // Restore state
        this.books = service.books.getValue();
        let savedCriteria = service.searchCriteria.getValue();
        this.query = savedCriteria.query;

        console.info(savedCriteria);

        setTimeout(()=>{
            ref.markForCheck();
        });
    }

    onQuery(query) {
        if (query && query.length >= 3) {
            this.service.getBooks(query);
        }
    }

    ngOnDestroy() {
        this.service.searchCriteria.next({query: this.query});
        console.info(this.service.searchCriteria.getValue())
    }

}