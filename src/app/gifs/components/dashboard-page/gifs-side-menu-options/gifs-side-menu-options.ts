import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Gif } from 'src/app/gifs/interfaces/gif';
import { GifService } from 'src/app/gifs/services/gifs';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
})
export class GifsSideMenuOptions {
  gifService = inject(GifService);

  //gifs = signal<string[]>(this.gifService.searchHistoryKeys());

  // ngOnInit() {
  //   console.log(this.gifService.searchHistoryKeys());
  // }

  menuOptions:MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search'
    }
  ]

}
