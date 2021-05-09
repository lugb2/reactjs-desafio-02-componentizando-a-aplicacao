
import { Button } from './Button';

import { GenreResponseProps } from './../types';

type SideBarProps = {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  handleClickButton(id: number): void;
}

export function SideBar(props: SideBarProps) {
  // Complete aqui

  let {
    genres,
    handleClickButton, selectedGenreId
  } = props

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
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