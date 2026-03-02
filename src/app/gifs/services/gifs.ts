import { HttpClient } from '@angular/common/http';
import { effect, computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.prod';
import { GiphyResponse } from '../interfaces/giphy';
import { Gif } from '../interfaces/gif';
import { GifMapper } from '../mapper/gif';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = () => {
  const gifs = localStorage.getItem('gifs');

  return gifs ? JSON.parse(gifs) : {};
}

@Injectable({
  providedIn: 'root'
})
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i++) {
      groups.push(this.trendingGifs().slice(i, i + 3));

    }

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());

    localStorage.setItem('gifs', historyString);
  });

  loadTrendingGifs(){
    if(this.trendingGifsLoading()){
      return;
    }

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${ environment.giphyUrl }gifs/trending`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() *20
      }
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.update(currentGifs => [...gifs, ...currentGifs]);
      this.trendingPage.update((current) => current + 1);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(query: string): Observable<Gif[]>{
    return this.http.get<GiphyResponse>(`${ environment.giphyUrl }gifs/search`, {
      params:{
        api_key: environment.giphyApiKey,
        q: query,
        limit: 25,
      }
    }).pipe(
      map(({data}) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap((items) =>
        {
          this.searchHistory.update(
            (history) => ({
              ...history,
              [query.toLowerCase()]: items
            })
          );
        })
    );
    // .subscribe( (resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    // });
  }

  getHistoryGifs(query: string): Gif[]{
    return this.searchHistory()[query] ?? [];
  }
}
