
import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../app/page';
import Heading from '../../app/utils/Heading';
import Header from '../../app/utils/Header';

// Correctly mock the modules at the top level
jest.mock('../../app/utils/Heading', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ title  }) => <div data-testid="mocked-heading">{title}</div>),
 }));
 
 jest.mock('../../app/utils/Header', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ title }) => <div data-testid="mocked-header">{title}</div>),
 }));
 
 
 test('renders the Home component with correct title, description, and keywords', () => {
  render(<Home />);
  // Use the mocked components in your assertions
  expect(Heading).toHaveBeenCalledWith({
     title: 'Food Chilli',
     description: 'A Delecious Chillies and Fruit Fusion',
     keywords: 'For Everyone, Everywhere'
  } , {});
  expect(Header).toHaveBeenCalledWith({
     title: 'A Delicious Chillies and Fruit Fusion',
     landingPage: true
  }, {});
 });
 