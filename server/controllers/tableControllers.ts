import { TableService } from "../services/tableService";
import { Request, Response } from "express";

export class TableController {
    constructor (private tableService: TableService) {}

    getTable = async (req: Request, res: Response) => {
        try {
            const userID = req.params.userID

            const result = await this.tableService.getTableInfo(parseInt(userID));
            
            res.json({ 
                success: true,
                table: result
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
            const newStartTime = req.body.startTime
            const newEndTime = req.body.endTime
            
            await this.tableService.updateTimelineService(typeTimeId, newStartTime, newEndTime);
            
            res.json({success: true});
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Update Timeline" });
        }
    }
    updateDateline = async (req: Request, res: Response) => {
        try {
            const typeDateId = req.body.typeDateId
            const newStartTime = req.body.date
            
            await this.tableService.updateDatelineService(typeDateId, newStartTime);
            
            res.json({success: true});
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TAB] Fail to Update Timeline" });
        }
    }
}