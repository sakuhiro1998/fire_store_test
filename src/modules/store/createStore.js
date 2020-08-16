import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router'
import userInfo from './reducers/userInfo'

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            userInfo: userInfo,
            router: connectRouter(history),
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk)
    )
}