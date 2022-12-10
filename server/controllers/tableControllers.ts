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
    getTypes = async (req: Request, res: Response) => {
        try {
            const userID = req.params.userID

            const result = await this.tableService.getTypesDetail(parseInt(userID));
            
            res.json({ 
                success: true,
                types: result
             });
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[TYP] Fail to Get Data." });
        }
    }
}