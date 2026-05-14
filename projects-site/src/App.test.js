import { render, screen } from '@testing-library/react';
import App from './App';

test('renders projects page navigation and heading', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /blogs/i })).toBeInTheDocument();
  expect(screen.getByText(/want to be part of my projects/i)).toBeInTheDocument();
});
