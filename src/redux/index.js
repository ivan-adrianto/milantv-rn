import { combineReducers } from 'redux'
import { authReducer } from './AuthRedux'
import { moviesReducer } from './MoviesRedux'

export const rootReducer = combineReducers({
    auth: authReducer, 
    movies: moviesReducer,
})



