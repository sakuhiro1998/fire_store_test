import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router'
import persistState from "redux-localstorage";
import userInfo from './reducers/userInfo';
import reservation from './reducers/reservation'

export default function createStore(history) {
    return  compose(persistState())(reduxCreateStore)(
        combineReducers({
            userInfo: userInfo,
            reservation:reservation,
            router: connectRouter(history),
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk)
    )
}