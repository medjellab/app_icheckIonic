import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { api } from 'src/shared';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${api}users`)
            .pipe(
                tap(_ => this.log('Get User')),
                catchError(this.handleError('Get User', []))
            );
    }

    addUser(user) {
        return this.http.post(`${api}users`, user)
            .pipe(
                tap(_ => this.log('Get User')),
                catchError(this.handleError('Get User', []))
            );
    }

    updateUser(user) {
        return this.http.put(`${api}users/${user.id}`, user)
        .pipe(
            tap(_ => this.log('Update User')),
            catchError(this.handleError('Update User', []))
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