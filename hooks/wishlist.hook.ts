import { WishlistContext } from "@/context/wishlist.context"
import { useContext } from "react"



export const useWishlist=()=>{
    if(!WishlistContext){
        console.log("useWishlist hook must be used inside wishlist provider")
    }
    return useContext(WishlistContext)
}