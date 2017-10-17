import constants from '../constants'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is a sample reducer or user management. If you remove 
	and use your own reducers, remember to update the store 
	file (../stores/index.js) with your reducers.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/



export default (state = [], action) => {
    let newState = []
	switch (action.type) {

        case constants.ALL_PRODUCTS:
            newState = action.data
            return newState

		default:
			return state
	}
}