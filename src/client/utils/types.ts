export interface NewUser {
    name: string;
    email: string;
    password: string;
}

export interface IMovie {
    title: string;
    genres: any;
    id: number;
    tagline: string;
    status: string;
    runtime: number;
    spoken_languages: any;
    release_date: Date;
    poster_path: string;
    production_companies: any;
    overview: string;
    backdrop_path: string;
}

export interface user{
    username: string;
}