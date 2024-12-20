export class Movie {
  title: string;
  originalTitle: string;
  overview: string;
  adult: boolean;
  originalLanguage: string;
  genreIds: number[];
  popularity: number;
  releaseDate: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

export class Person {
  name: string;
  originalName: string;
  mediaType: string;
  adult: boolean;
  popularity: number;
  gender: number;
  knownForDepartment: string;
  knownFor: Movie[];
}
