import { Knex } from "knex";
import bcrypt from "bcryptjs";
import {format} from "date-fns";

export async function seed(knex: Knex): Promise<void> {

    await knex('type_text').del();
    await knex('type_status').del();
    await knex('transactions').del();
    await knex('type_money').del();
    await knex('type_times').del();
    await knex('type_dates').del();
    await knex('type_persons').del();
    await knex('types').del();
    await knex('kanban_order').del();
    await knex("favorite").del();
    await knex("states").del();
    await knex("items").del();
    await knex("item_groups").del();
    await knex("members").del();
    await knex("projects").del();
    await knex("users").del();

    const userIDs = await knex("users").insert([
        { username: "frankie", password: bcrypt.hashSync("test", 10), role: "admin" },
        { username: "duncan", password: bcrypt.hashSync("test", 10), role: "admin" },
        { username: "candace", password: bcrypt.hashSync("test", 10), role: "admin" }
    ]).returning('id');

    let insertArray = []

    insertArray = []
    for (const i of userIDs) {
        insertArray.push(
            { name: `Project ${i.id}`, creator_id: i.id, is_deleted: false }
        )
    }
    const projectIDs = await knex("projects").insert(insertArray).returning('*')

    insertArray = []
    for (const i of projectIDs) {
        for (const j of userIDs) {
            insertArray.push(
                { user_id: j.id, project_id: i.id },
            )
        }
    }
    await knex("members").insert(insertArray);

    const itemGroupIDs = await knex("item_groups").insert([
        { name: "Item Group 1" },
        { name: "Item Group 2" },
        { name: "Item Group 3" },
    ]).returning('*');


    insertArray = []
    for (const i of userIDs) {
        for (const j of projectIDs) {
            let order = 1
            for (const k of itemGroupIDs) {
                insertArray.push(
                    { name: `${k.name} item ${order}`, creator_id: i.id, project_id: j.id, is_deleted: false, order: order, item_group_id: k.id }
                )
                order++
            }
        }
    }
    const itemIDs = await knex("items").insert(insertArray).returning('*');

    const defaultStates = ['Working on it', 'Done', 'Stuck', 'Checking']

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    insertArray = []
    for (let i of projectIDs) {
        for (let j of defaultStates) {
            insertArray.push(
                { project_id: i.id, name: j, color: getRandomColor() },
            )
        }
    }
    const stateIDs = await knex("states").insert(insertArray).returning('*');

    insertArray = []
    for (const i of projectIDs) {
        for (const j of userIDs) {
            if (j.id === i.creator_id) {
                continue
            } else {
                insertArray.push(
                    { user_id: j.id, project_id: i.id },
                )
            }
        }
    }
    await knex("favorite").insert(insertArray);

    insertArray = []
    let itemIdOrder = 1
    for (const i of stateIDs) {
        insertArray.push(
            { state_id: i.id, item_id_order: itemIdOrder },
        );
        itemIdOrder++
    }
    await knex("kanban_order").insert(insertArray)

    insertArray = []
    const typeArr = ['persons', 'dates', 'times', 'money', 'status', 'text']
    for (let j = 0; j < projectIDs.length; ){
        for (let i = 0; i < 6; i++) {
            insertArray.push({ type: typeArr[i], order: i + 1 })
        }
    }
    const typeIDs = await knex("types").insert(insertArray).returning('*');

    let counter = 0
    for (let i of itemIDs) {

        insertArray = []
        insertArray.push(
            { item_id: i.id, type_id: typeIDs[0 + counter].id, name: 'default' },
        )
        await knex('type_persons').insert(insertArray)

        insertArray = []
        insertArray.push(
            { item_id: i.id, type_id: typeIDs[1 + counter].id, datetime: format(new Date(Date.now()+ Math.floor(Math.random()*600000000)),'yyyy-MM-dd')},
        )
        await knex('type_dates').insert(insertArray)

        insertArray = []
        insertArray.push(
            { item_id: i.id, type_id: typeIDs[2 + counter].id, start_date: format(new Date(),'yyyy-MM-dd'), end_date: format(new Date(Date.now() + 300000000), 'yyyy-MM-dd') },
        )
        await knex('type_times').insert(insertArray)

        insertArray = []
        insertArray.push(
            { item_id: i.id, type_id: typeIDs[3 + counter].id },
        )
        const moneyIDs = await knex('type_money').insert(insertArray).returning('*')

        insertArray = []
        for (let moneyID of moneyIDs)
        insertArray.push(
            { type_money_id: moneyID.id, date: format(new Date(Date.now() + Math.floor(Math.random()*300000000)+ 100000000), 'yyyy-MM-dd'), cash_flow: Math.random() > 0.5 ? 0 + Math.floor(Math.random()*50000) : 0 - Math.floor(Math.random()*50000)},
        )
        await knex('transactions').insert(insertArray).returning('*')

        insertArray = []
        for (let stateID of stateIDs) {
            if (stateID.project_id === i.project_id) {
                insertArray.push(
                    { item_id: i.id, type_id: typeIDs[4 + counter].id, state_id: stateID.id+Math.floor(Math.random()*4)},
                )
                break
            }
        }
        await knex('type_status').insert(insertArray)

        insertArray = []
        insertArray.push(
            { item_id: i.id, type_id: typeIDs[5 + counter].id, text: "Default Text" },
        )
        await knex('type_text').insert(insertArray)

        counter += 6 
    }
}
