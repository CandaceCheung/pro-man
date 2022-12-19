import { TableService } from "../services/tableService";
import { Request, Response } from "express";

export class TableController {
    constructor(private tableService: TableService) { }

    likeProject = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId
            const projectId = req.body.projectId
            const likeStatus = await this.tableService.getLikeStatus(userId, projectId);

            if(likeStatus){
                await this.tableService.deleteLike(userId, projectId)
            } else {
                await this.tableService.likeProject(userId, projectId)
            }

            const result = await this.tableService.getFavorite(userId);

            res.json({
                success: true,
                favorite: result,
                msg: 'Like project successfully toggled'
            });
        } catch (e) {
            console.error(e);
            res.json({
                success: false, 
                msg: "Fail to toggle like project" 
            });
        }
    }

    getTable = async (req: Request, res: Response) => {
        try {
            const userID = req.params.userID
            const projectID = req.params.projectID
            const result = await this.tableService.getTableInfo(parseInt(userID), parseInt(projectID));

            res.json({
                success: true,
                table: result
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Get Data." });
        }
    }

    getTableList = async (req: Request, res: Response) => {
        try {
            const userID = req.params.userID
            const result = await this.tableService.getTableList(parseInt(userID));

            res.json({
                success: true,
                list: result
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Get Data." });
        }
    }

    getFavorite = async (req: Request, res: Response) => {
        try {
            const userID = req.params.userID
            const result = await this.tableService.getFavorite(parseInt(userID));

            res.json({
                success: true,
                favorite: result
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Get Data." });
        }
    }

    updateTimeline = async (req: Request, res: Response) => {
        try {
            const typeTimeId = req.body.typeTimeId
            const newStartTime = req.body?.startTime
            const newEndTime = req.body?.endTime
            const newName = req.body?.name
            const newColor = req.body?.color

            const typeId: number = await this.tableService.updateTimelineService(typeTimeId, newStartTime, newEndTime, newName, newColor);

            res.json({ 
                success: true, 
                typeId,
                msg: 'Update Timeline Successful!'
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Update Timeline" });
        }
    }
    updateDateline = async (req: Request, res: Response) => {
        try {
            const typeDateId = req.body.typeDateId
            const newStartTime = req.body.date
            const newName = req.body?.name
            const newColor = req.body?.color

            const typeId: number = await this.tableService.updateDatelineService(typeDateId, newStartTime, newName, newColor);

            res.json({ 
                success: true,
                typeId,
                msg: 'Update Timeline Successful!'
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Update Timeline" });
        }
    }
    updateItemGroupName = async (req: Request, res: Response) => {
        try {
            const itemGroupId = req.body.itemGroupId;
            const itemGroupName = req.body.itemGroupName;
            await this.tableService.updateItemGroupName(itemGroupId, itemGroupName);

            res.json({ success: true });
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Update Item Group Name" });
        }
    }
    reorderItems = async (req: Request, res: Response) => {
        try {
            const newOrder = req.body.newOrder;
            await this.tableService.reorderItems(newOrder);
            res.json({ success: true });
        } catch(e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Reorder Items" });
        }
    }
    reorderTypes = async (req: Request, res: Response) => {
        try {
            const newOrder = req.body.newOrder;
            await this.tableService.reorderTypes(newOrder);
            res.json({ success: true });
        } catch(e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Reorder Types" });
        }
    }
    renameItem = async (req: Request, res: Response) => {
        try {
            const itemId = req.body.itemId;
            const name = req.body.name;
            await this.tableService.renameItem(itemId, name);
            res.json({ success: true });
        } catch(e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Rename Item" });
        }
    }
    insertItem = async (req: Request, res: Response) => {
        try {
            const projectId = req.body.projectId;
            const userId = req.body.userId;
            await this.tableService.insertItem(projectId, userId);

            res.json({ success: true })
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Insert Item" });
        }
    }
    insertItemGroup = async (req: Request, res: Response) => {
        try {
            const projectId = req.body.projectId;
            const userId = req.body.userId;
            await this.tableService.insertItemGroup(projectId, userId);

            res.json({ success: true })
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Insert Item Group" });
        }
    }
    insertNewProject = async (req: Request, res: Response) => {
        try {
            const userId = req.body.userId;
            const {project_id, project_name, member_table_id, username} = await this.tableService.insertNewProject(userId);
            res.json({ 
                success: true,
                project_id,
                project_name,
                member_table_id,
                username
            })
        } catch(e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Insert Project" });
        }
    }
    retrieveUserName = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.userID);
            const result = await this.tableService.retrieveUserName(userId);
            res.json({
                success: !!result,
                result
            });
        } catch(e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Retrieve Names" });
        }
    }
}