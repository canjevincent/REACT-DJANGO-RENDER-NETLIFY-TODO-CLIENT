import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom"
import { Menu, Table, Spin, Button, Space, Dropdown } from 'antd';
import { FormOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import Delete from "./DeletePage"
import axios from "axios"

const MainPage = () => {
  
  const [allData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllData = async () => {
    
    setIsLoading(true);

    try{
      const response = await axios.get("https://django-react-render-netlify-server-app.onrender.com/item/item-data-api");
      console.log(response.data.item_data);
      setData(response.data.item_data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllData();
  }, [])

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'id'
    },
    {
      title: 'Action',
      key: 'id',
      render: (val, obj) => {

        let dropdown_action
        let update = <Menu.Item key="1" ><NavLink to={`update/${obj.id}`}><EditOutlined /> Update</NavLink></Menu.Item>
        let remove = <Menu.Item key="2" onClick={() => deleteForm_showModal(obj.id)}><DeleteOutlined /> Delete</Menu.Item>

        dropdown_action = (
          <Menu>
              {update}
              {remove}
          </Menu>
        )

        return(
          <Space size="middle" key={obj.id}>

            <Dropdown.Button size="small" overlay={dropdown_action}><FormOutlined /></Dropdown.Button>

          </Space>
        )

      },
    },
  ];

  // Delete

  const formDelete_initialError = { formDelete_loading:false, }

  const [formDelete_error, setFormDelete_error] = useState(formDelete_initialError)

  const formDelete_initialData = {
    id:"",
    description:""
  }

  const [formDelete_data, setFormDelete_data] = useState(formDelete_initialData)

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const deleteForm_showModal = (id) => {
    
    setDeleteModalVisible(true)

    axios.get(`https://django-react-render-netlify-server-app.onrender.com/item/item-data-update-api`, {
      params: {
        id: id
      }
    })
    .then(response => {
      
      setFormDelete_error({ formDelete_loading:false })

      setFormDelete_data({ id:response.data.item_data.id, description:response.data.item_data.description })

    })
    .catch(error => {

      setFormDelete_error({ formDelete_loading:false })

    })

  }

  return (
    <>
          <Spin spinning={isLoading} size={"large"}>
            <div className="app__bg__form">
              <Table columns={columns} dataSource={allData} />
            </div>
          </Spin>

          <Link to={`/create`} className="app_link_btn_main">
            <Button className="app__btn__main" loading={isLoading} size="large"> <strong>NEW DESCRIPTION</strong> </Button>
          </Link>

          <Delete deleteModalVisible={deleteModalVisible} setDeleteModalVisible={setDeleteModalVisible} 
                  formDelete_data={formDelete_data} setFormDelete_data={setFormDelete_data}
                  formDelete_error={formDelete_error} setFormDelete_error={setFormDelete_error}
                  setTableRefresh={getAllData} />

    </>
  )
}

export default MainPage
