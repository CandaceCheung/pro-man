import React, { FC, useEffect, useState } from 'react';
import { Navbar, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core';
import { IconBell, IconUser, IconStar, IconLogout, TablerIcon, IconUsers } from '@tabler/icons';
import { Logo, LogoProps } from './Logo';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/auth/thunk';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleFavoriteAction, toggleSidePanelAction } from '../redux/project/slice';

interface NavbarLinkProps {
    icon: TablerIcon | FC<LogoProps>;
    label: string;
    active?: boolean;
    screenSize: string;
    onClick?(): void;
}

interface LeftNavbarProps {
    screenSize: string;
}

const useStyles = createStyles((theme) => ({
    link: {
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.white,
        opacity: 0.85,
        padding: 8,
        marginBottom: 30,

        '&:hover': {
            opacity: 1,
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: 'filled',
                    color: 'violet'
                }).background!,
                0.1
            )
        }
    },

    active: {
        opacity: 1,
        '&, &:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: 'filled',
                    color: 'violet'
                }).background!,
                0.15
            )
        }
    }
}));

const navButtons = [
    { icon: Logo, label: 'Home', path: '/home' },
    { icon: IconBell, label: 'Notification', path: '/notification' },
    { icon: IconUsers, label: 'My Member', path: '/myMember' },
    { icon: IconStar, label: 'Favorite', path: 'favorite' }
];

const responsiveSize = {
    s: { iconSize: 12 , marginTop: 25 },
    m: { iconSize: 24 },
    l: { iconSize: 32 }
};

function NavbarLink({ icon: Icon, label, active, screenSize, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();

    return (
        <Tooltip label={label} position='right' transitionDuration={0}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Icon stroke={1.5} size={responsiveSize[screenSize].iconSize} />
            </UnstyledButton>
        </Tooltip>
    );
}

export function LeftNavbar({ screenSize }: LeftNavbarProps) {
    const [active, setActive] = useState(0);

    const toggleSidePanel = useAppSelector((state) => state.project.toggleSidePanel);
    const toggleFavorite = useAppSelector((state) => state.project.toggleFavorite);
    const page = useAppSelector((state) => state.project.activePage);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const iconLinks = navButtons.map((item, index) => (
        <NavbarLink
            {...item}
            key={item.label}
            active={index === active}
            screenSize={screenSize!}
            onClick={() => {
                setActive(index);
                if (item.path === 'favorite') {
                    navigate(`/home/${page}`);
                    if (toggleSidePanel && !toggleFavorite) {
                        dispatch(toggleSidePanelAction(true));
                        dispatch(toggleFavoriteAction(true));
                    } else {
                        dispatch(toggleFavoriteAction(!toggleFavorite));
                        dispatch(toggleSidePanelAction(!toggleSidePanel));
                    }
                } else {
                    navigate(item.path);
                    dispatch(toggleSidePanelAction(false));
                    dispatch(toggleFavoriteAction(false));
                }
            }}
        />
    ));

    return (
        <Navbar
            width={{ base: 80 }}
            p='md'
            sx={(theme) => ({
                backgroundImage: theme.fn.gradient({
                    from: '#24285A',
                    to: ' #6871DB',
                    deg: 45
                })
            })}>
            <Navbar.Section grow mt={responsiveSize[screenSize].marginTop || 50}>
                <Stack justify='center' spacing={0}>
                    {iconLinks}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify='center' spacing={0}>
                    <NavbarLink icon={IconUser} label='Profile' screenSize={screenSize} onClick={() => navigate('/profile')} />
                    <NavbarLink icon={IconLogout} label='Logout' screenSize={screenSize} onClick={() => dispatch(logout())} />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}
