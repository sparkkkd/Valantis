import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isVisible: false,
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		toggleVisible: (state, action) => {
			state.isVisible = !state.isVisible
		},
	},
})

export default filterSlice.reducer

export const { toggleVisible } = filterSlice.actions
