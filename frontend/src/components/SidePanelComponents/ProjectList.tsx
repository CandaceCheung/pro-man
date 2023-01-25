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
    const projectSummary = useAppSelector((state) => state.table.projectList);
    const userId = useAppSelector((state) => state.auth.userId);
    const [opened, setOpened] = useState(false);
    const dispatch = useAppDispatch();

    let projectIdList: [number?] = [];
    let projectList: MyTableListState = [];
    for (let item of projectSummary) {
        if (!projectIdList.includes(item.projectId)) {
            projectIdList.push(item.projectId);
            const obj = {
                projectName: item.projectName,
                username: item.username,
                projectId: item.projectId,
                creatorId: item.creatorId,
                memberTableId: item.memberTableId
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
            if (projectSummary.filter((each) => each.creatorId === userId).length <= 1) {
                showNotification({
                    title: 'Delete project notification',
                    message: 'Failed to delete project! You must have at least 1 project! 🤥'
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
                        content?.creatorId === userId && (
                            <div key={content.projectId} className='my-project-container'>
                                <Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value), projectList[index].projectName))} value={content?.projectId} className='' variant='subtle' key={index}>
                                    {content?.projectName}
                                </Button>
                                <IconX size={16} className='delete-icon' onClick={() => setOpened(true)} />
                                <Modal centered opened={opened} onClose={() => setOpened(false)} title={<span className='modal-title'>{'Delete this project?'}</span>}>
                                    <span className='modal-body'>{'The action cannot be reversed! Think twice! 🤔'}</span>
                                    <span className='modal-footer'>
                                        <Button color='red' onClick={() => content.projectId && handleDeleteProject(content.projectId)}>
                                            Delete
                                        </Button>
                                    </span>
                                </Modal>
                            </div>
                        )
                )}
                <Divider labelPosition='center' my='md' label='Joined Projects' color={'dark'} />
                {projectList.map(
                    (content, index) =>
                        content?.creatorId !== userId && (
                            <div key={content?.projectId}>
                                <Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value), projectList[index].projectName))} value={content?.projectId} className='' variant='subtle' key={index}>
                                    {content?.projectName}
                                </Button>
                            </div>
                        )
                )}
            </div>
        </div>
    );
}
