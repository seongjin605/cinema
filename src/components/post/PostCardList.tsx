import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
      margin: theme.spacing(2)
    },
    media: {
      height: 190
    }
  })
);

export interface MovieProps {
  title: string;
  summary: string;
  background_image: string;
  medium_cover_image: string;
  isLoading: false;
}

function isAvatarLoading(isLoading: boolean, props: MovieProps) {
  if (isLoading) {
    return <Skeleton animation="wave" variant="circle" width={40} height={40} />;
  }

  return <Avatar alt="Ted talk" src={props.medium_cover_image} />;
}

export default function PostCardList() {
  const [movies, setMovies] = useState<Array<MovieProps>>([]);
  let [page, setPage] = useState(1);

  let isLoading = false;
  const classes = useStyles();

  async function getMovies() {
    try {
      isLoading = true;
      const {
        data: {
          data: { movies = [] }
        }
      }: { data: { data: { movies: Array<MovieProps> } } } = await axios.get(
        `/api?sort_by=download_count&page=${page}`
      );
      setMovies(movies);
      console.log(movies);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
    }
  }

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <div>
      {movies.map((movie, key) => (
        <Card className={classes.card} key={key}>
          <CardHeader
            avatar={isAvatarLoading(isLoading, movie)}
            action={
              isLoading ? null : (
                <IconButton aria-label="settings" onClick={() => setPage(page++)}>
                  <AddIcon />
                </IconButton>
              )
            }
            title={
              isLoading ? (
                <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
              ) : (
                movie.title
              )
            }
            subheader={
              isLoading ? <Skeleton animation="wave" height={10} width="40%" /> : '5 hours ago'
            }
          />
          {isLoading ? (
            <Skeleton animation="wave" variant="rect" className={classes.media} />
          ) : (
            <CardMedia
              className={classes.media}
              image={movie.medium_cover_image}
              title="Ted talk"
            />
          )}
          <CardContent>
            {isLoading ? (
              <React.Fragment>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            ) : (
              <Typography variant="body2" color="textSecondary" component="p">
                {movie.summary}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
