import { configureStore } from '@reduxjs/toolkit'
import goodsSlice from '../slices/goodsSlice'
import filterSlice from '../slices/filterSlice'

export default configureStore({
	reducer: {
		goods: goodsSlice,
		filter: filterSlice,
	},
})
