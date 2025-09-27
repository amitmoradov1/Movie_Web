import React, {useState, useEffect} from 'react'
import CastItem from './CastItem';
import { fetchMovieCredits } from '../services/api';

export default function CastList({movie}) {

    const [filteredCast, setFilteredCast] = useState([]);

    useEffect(() => {
      async function loadCast() {
        try {
          const data = await fetchMovieCredits(movie.id);
          //setCast(data.results); 
          setFilteredCast(data.cast || []); 
        } catch (err) {
            console.error(err);
        }
      }
      loadCast();
    }, [movie?.id]);
    

 return (
        <div className="cast-section">
            <h3 className="cast-title">שחקנים</h3>
            
            {/* הקונטיינר האופקי עם הגלילה */}
            <div className="cast-list">
                {filteredCast.map(cast => (
                    <CastItem 
                        key={cast.id}
                        name={cast.name}
                        character={cast.character}
                        image={cast.profile_path ? 
                            `https://image.tmdb.org/t/p/w200${cast.profile_path}` : 
                            'https://via.placeholder.com/200x300?text=No+Image'
                        }
                    />
                ))}
            </div>
        </div>
    );
}
