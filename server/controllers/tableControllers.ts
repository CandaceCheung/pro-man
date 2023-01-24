import { TableService } from '../services/tableService';
import { Request, Response } from 'express';
import { itemCellsElement, itemsGroupElement } from '../model';
import { KanbanService } from '../services/KanbanService';

export class TableController {
	constructor(private tableService: TableService, private kanbanService: KanbanService) {}

	likeProject = async (req: Request, res: Response) => {
		try {
			const userId = req.body.userId;
			const projectId = req.body.projectId;
			const likeStatus = await this.tableService.getLikeStatus(userId, projectId);

			if (likeStatus) {
				await this.tableService.deleteLike(userId, projectId);
			} else {
				await this.tableService.likeProject(userId, projectId);
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
				msg: 'Fail to toggle like project'
			});
		}
	};

	getTable = async (req: Request, res: Response) => {
		try {
			const userId = req.params.userId;
			const projectId = req.params.projectId;
			const result = await this.tableService.getTableInfo(parseInt(userId), parseInt(projectId));

			res.json({
				success: true,
				table: result
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Get Data.' });
		}
	};

	getTableV2 = async (req: Request, res: Response) => {
		try {
			const userId = req.params.userId;
			const projectId = req.params.projectId;
			const result = await this.tableService.getTableInfo(parseInt(userId), parseInt(projectId));

			const memberResult = await this.kanbanService.getMemberList(parseInt(projectId));
			let memberList = {};
			memberResult.forEach((member) => {
				memberList[member.id] = {
					username: member.username,
					firstName: member.firstName,
					lastName: member.lastName
				}
			})
			
			let itemCells: {
				[keys in number]: {
					[keys in number]: { [keys in number]: itemCellsElement };
				};
			} = {};
			let itemGroups: itemsGroupElement[] = [];

			let itemsOrders: Record<number, Array<number>> = {};
			let typesOrders: Record<number, Array<number>> = {};
			let typesOrderSet: Set<number> = new Set();

			for (const cell of result) {
				if (cell.project_id) {
					const itemGroupId = cell.item_group_id;
					const itemId = cell.item_id;
					const typeId = cell.horizontal_order_id;
					let itemCell: itemCellsElement = {
						item_id: cell.item_id,
						item_name: cell.item_name,
						type_id: cell.horizontal_order_id,
						type_name: cell.type_name,
						element_name: cell.element_name
					};

					if (itemCells[itemGroupId]) {
						if (!itemCells[itemGroupId][itemId]) {
							itemCells[itemGroupId][itemId] = {};
							itemsOrders[itemGroupId].push(itemId);
						}
					} else {
						itemCells[itemGroupId] = {};
						itemCells[itemGroupId][itemId] = {};
						itemGroups.push({
							item_group_id: cell.item_group_id,
							item_group_name: cell.item_group_name
						});
						itemsOrders[itemGroupId] = [itemId];
					}

					switch (cell.type_name) {
						case 'dates':
							itemCell['item_dates_datetime'] = cell.item_dates_datetime;
							itemCell['item_dates_date'] = cell.item_dates_date;
							itemCells[itemGroupId][itemId][typeId] = itemCell;
							break;
						case 'money':
							if (itemCells[itemGroupId][itemId][typeId]) {
								if (!itemCells[itemGroupId][itemId][typeId]!.transaction_id!.includes(cell.transaction_id)) {
									itemCells[itemGroupId][itemId][typeId]!.transaction_id!.push(cell.transaction_id);
									itemCells[itemGroupId][itemId][typeId]!.item_money_cashflow!.push(cell.item_money_cashflow);
									itemCells[itemGroupId][itemId][typeId]!.item_money_date!.push(cell.item_money_date);
								}
							} else {
								itemCell['transaction_id'] = [cell.transaction_id];
								itemCell['item_money_cashflow'] = [cell.item_money_cashflow];
								itemCell['item_money_date'] = [cell.item_money_date];
								itemCells[itemGroupId][itemId][typeId] = itemCell;
							}
							break;
						case 'persons':
							if (itemCells[itemGroupId][itemId][typeId]) {
								if (!itemCells[itemGroupId][itemId][typeId].item_person_user_id!.includes(cell.item_person_user_id)) {
									itemCells[itemGroupId][itemId][typeId].item_person_user_id!.push(cell.item_person_user_id);
								}
							} else {
								itemCell.item_person_user_id = [cell.item_person_user_id];
								itemCells[itemGroupId][itemId][typeId] = itemCell;
							}
							break;
						case 'status':
							itemCell['item_status_color'] = cell.item_status_color;
							itemCell['item_status_name'] = cell.item_status_name;
							itemCells[itemGroupId][itemId][typeId] = itemCell;
							break;
						case 'text':
							itemCell['item_text_text'] = cell.item_text_text;
							itemCells[itemGroupId][itemId][typeId] = itemCell;
							break;
						case 'times':
							itemCell['item_times_start_date'] = cell.item_times_start_date;
							itemCell['item_times_end_date'] = cell.item_times_end_date;
							itemCells[itemGroupId][itemId][typeId] = itemCell;
							break;
						default:
							break;
					}

					if (!typesOrders[itemGroupId]) {
						typesOrderSet = new Set();
					}
					typesOrderSet.add(typeId);
					typesOrders[itemGroupId] = Array.from(typesOrderSet);
				}
			}

			res.json({
				success: true,
				table: result,
				itemCells,
				itemGroups,
				itemsOrders,
				typesOrders,
				memberList
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Get Data.' });
		}
	};

	getTableList = async (req: Request, res: Response) => {
		try {
			const userId = req.params.userId;
			const result = await this.tableService.getTableList(parseInt(userId));

			res.json({
				success: true,
				list: result
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Get Data.' });
		}
	};

	getFavorite = async (req: Request, res: Response) => {
		try {
			const userId = req.params.userId;
			const result = await this.tableService.getFavorite(parseInt(userId));

			res.json({
				success: true,
				favorite: result
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Get Data.' });
		}
	};

	getProjectStatus = async (req: Request, res: Response) => {
		try {
			const projectId = req.params.projectId;
			const result = await this.tableService.getProjectStatus(parseInt(projectId));

			res.json({
				success: true,
				statusList: result
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Get Status List.' });
		}
	};

	updateTimeline = async (req: Request, res: Response) => {
		try {
			const typeTimeId = req.body.typeTimeId;
			const newStartTime = req.body?.startTime;
			const newEndTime = req.body?.endTime;
			const newName = req.body?.name;
			const newColor = req.body?.color;

			const typeId: number = await this.tableService.updateTimelineService(typeTimeId, newStartTime, newEndTime, newName, newColor);

			res.json({
				success: true,
				typeId,
				msg: 'Update Timeline Successful!'
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Update Timeline' });
		}
	};
	updateDateline = async (req: Request, res: Response) => {
		try {
			const typeDateId = req.body.typeDateId;
			const newStartTime = req.body.date;
			const newName = req.body?.name;
			const newColor = req.body?.color;

			const typeId: number = await this.tableService.updateDatelineService(typeDateId, newStartTime, newName, newColor);

			res.json({
				success: true,
				typeId,
				msg: 'Update Timeline Successful!'
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Update Timeline' });
		}
	};
	updateItemGroupName = async (req: Request, res: Response) => {
		try {
			const itemGroupId = req.body.itemGroupId;
			const itemGroupName = req.body.itemGroupName;
			await this.tableService.updateItemGroupName(itemGroupId, itemGroupName);

			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: '[TAB] Fail to Update Item Group Name'
			});
		}
	};
	reorderItems = async (req: Request, res: Response) => {
		try {
			const newOrder = req.body.newOrder;
			await this.tableService.reorderItems(newOrder);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Reorder Items' });
		}
	};
	reorderTypes = async (req: Request, res: Response) => {
		try {
			const newOrder = req.body.newOrder;
			await this.tableService.reorderTypes(newOrder);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Reorder Types' });
		}
	};
	renameItem = async (req: Request, res: Response) => {
		try {
			const itemId = req.body.itemId;
			const name = req.body.name;
			await this.tableService.renameItem(itemId, name);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Rename Item' });
		}
	};
	renameType = async (req: Request, res: Response) => {
		try {
			const typeId = req.body.typeId;
			const name = req.body.name;
			await this.tableService.renameType(typeId, name);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Rename Type' });
		}
	};
	updateText = async (req: Request, res: Response) => {
		try {
			const itemId = req.body.itemId;
			const text = req.body.text;
			await this.tableService.updateText(itemId, text);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Change Text' });
		}
	};
	renameProject = async (req: Request, res: Response) => {
		try {
			const projectId = req.body.projectId;
			const projectName = req.body.projectName;
			await this.tableService.renameProject(projectId, projectName);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Rename Project' });
		}
	};
	updateState = async (req: Request, res: Response) => {
		try {
			const itemId = req.body.itemId;
			const stateId = req.body.stateId;
			const result = await this.tableService.updateState(itemId, stateId);
			res.json({ 
				success: true,
				name: result.name,
				color: result.color
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Update State' });
		}
	};
	insertItem = async (req: Request, res: Response) => {
		try {
			const projectId = req.body.projectId;
			const userId = req.body.userId;
			const itemGroupId = req.body.itemGroupId;
			const itemName = req.body.itemName;
			const itemCells = await this.tableService.insertItem(projectId, userId, itemGroupId, undefined, itemName);

			res.json({ 
				success: true ,
				itemCells
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Insert Item' });
		}
	};
	insertItemGroup = async (req: Request, res: Response) => {
		try {
			const projectId = req.body.projectId;
			const userId = req.body.userId;
			const result = await this.tableService.insertItemGroup(projectId, userId);

			res.json({ 
				success: true,
				itemCells: result.itemCells,
				itemGroupId: result.itemGroupId,
				itemGroupName: result.itemGroupName,
				typeIds: result.typeIds
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Insert Item Group' });
		}
	};
	insertNewProject = async (req: Request, res: Response) => {
		try {
			const userId = req.body.userId;
			const { project_id, project_name, member_table_id, username } = await this.tableService.insertNewProject(userId);
			res.json({
				success: true,
				project_id,
				project_name,
				member_table_id,
				username
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Insert Project' });
		}
	};
	retrieveUserName = async (req: Request, res: Response) => {
		try {
			const userId = parseInt(req.params.userId);
			const result = await this.tableService.retrieveUserName(userId);
			res.json({
				success: !!result,
				result
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Retrieve Names' });
		}
	};
	addState = async (req: Request, res: Response) => {
		try {
			const projectId = req.body.projectId;
			const name = req.body.name;
			const color = req.body.color;
			const id = await this.tableService.addState(projectId, name, color);
			res.json({
				success: true,
				id
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Add State' });
		}
	};
	addPerson = async (req: Request, res: Response) => {
		try {
			const itemId = req.body.itemId;
			const personId = req.body.personId;
			const typeId = req.body.typeId;
			await this.tableService.addPerson(itemId, personId, typeId);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Add Person' });
		}
	};
	addTransaction = async (req: Request, res: Response) => {
		try {
			const date = req.body.date;
			const cashFlow = req.body.cashFlow;
			const itemId = req.body.itemId;
			const transactionId = await this.tableService.addTransaction(date, cashFlow, itemId);
			res.json({
				success: true,
				transactionId
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Add Transaction' });
		}
	};
	removePerson = async (req: Request, res: Response) => {
		try {
			const itemId = req.body.itemId;
			const personId = req.body.personId;
			const result = await this.tableService.removePerson(itemId, personId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Person' });
		}
	};
	removeTransaction = async (req: Request, res: Response) => {
		try {
			const itemId = req.body.itemId;
			const transactionId = req.body.transactionId;
			const result = await this.tableService.removeTransaction(itemId, transactionId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Transaction' });
		}
	};
	deleteItem = async (req: Request, res: Response) => {
		try {
			const itemId = req.body.itemId;
			const groupId = req.body.groupId;
			const result = await this.tableService.deleteItem(itemId, groupId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Item' });
		}
	};
	deleteItemGroup = async (req: Request, res: Response) => {
		try {
			const groupId = req.body.groupId;
			const projectId = req.body.projectId;
			const result = await this.tableService.deleteItemGroup(groupId, projectId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Item Group' });
		}
	};
	deleteProject = async (req: Request, res: Response) => {
		try {
			const projectId = req.body.projectId;
			const userId = req.body.userId;
			const result = await this.tableService.deleteProject(projectId, userId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Project' });
		}
	};
}
