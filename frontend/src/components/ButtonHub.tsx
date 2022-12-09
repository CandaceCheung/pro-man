import { Button, Menu, Select } from "@mantine/core";
import { IconEyeOff, IconFilter, IconUser, IconColumns, IconCalendar } from "@tabler/icons";
import { useState } from "react";

type ButtonHubProps = {
    page: string | null
}

export function ButtonHub(prop: ButtonHubProps) {

    const [value, setValue] = useState<string | null>(null)

    return (
        <div id="button-panel">
            <div id='fixed-button-group'>
                <Button className='button-panel-group'>New Item</Button>
                <Button className='button-panel-group'>New Group</Button>

                <Menu>
                    <Menu.Target>
                        <Button className='button-panel-group' variant='subtle'><IconUser size={14} />Person</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Filter by person</Menu.Label>
                        <Menu.Item icon={<IconUser size={14} />}>place holder</Menu.Item>
                        <Menu.Item icon={<IconUser size={14} />}>place holder 2</Menu.Item>
                        <Menu.Item icon={<IconUser size={14} />}>place holder 3</Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Menu>
                    <Menu.Target>
                        <Button className='button-panel-group' variant='subtle'><IconFilter size={14} />Filter</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Filter by column</Menu.Label>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder</Menu.Item>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder 2</Menu.Item>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder 3</Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Menu>
                    <Menu.Target>
                        <Button className='button-panel-group' variant='subtle'><IconEyeOff size={14} />Hide</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Hide column</Menu.Label>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder</Menu.Item>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder 2</Menu.Item>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder 3</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            <div>
                {prop.page === "timeline" &&
                    <Button.Group>
                        <Button className='button-panel-group' variant='subtle'><IconCalendar size={14} /></Button>
                        <Button className='button-panel-group' variant='subtle'>Auto Fit</Button>
                        <Select
                            value={value} onChange={setValue}
                            className='selection-box'
                            searchable
                            placeholder="View"
                            size='xs'
                            data={[
                                { value: 'Days', label: 'Days' },
                                { value: 'Weeks', label: 'Weeks' },
                                { value: 'Months', label: 'Months' },
                                { value: 'Years', label: 'Years' },
                            ]}
                        />
                    </Button.Group>
                }
            </div>
        </div>
    )
}