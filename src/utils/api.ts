export const buildSearchUrl = (query: string, page = 1) => {
    return `/api/movies?search=${encodeURIComponent(query)}&page=${page}`;
}
