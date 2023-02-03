import { Button, Divider } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActiveProject } from '../../redux/project/thunk';

export function FavoriteProject() {
    const projectSummary = useAppSelector((state) => state.table.myFavoriteList);
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId);

    return (
        <div>
            <h2>My Favorite Projects</h2>
            <div id='favorite-list'>
                {projectSummary.length > 0 ? (
                    <>
                        <Divider labelPosition='center' my='md' label='My Projects' color={'dark'} />
                        {projectSummary.map(
                            (content, index) =>
                                content?.creatorId === userId && (
                                    <div key={content.projectId}>
                                        <Button onClick={() => dispatch(setActiveProject(content.projectId!, content.projectName))} value={content.projectId} className='' variant='subtle' key={index}>
                                            {content?.projectName}
                                        </Button>
                                    </div>
                                )
                        )}
                        <Divider labelPosition='center' my='md' label='Other Projects' color={'dark'} />
                        {projectSummary.map(
                            (content, index) =>
                                content?.creatorId !== userId && (
                                    <div key={content.projectId}>
                                        <Button onClick={(e) => dispatch(setActiveProject(parseInt(e.currentTarget.value), projectSummary[index].projectName))} value={content.projectId} className='' variant='subtle' key={index}>
                                            {content?.projectName}
                                        </Button>
                                    </div>
                                )
                        )}
                    </>
                ) : (
                    <div>You don't have any favorite project yet...</div>
                )}
            </div>
        </div>
    );
}
