import { Modal, Form, Button, Spin, message} from "antd"

import axios from "axios";

const DeletePage = ({ deleteModalVisible, setDeleteModalVisible, formDelete_data, setFormDelete_data, formDelete_error, setFormDelete_error, setTableRefresh }) => {

  const formDelete_modal_layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 }
  }

  const deleteForm_handleCancel = () => {

    setDeleteModalVisible(false)

    setFormDelete_data({ 
      id:null, 
      description:null 
    })

  }

  const deleteForm_handleSubmit = async () => {

    setFormDelete_error({ formDelete_loading:true })

    axios.delete(`http://localhost:8000/item/item-data-update-api`, {
      data: {
        id:formDelete_data.id
      }
    })
    .then(response => {

      message.success('Deleting description success...')

      setFormDelete_error({ formDelete_loading:false })

      setDeleteModalVisible(false)

      setTableRefresh()

    })
    .catch(error => {

      setFormDelete_error({ formDelete_loading:false })

      message.error('Deleting description failed...')

    })
    
  }

  return (
    <>
      <Modal
          title="Delete Description"
          visible={deleteModalVisible}
          onCancel={deleteForm_handleCancel}
          footer={[
              <Button key="close" size="small" onClick={deleteForm_handleCancel}>
                  Close
              </Button>,
              <Button loading={formDelete_error.formDelete_loading} key="save" size="small" type="primary" onClick={deleteForm_handleSubmit}>
                  Agree
              </Button>,
          ]}
      >
        <Spin spinning={formDelete_error.formDelete_loading} size={"large"}>
          <Form
              {...formDelete_modal_layout}
              layout="vertical"
          >
            <p align="center">Do you really wish to remove ?</p>
            <p align="center" className="app_p_danger"><strong>"{formDelete_data.description}"</strong></p>
          </Form>        
        </Spin>
      </Modal>
    </>
  )

}

export default DeletePage