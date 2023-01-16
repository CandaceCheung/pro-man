import { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';

export const useToken = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    useEffect(() => {
        token && localStorage.setItem('invitation', token);
        token &&
            showNotification({
                title: 'Invitation notification',
                message: 'Invitation token detected'
            });
        // eslint-disable-next-line
    }, []);
};
