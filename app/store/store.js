import { createStore } from 'redux'
import rootReducer from '../reducers/reducer.js'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        // 触发 redux-devtools
        window.devToolsExtension && _DEV_ ? window.devToolsExtension() : undefined
    );
    return store;
}