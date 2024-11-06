import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertion messages
import { AuthenticationButton } from './AuthenticationButton';

describe('AuthenticationButton', () => {
  it('renders with the provided title', () => {
    const title = 'Login';
    const { getByText } = render(<AuthenticationButton title={title} isLoading={true}  />);
    const button = getByText(title);
    expect(button).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const title = 'Login';
    const { asFragment } = render(<AuthenticationButton title={title} isLoading={false}  />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies fullWidth, mt, size, and type props correctly', () => {
    const title = 'Login';
    const { container } = render(<AuthenticationButton title={title}  isLoading={false} />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('mantine-button');
    expect(button).toHaveClass('mantine-button--fullWidth');
    expect(button).toHaveClass('mantine-button--size-md');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
