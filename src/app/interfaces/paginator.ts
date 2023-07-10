export default interface Paginator {
    rows: number;
    page: number;
    totalRecords: number;
    first: number;
    pagesVisited: number;
}