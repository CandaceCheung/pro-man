import { IconArrowBadgeLeft, IconArrowBadgeRight } from "@tabler/icons"
import { useState } from "react"
import { ProjectList } from "./SidePanelComponents/ProjectList"
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
            <div id={toggle === null || !toggle ? "project-list-container-close": 'project-list-container-open'} >
                {toggle &&
                    <ProjectList />
                }
            </div>
            <span id={toggle === null ? 'side-panel-arrow-inactive' : toggle ? 'side-panel-arrow-active' : 'side-panel-arrow-inactive'} onClick={clickHandler}>{toggle ? <IconArrowBadgeLeft size={20} /> : <IconArrowBadgeRight size={20} />}</span>
        </div>
    )
}