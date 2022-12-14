import { Request, Response } from "express";
import { KanbanService } from "../services/KanbanService";

export class KanbanController {
    constructor (private kanbanService: KanbanService) {}

    getKanban = async (req: Request, res: Response) => {
        try {
            const projectId = req.params.projectId
            
            const result = await this.kanbanService.getKanbanInfo(Number(projectId))

            res.json({
                success: true,
                projectInfo: result
            });

        }catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[KAN] Fail to Get Data." });
        }
    };
    
    postKanban =async (req: Request, res: Response) => {
        try {


        }catch (e) {
            console.error(e);
            res.status(500).json({ msg: "[KAN] Fail to Post Data." });
        }
        
    }
}