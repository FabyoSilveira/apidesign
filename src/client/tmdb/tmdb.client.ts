import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  TMDBMovie,
  TMDBPerson,
  TMDBFindResponse,
  TMDBSearchMovieResponse,
  TMDBSearchPersonResponse,
} from './types';

@Injectable()
export class TmdbClient {
  constructor(private readonly httpClient: HttpService) {}

  async getMovieByIMDBId(movieId: string): Promise<TMDBMovie> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<TMDBFindResponse>(
          `/find/${movieId}?external_source=imdb_id`,
        ),
      );

      if (response.data.movie_results.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            data: {
              message:
                'O filme que você procura não pode ser encontrado! Confira se o ID do Imdb está correto!',
            },
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return response.data.movie_results[0];
    } catch (error) {
      throw error;
    }
  }

  async getPersonByIMDBId(personId: string): Promise<TMDBPerson> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<TMDBFindResponse>(
          `/find/${personId}?external_source=imdb_id`,
        ),
      );

      if (response.data.person_results.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            data: {
              message:
                'O ator ou atriz que você procura não pode ser encontrado! Confira se o ID do Imdb está correto!',
            },
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return response.data.person_results[0];
    } catch (error) {
      throw error;
    }
  }

  async searchMovies(query: string): Promise<TMDBMovie[]> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<TMDBSearchMovieResponse>('/search/movie', {
          params: { query },
        }),
      );

      if (response.data.results.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            data: {
              message: 'Nenhum filme foi encontrado para o nome pesquisado!',
            },
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return response.data.results;
    } catch (error) {
      throw error;
    }
  }

  async searchPerson(query: string): Promise<TMDBPerson[]> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<TMDBSearchPersonResponse>('/search/person', {
          params: { query },
        }),
      );

      if (response.data.results.length === 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            data: {
              message:
                'Nenhum ator ou atriz foi encontrado para o nome pesquisado!',
            },
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
}
