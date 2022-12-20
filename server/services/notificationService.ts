import { Knex } from "knex";

export class NotificationService {
    constructor(private knex: Knex) { }

    async sendMessage(userId: number, targetId: number, text: string) {

        const txn = await this.knex.transaction();

        try {
            const [message] = await txn('notification')
                .insert({
                    sender_id: userId,
                    receiver_id: targetId,
                    message: text
                }).returning('*')

            await txn.commit();
            return message

        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }
}

