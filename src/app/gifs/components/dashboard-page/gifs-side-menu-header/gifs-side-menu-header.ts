import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environments/environment.prod';
//import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.html',
})
export class GifsSideMenuHeader {
  envs = environment;
}
