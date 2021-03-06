const initialState = {
    userId:'',
    userName: '',
    reserveDay: '',
    reserveNum:'',
    room:''
};

export default function userInfo(state = initialState, action) {
    var newState;
    switch (action.type) {
        case 'SET_USER_INFO':
            newState = Object.assign({}, state);
            return newState = action.payload;

        default:
            return state;
    }
};

export function setUserInfo(input) {
    return dispatch => {
        dispatch({
            type: 'SET_USER_INFO',
            payload: {
                userId: input.id,
                userName: input.name,
                reserveDay: input.reservation,
                reserveNum: input.reserveNum,
                room: input.room
            }
        });
    };
};