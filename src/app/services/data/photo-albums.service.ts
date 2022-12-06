import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoAlbum } from 'src/app/interfaces/photo-album';

@Injectable({
  providedIn: 'root'
})
export class PhotoAlbumsService {

  constructor(private http : HttpClient) { }

  getPhotoAlbums() : Observable<PhotoAlbum[]>{
    return this.http.get<PhotoAlbum[]>('https://jsonplaceholder.typicode.com/photos?_page=1&_limit=20');
  }
}
