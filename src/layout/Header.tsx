import React from 'react';
import Link from 'next/link';

interface Props {
  title: string;
}

const PostLink: React.FC<Props> = props => {
  return (
    <li>
      <Link as={`/test/${props.title}`} href={{ pathname: '/posts', query: { test: props.title } }}>
        <a>{props.title}</a>
      </Link>
    </li>
  );
};

const Header: React.FC = () => {
  return (
    <ul>
      <PostLink title="query1" />
      <PostLink title="query2" />
      <PostLink title="query3" />
    </ul>
  );
};

export default Header;
