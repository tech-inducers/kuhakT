import * as React from 'react';
import { connect } from "react-redux";
import { login } from '../../store/actions/aclManagementActions';
import { Form, Input, Spin, Button } from 'antd';
import UserManagementService from '../../services/UserManagementService';
import Toaster from '../../utils/toaster';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends React.Component<any, any>{
    private userService: any;
    private toaster: any;
    private history: any;
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        }
        this.userService = new UserManagementService();
        this.toaster = new Toaster();
        this.history = props.history;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    loader = (status: boolean) => {
        this.setState({
            loading: status,
        });
    };
    

    onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        this.props.login({
            'username':'admin',
            'uId':1,
            'isAuthenticated':true
        });
        this.history.push("/gateway");
    };
    render() {
        return (
            <>
                <Spin size="large" spinning={this.state.loading}>
                    <div className="loginForm">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </>
        )
    }
}

const mapStateToProps = ({ aclManagementReducer }: any) => ({
    // pagePermissions: aclManagementReducer.pagePermissions
});

const mapDispatchToProps = (dispatch: Function) => ({
    login: (user: any) => { dispatch(login(user)) }
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);

