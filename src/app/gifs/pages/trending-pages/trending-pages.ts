import {AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from "../../components/trending-page/gif-list/gif-list";
import { GifService } from '../../services/gifs';
import { ScrollService } from '../../shared/services/scroll-state.service';

const imageUrls: string[] = [
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
];

@Component({
  selector: 'app-trending',
  //imports: [GifList],
  templateUrl: './trending-pages.html',
})
export default class Trending implements AfterViewInit{
  //imgsUrls = signal<string[]>(imageUrls);

  gifService = inject(GifService);
  scrollStateService = inject(ScrollService);

  scrolldivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrolldivRef()?.nativeElement;
    if(!scrollDiv){
      return;
    }

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event){
    const scrollDiv = this.scrolldivRef()?.nativeElement;
    if(!scrollDiv){
      return;
    }

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    //console.log({scrollTotal: scrollTop + clientHeight, scrollHeight});
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    //this.scrollStateService.trendingScrollState.set(scrollTop);
    this.scrollStateService.updateTrendingScrollState(scrollTop);

    if(isAtBottom){
      this.gifService.loadTrendingGifs();
    }
  }
}
