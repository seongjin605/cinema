import React from 'react';
import Layout from '../layout/Specific';
import { useRouter } from 'next/router';
const Index: React.FC = () => {
  const router = useRouter();
  console.log('query:', router.query);
  return (
    <div>
      <Layout name="Specific Layout" query={router.query.title} />
    </div>
  );
};

export default Index;
