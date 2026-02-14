import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {inject, Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileService {
  private http = inject(HttpClient);

  /**
   * Generic upload method
   * @param url The API endpoint
   * @param file The actual File object
   * @param additionalData Any extra fields (e.g., track name, project_id)
   */
  upload(url: string, file: File, additionalData: Record<string, any> = {}): Observable<number | any> {
    const formData = new FormData();
    formData.append('file', file);

    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    const config = new HttpRequest('POST', url, formData, {
      reportProgress: true,
    });

    return this.http.request(config).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return Math.round((100 * event.loaded) / (event.total || 100));
          case HttpEventType.Response:
            return event.body;
          default:
            return 0;
        }
      })
    );
  }
}
