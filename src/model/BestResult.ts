import Row from "./Row";

export default interface BestResult {
    bests: Array<Row>,
    recommendation: Row | null
}