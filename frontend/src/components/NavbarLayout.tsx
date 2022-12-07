import { AppShell, Text } from "@mantine/core";
import { LeftNavbar } from "./LeftNavBar";
import ProjectNavbar from "./ProjectNavbar";

export function NavbarLayout() {
    return (
        <AppShell navbar={<LeftNavbar />}>
            <ProjectNavbar />
            <Text> the table </Text>
        </AppShell>
    );
}
