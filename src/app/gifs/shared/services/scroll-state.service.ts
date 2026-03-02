import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ScrollService{
  trendingScrollState = signal(0);

  updateTrendingScrollState(scrollTop: number){
    this.trendingScrollState.set(scrollTop);
  }
}
