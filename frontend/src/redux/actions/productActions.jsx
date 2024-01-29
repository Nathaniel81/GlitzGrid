// /*eslint-disable*/
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from "../slices/productSlices/productSlice";
import { fetchProductDetailStart, fetchProductDetailFailure, fetchProductDetailSuccess } from "../slices/productSlices/productDetailSlice";
import { createReviewSuccess, createReviewStart, createReviewFailure } from "../slices/productSlices/productReviewCreateSlice";
import { productDeleteStart, productDeleteSuccess, productDeleteFailure } from "../slices/productSlices/productDeleteSlice";
import { productUpdateStart, productUpdateSuccess, productUpdateFailure } from "../slices/productSlices/productUpdateSlice";
import { productCreateStart, productCreateSuccess, productCreateFailure } from "../slices/productSlices/productCreateSlice";
import axios from 'axios'

  export const fetchProducts = (keyword='') => async (dispatch) => {
	try {
		dispatch(fetchProductsStart());
		const { data } = await axios.get(`/api/products${keyword}`)
		dispatch(fetchProductsSuccess(data));
	} catch (error) {
		dispatch(fetchProductsFailure(error));
	}
  };

  export const fetchProductDetail = (id) => async (dispatch) => {
	try {
		dispatch(fetchProductDetailStart());
		const { data } = await axios.get(`/api/products/detail/${id}`)
		dispatch(fetchProductDetailSuccess(data));
	} catch (error) {
		dispatch(fetchProductDetailFailure(error));
	}
  };

  export const createProductReview = (id, review) => async (dispatch, getState) => {
	try {
		dispatch(createReviewStart());
		const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }
		const { data } = await axios.post(
			`/api/products/${id}/review/`,
			review,
			config
			)
		dispatch(createReviewSuccess(data));
	} catch (error) {
		dispatch(createReviewFailure(error));
	}
  };

  export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch(productDeleteStart())

		const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )

        dispatch(productDeleteSuccess(data))


    } catch (error) {
        dispatch(productDeleteFailure(error))
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch(productUpdateStart())

		const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.put(
            `/api/products/update/${product.id}/`,
            product,
            config
        )
        dispatch(productUpdateSuccess(data))

        dispatch(fetchProductDetailSuccess(data))


    } catch (error) {
        dispatch(productUpdateFailure(error))
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch(productCreateStart())

		const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
        dispatch(productCreateSuccess(data))


    } catch (error) {
        dispatch(productCreateFailure(error))
    }
}
