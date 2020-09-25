import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

interface Movie {
  title: string;
}

export default function RecipeReviewCard() {
  const [movies, setMovies] = React.useState<Array<Movie>>([]);

  async function getMovies() {
    try {
      const {
        data: {
          data: { movies = [] }
        }
      }: { data: { data: { movies: Array<Movie> } } } = await axios.get('/api');

      console.log('movies:', movies);
      setMovies(movies);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (Array.isArray(movies) && movies.length === 0) {
      getMovies();
    }
  });

  if (movies.length === 0) {
    return <h1>로딩....</h1>;
  }
  console.log('로딩 끝');
  return (
    <ul>
      {movies.map((movie, key) => (
        <li key={key}>{movie.title}</li>
      ))}
    </ul>
  );
}
