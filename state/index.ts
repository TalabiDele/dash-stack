import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	persistReducer,
	persistStore,
	FLUSH, // Added for ignored actions in middleware
	REHYDRATE, // Added for ignored actions in middleware
	PAUSE, // Added for ignored actions in middleware
	PERSIST, // Added for ignored actions in middleware
	PURGE, // Added for ignored actions in middleware
	REGISTER, // Added for ignored actions in middleware
	PersistConfig, // Imported for explicit typing
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { dashboardApi } from './services/dashboadService'

const rootReducer = combineReducers({
	[dashboardApi.reducerPath]: dashboardApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<RootState> = {
	key: 'root',
	storage,
	whitelist: [''],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types to prevent serialization warnings from redux-persist
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(dashboardApi.middleware),
})

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
