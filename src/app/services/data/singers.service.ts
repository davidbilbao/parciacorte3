import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Singer } from 'src/app/interfaces/singer';
@Injectable({
  providedIn: 'root'
})
export class SingersService {
  
  constructor(private http : HttpClient) { }

  getSingers() : Observable<Singer[]>{
    return this.http.get<Singer[]>('https://jsonplaceholder.typicode.com/users');
  }
}
