import { configureStore } from '@reduxjs/toolkit'
import goodsSlice from '../slices/goodsSlice'

export default configureStore({
	reducer: {
		goods: goodsSlice,
	},
})
