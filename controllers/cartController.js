import userModel from "../models/userModel.js";


//add to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:cartData});
        return res.status(200).json({message:"Added to cart successfully"})
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }   

} 

//remove from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;         
        if(cartData[req.body.itemId]){
            if(cartData[req.body.itemId] === 1){
                delete cartData[req.body.itemId];
            }
            else{
                cartData[req.body.itemId] -= 1;
            }
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:cartData});
        return res.status(200).json({message:"Removed from cart successfully"})
    } catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }   

}

//get cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;         
        res.json({success: true, cartData})
    } catch (error) {
        console.error("Error getting cart data:", error);
        res.json({ success: false, message: "Internal server error" });
    }   

}

export { addToCart, removeFromCart, getCart };