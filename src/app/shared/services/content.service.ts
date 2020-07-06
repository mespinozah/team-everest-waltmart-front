import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ResponseContent } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  /**
   * Constructor.
   *
   * @param http HttpClient de angular.
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene el meme del contenido según la puerta.
   *
   * @param door Puerta seleccionada.
   */
  public getMeme(door: string): Observable<ResponseContent> {
    let url = `${environment.contentService.baseUrl}${environment.contentService.getMeme}`;
    url = url.replace('{door}', door);
    return this.http.get<ResponseContent>(url);
  }
}
