import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined 
  } from '@ant-design/icons';
  import {Table,Space,Row, Col, Avatar, Image, Rate, Tag, Input, Button, Tooltip } from 'antd';
  import { NavLink ,Navigate, useNavigate} from 'react-router-dom';
const columns = [
    {
      title: 'S.No',
      key: 'sno',
      render:(record,item,index)=>{
        return index+1
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">


         <Tooltip title="View" placement="top" color={'blue'}>
<span><NavLink to='/viewrestaurantdata' state={{singleRestaurant:record}}

className=""><EyeOutlined /></NavLink></span>
</Tooltip>
        </Space>
      ),
    },
  ];

export default columns
