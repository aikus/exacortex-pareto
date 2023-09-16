import Row from "./Row";
import Parameter from "./Parameter";
import generator from "./generator";
import {ParamsValue} from "./ParamsValue";
import BestResult from "./BestResult";

const RowHelper = {
    generator: generator,
    createNewRow: (name: string) => {
        return {
            // @ts-ignore
            id: RowHelper.generator(),
            name,
            words: {},
            rates: {},
            squares: {},
            distant: null
        };
    },
    addParameters: (row: Row, parameters: Array<Parameter>) => {
        parameters.forEach((parameter: Parameter) => {
            if (!row.words[parameter.id]) {
                row.words[parameter.id] = "";
            }
            if (!row.rates[parameter.id]) {
                row.rates[parameter.id] = null;
            }
            if (!row.squares[parameter.id]) {
                row.squares[parameter.id] = null;
            }
        });
        return row;
    },
    addParameter: (rows: Array<Row>, parameter: Parameter): Array<Row> => {
        return rows.map<Row>((row: Row) => {
            if(undefined === row.words[parameter.id]) {
                row.words[parameter.id] = "";
            }
            if(undefined === row.rates[parameter.id]) {
                row.rates[parameter.id] = null;
            }
            if(undefined === row.squares[parameter.id]) {
                row.squares[parameter.id] = null;
            }
            return row;
        });
    },
    removeParameter: (rows: Array<Row>, parameter: Parameter): Array<Row> => {
        return rows.map<Row>((row: Row) => {
            if(undefined !== row.words[parameter.id]) {
                delete row.words[parameter.id];
            }
            if(undefined !== row.rates[parameter.id]) {
                delete row.rates[parameter.id];
            }
            if(undefined !== row.squares[parameter.id]) {
                delete row.squares[parameter.id];
            }
            return row;
        });
    },
    getMaxRates: (rows: Array<Row>) => {
        const result: ParamsValue<number | null> = {};
        rows.forEach((row: Row) => Object.entries(row.rates).forEach(([key, value]) => {
            if(!result[key] || (value && value > Number(result[key]))) {
                result[key] = value;
            }
        }));
        return result
    },
    calculateRow: (row: Row, maxes: ParamsValue<number | null>) => {
        let sum = 0,
            canCalculate = true;
        const squares: ParamsValue<number | null> = {};
        Object.entries(maxes).forEach(([key, value]) => {
            if(null === row.rates[key] || null === value) {
                canCalculate = false;
                squares[key] = null;
                return;
            }
            const deltaSquare: number = Math.pow(Number(value) - Number(row.rates[key]), 2);
            squares[key] = deltaSquare;
            sum += deltaSquare;
        });
        return {...row, squares, distant: canCalculate ? Math.pow(sum, 0.5) : null}
    },
    findBestResult: (rows: Array<Row>, random: number) => {
        let result: BestResult = {
            bests: [],
            recommendation: null
        };
        let maxValue = Number.MAX_VALUE,
            returnNull = false;
        rows.forEach((row: Row) => {
            if(returnNull) {
                return;
            }
            if(null === row.distant) {
                returnNull = true;
                result.bests = [];
                result.recommendation = null;
                return;
            }
            if(Number(row.distant) < maxValue) {
                result.bests = new Array(row);
                result.recommendation = row;
                maxValue = Number(row.distant);
                return;
            }
            if(Number(row.distant) === maxValue) {
                result.bests.push(row);
            }
        });
        if(result.bests.length) {
            result.recommendation = result.bests[Math.round(random * (result.bests.length - 1))];
        }
        return result;
    }
};

export default RowHelper;