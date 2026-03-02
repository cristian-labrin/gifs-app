import { Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/trending-page/gif-list/gif-list";
import { GifService } from '../../services/gifs';
import { Gif } from '../../interfaces/gif';

@Component({
  selector: 'app-search',
  imports: [GifList],
  templateUrl: './search-pages.html',
})
export default class Search {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string){
    this.gifService.searchGifs(query).subscribe(
      (resp) => this.gifs.set(resp)
    );
  }
}
