import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Book } from "../model/book.model";

@Injectable()
export class SubjectService {

    searchCriteria: BehaviorSubject<any> = new BehaviorSubject<any>({query: ''});
    books: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

    constructor(private http: Http) {}
    
    getBooks(query): Observable<any> {
        let url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        return this.http.get(url)
            .map(resp => {
                let json = resp.json();
                this.books.next(json.items);
                return json;
            })
            .catch((err) => {
                this.books.next([]);
                return Observable.throw(err);
            });
    }
}