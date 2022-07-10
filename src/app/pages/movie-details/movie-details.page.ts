import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movie = null;

  imageBaseUrl = environment.images;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

//  all'avvio della pagina, recupererà l'id del film di
//  cui prendere i dati, e mi ritornerà un'observabel
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe({
      next: resp => {
        console.log(resp);
        this.movie = resp;
      },
      error: err => console.log(err)
    });
  }

  openHomepage(){
    window.open(this.movie.homepage);
  }
}
