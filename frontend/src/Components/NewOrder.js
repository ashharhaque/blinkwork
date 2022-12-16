
  import {Row, Col,Input, Button, Checkbox ,Descriptions, Form} from 'antd';

  import React, {useState ,useEffect} from 'react';
  import { useSelector,useDispatch} from 'react-redux';
  import {  useNavigate} from 'react-router-dom';
 
  import api from './../commonFuncs/api';

 import {fetchProducts} from "./../reducers/products/getProductRed";

export default function NewOrder(){
    const [order,setOrder]=useState([]);
    const dispatch=useDispatch();
    const products=useSelector((state)=>state.products.products);
    let orderDescription=""
   
    const navigate=useNavigate();
    useEffect(()=>{
        fetchProductsSer()
    },[]);
    const fetchProductsSer=async ()=>{
      try{
        let result=await api.get(`/api/products/product`);
        dispatch(fetchProducts(result.data.data));
      }catch(err){
        
      }
    }
    let orders=[];
    const onChecked=async (e,productId)=>{
        
        if(e.target.checked){
            orders.push({_id:productId,quantity:1});
        }
        if(!e.target.checked) {
            orders.splice(order.findIndex(e => e._id ==productId),1);
        }
    }
    const handleCancel=()=>{
      navigate("/order")
    }
    const handleSubmit=()=>{
      formSubmit()
    }
    const formSubmit=async()=>{
      try{
        let result=await api.post(`/api/orders/order`,{
          productIdsArray:orders,
          orderDescription:orderDescription
        });
        
      }catch(err){
      }
    }
    return (
        <>
        <Form>
        <Form.Item
        label="OrderDescription"
        name="orderDescription"
        rules={[
          {
            required: true,
            message: 'Please input orderDescription',
          },
        ]}
      >
        <Input 
         defaultValue={""}
         onChange={(e)=>{
          orderDescription=e.target.value
         }}
         placeholder="Order Description"
        />
      </Form.Item>
        </Form>
       {
        products && products.map(product=>{
            return (
                <>
                  <Row>
            
            <Checkbox onChange={(e)=>onChecked(e,product._id)} >{product.name}</Checkbox>;
            
            <Descriptions>
          <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
      </Descriptions>
            
        </Row>
    
                </>
            )
        })
       }
           <Row>
          <Col><Button onClick={handleCancel}>CANCEL</Button></Col>
          <Col><Button onClick={handleSubmit}>SUBMIT</Button></Col>
        </Row>
        </>
    )
}