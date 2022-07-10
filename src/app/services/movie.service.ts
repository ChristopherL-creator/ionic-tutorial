import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

//  creo interfacci in cui organizzare risultato chiamta api
export interface ApiResult{
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

//  effettuo chiamata get dall'api, che mi genererà un observable di apiresult
  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
  }

//  prendo id film
  getMovieDetails(id: string) {
    return this.http.get(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }
}
