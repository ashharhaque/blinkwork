import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined 
  } from '@ant-design/icons';
  import {Table,Space,Row, Col, Avatar, Image, Rate, Tag, Input, Button, Tooltip ,Form} from 'antd';
  
  import React, {useRef, useState ,useEffect} from 'react';
  import { useSelector,useDispatch} from 'react-redux';
  import { NavLink ,Navigate, useNavigate} from 'react-router-dom';
 import moment from "moment";
  import api from './../commonFuncs/api';
import {fetchOrderAdmin} from "./../reducers/orders/orderAdminRed";
export default function OrderView(){
    const [tableLoading,setTableLoading] = useState(true);
    const[searchText,setSearchText]=useState("");
    console.log("INSIDE THE ORDER VIEW");
    const dispatch=useDispatch();
    const orders=useSelector((state)=>state.ordersAdminFetch.orders);
    console.log("order reducer=====>",orders);
    const navigate=useNavigate();
    useEffect(()=>{
      fetchOrders()
    },[tableLoading]);
    useEffect(()=>{
      searchTextOrder()
    },[searchText]);
    const searchTextOrder=async ()=>{
      try{
        let result=await api.post(`/api/orders/search`,{
          "text":searchText
        });
        dispatch(fetchOrderAdmin(result.data.data));
      }catch(err){
        console.log("error--->",err.message);
      }
    }
    const fetchOrders=async ()=>{
      try{
        let result=await api.get(`/api/orders/orders`);
        setTableLoading(false)
        dispatch(fetchOrderAdmin(result.data.data));
      }catch(err){
        console.log("error--->",err.message);
      }
    }
    const onNewOrderButtonClick=()=>{
        navigate("/neworder");
    }
    const handleEdit=async(id)=>{
      try{
        // let result=await api.post(`/api/orders/order`,{
        //   productIdsArray:orders,
        //   orderDescription:formData.orderDescription
        // });
        
      }catch(err){
      }
    }
    const handleDelete=async(id)=>{
      try{
        setTableLoading(true)
        console.log("id in delete====>",id)
        let result=await api.delete(`/api/orders/order/${id}`)
        setTableLoading(false)
      }catch(err){
        setTableLoading(false)
      }
    }
    const columns = [
        {
          title: 'S.No',
          key: 'sno',
          render:(record,item,index)=>{
            return index+1
          }
        },
        {
          title: 'Order Id',
          key: 'orderid',
          render:(record,item,index)=>{
            return (
              <>{item._id}</>
            )
          }
        },
        {
          title: 'Order Description',
          key: 'orderDescription',
          render:(record,item,index)=>{
            return (
              <>{item.orderDescription}</>
            )
          }
        },
        {
          title: 'Created At',
          key: 'createdAt',
          render:(record,item,index)=>{
            return (
              <>{moment(item.createdAt).format("DD/MM/YYYY")}</>
            )
          }
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="default">
                <Tooltip title="Edit" placement="left" color={"green"}>
                  <span>
                    <Button onClick={()=>handleEdit()} className='border-0 px-3 py-0'
                    >
                      <EditOutlined />
                    </Button>
                  </span>
                </Tooltip>
                <Tooltip title="Delete" placement="top" color={"blue"}>
                  <span>
                    <Button onClick={()=>{handleDelete(record._id)}} className='border-0 px-0'
                    >
                      <DeleteOutlined />
                    </Button>
                  </span>
                </Tooltip>
               
              </Space>
            ),
            width: "8%"
          }
      ];
    return (
        <>
        <div className='user-list' style={{padding:'20px'}}>
        <Row className='justify-content-between'>
        <Col>
        <h4>Orders</h4>
        </Col>
     <Col>
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
          setSearchText( e.target.value)
         }}
         placeholder="Search by Order Description"
        />
      </Form.Item>
        </Form>
     </Col>
        </Row>
        
        <Table loading={tableLoading} columns={columns} dataSource={orders} />
        <Button  onClick={onNewOrderButtonClick} type="primary">New Order</Button>
        <Row>
        
        </Row>
        </div>
        </>
      );
}