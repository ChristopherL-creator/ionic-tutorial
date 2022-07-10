import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//  ho rimosso homepage, e fatto in modo che percorso default porti a movies
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: () => import('./pages/movies/movies.module')
    .then( m => m.MoviesPageModule)
  },
//  se scrivo movie-details in barra di ricerca, mi riporta in movie-details
  {
//  mostrerà i dettagli in base all'id del film
    path: 'movies/:id',
    loadChildren: () => import('./pages/movie-details/movie-details.module')
    .then( m => m.MovieDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
