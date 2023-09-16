import {idGenerator} from "./generator";
import RowHelper from "./RowHelper";
import Row from "./Row";
import Parameter from "./Parameter";
import {ParamsValue} from "./ParamsValue";
import BestResult from "./BestResult";

test("create new row", () => {
    const mockIdGenerator: idGenerator = () => '123';
    RowHelper.generator = mockIdGenerator;

    const actual = RowHelper.createNewRow("test");

    expect<Row>(actual).toEqual({
        id: "123",
        name: "test",
        words: {},
        rates: {},
        squares: {},
        distant: null
    });
});

test("add parameters", () => {
    const row: Row = {
            id: "123",
            name: "test",
            words: {},
            rates: {},
            squares: {},
            distant: null
        },
        parameters: Array<Parameter> = [{id: "123", name: "name"}, {id: "321", name: "eman"}],
        expected: Row = {
            id: "123",
            name: "test",
            words: {
                "123": "",
                "321": ""
            },
            rates: {
                "123": null,
                "321": null
            },
            squares: {
                "123": null,
                "321": null
            },
            distant: null
        };

    const actual = RowHelper.addParameters(row, parameters);

    expect<Row>(actual).toEqual(expected);
});

test("add parameter", () => {
    const rows: Array<Row> = [{
            id: "123",
            name: "test",
            words: {},
            rates: {},
            squares: {},
            distant: null
        }, {
            id: "321",
            name: "test",
            words: {
                "test": "abc"
            },
            rates: {
                "test": 7
            },
            squares: {
                "test": 0
            },
            distant: null
        }],
        param: Parameter = {
            id: "test",
            name: "name"
        },
        expected: Array<Row> = [{
            id: "123",
            name: "test",
            words: {
                "test": "",
            },
            rates: {
                "test": null
            },
            squares: {
                "test": null
            },
            distant: null
        }, {
            id: "321",
            name: "test",
            words: {
                "test": "abc"
            },
            rates: {
                "test": 7
            },
            squares: {
                "test": 0
            },
            distant: null
        }];

    const actual = RowHelper.addParameter(rows, param);

    expect<Array<Row>>(actual).toEqual(expected);
});

test("remove parameter", () => {
    const rows: Array<Row> = [{
            id: "123",
            name: "test",
            words: {
                "test": "asdfa",
                "123": 'fasssdfsa',
            },
            rates: {
                "test": 71,
                "123": 52,
            },
            squares: {
                "test": 30,
                "123": 54,
            },
            distant: null
        }, {
            id: "321",
            name: "test",
            words: {
                "test": "abc",
                "123": 'asaf',
            },
            rates: {
                "test": 7,
                "123": 5,
            },
            squares: {
                "test": 0,
                "123": 5,
            },
            distant: null
        }],
        param: Parameter = {
            id: "test",
            name: "name"
        },
        expected: Array<Row> = [{
            id: "123",
            name: "test",
            words: {
                "123": 'fasssdfsa',
            },
            rates: {
                "123": 52,
            },
            squares: {
                "123": 54,
            },
            distant: null
        }, {
            id: "321",
            name: "test",
            words: {
                "123": 'asaf',
            },
            rates: {
                "123": 5,
            },
            squares: {
                "123": 5,
            },
            distant: null
        }];

    const actual = RowHelper.removeParameter(rows, param);

    expect<Array<Row>>(actual).toEqual(expected);
});

test("calc max value", () => {
    const rows: Array<Row> = [{
            id: "123",
            name: "test",
            words: {},
            rates: {
                "test": 71,
                "123": 5,
            },
            squares: {},
            distant: null
        }, {
            id: "321",
            name: "test",
            words: {},
            rates: {
                "test": 7,
                "123": 52,
            },
            squares: {},
            distant: null
        }],
        expected = {
            "test": 71,
            "123": 52
        };

    const actual = RowHelper.getMaxRates(rows);

    expect<ParamsValue<number | null>>(actual).toEqual(expected);
});

test("calc max value with null parameter", () => {
    const rows: Array<Row> = [{
            id: "123",
            name: "test",
            words: {},
            rates: {
                "test": 71,
                "123": null,
            },
            squares: {},
            distant: null
        }, {
            id: "321",
            name: "test",
            words: {},
            rates: {
                "test": 7,
                "123": null,
            },
            squares: {},
            distant: null
        }],
        expected = {
            "test": 71,
            "123": null
        };

    const actual = RowHelper.getMaxRates(rows);

    expect<ParamsValue<number | null>>(actual).toEqual(expected);
});

