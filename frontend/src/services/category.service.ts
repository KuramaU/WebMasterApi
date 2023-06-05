import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from 'rxjs';
import { Category } from "src/app/app.component";

@Injectable({ providedIn: 'root' })

export class CategoryService
{
    constructor(private http: HttpClient) { }

    private url = 'https://localhost:5000/api/Category/categories';

    getCategories(): Observable<any> {
        return this.http.get(this.url)
            .pipe(
                tap(_ => console.log('fetched categories')),
                catchError(this.handleError<Category[]>('getCategories', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead

            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        }
    }

}