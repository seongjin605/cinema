import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import Layout from '../layout/Layout';

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

interface MovieProps {
  title: string;
  summary: string;
  background_image: string;
  medium_cover_image: string;
  isLoading?: false;
}

function isAvatarLoading(isLoading: boolean, props: MovieProps) {
  if (isLoading) {
    return <Skeleton animation="wave" variant="circle" width={40} height={40} />;
  }

  return <Avatar alt="Ted talk" src={props.medium_cover_image} />;
}

export default function RecipeReviewCard(props: MovieProps) {
  const [movies, setMovies] = React.useState<Array<MovieProps>>([]);
  let { isLoading = false } = props;
  const classes = useStyles();

  async function getMovies() {
    try {
      isLoading = true;
      const {
        data: {
          data: { movies = [] }
        }
      }: { data: { data: { movies: Array<MovieProps> } } } = await axios.get(
        '/api?sort_by=download_count'
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
    if (Array.isArray(movies) && movies.length === 0) {
      getMovies();
    }
  });

  console.log('로딩 끝');
  return (
    <div>
      <Layout />
      {movies.map((movie, key) => (
        <Card className={classes.card} key={key}>
          <CardHeader
            avatar={isAvatarLoading(isLoading, movie)}
            action={
              isLoading ? null : (
                <IconButton aria-label="settings">
                  <MoreVertIcon />
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
