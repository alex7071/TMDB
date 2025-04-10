import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import App from '../src/App.jsx'
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
    it('renders the App component', () => {
        render(<BrowserRouter><App /></BrowserRouter>)

        screen.debug(); // prints out the jsx in the App component unto the command line
    })
})