import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { MovieService } from './movie.service';
import { AuthGuard } from '../auth/auth.guard';
import { UseCircuitBreaker } from 'src/utils';

@Controller({ path: 'movie', version: '1' })
@UseGuards(AuthGuard)
@UseCircuitBreaker()
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('/search')
  async searchMovies(@Query('name') query: string): Promise<any> {
    try {
      return this.movieService.searchMovies(query);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getMovieByIMDBId(@Param('id') id: string): Promise<any> {
    try {
      return this.movieService.getMovieByIMDBId(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('/actors/search')
  async searchPerson(@Query('name') query: string): Promise<any> {
    try {
      return this.movieService.searchPerson(query);
    } catch (error) {
      throw error;
    }
  }

  @Get('/actors/:id')
  async getPersonByIMDBId(@Param('id') id: string): Promise<any> {
    try {
      return this.movieService.getPersonByIMDBId(id);
    } catch (error) {
      throw error;
    }
  }
}
