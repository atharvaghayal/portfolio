import { render, screen } from '@testing-library/react';
import App from './App';

test('renders blogs page navigation', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /blogs/i })).toBeInTheDocument();
});
