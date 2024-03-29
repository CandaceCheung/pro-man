import { TableService } from '../services/tableServices';
import { Request, Response } from 'express';
import { itemCellsElement, itemsGroupElement } from '../model';
import { KanbanService } from '../services/kanbanServices';

export class TableController {
	constructor(private tableService: TableService, private kanbanService: KanbanService) {}

	likeProject = async (req: Request, res: Response) => {
		try {
			const { userId, projectId } = req.body;
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
			const { userId, projectId } = req.params;
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
			const { userId, projectId } = req.params;
			const result = await this.tableService.getTableInfo(parseInt(userId), parseInt(projectId));

			const memberResult = await this.kanbanService.getMemberList(parseInt(projectId));
			let memberList = {};
			memberResult.forEach((member) => {
				memberList[member.id] = {
					username: member.username,
					firstName: member.firstName,
					lastName: member.lastName
				};
			});

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
				if (cell.projectId) {
					const itemGroupId = cell.itemGroupId;
					const itemId = cell.itemId;
					const typeId = cell.horizontalOrderId;
					let itemCell: itemCellsElement = {
						itemId: cell.itemId,
						itemName: cell.itemName,
						typeId: cell.horizontalOrderId,
						typeName: cell.typeName,
						elementName: cell.elementName
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
							itemGroupId: cell.itemGroupId,
							itemGroupName: cell.itemGroupName
						});
						itemsOrders[itemGroupId] = [itemId];
					}

					switch (cell.typeName) {
						case 'dates':
							itemCell['itemDatesDatetime'] = cell.itemDatesDatetime;
							itemCell['itemDatesDate'] = cell.itemDatesDate;
							itemCells[itemGroupId][itemId][typeId] = itemCell;
							break;
						case 'money':
							if (itemCells[itemGroupId][itemId][typeId]) {
								if (!itemCells[itemGroupId][itemId][typeId]!.transactionId!.includes(cell.transactionId)) {
									itemCells[itemGroupId][itemId][typeId]!.transactionId!.push(cell.transactionId);
									itemCells[itemGroupId][itemId][typeId]!.itemMoneyCashflow!.push(cell.itemMoneyCashflow);
									itemCells[itemGroupId][itemId][typeId]!.itemMoneyDate!.push(cell.itemMoneyDate);
								}
							} else {
								itemCell['transactionId'] = [cell.transactionId];
								itemCell['itemMoneyCashflow'] = [cell.itemMoneyCashflow];
								itemCell['itemMoneyDate'] = [cell.itemMoneyDate];
								itemCells[itemGroupId][itemId][typeId] = itemCell;
							}
							break;
						case 'persons':
							if (itemCells[itemGroupId][itemId][typeId]) {
								if (!itemCells[itemGroupId][itemId][typeId].itemPersonUserId!.includes(cell.itemPersonUserId)) {
									itemCells[itemGroupId][itemId][typeId].itemPersonUserId!.push(cell.itemPersonUserId);
								}
							} else {
								itemCell.itemPersonUserId = [cell.itemPersonUserId];
								itemCells[itemGroupId][itemId][typeId] = itemCell;
							}
							break;
						case 'status':
							itemCell['itemStatusColor'] = cell.itemStatusColor;
							itemCell['itemStatusName'] = cell.itemStatusName;
							itemCells[itemGroupId][itemId][typeId] = itemCell;
							break;
						case 'text':
							itemCell['itemTextText'] = cell.itemTextText;
							itemCells[itemGroupId][itemId][typeId] = itemCell;
							break;
						case 'times':
							itemCell['itemTimesStartDate'] = cell.itemTimesStartDate;
							itemCell['itemTimesEndDate'] = cell.itemTimesEndDate;
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
			const result: Array<object> = await this.tableService.getFavorite(parseInt(userId));

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
			const { typeTimeId, startTime, endTime, name, color } = req.body;

			const typeId: number = await this.tableService.updateTimelineService(typeTimeId, startTime, endTime, name, color);

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
			const { typeDateId, date, name, color } = req.body;

			const typeId: number = await this.tableService.updateDatelineService(typeDateId, date, name, color);

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
			const { itemGroupId, itemGroupName } = req.body;
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
			const { itemId, name } = req.body;
			await this.tableService.renameItem(itemId, name);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Rename Item' });
		}
	};
	renameType = async (req: Request, res: Response) => {
		try {
			const { typeId, name } = req.body;
			await this.tableService.renameType(typeId, name);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Rename Type' });
		}
	};
	updateText = async (req: Request, res: Response) => {
		try {
			const { itemId, text } = req.body;
			await this.tableService.updateText(itemId, text);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Change Text' });
		}
	};
	renameProject = async (req: Request, res: Response) => {
		try {
			const { projectId, projectName } = req.body;
			await this.tableService.renameProject(projectId, projectName);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Rename Project' });
		}
	};
	updateState = async (req: Request, res: Response) => {
		try {
			const { itemId, stateId } = req.body;
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
			const { projectId, userId, itemGroupId, itemName } = req.body;
			const itemCells = await this.tableService.insertItem({ projectId, userId, itemGroupId, itemName });

			res.json({
				success: true,
				itemCells
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Insert Item' });
		}
	};
	insertItemGroup = async (req: Request, res: Response) => {
		try {
			const { projectId, userId } = req.body;
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
			const { projectId, projectName, memberTableId, username } = await this.tableService.insertNewProject(userId);
			res.json({
				success: true,
				projectId,
				projectName,
				memberTableId,
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
			const { projectId, name, color } = req.body;
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
			const { itemId, personId, typeId } = req.body;
			await this.tableService.addPerson(itemId, personId, typeId);
			res.json({ success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Add Person' });
		}
	};
	addTransaction = async (req: Request, res: Response) => {
		try {
			const { date, cashFlow, itemId } = req.body;
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
			const { itemId, personId } = req.body;
			const result = await this.tableService.removePerson(itemId, personId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Person' });
		}
	};
	removeTransaction = async (req: Request, res: Response) => {
		try {
			const { itemId, transactionId } = req.body;
			const result = await this.tableService.removeTransaction(itemId, transactionId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Transaction' });
		}
	};
	deleteItem = async (req: Request, res: Response) => {
		try {
			const { itemId, groupId } = req.body;
			const result = await this.tableService.deleteItem(itemId, groupId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Item' });
		}
	};
	deleteItemGroup = async (req: Request, res: Response) => {
		try {
			const { groupId, projectId } = req.body;
			const result = await this.tableService.deleteItemGroup(groupId, projectId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Item Group' });
		}
	};
	deleteProject = async (req: Request, res: Response) => {
		try {
			const { projectId, userId } = req.body;
			const result = await this.tableService.deleteProject(projectId, userId);
			res.json({ success: result });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[TAB] Fail to Delete Project' });
		}
	};
}
