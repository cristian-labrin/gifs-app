import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsSideMenu } from '../../components/dashboard-page/gifs-side-menu/gifs-side-menu';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, GifsSideMenu],
  templateUrl: './dashboard-page.html',
})
export default class DashboardPage { }
