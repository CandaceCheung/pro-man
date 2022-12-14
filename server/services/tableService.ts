import { format } from "date-fns";
import { Knex } from "knex";
import { getRandomColor } from "../seeds/users-info";

export class TableService {
    constructor(private knex: Knex) { }

    async getTableInfo(userID: number) {
        const projectsDetail = await this.knex.select(
            'projects.name as project_name',
            'projects.id as project_id',
            'projects.is_deleted as project_is_deleted',
            'users.role',
            'projects.creator_id as project_creator_id',
            'members.project_id as joined_project_id',
            'items.id as item_id',
            'items.name as item_name',
            'items.creator_id as item_creator_id',
            'items.is_deleted as item_is_deleted',
            'items.order as vertical_order',
            'items.item_group_id',
            'item_groups.name as item_group_name',
            'type_persons.name as item_person_name',
            'type_persons.id as item_person_id',
            'type_dates.datetime as item_dates_datetime',
            'type_dates.color as item_datetime_color',
            'type_dates.id as item_datetime_id',
            'type_times.start_date as item_times_start_date',
            'type_times.end_date as item_times_end_date',
            'type_times.color as item_times_color',
            'type_times.id as item_times_id',
            'transactions.date as item_money_date',
            'transactions.cash_flow as item_money_cashflow',
            'transactions.id as transaction_id',
            'states.name as item_status_name',
            'states.color as item_status_color',
            'states.id as state_id',
            'type_text.id as item_text_id',
            'type_text.text as item_text_text',
            'types.order as horizontal_order',
            'types.name as element_name',
            'types.type as type_name',
            'types.id as horizontal_order_id'
        )
            .from('members')
            .join('users', 'members.user_id', '=', 'users.id')
            .join('projects', 'members.project_id', '=', 'projects.id')
            .join('items', 'items.project_id', '=', 'projects.id')
            .join('item_groups', 'items.item_group_id', '=', 'item_groups.id')
            .join('type_persons', 'type_persons.item_id', '=', 'items.id')
            .join('type_dates', 'type_dates.item_id', '=', 'items.id')
            .join('type_times', 'type_times.item_id', '=', 'items.id')
            .join('type_money', 'type_money.item_id', '=', 'items.id')
            .join('transactions', 'transactions.type_money_id', '=', 'type_money.id')
            .join('type_status', 'type_status.item_id', '=', 'items.id')
            .join('states', 'type_status.state_id', '=', 'states.id')
            .join('type_text', 'type_text.item_id', '=', 'items.id')
            .join('types', function () {
                this
                    .on('type_text.type_id', '=', 'types.id')
                    .orOn('type_status.type_id', '=', 'types.id')
                    .orOn('type_money.type_id', '=', 'types.id')
                    .orOn('type_times.type_id', '=', 'types.id')
                    .orOn('type_dates.type_id', '=', 'types.id')
                    .orOn('type_persons.type_id', '=', 'types.id')
            })
            .where("users.id", userID)
            .where("items.is_deleted", false)
            .where("projects.is_deleted", false)
            .orderBy("project_id", 'asc')
            .orderBy("item_group_id", 'desc')
            .orderBy("vertical_order", 'asc')
            .orderBy("horizontal_order", 'asc');

        return projectsDetail
    }

    async getFavorite(userId: number) {
        const favoriteList = await this.knex.select(
            'projects.creator_id as creator_id',
            'projects.id as project_id',
            'projects.name as project_name',
            'favorite.id as favorite_id'
        )
            .from('favorite')
            .join('projects', 'favorite.project_id', '=', 'projects.id')
            .where('favorite.user_id', '=', userId)

        return favoriteList
    }

    async updateTimelineService(id: number, start: number, end: number, name: string, color: string) {
        const txn = await this.knex.transaction();
        try {
            const typeId = await txn('type_times').update({
                start_date: start,
                end_date: end,
                color
            })
                .where('id', id).returning('type_id')

            await txn('types').update({
                name
            })
                .where('id', typeId[0].type_id)

            await txn.commit()
            return typeId[0].type_id
        } catch (e) {
            await txn.rollback();
            throw e
        }
    }

    async updateDatelineService(id: number, date: number, name: string, color: string) {
        const txn = await this.knex.transaction();
        try {
            const typeId = await txn('type_dates').update({
                datetime: format(new Date(date), 'yyyy-MM-dd'),
                color
            })
                .where('id', id).returning('type_id')
        
            await txn('types').update({
                name
            })
                .where('id', typeId[0].type_id)

            await txn.commit()
            return typeId[0].type_id

        } catch (e) {
            await txn.rollback();
            throw e
        }
    }

    async updateItemGroupName(id: number, name: string) {
        await this.knex('item_groups').update({
            name: name
        }).where("id", id);
    }

