import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IOption } from '../models/marvel.interface';

const API_URL = environment.marvelBackApiUrl;

@Injectable()
export class MarvelApiService {
  constructor(private http: HttpClient) {}

  /**
   * Get characters from back api
   *
   * @param {IOption} option - pagination option
   * @returns {Observable<*>}
   */
  public getCharacters(option: IOption): Observable<any> {
    const params = Object.keys(option)
      .reduce((memo, param) => {
        if (typeof option[param] === 'number') {
          memo.push(`${param}=${option[param]}`);
        }
        return memo;
      }, [])
      .join('&');
    return this.http.get(`${API_URL}/characters/list?${params}`).pipe(
      map((res: any) => {
        return res.data || res.code;
      })
    );
  }
}
