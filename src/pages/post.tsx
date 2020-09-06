import { NextPage } from 'next';
import axios from 'axios';

const Post: NextPage<any> = props => {
  return (
    <div>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary.replace(/<[/]?p/g, '')}</p>
      <img src={props.show.image.medium} />
    </div>
  );
};

Post.getInitialProps = async context => {
  const { id } = context.query;
  const res = await axios.get(`http://api.tvmaze.com/show/${id}`);
  console.log('res:', res);
  return res;
};

export default Post;
