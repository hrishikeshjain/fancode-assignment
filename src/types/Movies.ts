export type Genre = {
    id: number;
    name: string;
  };
  

export type MovieDetail = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: null;
    budget: number;
    genre_ids: number[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };