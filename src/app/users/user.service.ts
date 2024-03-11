import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = 'https://dummyjson.com/users';
  private http = inject(HttpClient)
  constructor() {}

  getUserList(): Observable<User> {
    return this.http.get<User>(environment.api);
  }

}
