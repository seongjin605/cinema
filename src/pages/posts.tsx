import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
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

// interface Movie {
//   title: string;
//   loading?: false;
// }

interface MovieProps {
  title: string;
  loading?: false;
}

export default function RecipeReviewCard(props: MovieProps) {
  const [movies, setMovies] = React.useState<Array<MovieProps>>([]);
  const { loading = false } = props;
  const classes = useStyles();

  async function getMovies() {
    try {
      const {
        data: {
          data: { movies = [] }
        }
      }: { data: { data: { movies: Array<MovieProps> } } } = await axios.get('/api');

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

  // if (movies.length === 0) {
  //   return <h1>로딩....</h1>;
  // }
  console.log('로딩 끝');
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          ) : (
            'Ted'
          )
        }
        subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : '5 hours ago'}
      />
      {loading ? (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      ) : (
        <CardMedia
          className={classes.media}
          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          title="Ted talk"
        />
      )}
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {
              "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
            }
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
