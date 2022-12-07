import { AppShell, Header, Navbar, Text } from "@mantine/core";
import { LeftNavbar } from "./LeftNavbar";
import ProjectNavbar from "./ProjectNavbar";

export function NavbarLayout() {
    return (
        <AppShell navbar={<LeftNavbar />}>
            <ProjectNavbar />
            <Text> the table </Text>
        </AppShell>
    );
}
