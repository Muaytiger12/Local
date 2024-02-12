import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLocalStorageService } from './user-local-storage-service';
import { User } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiServiceService {
  [x: string]: any;
  constructor(
    private httpClient: HttpClient,
    private userLocal: UserLocalStorageService
  ) {}

  getUsers(): Observable<any> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  getItem(): any {
    return this.userLocal.getItem();
  }

  setItem(data: any): void {
    this.userLocal.setItem('user', data);
  }

  removeItem(): boolean {
    this.userLocal.removeItem();
    return true;
  }
}
