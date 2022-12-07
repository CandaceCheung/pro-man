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
    IconStar,
    IconLogout,
} from "@tabler/icons";


const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.white,
        opacity: 0.85,
    
        '&:hover': {
          opacity: 1,
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.1
          ),
        },
      },

      active: {
        opacity: 1,
        '&, &:hover': {
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.15
          ),
        },
      },

}));

const mockdata = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconBell, label: 'Notification'},
    { icon: IconCalendarStats, label: 'My Work' },
    { icon: IconStar, label: 'Favourite'},
    { icon: IconUser, label: 'Profile' },
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
            <Navbar.Section>
                
            </Navbar.Section>
        </Navbar>
    );
}
