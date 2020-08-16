const initialState = {
    userId: "aaaaa",
    userName: ""
};

export default function userInfo(state = initialState, action) {
    var newState;
    switch (action.type) {
        case "SET_USER_INFO":
            newState = Object.assign({}, state);
            return newState.input = action.payload.userInfo;

        default:
            return state;
    }
};

export function setUserInfo(input) {
    return dispatch => {
        dispatch({
            type: "SET_USER_INFO",
            payload: {
                input
            }
        });
    };
};