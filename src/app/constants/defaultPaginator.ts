import Paginator from "../interfaces/paginator";

export const defaultPaginator: Paginator = {
    rows: 10,
    first: 0,
    page: 0,
    totalRecords: 0,
    pagesVisited: 0,
    loaded: false,
}