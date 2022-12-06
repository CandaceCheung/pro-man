import React, { useState } from "react";
import logo from "../img/proman-logo.png";
import {
    Navbar,
    Center,
    Tooltip,
    UnstyledButton,
    createStyles,
    Stack,
} from "@mantine/core";
import {
    IconHome2,
    IconGauge,
    IconBell,
    IconCalendarStats,
    IconUser,
    IconSettings,
    IconStar,
    IconLogout,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: "flex",
    },

    aside: {
        flex: "0 0 60px",
    },

}));

const mockdata = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconBell, label: 'Notification'},
    { icon: IconCalendarStats, label: 'My Work' },
    { icon: IconStar, label: 'Favourite'},
    { icon: IconUser, label: 'Profile' },
    { icon: IconSettings, label: 'Settings' },
 ];

export function LeftNavbar() {
    const [active, setActive] = useState(2);

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
            <Center>
                <img src={logo} alt="Logo" />
            </Center>

        </Navbar>
    );
}
