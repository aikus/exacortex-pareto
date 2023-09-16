import {createSlice, Draft, PayloadAction, SliceCaseReducers} from "@reduxjs/toolkit";
import Parameter from "../model/Parameter";
import Row from "../model/Row";
import StateInterface from "./StateInterface";
import RowHelper from "../model/RowHelper";

const initialState:StateInterface = {
    params: new Array<Parameter>(),
    rows: new Array<Row>(),
    maxes: {},
    bestResult: {
        bests: new Array<Row>(),
        recommendation: null
    },
    random: Math.random()
};

const table = createSlice<StateInterface, SliceCaseReducers<StateInterface>>({
    name: 'table',
    initialState,
    reducers: {
        addParameter: function (state: Draft<StateInterface>, action: PayloadAction<Parameter>) {
            state.params.push(action.payload);
            const tempRows = RowHelper.addParameter(state.rows, action.payload);
            state.maxes = RowHelper.getMaxRates(tempRows);
            state.rows = tempRows.map((row: Row) => RowHelper.calculateRow(row, state.maxes));
            state.bestResult = RowHelper.findBestResult(state.rows, state.random);
        },
        setParameter: function (state: Draft<StateInterface>, action: PayloadAction<Parameter>) {
            state.params = state.params.map((parameter: Parameter) => parameter.id === action.payload.id ? action.payload : parameter);
        },
        removeParameter: function (state: Draft<StateInterface>, action: PayloadAction<Parameter>) {
            state.params = state.params.filter((parameter: Parameter) => parameter.id !== action.payload.id);
            const tempRows = RowHelper.removeParameter(state.rows, action.payload);
            state.maxes = RowHelper.getMaxRates(tempRows);
            state.rows = tempRows.map((row: Row) => RowHelper.calculateRow(row, state.maxes));
            state.bestResult = RowHelper.findBestResult(state.rows, state.random);

        },
        addRow: function (state: Draft<StateInterface>, action: PayloadAction<Row>) {
            state.rows.push(RowHelper.addParameters(action.payload, state.params));
            state.maxes = RowHelper.getMaxRates(state.rows);
            state.rows = state.rows.map((row: Row) => RowHelper.calculateRow(row, state.maxes));
            state.bestResult = RowHelper.findBestResult(state.rows, state.random);
        },
        setRow: function (state: Draft<StateInterface>, action: PayloadAction<Row>) {
            // @ts-ignore
            state.rows = state.rows.map((row: Row) => row.id === action.payload.id ? action.payload : row);
            state.maxes = RowHelper.getMaxRates(state.rows);
            state.rows = state.rows.map((row: Row) => RowHelper.calculateRow(row, state.maxes));
            state.bestResult = RowHelper.findBestResult(state.rows, state.random);
        },
        removeRow: function (state: Draft<StateInterface>, action: PayloadAction<Row>) {
            state.rows = state.rows.filter((row: Row) => row.id !== action.payload.id);
            state.maxes = RowHelper.getMaxRates(state.rows);
            state.rows = state.rows.map((row: Row) => RowHelper.calculateRow(row, state.maxes));
            state.bestResult = RowHelper.findBestResult(state.rows, state.random);
        }
    }
});

const {actions, reducer} = table;

export const {addParameter, setParameter, removeParameter, addRow, setRow, removeRow} = actions;
export default reducer;