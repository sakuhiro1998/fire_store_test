const initialState = {
    roomA:{
        day:[],
        empty:[]
    },
    roomB:{
        day:[],
        empty:[]
    }
};

export default function reservation(state = initialState, action) {
    var newState;
    switch (action.type) {
        case 'SET_RESERVE_INFO':
            newState = Object.assign({}, state);
            return newState = action.payload;

        default:
            return state;
    }
};

export function setReserveInfo(input) {
    return dispatch => {
        dispatch({
            type: 'SET_RESERVE_INFO',
            payload: {
                roomA:input[0],
                roomB:input[1]
            }
        });
    };
};