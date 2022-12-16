import { TableService } from "../services/tableService";
import { Request, Response } from "express";

export class TableController {
    constructor(private tableService: TableService) { }

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
                typeId 
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
                typeId
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
            const project_id = await this.tableService.insertNewProject(userId);
            res.json({ 
                success: true,
                project_id
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