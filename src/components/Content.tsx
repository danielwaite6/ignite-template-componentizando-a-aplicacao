import { useContext, useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard'
import { api } from '../services/api';
import { TransactionsContext } from '../useContext';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

 

export function Content() {
  const { data } = useContext(TransactionsContext);
  
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);


  useEffect(() => {
    
    api.get<MovieProps[]>(`movies/?Genre_id=${Number(data)}`).then(response => {
      console.log('response.data: ', response.data);
      
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${Number(data)}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [Number(data)]);
 

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} key={String(movie.Title)} />
          ))}
        </div>
      </main>
    </div>
  )
}