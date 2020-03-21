import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { api } from 'src/shared';

@Injectable({
    providedIn: 'root'
})
export class VehiculeService {

    constructor(private http: HttpClient) { }

    getVehicules(): Observable<any[]> {
        return this.http.get<any[]>(`${api}vehicules`)
            .pipe(
                tap(_ => this.log('Get Vehicules')),
                catchError(this.handleError('Get Vehicules', []))
            );
    }

    addVehicule(vehicule) {
        return this.http.post(`${api}vehicules`, vehicule)
            .pipe(
                tap(_ => this.log('Get vehicules')),
                catchError(this.handleError('Get vehicules', []))
            );
    }

    updateVehicule(vehicule) {
        return this.http.put(`${api}vehicules/${vehicule.id}`, vehicule)
        .pipe(
            tap(_ => this.log('Update vehicules')),
            catchError(this.handleError('Update vehicules', []))
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