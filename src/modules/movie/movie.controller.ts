import { Controller, Get, Param, Query } from '@nestjs/common';

import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get(':id')
  async getMovieById(@Param('id') id: number): Promise<any> {
    console.log('hello');
    return this.movieService.getMovieById(id);
  }
}
