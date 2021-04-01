import * as React from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/UserManagementService";
import ProviderManagementService from "../../services/ProviderManagementService";
import { Table, Space, Spin, Row, Col, Breadcrumb, Button, Select, Drawer, Form, Input, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import Toaster from '../../utils/toaster';
import moment from 'moment';

const toaster = new Toaster();
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
class UserMangementContainer extends React.Component<any, any> {
    private userService: any;
    private providerService: any;
    formRef = React.createRef<FormInstance>();
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            selectedEditRow: null,
            editMode: false,
            data: [],
            providerList: [],
            columns: [{
                title: 'User Name',
                dataIndex: 'userName',
                key: 'userName',
                render: (text: any) => text,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Activated On',
                dataIndex: 'activated_on',
                key: 'activated_on',
            },
            {
                title: 'ValidUpto',
                dataIndex: 'validUpto',
                key: 'validUpto',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text: any, record: any) => (
                    <Space size="middle"  >
                        {!(record.status === 'ACTIVE') ? <Button style={{ float: "right" }} type="primary" size={'small'} onClick={() => this.changeStatus(record, 'ACTIVE')}>
                            Activate
                        </Button> : null }
                        <Button type="primary" onClick={() => this.openEditDrawer(record)}  icon={<EditOutlined />} size={'small'} />
                    </Space>
                ),
            }]
        };
        this.userService = new UserService();
        this.providerService = new ProviderManagementService();
    }
    componentDidMount() {
        this.getUsers();
        this.getProviders();
    }
    loader = (status: boolean) => {
        this.setState({
            loading: status,
        });
    };

    getProviders = () => {
        this.loader(true);

        this.providerService.fetchProviders().then(({ data }: any) => {
            this.setState({
                ...this.state,
                providerList: data
            });
            this.loader(false);
        }).catch((error: any) => {
            this.loader(false);
        });
    };

    getUsers = () => {
        this.loader(true);

        this.userService.fetchUsers().then(({ data }: any) => {
            this.setState({
                ...this.state,
                data: data.map((item: any, i: number) => {
                    return {
                        ...item,
                        'key' : 'user'+i
                    }
                })
            });
            this.loader(false);
        }).catch((error: any) => {
            this.loader(false);
        });
    };

    changeStatus = (record: any, status: string) => {
        this.loader(true);

        let requestData: any = {
            ...record,
            'userId': record.userId,
            'status': status
        }

        if(status === 'ACTIVE'){
            requestData['activated_on'] = moment().toISOString()
        }

        this.userService.updateUser(requestData).then(({ data }: any) => {
            toaster.openNotificationWithIcon('success', 'Success', 'User status updated to '+status);
            this.getUsers();
            this.loader(false);
        }).catch((error: any) => {
            this.loader(false);
        });
    };

    createOrUpdateProvider = (values: any) => {
        this.loader(true);
        if(this.state.editMode){
            let requestData = {
                ...values,
                'userId': this.state.selectedEditRow.userId,
                'validUpto': values.validUpto.toISOString()
            }
    
            this.userService.updateUser(requestData).then(({ data }: any) => {
                toaster.openNotificationWithIcon('success', 'Success', 'User updated successfully');
                this.getUsers();
                this.onClose();
            }).catch((error: any) => {
                this.loader(false);
                this.onClose();
            });
        } else {
            let requestData = {
                ...values,
                'status': 'NEW',
                'validUpto': values.validUpto.toISOString()
            }
    
            this.userService.createUser(requestData).then(({ data }: any) => {
                toaster.openNotificationWithIcon('success', 'Success', 'User created successfully');
                this.getUsers();
                this.onClose();
            }).catch((error: any) => {
                this.loader(false);
                this.onClose();
            });
        }
        
    };

    openEditDrawer = (editRecord :any) => {
        this.setState({
            selectedEditRow: {
                ...editRecord, 
                'validUpto': moment(editRecord.validUpto),
                'activated_on': moment(editRecord.activated_on)
            },
            visible: true,
            editMode: true
        },()=> {
            this.formRef.current!.resetFields();
        });
    };

    showAddDrawer = () => {
        this.setState({
            selectedEditRow: null,
            visible: true,
            editMode: false
        },() => {
            this.formRef.current!.resetFields();
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
        this.formRef.current!.resetFields();
    };

    render() {
        const {data, columns} = this.state;
        return (
            <>
            <Spin size="large" spinning={this.state.loading} delay={500}>
                <Row gutter={[16, 24]} style={{ marginBottom: 20 }}>
                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12} >
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                            <Breadcrumb.Item>CDM</Breadcrumb.Item>
                            <Breadcrumb.Item>Users</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button style={{ float: "right" }} type="primary" icon={<PlusOutlined />} size={'small'} onClick={this.showAddDrawer}>
                            Add User
                        </Button>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={data} />
            </Spin>
            <Drawer
                title={this.state.editMode ? "Edit User" :"Create a User"}
                width={window.innerWidth > 900 ? 720 : window.innerWidth - 100}
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Spin size="large" spinning={this.state.loading} delay={500}>
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button form="userAddEdit" key="submit" htmlType="submit" type="primary">
                                {this.state.editMode ?'Save' : 'Submit'}
                            </Button>
                        </div>
                    </Spin>
                }
            >          
                <Spin size="large" spinning={this.state.loading} delay={500}>
                    <Form 
                        ref={this.formRef} 
                        initialValues={this.state.selectedEditRow} 
                        layout="vertical" 
                        id="userAddEdit" 
                        onFinish={this.createOrUpdateProvider}
                    >
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="userName"
                                    label="UserName"
                                    rules={[{ required: true, message: 'Please enter username' }]}
                                >
                                    <Input placeholder="Please enter username" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="userExtId"
                                    label="User external Id"
                                    rules={[{ required: true, message: 'Please enter user external Id' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        // addonBefore="http://"
                                        // addonAfter=".com"
                                        placeholder="Please enter user external Id"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        <Row gutter={16}>                            
                            {this.state.editMode ? <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="activated_on"
                                    label="Activated On"
                                    rules={[{ required: true, message: 'Please choose the date' }]}
                                >
                                    <DatePicker
                                        disabled
                                        format={dateFormat}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col> : null }
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="validUpto"
                                    label="Valid Upto"
                                    rules={[{ required: true, message: 'Please choose the date' }]}
                                >
                                    <DatePicker
                                        format={dateFormat}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        {/* </Row>
                        <Row gutter={16}> */}
                            {this.state.editMode ? <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="status"
                                    label="Status"
                                    rules={[{ required: true, message: 'Please choose status' }]}
                                >
                                    <Select placeholder="Please choose the status">
                                        {/* <Option key="NEW" value="NEW">New</Option>
                                        <Option key="ACTIVE" value="ACTIVE">Active</Option> */}
                                        <Option key="DEACTIVE" value="DEACTIVE">Deactive</Option>
                                    </Select>
                                </Form.Item>
                            </Col> : null }
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="providerId"
                                    label="Provider"
                                    rules={[{ required: true, message: 'Please choose provider' }]}
                                >
                                    <Select placeholder="Please choose provider">
                                        {this.state.providerList.map((item: any, i: number) => {
                                            return <Option key={i+'provi'} value={item.providerId}>{item.providerName}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Drawer>
            </>
        );
    }
}

export default UserMangementContainer;