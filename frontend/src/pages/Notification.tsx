import '../components/styles/Notification.css';
import { Badge, Tabs, Tooltip } from '@mantine/core';
import { Sent } from '../components/NotificationComponents/Sent';
import { Inbox } from '../components/NotificationComponents/Inbox';
import { useAppSelector } from '../store';

export function Notification() {
    const userId = useAppSelector((state) => state.auth.userId);
    const messageSummary = useAppSelector((state) => state.project.messageSummary);
    const messages = messageSummary.filter((message) => message.receiver_id === userId);
    const count = messages.filter((message) => message.status === false).length;

    return (
        <div>
            <h2>Notification</h2>
            <Tabs defaultValue='inbox'>
                <Tabs.List>
                    <Tooltip label={`You have ${count} unread messages`}>
                        <Tabs.Tab
                            rightSection={
                                count > 0 && (
                                    <Badge
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            pointerEvents: 'none'
                                        }}
                                        variant='filled'
                                        size='xs'
                                        p={0}
                                    >
                                        {count}
                                    </Badge>
                                )
                            }
                            value='inbox'
                        >
                            Inbox
                        </Tabs.Tab>
                    </Tooltip>
                    <Tabs.Tab value='sent'>Sent</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='inbox'>
                    <Inbox />
                </Tabs.Panel>
                <Tabs.Panel value='sent'>
                    <Sent />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}
