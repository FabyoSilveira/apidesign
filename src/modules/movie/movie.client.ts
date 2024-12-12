import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AxiosInstance } from 'axios';

@Injectable()
export class MovieClient {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: AxiosInstance,
  ) {
    const accessKey = this.configService.get<string>('TMDB_ACCESS_TOKEN');
    const baseUrl = this.configService.get<string>('TMDB_API_BASE_URI');

    if (!accessKey) {
      throw new Error('TMDB_ACCESS_TOKEN is not defined in .env file');
    }

    if (!baseUrl) {
      throw new Error('TMDB_API_BASE_URI is not defined in .env file');
    }
  }

  async getMovieById(movieId: number): Promise<any> {
    try {
      return this.httpClient.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzg1ZTkwYzQyYTNkODEyNTM0ZGU0Yjg5NzQ1MDNkNyIsIm5iZiI6MTcyOTU2NjY0Ny4zNjA5OTk4LCJzdWIiOiI2NzE3MTdiNzUwYTZlYjBiZmJjMjc0MTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0csEIyfhIRfbj2KRX-ACnzT_M8KmukpVL9huf48cxiI`,
          },
        },
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchMovies(query: string): Promise<any> {
    try {
      return this.httpClient.get('/search/movie', {
        params: { query },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error.response) {
      throw new HttpException(
        {
          status: error.response.status,
          error:
            error.response.data.status_message || 'Unknown error from TMDB API',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