    async insertItem(projectId: number, userId: number, newGroup: boolean) {
        const [{ username }] = await this.knex("users").select("username").where("id", userId);
        const [{ stateId }] = await this.knex("states").select("id as stateId").where("project_id", projectId).orderBy("stateId").limit(1);
        const [{ itemGroupId }] = await this.knex("item_groups").select("id as itemGroupId").where("project_id", projectId).orderBy("itemGroupId", "desc").limit(1);

        let typesId_persons = null;
        let typesId_dates = null;
        let typesId_times = null;
        let typesId_money = null;
        let typesId_status = null;
        let typesId_text = null;

        const txn = await this.knex.transaction();

        try {

            if (newGroup) {
                const types = await this.knex("types").select("id").orderBy("id", "desc").limit(6);
                typesId_persons = types[5].id;
                typesId_dates = types[4].id;
                typesId_times = types[3].id;
                typesId_money = types[2].id;
                typesId_status = types[1].id;
                typesId_text = types[0].id;
            } else {
                const [{ previousItemId }] = await this.knex("items").select("id as previousItemId").where("item_group_id", itemGroupId).limit(1);
                const types = await this.knex.select(
                    "types.id"
                ).from("items")
                    .join('type_persons', 'type_persons.item_id', '=', 'items.id')
                    .join('type_dates', 'type_dates.item_id', '=', 'items.id')
                    .join('type_times', 'type_times.item_id', '=', 'items.id')
                    .join('type_money', 'type_money.item_id', '=', 'items.id')
                    .join('type_status', 'type_status.item_id', '=', 'items.id')
                    .join('type_text', 'type_text.item_id', '=', 'items.id')
                    .join('types', function () {
                        this
                            .on('type_text.type_id', '=', 'types.id')
                            .orOn('type_status.type_id', '=', 'types.id')
                            .orOn('type_money.type_id', '=', 'types.id')
                            .orOn('type_times.type_id', '=', 'types.id')
                            .orOn('type_dates.type_id', '=', 'types.id')
                            .orOn('type_persons.type_id', '=', 'types.id')
                    }).where("items.id", previousItemId)
                    .orderBy("types.id", "asc");
                typesId_persons = types[0].id;
                typesId_dates = types[1].id;
                typesId_times = types[2].id;
                typesId_money = types[3].id;
                typesId_status = types[4].id;
                typesId_text = types[5].id;
            }
    
            await txn("items")
            .where("item_group_id", itemGroupId)
            .increment('order', 1);
    
            const [{ itemId }] = await txn.insert({
                name: "New Item",
                creator_id: userId,
                project_id: projectId,
                item_group_id: itemGroupId,
                is_deleted: false,
                order: 1
            }).into('items').returning('id as itemId');
    
            await txn.insert({
                name: username,
                type_id: typesId_persons,
                item_id: itemId
            }).into("type_persons");
            await txn.insert({
                datetime: format(new Date(Date.now()), 'yyyy-MM-dd'),
                color: getRandomColor(),
                type_id: typesId_dates,
                item_id: itemId
            }).into("type_dates");
            await txn.insert({
                start_date: new Date(new Date().toDateString()).getTime(),
                end_date: new Date(new Date().toDateString()).getTime() + 86400000,
                color: getRandomColor(),
                type_id: typesId_times,
                item_id: itemId
            }).into("type_times");
            const [{ typeMoneyId }] = await txn.insert({
                type_id: typesId_money,
                item_id: itemId
            }).into("type_money")
                .returning("id as typeMoneyId");
            await txn.insert({
                state_id: stateId,
                type_id: typesId_status,
                item_id: itemId
            }).into("type_status");
            await txn.insert({
                text: "",
                type_id: typesId_text,
                item_id: itemId
            }).into("type_text");
    
            await txn.insert({
                date: format(new Date(Date.now()), 'yyyy-MM-dd'),
                cash_flow: 0,
                type_money_id: typeMoneyId
            }).into("transactions");

            await txn.commit();
        } catch(e) {
            await txn.rollback();
            throw e;
        }
    }

    async insertItemGroup(projectId: number, userId: number) {
        const txn = await this.knex.transaction();
        try {
            await txn.insert({
                project_id: projectId,
                name: "New Group"
            }).into('item_groups').returning('id as itemGroupId');
    
            await txn.insert(
                [{ type: "persons", name: "persons", order: 1 },
                { type: "dates", name: "dates", order: 2 },
                { type: "times", name: "times", order: 3 },
                { type: "money", name: "money", order: 4 },
                { type: "status", name: "status", order: 5 },
                { type: "text", name: "text", order: 6 }]
            ).into("types");
    
            await this.insertItem(projectId, userId, true);
            await txn.commit();
        } catch(e) {
            await txn.rollback();
            throw e;
        }
    }

    async reorderItems(newOrder: number[]) {
        const txn = await this.knex.transaction();
        try {
            for (const i in newOrder) {
                const itemId = newOrder[i];
                await this.knex("items")
                    .where("id", itemId)
                    .update({ order: parseInt(i) + 1 });
            }
            await txn.commit();
        } catch(e) {
            await txn.rollback();
            throw e;
        }
    }

    async reorderTypes(newOrder: number[]) {
        const txn = await this.knex.transaction();
        try {
            for (const i in newOrder) {
                const typeId = newOrder[i];
                await txn("types")
                    .where("id", typeId)
                    .update({ order: parseInt(i) + 1 });
            }
            await txn.commit();
        } catch(e) {
            await txn.rollback();
            throw e;
        }
    }

}

