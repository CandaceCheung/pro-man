import React, { FC, useState } from "react";
import {
    Navbar,
    Tooltip,
    UnstyledButton,
    createStyles,
    Stack,
} from "@mantine/core";
import {
    IconGauge,
    IconBell,
    IconCalendarStats,
    IconUser,
    IconStar,
    IconLogout,
    TablerIcon,
} from "@tabler/icons";
import { Logo, LogoProbs } from "./Logo";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    link: {
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.white,
        opacity: 0.85,
        padding: 8,
        marginBottom: 30,

        "&:hover": {
            opacity: 1,
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background!,
                0.1
            ),
        },
    },

    active: {
        opacity: 1,
        "&, &:hover": {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background!,
                0.15
            ),
        },
    },

    track: {
        background: theme.fn.linearGradient(45, "#6871DB", "#24285A"),
    },
}));

interface NavbarLinkProps {
    icon: TablerIcon | FC<LogoProbs>;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();

    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton
                onClick={onClick}
                className={cx(classes.link, { [classes.active]: active })}
            >
                <Icon stroke={1.5} size={32} />
            </UnstyledButton>
        </Tooltip>
    );
}

const navButton = [
    { icon: Logo, label: "Home", path: "/home" },
    { icon: IconGauge, label: "Dashboard", path: "/dashboard" },
    { icon: IconBell, label: "Notification", path: "/notification" },
    { icon: IconCalendarStats, label: "My Work", path: "/my-work" },
    { icon: IconStar, label: "Favorite", path: "favorite" },
];



export function LeftNavbar() {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const iconLinks = navButton.map((item, index) => (
        <NavbarLink
            {...item}
            key={item.label}
            active={index === active}
            onClick={() => {
                setActive(index);
                navigate(item.path);
            }}
        />
    ));

    return (
        <Navbar
            width={{ base: 80 }}
            p="md"
            sx={(theme) => ({
                backgroundColor: theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background,
            })}
        >
            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {iconLinks}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <NavbarLink icon={IconUser} label="Profile" />
                    <NavbarLink icon={IconLogout} label="Logout" />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}
