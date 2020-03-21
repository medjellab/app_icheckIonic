import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { api } from 'src/shared';

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    constructor(private http: HttpClient) { }

    getStats(): Observable<any[]> {
        return this.http.get<any[]>(`${api}stats`)
            .pipe(
                tap(_ => this.log('Get Stats')),
                catchError(this.handleError('Get Stats', []))
            );
    }

    getStatsBySite(site: string) : Observable<any[]> {
        return this.http.get<any[]>(`${api}stats/${site}`)
      .pipe(
        tap(_ => this.log('stats by site on month')),
        catchError(this.handleError('stats by site on month', []))
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