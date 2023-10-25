import { useState } from "react";
import { Link } from "react-router-dom"
import { Form, Col, Input, Button, message, Typography  } from "antd"
import axios from "axios";

const CreatePage = () => {

  const { Title } = Typography

  const createForm_layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 24 }
  }

  const [ createForm ] = Form.useForm()

  const [ createFormLoading, setCreateFormLoading] = useState(false)

  const formCreate_initialData = {
    description:""
  }
  
  const [formCreate_data, setFormCreate_data] = useState(formCreate_initialData)

  const formCreate_initialError = {
    description_status:"",
    description_msg:null,
    description_feed:false
  }

  const [formError_data, setFormError_data] = useState(formCreate_initialError);

  const formCreate_handleSubmit = async () => {

    setCreateFormLoading(true)

    await axios
      .post("https://django-react-render-netlify-server-app.onrender.com/item/item-data-api", {
        description:formCreate_data.description,
      })
      .then(response => {

        message.success("Creating new description success...")

        setCreateFormLoading(false)

        setFormCreate_data({
          description:"",
        })

        setFormError_data({
          description_status:"",
          description_msg:null,
          description_feed:false,
        })

        createForm.resetFields()

      })
      .catch(error => {

        setCreateFormLoading(false)

        setFormError_data({
          description_status:error.response.data.description ? "error" : "success",
          description_msg:error.response.data.description,
          description_feed:false,
        })

      })
  }

  const formCreate_handleClear = () => {

    setFormError_data({
      description_status:"",
      description_msg:null,
      description_feed:false,
    })

    setFormCreate_data({
      description:"",
    })

    createForm.resetFields()

  }

  return (
    <>
      <div className="app__bg__form">
        <Form {...createForm_layout} form={createForm} layout="vertical" size="large">
                    
          <Title level={4}>Create Description</Title>

          <Form.Item
            label="Description"
            hasFeedback={formError_data.description_feed}
            validateStatus={formError_data.description_status}
            help={formError_data.description_msg}
            id="createDescription"
            name="createDescription"
            onChange={ (e) => setFormCreate_data({ ...formCreate_data, description:e.target.value }) }
            className="app__input__form"
          >
            <Input placeholder="Description Detail" />
          </Form.Item>
            
          <Col md={24} align="right">

            <Button size="large" className="app__btn__clear" loading={createFormLoading} onClick={formCreate_handleClear}>
              Clear
            </Button>

            <Button size="large" className="app__btn__save" type="primary" loading={createFormLoading} onClick={formCreate_handleSubmit}>
              Save
            </Button>

          </Col>

        </Form>
      </div>

      <Link to={`/`} className="app_link_btn_main">
        <Button className="app__btn__main" loading={createFormLoading} size="large"> <strong>RETURN</strong> </Button>
      </Link>
    </>
  )
}

export default CreatePage
