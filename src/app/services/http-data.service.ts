import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Specialist} from '../models/specialist';
import { Session } from '../models/session';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  // Specialist Endpoint
  basePath = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  // Http Default Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  // Create Specialist
  createItem(item): Observable<Specialist> {
    return this.http.post<Specialist>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Specialist by Id
  getItem(id): Observable<Specialist> {
    return this.http.get<Specialist>(`${this.basePath}/specialists/${1}/customers`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Specialist Data
  getList(): Observable<Specialist>{
    return this.http.get<Specialist>(`${this.basePath}/specialists/${1}/customers`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUser(): Observable<Specialist>{
    return this.http.get<Specialist>(`${this.basePath}/specialists/${1}/customers`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getSessionsBySpecialist(specialistId: number): Observable<Session> {
    return this.http.get<Session>(`${this.basePath}/specialists/${specialistId}/sessions`)
      .pipe(retry(2), catchError(this.handleError));
  }
  createSession(item: Session, specialistId: number): Observable<Session> {
    return this.http.post<Session>(`${this.basePath}/specialists/${specialistId}/sessions`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  editSession(item: Session, specialistId: number, sessionId: number ): Observable<Session> {
    return this.http.put<Session>(`${this.basePath}/specialists/${specialistId}/sessions/${sessionId}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteSession(specialistId: number, sessionId: number ): Observable<Session> {
    return this.http.delete<Session>(`${this.basePath}/specialists/${specialistId}/sessions/${sessionId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
