import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js'

const password = 'Valantis'
const timestamp = new Date().toISOString().slice(0, 10).split('-').join('')
const data = `${password}_${timestamp}`

const authorizationString = CryptoJS.MD5(data).toString()

const initialState = {
	goods: [],
	isLoading: false,
	isError: false,
}

// Get all IDs
export const fetchGoods = createAsyncThunk(
	'goods/fetchIds',
	async (_, { rejectWithValue }) => {
		try {
			const getAllIds = await fetch('http://api.valantis.store:40000/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth': authorizationString,
				},
				body: JSON.stringify({
					action: 'get_ids',
					params: { limit: 30 },
				}),
			})

			const allIds = await getAllIds.json()

			const getAllGoods = await fetch('http://api.valantis.store:40000/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth': authorizationString,
				},
				body: JSON.stringify({
					action: 'get_items',
					params: { ids: allIds.result },
				}),
			})

			const { result } = await getAllGoods.json()
			return result
		} catch (error) {
			rejectWithValue(error)
		}
	}
)

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchGoods.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(fetchGoods.fulfilled, (state, action) => {
			state.isLoading = false

			// Удаление из массива объекта с одинаковым ID и с пустым полем brand
			const result = Object.values(
				action.payload.reduce(
					(acc, n) => ((acc[n.id] = n.brand ? n : acc[n.id] || n), acc),
					{}
				)
			)

			state.goods = result
		})
		builder.addCase(fetchGoods.rejected, (state, action) => {
			state.isLoading = false
			state.goods = []
			console.log(action.error)
		})
	},
})

export default goodsSlice.reducer
