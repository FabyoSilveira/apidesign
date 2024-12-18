import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { MovieService } from './movie.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller({ path: 'movie', version: '1' })
@UseGuards(AuthGuard)
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('/search')
  async searchMovies(@Query('name') query: string): Promise<any> {
    return this.movieService.searchMovies(query);
  }

  @Get(':id')
  async getMovieByIMDBId(@Param('id') id: string): Promise<any> {
    return this.movieService.getMovieByIMDBId(id);
  }

  @Get('/actors/search')
  async searchPerson(@Query('name') query: string): Promise<any> {
    return this.movieService.searchPerson(query);
  }

  @Get('/actors/:id')
  async getPersonByIMDBId(@Param('id') id: string): Promise<any> {
    return this.movieService.getPersonByIMDBId(id);
  }
}
