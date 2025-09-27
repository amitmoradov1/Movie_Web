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

// ======= פונקציות קיימות =======
export function fetchPopular() {
  return http("/movie/popular", { language: "en-US", page: 1 });
}

// ======= פונקציות חדשות =======


// קבלת סרטים מובילים
export function fetchTopRatedMovies(page = 1) {
  return http("/movie/top_rated", { language: "en-US", page });
}

// קבלת סרטים חדשים
export function fetchNowPlayingMovies(page = 1) {
  return http("/movie/now_playing", { language: "en-US", page });
}

// קבלת סרטים קרובים
export function fetchUpcomingMovies(page = 1) {
  return http("/movie/upcoming", { language: "en-US", page });
}

// חיפוש סרטים
export function searchMovies(query, page = 1) {
  return http("/search/movie", { 
    query, 
    include_adult: "false", 
    language: "en-US", 
    page 
  });
}

// קבלת פרטי סרט מלאים עם שחקנים וטריילרים
export function fetchMovieDetails(id) {
  return http(`/movie/${id}`, { 
    language: "en-US", 
    append_to_response: "credits,videos,recommendations,similar" 
  });
}

// קבלת שחקנים של סרט ספציפי
export function fetchMovieCredits(id) {
  return http(`/movie/${id}/credits`, { language: "en-US" });
}

// קבלת טריילרים של סרט
export function fetchMovieVideos(id) {
  return http(`/movie/${id}/videos`, { language: "en-US" });
}

// קבלת המלצות לסרט
export function fetchMovieRecommendations(id, page = 1) {
  return http(`/movie/${id}/recommendations`, { language: "en-US", page });
}

// קבלת סרטים דומים
export function fetchSimilarMovies(id, page = 1) {
  return http(`/movie/${id}/similar`, { language: "en-US", page });
}

// קבלת פרטי שחקן
export function fetchPersonDetails(id) {
  return http(`/person/${id}`, { 
    language: "en-US",
    append_to_response: "movie_credits,tv_credits" 
  });
}

// קבלת ז'אנרים
export function fetchGenres() {
  return http("/genre/movie/list", { language: "en-US" });
}

// קבלת סרטים לפי ז'אנר
export function fetchMoviesByGenre(genreId, page = 1) {
  return http("/discover/movie", {
    language: "en-US",
    page,
    with_genres: genreId,
    sort_by: "popularity.desc"
  });
}

// ======= פונקציות עזר =======

// פונקציה לקבלת כל הסרטים (עם pagination)
export async function fetchAllMovies(maxPages = 10) {
  const allMovies = [];
  
  for (let page = 1; page <= maxPages; page++) {
    try {
      const response = await fetchPopular();
      allMovies.push(...response.results);
      
      // אם אין עוד עמודים
      if (page >= response.total_pages) break;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }
  
  return allMovies;
}

// פונקציה לקבלת סרט עם שחקנים
export async function fetchMovieWithCast(movieId) {
  try {
    const movieDetails = await fetchMovieDetails(movieId);
    
    // השחקנים כבר נכללים ב-credits
    const cast = movieDetails.credits?.cast || [];
    const crew = movieDetails.credits?.crew || [];
    
    return {
      ...movieDetails,
      cast: cast.slice(0, 10), // 10 שחקנים ראשונים
      crew: crew.filter(person => 
        person.job === "Director" || 
        person.job === "Producer" || 
        person.job === "Writer"
      )
    };
  } catch (error) {
    console.error("Error fetching movie with cast:", error);
    throw error;
  }
}

// פונקציה לפורמט נתוני שחקן
export function formatCastMember(castMember) {
  return {
    id: castMember.id,
    name: castMember.name,
    character: castMember.character,
    profilePath: castMember.profile_path 
      ? `${IMG_BASE}${castMember.profile_path}` 
      : null,
    order: castMember.order
  };
}

// פונקציה לפורמט נתוני סרט
export function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path 
      ? `${IMG_BASE}${movie.poster_path}` 
      : null,
    backdropPath: movie.backdrop_path 
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` 
      : null,
    rating: movie.vote_average,
    voteCount: movie.vote_count,
    popularity: movie.popularity,
    genreIds: movie.genre_ids || [],
    genres: movie.genres || []
  };
}

// דוגמת שימוש:
/*
// קבלת סרטים פופולריים
const popularMovies = await fetchPopularMovies(1);

// קבלת סרט עם שחקנים
const movieWithCast = await fetchMovieWithCast(550); // Fight Club

// קבלת כל הסרטים (5 עמודים ראשונים)
const allMovies = await fetchAllMovies(5);

// חיפוש סרטים
const searchResults = await searchMovies("Demon Slayer");

// קבלת שחקנים של סרט
const credits = await fetchMovieCredits(550);
const cast = credits.cast.map(formatCastMember);
*/