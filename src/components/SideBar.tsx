import { useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from '../components/Button'
import { TransactionsContext } from "../useContext";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
};


export function SideBar() {
  // Complete aqui
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  

  const { toggleTheme } = useContext(TransactionsContext);
   
  
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    toggleTheme(id);
  }
  
  
  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button key={String(genre.id)}
              id={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}