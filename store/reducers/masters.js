import update from 'immutability-helper';
import * as types from '../types/masters';

const initialState = {
    cstItems: {
        byTypeValue: null,
        byParentId: null,
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.cstItemsByParentId: {
            const updatedState = update(state, {
                cstItems: { byParentId: { $set: action.payload } },
            });
            return updatedState;
        }

        case types.cstItemsByTypeValue: {
            const updatedState = update(state, {
                cstItems: { byTypeValue: { $set: action.payload } },
            });
            return updatedState;
        }

        case types.logout: {
            return initialState;
        }
        default:
            return state;
    }
};
