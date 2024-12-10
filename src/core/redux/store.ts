import { AnyAction, applyMiddleware } from 'redux';
import { ThunkAction, thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createInjectStore, injectReducer as iR } from 'redux-reducers-injector';

import uiSlice from './slice';

export const store = createInjectStore(
    {
        ui: uiSlice.reducer,
    },
    composeWithDevTools(applyMiddleware(thunk)),
);

export const injectReducer = (name: string, reducer: object) => iR(name, reducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
