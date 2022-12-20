import '../components/styles/Notification.css'
import { Badge, Tabs } from "@mantine/core";
import { Sent } from "../components/NotificationComponents/Sent";
import { Inbox } from "../components/NotificationComponents/Inbox";

export function Notification() {
    return (
        <div>
            <h2>Notification</h2>
            <Tabs defaultValue="inbox">
                <Tabs.List>
                    <Tabs.Tab
                        rightSection={
                            <Badge
                                sx={{ width: 16, height: 16, pointerEvents: 'none' }}
                                variant="filled"
                                size="xs"
                                p={0}
                            >
                                6
                            </Badge>
                        }
                        value="inbox"
                    >
                        Inbox
                    </Tabs.Tab>
                    <Tabs.Tab value="sent">Sent</Tabs.Tab>
                </Tabs.List>
                    <Tabs.Panel value="inbox">
                        <Inbox />
                    </Tabs.Panel>
                    <Tabs.Panel value="sent">
                        <Sent />
                    </Tabs.Panel>
            </Tabs>
            
        </div>
    )
}