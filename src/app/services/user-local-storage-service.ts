import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserLocalStorageService {

    
  getItem(): any {
    const getitem = localStorage.getItem('user');
    if (getitem) {
      return JSON.parse(getitem);
    } else {
      return null;
    }
  }

  setItem(key: string, data: object): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(): boolean {
    localStorage.removeItem('user');
    return true;
  }
}
