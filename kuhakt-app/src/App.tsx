import React from 'react';
import { connect } from "react-redux";
import { Switch, Route, Link} from "react-router-dom";
import './App.css';
import { Layout, Menu, Result, Button} from 'antd';
import { LogoutOutlined, SettingOutlined  } from '@ant-design/icons'; // UserOutlined, CloudServerOutlined , DeliveredProcedureOutlined  
import Login from "./components/Login";
import UserManagement from "./components/UserManagement";
import ProviderManagement from "./components/ProviderManagement";
import PageAccessRoute from './utils/PageAccessRoute';
import { logout } from './store/actions/aclManagementActions';
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

const NotFound = () => <div className="appcontent"><div className="row "><div className="tile xl-12" >
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
    />
</div></div></div>

class App extends React.Component<any, any>{
    private history: any;    
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
    }

    onLogOut = (values: any) => {
        this.props.logoutAction();
    };
    render() {
        return (
            <div className="App">
                <Layout>
                    <Header className="header-layout-background">
                        <h1>KuhakTIoT</h1>
                    </Header>
                    <Layout>
                        {this.props.isAuthenticated ? <Sider 
                            breakpoint="lg"
                            collapsedWidth="0"
                            onBreakpoint={broken => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }} 
                            width={200} 
                            className="site-layout-background"
                        >
                            <Menu
                                mode="inline"
                                // defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" icon={<SettingOutlined />} title="CDM">
                                    <Menu.Item key="11"><Link to="providers" >Providers</Link></Menu.Item>
                                    <Menu.Item key="12"><Link to="users" >Users</Link></Menu.Item>
                                    <Menu.Item key="13">Devices</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<SettingOutlined />} title="Gateway & Proxy">
                                    <Menu.Item key="21"><Link to="protocol" >Protocol</Link></Menu.Item>
                                    <Menu.Item key="22"><Link to="gateway" >Gateway</Link></Menu.Item>
                                </SubMenu>
                                

                                <Menu.Item key="4" icon={<LogoutOutlined />} onClick={this.onLogOut}>
                                    Logout
                                </Menu.Item>
                                {/* <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu> */}
                            </Menu>
                        </Sider> : null }
                        <Content className="inner-content">
                            <Switch>
                                <React.Suspense fallback={<></>}>
                                    <Route exact path="/login" component={Login} />
                                    <PageAccessRoute path="/users" component={UserManagement} />
                                    <PageAccessRoute path="/providers" component={ProviderManagement} />
                                    <Route path='/not-found' component={NotFound} />
                                    {/* <Route render={(props) => {
                                        let vaildUrl = ['/','/upload-pipe-json','/upload-pipe-compress','/dashboard', '/userManagement', '/roleManagement', '/permissionManagement', '/partners', '/pipe', '/add-pipe', '/edit-pipe', '/upload-pipe'];
                                        return vaildUrl.indexOf(props.location.pathname) === -1 ? <Redirect to={{pathname: "/not-found"}} /> : null 
                                    }} /> */}
                                </React.Suspense>
                            </Switch>
                        </Content>
                    </Layout>
                    <Footer className="footer-layout-background">Footer</Footer>
                </Layout>
            </div>
        )
    };
}


const mapStateToProps = ({aclManagementReducer}: any) => ({
    isAuthenticated: aclManagementReducer.isAuthenticated
});

const mapDispatchToProps = (dispatch: Function) => ({
    logoutAction: () => { dispatch(logout()) }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
