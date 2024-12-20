import { Injectable } from '@nestjs/common';

import { TmdbClient } from 'src/client/tmdb/tmdb.client';
import { TMDBMovie, TMDBPerson } from 'src/client/tmdb/types';
import { MovieDomainMapper } from './mappper';
import { Movie, Person } from './types';

@Injectable()
export class MovieClientAdapter {
  constructor(
    private readonly tmdbClient: TmdbClient,
    private readonly domainMapper: MovieDomainMapper,
  ) {}

  async getMovieByIMDBId(movieId: string): Promise<Movie> {
    const movie: TMDBMovie = await this.tmdbClient.getMovieByIMDBId(movieId);

    return this.domainMapper.clientMovieToDomain(movie);
  }

  async getPersonByIMDBId(personId: string): Promise<Person> {
    const person: TMDBPerson =
      await this.tmdbClient.getPersonByIMDBId(personId);

    return this.domainMapper.clientPersonToDomain(person);
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const movies: TMDBMovie[] = await this.tmdbClient.searchMovies(query);

    return this.domainMapper.clientMoviesToDomain(movies);
  }

  async searchPerson(query: string): Promise<Person[]> {
    const persons: TMDBPerson[] = await this.tmdbClient.searchPerson(query);

    return this.domainMapper.clientPersonsToDomain(persons);
  }
}
