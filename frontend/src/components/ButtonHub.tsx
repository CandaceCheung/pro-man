import { Button } from "@mantine/core";
import { IconEyeOff, IconFilter, IconUser } from "@tabler/icons";

export function ButtonHub (){
    return (
        <div id="button-panel">
        <Button className='button-panel-group'>New Item</Button>
        <Button className='button-panel-group'>New Group</Button>
        <Button.Group>
            <Button className='button-panel-group' variant='subtle'><IconUser size={14} />Person</Button>
            <Button className='button-panel-group' variant='subtle'><IconFilter size={14} />Filter</Button>
            <Button className='button-panel-group' variant='subtle'><IconEyeOff size={14} />Hide</Button>
        </Button.Group>
    </div>
    )
}