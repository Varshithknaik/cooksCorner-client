import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../app/page';
import Heading from '../../app/utils/Heading';
import Header from '../../app/utils/Header';

// Mocking Heading and Header components
jest.mock('../../app/utils/Heading', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((props:any) => <div data-testid="mocked-heading">{props.title}</div>),
 }));
 
 jest.mock('../../app/utils/Header', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ title }) => <div data-testid="mocked-header">{title}</div>),
 }));
 
 
 test('renders the Home component with correct title, description, and keywords', () => {
  render(<Home />);
  expect(Heading).toHaveBeenCalledWith({
     title: 'Food Chilli',
     description: 'A Delecious Chillies and Fruit Fusion',
     keywords: 'For Everyone, Everywhere'
  }, {});
  expect(Header).toHaveBeenCalledWith({
     title: 'A Delicious Chillies and Fruit Fusion',
     landingPage: true
  }, {});
 });
 