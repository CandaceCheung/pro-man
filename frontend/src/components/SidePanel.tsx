import { IconArrowBadgeLeft, IconArrowBadgeRight } from "@tabler/icons"
import { useState } from "react"
import './styles/SidePanel.css'

export function SidePanel() {
    const [toggle, setToggle] = useState<boolean | null>(null)

    const clickHandler = () => {
        if (toggle === null) {
            setToggle(true)
        } else {
            setToggle(state => !state)
        }
        return
    }

    return (
        <div id={toggle === null ? 'side-panel-inactive' : toggle ? 'side-panel-open' : 'side-panel-close'}>
            <div style={toggle === null || toggle === false ? {contentVisibility : 'hidden'} : {contentVisibility : "visible"} } >
                {toggle &&
                    <div>
                        This is the project list page
                    </div>
                }
            </div>
            <span id={toggle === null ? 'side-panel-arrow-inactive' : toggle ? 'side-panel-arrow-active' : 'side-panel-arrow-inactive'} onClick={clickHandler}>{toggle ? <IconArrowBadgeLeft size={20} /> : <IconArrowBadgeRight size={20} />}</span>
        </div>
    )
}