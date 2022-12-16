const ProductModel=require("./../../model/product");

const createProduct=async(req,res)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const {name,description,price,quantity}=req.body;
            console.log("req.body---->",req.body)
            const product=await ProductModel.create({
                name,
                description,
                price,
                quantity
            })
            res.status(200).json({
                status:200,
                message:"Successfully created the product",
                data:{
                    product
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
    })
}
const getProducts=async(req,res)=>{
    try{
        const products=await ProductModel.find({})
        res.status(200).json({
            status:200,
            message:"Successfully got the products",
            data:{
                products
            }
        })
        return ;
    }catch(err){
        console.log("errr in get  product====>",err.message);
        res.status(500).json({
            status:500,
            message:"Something went wrong",
            data:{

            }
        })
        return ;
    }
}
module.exports={
    createProduct,
    getProducts
}