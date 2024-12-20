import { Injectable } from '@nestjs/common';
import { Movie, Person } from '../types';
import { TMDBMovie, TMDBPerson } from 'src/client/tmdb/types';

@Injectable()
export class MovieDomainMapper {
  clientMovieToDomain(tmdbMovie: TMDBMovie): Movie {
    return {
      title: tmdbMovie.title,
      originalTitle: tmdbMovie.original_title,
      overview: tmdbMovie.overview,
      adult: tmdbMovie.adult,
      originalLanguage: tmdbMovie.original_language,
      genreIds: tmdbMovie.genre_ids,
      popularity: tmdbMovie.popularity,
      releaseDate: tmdbMovie.releaseDate,
      video: tmdbMovie.video,
      voteAverage: tmdbMovie.vote_average,
      voteCount: tmdbMovie.vote_count,
    };
  }

  clientPersonToDomain(tmdbPerson: TMDBPerson): Person {
    return {
      name: tmdbPerson.name,
      originalName: tmdbPerson.original_name,
      mediaType: tmdbPerson.media_type,
      adult: tmdbPerson.adult,
      popularity: tmdbPerson.popularity,
      gender: tmdbPerson.gender,
      knownForDepartment: tmdbPerson.known_for_department,
      knownFor: tmdbPerson.known_for.map((movie) =>
        this.clientMovieToDomain(movie),
      ),
    };
  }

  clientMoviesToDomain(tmdbMovies: TMDBMovie[]): Movie[] {
    return tmdbMovies.map((movie) => this.clientMovieToDomain(movie));
  }

  clientPersonsToDomain(tmdbPersons: TMDBPerson[]): Person[] {
    return tmdbPersons.map((person) => this.clientPersonToDomain(person));
  }
}
