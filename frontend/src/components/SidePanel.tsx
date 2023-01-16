import { IconArrowBadgeLeft, IconArrowBadgeRight } from '@tabler/icons';
import { toggleFavoriteAction, toggleSidePanelAction } from '../redux/project/slice';
import { useAppDispatch, useAppSelector } from '../store';
import { FavoriteProject } from './SidePanelComponents/FavoriteProject';
import { ProjectList } from './SidePanelComponents/ProjectList';
import './styles/SidePanel.css';

export function SidePanel() {
    const dispatch = useAppDispatch();
    const toggle = useAppSelector((state) => state.project.toggle_side_panel);
    const favorite = useAppSelector((state) => state.project.toggle_favorite);

    const clickHandler = () => {
        dispatch(toggleSidePanelAction(!toggle));
        dispatch(toggleFavoriteAction(false));
    };

    return (
        <div id={toggle ? 'side-panel-open' : 'side-panel-close'}>
            <div id={toggle ? 'project-list-container-open' : 'project-list-container-close'}>{toggle ? favorite ? <FavoriteProject /> : <ProjectList /> : null}</div>
            <span id={toggle ? 'side-panel-arrow-active' : 'side-panel-arrow-inactive'} onClick={clickHandler}>
                {toggle ? <IconArrowBadgeLeft size={20} /> : <IconArrowBadgeRight size={20} />}
            </span>
        </div>
    );
}
