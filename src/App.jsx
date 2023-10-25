import {Routes, Route} from "react-router-dom"
import MainPage from "./pages/MainPage"
import CreatePage from "./pages/CreatePage"
import UpdatePage from "./pages/UpdatePage"

import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';

const App = () => {

  const { Header, Content, Footer } = Layout;
  const { Text, Link } = Typography;

  return (
    <Layout>
        <Content className="app__header__form">
            <Routes>
              <Route index element={<MainPage/>}></Route>
              <Route path="/create" element={<CreatePage/>}></Route>
              <Route path="/update/:id" element={<UpdatePage/>}></Route>
            </Routes>
        </Content>
        <Footer className="app__footer__form">
          <Text strong>Powered By © React Js - Django Rest Framework - Render - Netlify</Text>
        </Footer>
    </Layout>
  )

}

export default App
