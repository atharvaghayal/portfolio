import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  class MockIntersectionObserver {
    observe() {}
    disconnect() {}
  }

  window.IntersectionObserver = MockIntersectionObserver;
});

test('renders portfolio navigation', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /blogs/i })).toBeInTheDocument();
});
