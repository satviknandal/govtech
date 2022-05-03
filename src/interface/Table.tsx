export interface iTableData {
    avatar: string,
    email: string,
    first_name: string,
    id: number,
    last_name: string,
    action?: undefined
};

export interface iTable {
    data: Array<iTableData>,
    page: Number,
    per_page: Number,
    support: Object,
    total: Number,
    total_pages: Number
};
