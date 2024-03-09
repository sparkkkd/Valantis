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

// Pagination fetch
export const fetchPagination = createAsyncThunk(
	'goods/fetchPagination',
	async ({ offset, limit }, { rejectWithValue }) => {
		try {
			const goodsIds = await fetch('https://api.valantis.store/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth': authorizationString,
				},
				body: JSON.stringify({
					action: 'get_ids',
					params: { offset, limit },
				}),
			})

			const { result } = await goodsIds.json()

			const goods = await fetch('https://api.valantis.store/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth': authorizationString,
				},
				body: JSON.stringify({
					action: 'get_items',
					params: { ids: result },
				}),
			})

			return await goods.json().then((data) => data.result)
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

// Get all Brands
export const fetchBrands = createAsyncThunk(
	'goods/fetchBrands',
	async (_, { rejectWithValue }) => {
		try {
			const getAllBrands = await fetch('https://api.valantis.store/', {
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
			rejectWithValue(error.message)
		}
	}
)

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		filter: (state, action) => {
			// По бренду
			if (action.payload.brand) {
				if (action.payload.brand === 'all') {
					state.currentGoods = state.goods
				} else {
					state.currentGoods = state.goods.filter(
						(good) => good.brand === action.payload.brand
					)
				}
			}

			// По цене
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

			// По имени
			if (action.payload.name) {
				if (!action.payload.name) {
					state.currentGoods = state.goods
				} else {
					state.currentGoods = state.goods.filter(({ product }) =>
						product.includes(action.payload.name)
					)
					console.log(action.payload.name)
				}
			}
		},
	},
	extraReducers: (builder) => {
		// Fetch all Brands
		builder.addCase(fetchBrands.pending, (state, action) => {})
		builder.addCase(fetchBrands.fulfilled, (state, action) => {
			const { result } = action?.payload
			const brands = result.filter((item) => item != null)
			state.brands = brands
		})
		builder.addCase(fetchBrands.rejected, (state, action) => {
			console.log(action.error)
		})

		// Fetch pagination
		builder.addCase(fetchPagination.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(fetchPagination.fulfilled, (state, action) => {
			state.isLoading = false
			// Unique ids
			const result = Object.values(
				action?.payload.reduce(
					(acc, n) => ((acc[n.id] = n.brand ? n : acc[n.id] || n), acc),
					{}
				)
			)

			state.goods = result
			state.currentGoods = result
		})
		builder.addCase(fetchPagination.rejected, (state, action) => {
			console.log(action.error)
			state.isLoading = false
			state.isError = true
		})
	},
})

export const { filter } = goodsSlice.actions
export default goodsSlice.reducer
