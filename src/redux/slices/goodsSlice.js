import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js'

const password = 'Valantis'
const timestamp = new Date().toISOString().slice(0, 10).split('-').join('')
const data = `${password}_${timestamp}`

const authorizationString = CryptoJS.MD5(data).toString()

const initialState = {
	goods: [],
	currentGoods: [],
	brands: [],
	isLoading: false,
	isError: false,
}

// Test fetch

export const fetchPagination = createAsyncThunk(
	'goods/fetchPagination',
	async ({ limit }, { rejectWithValue }) => {
		try {
			const goods = await fetch('http://api.valantis.store:40000/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth': authorizationString,
				},
				body: JSON.stringify({
					action: 'get_ids',
					params: { offset: 9, limit: 9 },
				}),
			})
		} catch (error) {
			rejectWithValue(error)
		}
	}
)

// Get all IDs and Products
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

// Get all Brands
export const fetchBrands = createAsyncThunk(
	'goods/fetchBrands',
	async (_, { rejectWithValue }) => {
		try {
			const getAllBrands = await fetch('http://api.valantis.store:40000/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth': authorizationString,
				},
				body: JSON.stringify({
					action: 'get_fields',
					params: { field: 'brand', limit: 100 },
				}),
			})
			const result = await getAllBrands.json()
			return result
		} catch (error) {
			rejectWithValue(error)
		}
	}
)

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		filter: (state, action) => {
			// Если указан бренд
			if (action.payload.brand) {
				if (action.payload.brand === 'all') {
					state.currentGoods = state.goods
				} else {
					state.currentGoods = state.goods.filter(
						(good) => good.brand === action.payload.brand
					)
				}
			}

			// Если указана цена
			if (action.payload.price) {
				if (action.payload.price === 'lower') {
					state.currentGoods = state.currentGoods.sort(
						(a, b) => b.price - a.price
					)
				} else {
					state.currentGoods = state.currentGoods.sort(
						(a, b) => a.price - b.price
					)
				}
			}

			// if (action.payload.name) {
			// 	state.currentGoods = state.currentGoods.filter(good => good.name.toLowerCase().includes())
			// }
		},
	},
	extraReducers: (builder) => {
		// Fetch all IDs and Products
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
			state.currentGoods = result
		})
		builder.addCase(fetchGoods.rejected, (state, action) => {
			state.isLoading = false
			state.goods = []
			console.log(action.error)
		})

		// Fetch all Brands
		builder.addCase(fetchBrands.pending, (state, action) => {})
		builder.addCase(fetchBrands.fulfilled, (state, action) => {
			const { result } = action.payload
			const brands = result.filter((item) => item != null)
			state.brands = brands
		})
		builder.addCase(fetchBrands.rejected, (state, action) => {})
	},
})

export const { filter } = goodsSlice.actions
export default goodsSlice.reducer
