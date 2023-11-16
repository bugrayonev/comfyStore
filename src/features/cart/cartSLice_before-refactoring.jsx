
import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"

const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0,
  };


const cartSlice = createSlice({
    name: "cart",
    initialState: defaultState,
    reducers: {
        addItem: (state,action)=> {
            const {product} = action.payload
            // cartItems da aynı cartID sahip urun varmı diye bakıyoruz eger varsa amount artacak yoksa ayrı renk bir ürün olarak eklenecek
            const item = state.cartItems.find((i) => i.cartID === product.cartID)
            if(item){
               item.amount += product.amount // ürün adetini artır
            }
          else{
            state.cartItems.push(product) // ürün ekle
          }
          state.numItemsInCart += product.amount
          state.cartTotal += product.price * product.amount
          state.tax = 0.1 * state.cartTotal
          state.orderTotal = state.cartTotal + state.shipping + state.tax
          localStorage.setItem("cart", JSON.stringify(state)) // defaultState içindeki tüm bilgileriimiz localStorage kaydetmiş oluyoruz
          toast.success("Item added to cart")
        },
   
        clearCart: (state)=> {},
        rempveItem: (state,action)=> {},
        editItem: (state,action)=> {},
    }
    
})

export  const {addItem,clearCart,rempveItem,editItem} = cartSlice.actions

export default cartSlice.reducer