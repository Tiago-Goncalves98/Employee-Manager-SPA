import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture } from '../Models/picture.model';


@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private apiUrl = 'YourApiUrlHere';

  constructor(private http: HttpClient) { }

  getImage(employeeId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${employeeId}`, {
      responseType: 'blob',
    });
  }
  addPicture(employeeID:number,pictureData: Picture): Observable<Picture>{
    return this.http.post<Picture>(`${this.apiUrl}/${employeeID}`,pictureData);
  }

  updatePicture(employeeID:number,pictureData: Picture){
    return this.http.put<Picture>(`${this.apiUrl}/${employeeID}`,pictureData);
  }

  deletePicture(employeeID: number) :Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${employeeID}`);
  }
}
