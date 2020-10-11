import React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages/index';

test('meta tag test', () => {
  const metas = document.getElementsByTagName('meta');
  const isAllMetaSuccess = Array.from(metas).every(val => val.localName === 'meta');
  expect(isAllMetaSuccess).toBe(true);
});
