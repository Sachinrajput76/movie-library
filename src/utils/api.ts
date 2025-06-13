// This functions is for building API URLs.
export const buildSearchUrl = (query: string, page = 1) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?search=${query}&page=${page}`;
};
