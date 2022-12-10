import { Knex } from "knex";

export class TableService {
    constructor(private knex: Knex) {}
    
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
            'type_dates.id as item_datetime_id',
            'type_times.start_date as item_times_start_date',
            'type_times.end_date as item_times_end_date',
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
            .leftJoin('items', 'items.project_id', '=', 'projects.id')
            .join('item_groups', 'items.item_group_id', '=', 'item_groups.id')
            .leftJoin('type_persons', 'type_persons.item_id', '=', 'items.id')
            .leftJoin('type_dates', 'type_dates.item_id', '=', 'items.id')
            .leftJoin('type_times', 'type_times.item_id', '=', 'items.id')
            .leftJoin('type_money', 'type_money.item_id', '=', 'items.id')
            .join('transactions', 'transactions.type_money_id', '=', 'type_money.id')
            .leftJoin('type_status', 'type_status.item_id', '=', 'items.id')
            .join('states', 'type_status.state_id', '=', 'states.id')
            .leftJoin('type_text', 'type_text.item_id', '=', 'items.id')
            .join('types', function (){
                this
                    .on('type_text.type_id', '=', 'types.id')
                    .orOn('type_status.type_id', '=', 'types.id')
                    .orOn('type_money.type_id', '=', 'types.id')
                    .orOn('type_times.type_id', '=', 'types.id')
                    .orOn('type_dates.type_id', '=', 'types.id')
                    .orOn('type_persons.type_id', '=', 'types.id')
            })
            .where("members.user_id", userID)
            .orderBy("project_id", 'asc')
            .orderBy("vertical_order", 'asc')
            .orderBy("horizontal_order", 'asc');

        return projectsDetail
    }

    async getTypesDetail(userID: number) {
        const projectIds = await this.knex.select("id").from("projects").where("creator_id", userID);
        let typeDetails = {};
        for (const {id} of projectIds) {
            const items = await this.knex.select("id").from("items").where("project_id", id);
            const itemId = items[0].id;
            const typeDetail = (await this.knex.raw(`
            SELECT PC.type_id, types.type, types.order
            FROM
            (SELECT type_persons.type_id
            FROM type_persons
            WHERE type_persons.item_id = :itemId
            UNION ALL
            SELECT type_dates.type_id
            FROM type_dates
            WHERE type_dates.item_id = :itemId
            UNION ALL
            SELECT type_times.type_id
            FROM type_times
            WHERE type_times.item_id = :itemId
            UNION ALL
            SELECT type_money.type_id
            FROM type_money
            WHERE type_money.item_id = :itemId
            UNION ALL
            SELECT type_status.type_id
            FROM type_status
            WHERE type_status.item_id = :itemId
            UNION ALL
            SELECT type_text.type_id
            FROM type_text
            WHERE type_text.item_id = :itemId) PC
            INNER JOIN types ON PC.type_id = types.id
            ORDER BY "order";`, {itemId})).rows;
            typeDetails[id] = typeDetail;
        }
        return typeDetails;
    }
}

