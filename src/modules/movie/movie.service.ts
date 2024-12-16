import { Injectable } from '@nestjs/common';
import { MovieClient } from './movie.client';

@Injectable()
export class MovieService {
  constructor(private readonly movieClient: MovieClient) {}

  async getMovieByIMDBId(id: string): Promise<any> {
    return this.movieClient.getMovieByIMDBId(id);
  }

  async searchMovies(query: string): Promise<any> {
    return this.movieClient.searchMovies(query);
  }

  async getPersonByIMDBId(id: string): Promise<any> {
    return this.movieClient.getPersonByIMDBId(id);
  }

  async searchPerson(query: string): Promise<any> {
    return this.movieClient.searchPerson(query);
  }
}
