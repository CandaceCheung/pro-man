import '../styles/ProjectList.css';
import { Button, Divider, Modal } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActiveProject } from '../../redux/project/thunk';
import { MyTableListState } from '../../redux/table/slice';
import { IconPlus, IconX } from '@tabler/icons';
import { deleteProject, insertNewProject } from '../../redux/table/thunk';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';

export function ProjectList() {
    const projectSummary = useAppSelector((state) => state.table.project_list);
    const userId = useAppSelector((state) => state.auth.userId);
    const [opened, setOpened] = useState(false);
    const dispatch = useAppDispatch();

    let projectIdList: [number?] = [];
    let projectList: MyTableListState = [];
    for (let item of projectSummary) {
        if (!projectIdList.includes(item.project_id)) {
            projectIdList.push(item.project_id);
            const obj = {
                project_name: item.project_name,
                username: item.username,
                project_id: item.project_id,
                creator_id: item.creator_id,
                member_table_id: item.member_table_id,
            };
            projectList.push(obj);
        }
    }

    const onAddProject = () => {
        userId && dispatch(insertNewProject(userId));
    };

    const handleDeleteProject = (projectId: number) => {
        setOpened(false);
        if (userId) {
            if (projectSummary.filter((each) => each.creator_id === userId).length <= 1) {
                showNotification({
                    title: 'Delete project notification',
                    message: 'Failed to delete project! You must have at least 1 project! 🤥',
                });
            } else {
                dispatch(deleteProject(userId, projectId));
            }
        }
    };

    return (
        <div>
            <h2>Project List</h2>
            <div id='project-list'>
                <Button variant='subtle' rightIcon={<IconPlus size={14} />} onClick={onAddProject}>
                    {' '}
                    New Project{' '}
                </Button>
                <Divider labelPosition='center' my='md' label='Your Projects' color={'dark'} />
                {projectList.map(
                    (content, index) =>
                        content?.creator_id === userId && (
                            <div key={content.project_id} className='my-project-container'>
                                <Button
                                    onClick={(e) =>
                                        dispatch(
                                            setActiveProject(
                                                parseInt(e.currentTarget.value),
                                                projectList[index].project_name,
                                            ),
                                        )
                                    }
                                    value={content?.project_id}
                                    className=''
                                    variant='subtle'
                                    key={index}
                                >
                                    {content?.project_name}
                                </Button>
                                <IconX size={16} className='delete-icon' onClick={() => setOpened(true)} />
                                <Modal
                                    centered
                                    opened={opened}
                                    onClose={() => setOpened(false)}
                                    title={<span className='modal-title'>{'Delete this project?'}</span>}
                                >
                                    <span className='modal-body'>
                                        {'The action cannot be reversed! Think twice! 🤔'}
                                    </span>
                                    <span className='modal-footer'>
                                        <Button
                                            color='red'
                                            onClick={() =>
                                                content.project_id && handleDeleteProject(content.project_id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </span>
                                </Modal>
                            </div>
                        ),
                )}
                <Divider labelPosition='center' my='md' label='Joined Projects' color={'dark'} />
                {projectList.map(
                    (content, index) =>
                        content?.creator_id !== userId && (
                            <div key={content?.project_id}>
                                <Button
                                    onClick={(e) =>
                                        dispatch(
                                            setActiveProject(
                                                parseInt(e.currentTarget.value),
                                                projectList[index].project_name,
                                            ),
                                        )
                                    }
                                    value={content?.project_id}
                                    className=''
                                    variant='subtle'
                                    key={index}
                                >
                                    {content?.project_name}
                                </Button>
                            </div>
                        ),
                )}
            </div>
        </div>
    );
}
