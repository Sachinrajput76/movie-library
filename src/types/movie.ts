interface Movie {
    imdbID: string;
    Title: string;
    Rating?: string;
    Year: string;
    Poster: string;
}
interface HomePageProps {
    searchParams?: {
        find?: string;
    };
}
export type { HomePageProps, Movie };