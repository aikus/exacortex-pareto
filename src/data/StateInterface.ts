import Parameter from "../model/Parameter";
import Row from "../model/Row";
import {ParamsValue} from "../model/ParamsValue";
import BestResult from "../model/BestResult";

export default interface StateInterface {
    params: Array<Parameter>,
    rows: Array<Row>,
    maxes: ParamsValue<number | null>,
    bestResult: BestResult,
    random: number
}