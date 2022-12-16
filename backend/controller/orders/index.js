const ProductModel=require("./../../model/product");
const OrderModel=require("./../../model/orders");
const createOrder=async(req,res)=>{
   
        try{
            const {productIdsArray,orderDescription}=req.body;
            if(!productIdsArray.length){
                res.status(404).json({
                    status:404,
                    message:"Empty order cart",
                    data:{

                    }
                });
                return ;
            }
            console.log("req.body---->",req.body)
           let products=await Promise.all(productIdsArray.map(async (product)=>{
            let newProduct=await  ProductModel.findOneAndUpdate({_id:product._id,quantity:{$gt:0}},{$inc:{quantity:-product.quantity}},{new:true}).select({name:1,description:1,price:1,quantity:1}).lean();
            return newProduct;
           }))
           console.log("products============>".red.bold,products);
            if(!products.length){
                res.status(404).json({
                    status:404,
                    message:"There is no such product",
                    data:{

                    }
                })
                return ;
            }
      
           
            const order=await OrderModel.create({
               products:products,
               orderDescription,
            })
            res.status(200).json({
                status:200,
                message:"Successfully created order",
                data:{
                 order
                }
            })
            return ;
        }catch(err){
            console.log("errr in create product====>",err.message);
            res.status(500).json({
                status:500,
                message:"Something went wrong",
                data:{

                }
            })
            return 
        }
 
}

const getAllOrders=async(req,res)=>{
    try{
        const allOrders=await OrderModel.find({}).lean();
        res.status(200).json({
            status:200,
            message:"Successfully fetched all the orders",
            data:{
                orders:allOrders
            }
        })
    }catch(err){
        console.log("err in get all orders====>",err.message);
        res.status(500).json({
            status:500,
            message:"Something went wrong",
            data:{

            }
        })
    }
}

const getSingleOrder=async(req,res)=>{
    try{
        console.log("req.params=====>",req.params);
        const order=await OrderModel.findOne({_id:req.params.id}).lean();
        if(!order){
            res.status(404).json({
                status:404,
                message:"There is no such order",
                data:{

                }
            })
        }
        res.status(200).json({
            status:200,
            message:"Successfully fetched all the orders",
            data:{
                orders:order
            }
        })
    }catch(err){
        console.log("err in get single order====>",err.message);
        res.status(500).json({
            status:500,
            message:"Something went wrong",
            data:{

            }
        })
    }
}

const updateSingleOrder=async(req,res)=>{
    try{
        console.log("req.body=====>",req.body);
        const {id,orderDescription}=req.body;
        const order=await OrderModel.findOneAndUpdate({_id:id},{
            orderDescription:orderDescription
        },{new:true}).lean();
        if(!order){
            res.status(404).json({
                status:404,
                message:"There is no such order",
                data:{

                }
            })
            return
        }
        res.status(200).json({
            status:200,
            message:"Successfully updated the order",
            data:{
               order:order
            }
        })
        return
    }catch(err){
        console.log("err in get single order====>",err.message);
        res.status(500).json({
            status:500,
            message:"Something went wrong",
            data:{

            }
        })
        return 
    }
}

const removeSingleOrder=async(req,res)=>{
    try{
        console.log("req.params=====>",req.params);
        const order=await OrderModel.findOneAndDelete({_id:req.params.id}).lean();
        res.status(200).json({
            status:200,
            message:"Successfully deleted the order",
            data:{
               
            }
        })
        return
    }catch(err){
        console.log("err in get delete order====>",err.message);
        res.status(500).json({
            status:500,
            message:"Something went wrong",
            data:{

            }
        })
        return
    }
}

const searchTextDesc=async(req,res)=>{
    try{
        const text=req.body.text;
        if(!text){
            res.status(404).json({
                status:404,
                message:"No text.Please provide",
                data:{

                }
            })
            return 
        }
        const orders=await OrderModel.find({$text:{$search:text}}).sort({score:{$meta:"textScore"}}).lean();
        res.status(200).json({
            status:200,
            message:"Orders based on text are fetched",
            data:{
                orders:orders
            }
        })
        return
    }catch(err){
        console.log("err in searchTextDesc====>",err.message);
        res.status(500).json({
            status:500,
            message:"Something went wrong",
            data:{
                
            }
        })
        return
    }
}

module.exports={
    createOrder,
    getAllOrders,
    getSingleOrder,
    removeSingleOrder,
    updateSingleOrder,
    searchTextDesc
}