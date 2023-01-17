export interface TableState {
    horizontal_order: number | null;
    horizontal_order_id: number;
    item_creator_id: number;
    item_dates_datetime: string;
    item_dates_date: string;
    item_datetime_id: number;
    item_datetime_color: string;
    item_group_id: number;
    item_group_name: string;
    item_id: number;
    item_is_deleted: boolean;
    item_money_cashflow: number;
    item_money_date: string;
    item_name: string;
    item_person_id: number;
    item_person_user_id: number;
    item_person_name: string;
    item_status_color: string;
    item_status_name: string;
    item_text_id: number;
    item_text_text: string;
    item_times_end_date: number;
    item_times_id: number;
    item_times_start_date: number;
    item_times_color: string;
    joined_project_id: number;
    project_creator_id: number;
    project_id: number;
    project_is_deleted: boolean;
    my_favorite_list?: number;
    project_name: string;
    user_id: number;
    role: string;
    state_id: number;
    transaction_id: number;
    vertical_order: number;
    type_name: 'persons' | 'dates' | 'times' | 'money' | 'status' | 'text';
    element_name: string;
}

export interface itemCellsElement {
    item_id: TableState['item_id'];
    item_name: TableState['item_name'];
    type_id: TableState['horizontal_order_id'];
    type_name: TableState['type_name'];
    element_name: TableState['element_name'];
    item_dates_datetime?: TableState['item_dates_datetime'];
    item_dates_date?: TableState['item_dates_date'];
    transaction_id?: Array<TableState['transaction_id']>;
    item_money_cashflow?: Array<TableState['item_money_cashflow']>;
    item_money_date?: Array<TableState['item_money_date']>;
    item_person_user_id?: Array<TableState['item_person_user_id']>;
    item_status_color?: TableState['item_status_color'];
    item_status_name?: TableState['item_status_name'];
    item_text_text?: TableState['item_text_text'];
    item_times_start_date?: TableState['item_times_start_date'];
    item_times_end_date?: TableState['item_times_end_date'];
}

export interface itemsGroupElement {
    item_group_id: TableState['item_group_id'];
    item_group_name: TableState['item_group_name'];
}