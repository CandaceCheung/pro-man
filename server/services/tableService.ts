import { format } from "date-fns";
import { Knex } from "knex";
import { getRandomColor } from "../seeds/users-info";

export class TableService {
    constructor(private knex: Knex) { }

    async getTableInfo(userID: number, projectID: number) {
        const projectsDetail = await this.knex.select(
            'projects.name as project_name',
            'projects.id as project_id',
            'projects.is_deleted as project_is_deleted',
            'users.id as user_id',
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
            'type_persons.user_id as item_person_user_id',
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
            .select(this.knex.raw(`to_char(type_dates.datetime, 'Mon DD') as item_dates_date`))
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
            .where("projects.id", projectID)
            .where("items.is_deleted", false)
            .where("projects.is_deleted", false)
            .orderBy("project_id", 'asc')
            .orderBy("item_group_id", 'desc')
            .orderBy("vertical_order", 'asc')
            .orderBy("horizontal_order", 'asc')
            .orderBy("item_person_id", 'asc');

        return projectsDetail
    }

    async getTableList(userId: number) {
        const tableList = await this.knex.select(
            'projects.creator_id as creator_id',
            'projects.id as project_id',
            'projects.name as project_name',
            'members.id as member_table_id',
            'users.username as username'
        )
            .from('members')
            .join('users', 'members.user_id', '=', 'users.id')
            .join('projects', 'members.project_id', '=', 'projects.id')
            .where('members.user_id', '=', userId)
            .where("projects.is_deleted", false)
            .orderBy("project_id", 'asc')

        return tableList
    }

    async getLikeStatus(userId: number, projectId: number) {
        const [likeStatus] = await this.knex.select('*')
            .from('favorite')
            .where('favorite.user_id', userId)
            .where('favorite.project_id', projectId)
            .limit(1)

        return likeStatus
    }
    async deleteLike(userId: number, projectId: number) {
        await this.knex('favorite').del()
            .where('favorite.user_id', userId)
            .where('favorite.project_id', projectId)

        return 
    }
    async likeProject(userId: number, projectId: number) {
        await this.knex('favorite')
            .insert({
                user_id: userId,
                project_id: projectId
            })
        return 
    }

    async getFavorite(userId: number) {
        const favoriteList = await this.knex.select(
            'projects.creator_id as creator_id',
            'favorite.user_id as user_id',
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
        } catch (e) {
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
        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

    async insertItem(projectId: number, userId: number) {
        const [{ username }] = await this.knex("users").select("username").where("id", userId);
        const [{ stateId }] = await this.knex("states").select("id as stateId").where("project_id", projectId).orderBy("stateId").limit(1);
        const [{ itemGroupId }] = await this.knex("item_groups").select("id as itemGroupId").where("project_id", projectId).orderBy("itemGroupId", "desc").limit(1);

        const txn = await this.knex.transaction();

        try {
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
            const typesId_persons = types[0].id;
            const typesId_dates = types[1].id;
            const typesId_times = types[2].id;
            const typesId_money = types[3].id;
            const typesId_status = types[4].id;
            const typesId_text = types[5].id;

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
                user_id: userId,
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
        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

    async insertItemGroup(projectId: number, userId: number) {
        const txn = await this.knex.transaction();
        try {
            const [{ itemGroupId }] = await txn.insert({
                project_id: projectId,
                name: "New Group"
            }).into('item_groups').returning('id as itemGroupId');

            await txn.insert(
                [{ type: "persons", name: "Persons", order: 1 },
                { type: "dates", name: "Dates", order: 2 },
                { type: "times", name: "Times", order: 3 },
                { type: "money", name: "Money", order: 4 },
                { type: "status", name: "Status", order: 5 },
                { type: "text", name: "Text", order: 6 }]
            ).into("types");

            const [{ username }] = await this.knex("users").select("username").where("id", userId);
            const [{ stateId }] = await this.knex("states").select("id as stateId").where("project_id", projectId).orderBy("stateId", "asc").limit(1);

            const types = await this.knex("types").select("id").orderBy("id", "desc").limit(6);
            const typesId_persons = types[5].id;
            const typesId_dates = types[4].id;
            const typesId_times = types[3].id;
            const typesId_money = types[2].id;
            const typesId_status = types[1].id;
            const typesId_text = types[0].id;

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
                user_id: userId,
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
        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

    async insertNewProject(userId: number) {
        const [{ username }] = await this.knex("users").select("username").where("id", userId);
        const txn = await this.knex.transaction();
        try {
            const [{ project_id, project_name }] = await txn("projects").insert({
                name: "New Project",
                creator_id: userId,
                is_deleted: false
            }).returning(["id as project_id", "name as project_name"]);
            const [{ member_table_id }] = await txn("members").insert({
                user_id: userId,
                project_id
            }).returning("id as member_table_id");
            const [{ item_group_id }] = await txn("item_groups").insert({
                project_id,
                name: "New Group"
            }).returning("id as item_group_id");
            const defaultStates = ['Empty', 'Stuck', 'Done', 'Working on it', 'Checking'];
            const statusLabelsColor = ["#C4C4C4", "#FDAB3D", "#E2445C", "#00C875", "#0086C0", "#A25DDC", "#037F4C", "#579BFC", "#CAB641", "#FFCB00"];
            let state_id = null;
            for (let j in defaultStates) {
                if (j === "0") {
                    [{ state_id }] = await txn("states").insert({
                        name: defaultStates[j],
                        color: statusLabelsColor[j],
                        project_id
                    }).returning("id as state_id");
                } else {
                    await txn("states").insert({
                        name: defaultStates[j],
                        color: statusLabelsColor[j],
                        project_id
                    });
                }
            }
            const [{ item_id }] = await txn("items").insert({
                name: "New Item",
                creator_id: userId,
                project_id,
                item_group_id,
                is_deleted: false,
                order: 1
            }).returning("id as item_id");
            const types_ids = await txn.insert(
                [{ type: "persons", name: "Persons", order: 1 },
                { type: "dates", name: "Dates", order: 2 },
                { type: "times", name: "Times", order: 3 },
                { type: "money", name: "Money", order: 4 },
                { type: "status", name: "Status", order: 5 },
                { type: "text", name: "Text", order: 6 }]
            ).into("types").returning("id");
            const typesId_persons = types_ids[0].id;
            const typesId_dates = types_ids[1].id;
            const typesId_times = types_ids[2].id;
            const typesId_money = types_ids[3].id;
            const typesId_status = types_ids[4].id;
            const typesId_text = types_ids[5].id;
            await txn.insert({
                name: username,
                user_id: userId,
                type_id: typesId_persons,
                item_id
            }).into("type_persons");
            await txn.insert({
                datetime: format(new Date(Date.now()), 'yyyy-MM-dd'),
                color: getRandomColor(),
                type_id: typesId_dates,
                item_id
            }).into("type_dates");
            await txn.insert({
                start_date: new Date(new Date().toDateString()).getTime(),
                end_date: new Date(new Date().toDateString()).getTime() + 86400000,
                color: getRandomColor(),
                type_id: typesId_times,
                item_id
            }).into("type_times");
            const [{ typeMoneyId }] = await txn.insert({
                type_id: typesId_money,
                item_id
            }).into("type_money")
                .returning("id as typeMoneyId");
            await txn.insert({
                state_id,
                type_id: typesId_status,
                item_id
            }).into("type_status");
            await txn.insert({
                text: "",
                type_id: typesId_text,
                item_id
            }).into("type_text");
            await txn.insert({
                date: format(new Date(Date.now()), 'yyyy-MM-dd'),
                cash_flow: 0,
                type_money_id: typeMoneyId
            }).into("transactions");

            await txn.commit();
            return { project_id, project_name, member_table_id, username };
        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

    async retrieveUserName(userId: number) {
        const [names] = await this.knex("users").select("first_name", "last_name").where("id", userId);
        return (names.first_name && names.last_name) && names;
    }
}