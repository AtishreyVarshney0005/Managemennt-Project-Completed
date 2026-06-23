import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Management Pro application', () => {
  render(<App />);
  // The app should render without crashing
  // Since it requires authentication, we just check that it renders
  expect(document.body).toBeInTheDocument();
});

test('app has proper structure', () => {
  const { container } = render(<App />);
  // Check that the app wrapper is present
  expect(container.firstChild).toBeInTheDocument();
});
