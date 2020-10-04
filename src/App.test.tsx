import React from 'react';
import { render } from '@testing-library/react';
import Index from './pages/index';

test('renders learn react link', () => {
  const { getByText } = render(<Index />);
  const linkElement = getByText(/Welcome to cinema/g);
  expect(linkElement).toBeInTheDocument();
});
