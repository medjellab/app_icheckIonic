import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { api } from 'src/shared';

@Injectable({
    providedIn: 'root'
})
export class EnginService {

    constructor(private http: HttpClient) { }

    getEngins(): Observable<any[]> {
        return this.http.get<any[]>(`${api}engins`)
            .pipe(
                tap(_ => this.log('Get Engins')),
                catchError(error => this.handleError('Get Engins', []))
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