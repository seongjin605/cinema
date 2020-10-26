import React from 'react';
import Layout from '../layout/Layout';
import PostCardList from '../components/post/PostCardList';

const title = 'Asurion';

export default function Posts() {
  return (
    <div>
      <Layout />
      <PostCardList />
    </div>
  );
}
