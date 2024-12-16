export type TMDBFindResponse = {
  movie_results: TMDBMovie[];
  person_results: TMDBPerson[];
  tv_results: any[];
  tv_episode_results: any[];
  tv_season_results: any[];
};

export type TMDBSearchMovieResponse = {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
};

export type TMDBSearchPersonResponse = {
  page: number;
  results: TMDBPerson[];
  total_pages: number;
  total_results: number;
};

export type TMDBMovie = {
  backdro_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  releaseDate: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TMDBPerson = {
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  adult: boolean;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: TMDBMovie[];
};
