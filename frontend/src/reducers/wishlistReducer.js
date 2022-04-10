import {WISHLIST_ADD_ITEM,WISLIST_REMOVE_ITEM} from '../constants/wishlistConstants'

export const wishlistReducer = (state = { wishlist: []}, action) => {
    switch (action.type) {
        case WISHLIST_ADD_ITEM:
            const item = action.payload
            const existItem = state.wishlist.find(x => x.product === item.product)
            if (existItem) {
                return {
                  ...state,
                  wishlist: state.wishlist.map((x) =>
                    x.product === existItem.product ? item : x
                  ),
                }
              } else {
                return {
                  ...state,
                  wishlist: [...state.wishlist, item],
                }
              }

        case WISLIST_REMOVE_ITEM:
            return {
                ...state,
                wishlist: state.wishlist.filter(x => x.product !== action.payload)
            }
       
            // case CART_CLEAR_ITEMS:
            //   return {
            //     ...state,
            //     wishlist: [],
            //   }

        default:
            return state
    }

}

