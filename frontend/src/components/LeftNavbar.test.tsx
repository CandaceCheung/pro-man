import { Button, MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { LeftNavbar } from './LeftNavbar';
import userEvent from '@testing-library/user-event';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedNavigate
}));

test('test Navbar', async () => {
    render(
        <Provider store={store}>
            {/* using the real store */}
            <MantineProvider>
                <LeftNavbar />
            </MantineProvider>
        </Provider>
    );

    const checkLogoButton = screen.getAllByRole('button')[0];
    userEvent.click(checkLogoButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/home');
});
