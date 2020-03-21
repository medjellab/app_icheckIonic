import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { api } from 'src/shared';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {

    constructor(private http: HttpClient) { }

    getHistory(): Observable<any[]> {
        return this.http.get<any[]>(`${api}checklistrefs`)
            .pipe(
                tap(_ => this.log('Get History')),
                catchError(error => this.handleError('Get History', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }

}