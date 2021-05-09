import { useEffect, useState } from 'react';


import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import { GenreResponseProps, MovieProps } from './types';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {
  
  // estados
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {

    // consulta generos
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  // ao alterar genero selecionado
  useEffect(() => {

    // consulta dados do genero selecionado
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    // consulta o genero selecionado
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })

  }, [selectedGenreId]);

  // função para selecionar o gênero no sidebar
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      
      <SideBar
        genres={genres}
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />

      <Content
        selectedGenre={selectedGenre}
        movies={movies}
      />

    </div>
  )
}