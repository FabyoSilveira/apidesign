import { Injectable } from '@nestjs/common';
import { MovieClient } from './movie.client';

@Injectable()
export class MovieService {
  constructor(private readonly movieClient: MovieClient) {}

  async getMovieById(id: number): Promise<any> {
    return this.movieClient.getMovieById(id);
  }
}
