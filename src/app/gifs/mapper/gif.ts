import { Gif } from "../interfaces/gif";
import { GiphyItem } from "../interfaces/giphy";

export class GifMapper{
  static mapGiphyItemToGif(item: GiphyItem): Gif{
    return {
      id: item.id,
      titulo: item.title,
      url: item.images.original.url
    }
  }

  static mapGiphyItemsToGifArray(items: GiphyItem[]) : Gif[]{
    return items.map(this.mapGiphyItemToGif);
  }
}
