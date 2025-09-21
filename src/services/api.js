const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

async function http(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);

  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json();
}

export function fetchPopular() {
  return http("/movie/popular", { language: "en-US", page: 1 });
}

// export function searchMovies(query) {
//   return http("/search/movie", { query, include_adult: "false", language: "en-US", page: 1 });
// }

// export function fetchMovieDetailsWithVideos(id) {
//   // append_to_response=videos מחזיר גם טריילרים (בד"כ YouTube key)
//   return http(`/movie/${id}`, { language: "en-US", append_to_response: "videos" });
// }
