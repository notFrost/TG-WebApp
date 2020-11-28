import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../models/login.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  basePath = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  signIn(model: Login): Login {
    return model;
  }

  signUp(model: Login): Login {
    return model;
  }
}