test("calc rows", () => {
    const row: Row = {
            id: "123",
            name: "test",
            words: {},
            rates: {
                "test": 1,
                "123": 2,
            },
            squares: {},
            distant: null
        },
        maxes: ParamsValue<number | null> = {
            "test": 3,
            "123": 2,
        },
        expected: Row = {

            id: "123",
            name: "test",
            words: {},
            rates: {
                "test": 1,
                "123": 2,
            },
            squares: {
                "test": 4,
                "123": 0,
            },
            distant: 2
        };

    const actual = RowHelper.calculateRow(row, maxes);

    expect<Row>(actual).toEqual(expected);
});

test("calc rows with null parameter", () => {
    const row: Row = {
            id: "123",
            name: "test",
            words: {},
            rates: {
                "test": 1,
                "123": null,
            },
            squares: {},
            distant: null
        },
        maxes: ParamsValue<number | null> = {
            "test": 3,
            "123": 2,
        },
        expected: Row = {

            id: "123",
            name: "test",
            words: {},
            rates: {
                "test": 1,
                "123": null,
            },
            squares: {
                "test": 4,
                "123": null,
            },
            distant: null
        };

    const actual = RowHelper.calculateRow(row, maxes);

    expect<Row>(actual).toEqual(expected);
});

test("calc rows with null max", () => {
    const row: Row = {
            id: "123",
            name: "test",
            words: {},
            rates: {
                "test": 1,
                "123": 2,
            },
            squares: {},
            distant: null
        },
        maxes: ParamsValue<number | null> = {
            "test": 3,
            "123": null,
        },
        expected: Row = {

            id: "123",
            name: "test",
            words: {},
            rates: {
                "test": 1,
                "123": 2,
            },
            squares: {
                "test": 4,
                "123": null,
            },
            distant: null
        };

    const actual = RowHelper.calculateRow(row, maxes);

    expect<Row>(actual).toEqual(expected);
});

test("get best result", () => {
    const bestRow = {
            id: "123",
            name: "test",
            words: {},
            rates: {},
            squares: {},
            distant: 1
        },
        rows: Array<Row> = [bestRow, {
            id: "321",
            name: "test1",
            words: {},
            rates: {
                "test": 7,
                "123": null,
            },
            squares: {},
            distant: 1000
        }],
        expected: BestResult = {
            bests: [bestRow],
            recommendation: bestRow
        };

    const actual: BestResult = RowHelper.findBestResult(rows, Math.random());

    expect<BestResult>(actual).toEqual(expected);
});

test("get best result with null distant", () => {
    const bestRow = {
            id: "123",
            name: "test",
            words: {},
            rates: {},
            squares: {},
            distant: 1
        },
        rows: Array<Row> = [bestRow, {
            id: "321",
            name: "test1",
            words: {},
            rates: {
                "test": 7,
                "123": null,
            },
            squares: {},
            distant: null
        }],
        expected: BestResult = {
            bests: [],
            recommendation: null
        };

    const actual: BestResult = RowHelper.findBestResult(rows, Math.random());

    expect<BestResult>(actual).toEqual(expected);
});

test("get best result two best result recom - first", () => {
    const bestRow1 = {
            id: "123",
            name: "test",
            words: {},
            rates: {},
            squares: {},
            distant: 1
        },
        bestRow2 = {
            id: "124",
            name: "tes",
            words: {},
            rates: {},
            squares: {},
            distant: 1
        },
        rows: Array<Row> = [bestRow1, {
            id: "321",
            name: "test1",
            words: {},
            rates: {
                "test": 7,
                "123": null,
            },
            squares: {},
            distant: 10000
        }, bestRow2],
        expected: BestResult = {
            bests: [bestRow1, bestRow2],
            recommendation: bestRow1
        };

    const actual: BestResult = RowHelper.findBestResult(rows, 0.4);

    expect<BestResult>(actual).toEqual(expected);
});

test("get best result two best result recom - second", () => {
    const bestRow1 = {
            id: "123",
            name: "test",
            words: {},
            rates: {},
            squares: {},
            distant: 1
        },
        bestRow2 = {
            id: "124",
            name: "tes",
            words: {},
            rates: {},
            squares: {},
            distant: 1
        },
        rows: Array<Row> = [bestRow1, {
            id: "321",
            name: "test1",
            words: {},
            rates: {
                "test": 7,
                "123": null,
            },
            squares: {},
            distant: 10000
        }, bestRow2],
        expected: BestResult = {
            bests: [bestRow1, bestRow2],
            recommendation: bestRow2
        };

    const actual: BestResult = RowHelper.findBestResult(rows, 0.51);

    expect<BestResult>(actual).toEqual(expected);
});