import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Form, Row, Col, Input, Button, message, Typography  } from "antd"
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdatePage = () => {
  
  const { Title } = Typography

  const updateForm_layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 24 }
  }

  let { id } = useParams();

  const [ updateForm ] = Form.useForm()

  const [ updateFormLoading, setUpdateFormLoading] = useState(false)

  const formUpdate_initialData = {
    id:"",
    description:""
  }
  
  const [formUpdate_data, setFormUpdate_data] = useState(formUpdate_initialData)

  const formUpdate_initialError = {
    description_status:"",
    description_msg:null,
    description_feed:false
  }

  const [formError_data, setFormError_data] = useState(formUpdate_initialError);

  const getAllData = async () => {
    
    setUpdateFormLoading(true);

    try{
      const response = await axios.get(`https://django-react-render-netlify-server-app.onrender.com/item/item-data-update-api`,{
        params:{
          id:id
        }
      });
      console.log(response.data.item_data);
      
      setFormUpdate_data({
        id:response.data.item_data.id,
        description:response.data.item_data.description
      })

      updateForm.setFieldsValue({
        updateDescription:response.data.item_data.description
      })

      setUpdateFormLoading(false);
    } catch (error) {
      console.log(error);
      setUpdateFormLoading(false);
    }
  }

  useEffect(() => {
    getAllData();
  }, [])

  const formUpdate_handleSubmit = async () => {

    setUpdateFormLoading(true)

    await axios
      .put(`https://django-react-render-netlify-server-app.onrender.com/item/item-data-update-api`, {
        id:formUpdate_data.id,
        description:formUpdate_data.description,
      })
      .then(response => {

        message.success("Updating description success...")

        setUpdateFormLoading({ 
          formLoading:false 
        })

        setFormUpdate_data({
          description:"",
        })

        setFormError_data({
          description_status:"",
          description_msg:null,
          description_feed:false,
        })

        getAllData();

        updateForm.resetFields()

      })
      .catch(error => {

        setUpdateFormLoading(false)

        setFormError_data({
          description_status:error.response.data.description ? "error" : "success",
          description_msg:error.response.data.description,
          description_feed:false,
        })

      })
  }

  const formUpdate_handleClear = () => {

    setFormError_data({
      description_status:"",
      description_msg:null,
      description_feed:false,
    })

    setFormUpdate_data({
      ...formUpdate_data,
      description:"",
    })

    updateForm.resetFields()

  }

  return (
      <>
        <div className="app__bg__form">
          <Form {...updateForm_layout} form={updateForm} layout="vertical" size="large">
                      
            <Title level={4}>Update Description</Title>

            <Form.Item
              label="Description"
              hasFeedback={formError_data.description_feed}
              validateStatus={formError_data.description_status}
              help={formError_data.description_msg}
              id="updateDescription"
              name="updateDescription"
              onChange={ (e) => setFormUpdate_data({ ...formUpdate_data, description:e.target.value }) }
              className="app__input__form"
            >
              <Input placeholder="Description Detail" />
            </Form.Item>
              
            <Col md={24} align="right">

              <Button size="large" className="app__btn__clear" loading={updateFormLoading} onClick={formUpdate_handleClear}>
                Clear
              </Button>

              <Button size="large" className="app__btn__save" type="primary" loading={updateFormLoading} onClick={formUpdate_handleSubmit}>
                Save
              </Button>

            </Col>

          </Form>
        </div>

        <Link to={`/`} className="app_link_btn_main">
          <Button className="app__btn__main" loading={updateFormLoading} size="large"> <strong>RETURN</strong> </Button>
        </Link>
      </>
  )
}

export default UpdatePage
