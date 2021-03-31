import React from 'react';
import { connect } from "react-redux";
import { Switch, Route, Link} from "react-router-dom";
import './App.css';
import { Layout, Menu, Result, Button} from 'antd';
import { LogoutOutlined, SettingOutlined  } from '@ant-design/icons'; // UserOutlined, CloudServerOutlined , DeliveredProcedureOutlined  
import Login from "./components/Login";
import UserManagement from "./components/UserManagement";
import ProviderManagement from "./components/ProviderManagement";
import ProtocolManagement from "./components/ProtocolManagement";
import GatewayMangement from "./components/GatewayManagement";
import DeviceMangement from "./components/DeviceManagement";
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
                                defaultSelectedKeys={['sub111']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 1 }}
                            >
                                <SubMenu key="sub1" icon={<SettingOutlined />} title="CDM">
                                    <Menu.Item key="sub111"><Link to="providers" >Providers</Link></Menu.Item>
                                    <Menu.Item key="sub112"><Link to="users" >Users</Link></Menu.Item>
                                    <Menu.Item key="sub113"><Link to="devices" >Devices</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<SettingOutlined />} title="Gateway & Proxy">
                                    <Menu.Item key="sub221"><Link to="protocol" >Protocol</Link></Menu.Item>
                                    <Menu.Item key="sub222"><Link to="gateway" >Gateway</Link></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="sub3" icon={<LogoutOutlined />} onClick={this.onLogOut}>
                                    Logout
                                </Menu.Item>
                            </Menu>
                        </Sider> : null }
                        <Content className="inner-content">
                            <Switch>
                                <React.Suspense fallback={<></>}>
                                    <Route exact path="/login" component={Login} />
                                    <PageAccessRoute path="/users" component={UserManagement} />
                                    <PageAccessRoute path="/providers" component={ProviderManagement} />
                                    <PageAccessRoute path="/protocol" component={ProtocolManagement} />
                                    <PageAccessRoute path="/gateway" component={GatewayMangement} />
                                    <PageAccessRoute path="/devices" component={DeviceMangement} />
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
