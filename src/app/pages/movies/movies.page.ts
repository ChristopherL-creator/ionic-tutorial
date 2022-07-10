import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  moviesArray = [];
  currentPage = 1;
  imageBaseUrl= environment.images;

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

//  quando inizializzo pagina, caricherà funzione:
  ngOnInit() {
    this.loadMovies();
  }

//  con async, il resto del codice verrà eseguito dopo i pezzi con await, che smetteranno di
//  caricare una volta effettutata la chiamata http con successo;
// passo l'event alla funzione, che può accadere o no
  async loadMovies(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    //  per richiamare funzione gettopratedmovies(a cui passo currentpage)
    //  da movieservice, che emetterà observable. per accedre ai dati di observable,
    //  devo fare subscribe
    this.movieService.getTopRatedMovies(this.currentPage).subscribe({
      next: res => {
        loading.dismiss();
//  chiaeremo la funzione più volte, quindi infileremo i nostri oggetti con proprietà res.results
//  in moviesarray:
        this.moviesArray.push(...res.results);
        console.log(res);
//  usiamo ? sennò crasha
        event?.target.complete();

//  blocco l'evento se il numero della pagina corrrente è lo stesso delle pagine totali
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      },
      error: err => console.log(err)
    });
  }

  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage ++;
    this.loadMovies(event);
  }

}
