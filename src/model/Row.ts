import {ParamsValue} from "./ParamsValue";

export default interface Row {
    id: string,
    name: string,
    words: ParamsValue<string>,
    rates: ParamsValue<number|null>,
    squares: ParamsValue<number|null>,
    distant: number|null
}