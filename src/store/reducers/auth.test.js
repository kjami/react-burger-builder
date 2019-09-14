import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer tests', () => {
    it('check initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            loading: false,
            error: false
        });
    });

    it('check auth success', () => {
        expect(reducer({
            token: null,
            userId: null,
            loading: false,
            error: false
        }, {
            type: actionTypes.AUTH_SUCCESS,
            payload: {
                token: 'abcd',
                userId: 'kishor'
            }
        })).toEqual({
            token: 'abcd',
            userId: 'kishor',
            loading: false,
            error: false
        })
    })
});