import React, { FC, useState } from "react";
import {
    Navbar,
    Center,
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

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.white,
        opacity: 0.85,

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
}));

interface NavbarLinkProps {
    icon: TablerIcon | FC<LogoProbs>;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon:Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();

    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton
                onClick={onClick}
                className={cx(classes.link, { [classes.active]: active })}
            ><Icon stroke={1.5} size={30}/></UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: Logo, label: "Home" },
    { icon: IconGauge, label: "Dashboard" },
    { icon: IconBell, label: "Notification" },
    { icon: IconCalendarStats, label: "My Work" },
    { icon: IconStar, label: "Favorite" },
];

export function LeftNavbar() {
    const [active, setActive] = useState(0);
    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        <Navbar
            height={750}
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
                    {links}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <NavbarLink
                        icon={IconUser}
                        label="Profile"
                    />
                    <NavbarLink icon={IconLogout} label="Logout" />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}
