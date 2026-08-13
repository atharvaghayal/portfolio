import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blogs from './Blogs';
import emailjs from '@emailjs/browser';

jest.mock('@emailjs/browser', () => ({
  __esModule: true,
  default: {
    send: jest.fn(),
  },
}));

describe('Blogs page signup form', () => {
  beforeEach(() => {
    emailjs.send.mockResolvedValue({ status: 200, text: 'OK' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('submits a valid email and shows a success state', async () => {
    render(<Blogs />);

    await userEvent.type(screen.getByPlaceholderText(/enter your email/i), 'reader@example.com');
    await userEvent.click(screen.getByRole('button', { name: /notify me/i }));

    expect(await screen.findByText(/thanks for subscribing! you will be notified when new articles are published on my portfolio site blogs page/i)).toBeInTheDocument();
  });

  test('rejects an invalid email address', async () => {
    render(<Blogs />);

    await userEvent.type(screen.getByPlaceholderText(/enter your email/i), 'not-an-email');
    await userEvent.click(screen.getByRole('button', { name: /notify me/i }));

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
  });
});
