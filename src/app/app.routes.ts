import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page'),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-pages/trending-pages')
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-pages/search-pages')
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
