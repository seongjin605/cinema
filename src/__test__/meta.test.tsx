import React from 'react';

test('meta tag test', () => {
  const metas = document.getElementsByTagName('meta');
  const isAllMetaSuccess = Array.from(metas).every(val => val.localName === 'meta');
  expect(isAllMetaSuccess).toBe(true);
});
