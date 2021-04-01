import * as React from "react";
import { NavLink } from "react-router-dom";
import DeviceService from "../../services/DeviceManagementService";
import ProtocolService from "../../services/ProtocolManagementService";
import UserService from "../../services/UserManagementService";
import { Table, Space, Spin, Row, Col, Breadcrumb, Button, Select, Drawer, Form, Input, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import Toaster from '../../utils/toaster';
import CustomIconFont from '../../utils/customIcon';
import moment from 'moment';

const toaster = new Toaster();
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
class DeviceMangementContainer extends React.Component<any, any> {
    private deviceService: any;
    private protocolService: any;
    private userService: any;
    private userId: number;
    formRef = React.createRef<FormInstance>();
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            selectedEditRow: null,
            editMode: false,
            data: [],
            protocolList: [],
            userList:[],
            columns: [{
                title: 'Device Name',
                dataIndex: 'deviceName',
                key: 'deviceName',
                render: (text: any) => text,
            },
            {
                title: 'Device Type',
                dataIndex: 'deviceType',
                key: 'deviceType',
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
                        <Button type="text" icon={<CustomIconFont type="icon-map" style={{color: "#75c82b", fontSize: '20px'}}/>} size={'small'} />
                    </Space>
                ),
            }]
        };
        this.deviceService = new DeviceService();
        this.userService = new UserService();
        this.protocolService = new ProtocolService();
        this.userId = this.props.match.params.userid ? Number(this.props.match.params.userid) : 0;
    }
    componentDidMount() {
        this.getDevices();
        this.getUsers();
        this.getProtocols();
        console.log(this.userId)        
    }
    loader = (status: boolean) => {
        this.setState({
            loading: status,
        });
    };

    getUsers = () => {
        this.loader(true);

        this.userService.fetchUsers().then(({ data }: any) => {
            this.setState({
                ...this.state,
                userList: data
            });
            
            this.loader(false);
        }).catch((error: any) => {
            this.loader(false);
        });
    };

    getProtocols = () => {
        this.loader(true);

        this.protocolService.fetchProtocol().then(({ data }: any) => {
            this.setState({
                ...this.state,
                protocolList: data
            });
            this.loader(false);
        }).catch((error: any) => {
            this.loader(false);
        });
    };

    getDevices = () => {
        this.loader(true);
        let allDevicesApi =  this.userId ? this.deviceService.fetchUserWiseDevices(this.userId) : this.deviceService.fetchDevices()
        allDevicesApi.then(({ data }: any) => {
            this.setState({
                ...this.state,
                data: data.map((item: any, i: number) => {
                    return {
                        ...item,
                        'key' : 'devices'+i
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
            'deviceId': record.deviceId,
            'status': status
        }

        if(status === 'ACTIVE'){
            requestData['activated_on'] = moment().toISOString()
        }

        this.deviceService.updateDevice(requestData).then(({ data }: any) => {
            toaster.openNotificationWithIcon('success', 'Success', 'Device status updated to ' + status);
            this.getDevices();
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
                'deviceId': this.state.selectedEditRow.deviceId,
                'validUpto': values.validUpto.toISOString()
            }
    
            this.deviceService.updateDevice(requestData).then(({ data }: any) => {
                toaster.openNotificationWithIcon('success', 'Success', 'User updated successfully');
                this.getDevices();
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
    
            this.deviceService.createDevice(requestData).then(({ data }: any) => {
                toaster.openNotificationWithIcon('success', 'Success', 'User created successfully');
                this.getDevices();
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
            selectedEditRow: this.userId ? { 'userId' : this.userId }: null,
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
                            <Breadcrumb.Item><NavLink to="/">Home </NavLink></Breadcrumb.Item>
                            <Breadcrumb.Item>CDM</Breadcrumb.Item>
                            {this.userId ? <>
                            <Breadcrumb.Item><NavLink to="/users">User</NavLink></Breadcrumb.Item>
                            <Breadcrumb.Item>{this.userId}</Breadcrumb.Item>
                            </>: null }                            
                            <Breadcrumb.Item>Devices</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button style={{ float: "right" }} type="primary" icon={<PlusOutlined />} size={'small'} onClick={this.showAddDrawer}>
                            Add Device
                        </Button>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={data} />
            </Spin>
            <Drawer
                title={this.state.editMode ? "Edit Device" :"Add a Device"}
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
                                    name="deviceName"
                                    label="Device Name"
                                    rules={[{ required: true, message: 'Please enter Device Name' }]}
                                >
                                    <Input placeholder="Please enter Device Name" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="deviceExtId"
                                    label="Device external Id"
                                    rules={[{ required: true, message: 'Please enter Device external Id' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="Please enter Device external Id"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="deviceType"
                                    label="Device Type"
                                    rules={[{ required: true, message: 'Please enter Device Type' }]}
                                >
                                    <Select placeholder="Please enter Device Type">
                                        <Option key="stationary" value="STATIONATY">STATIONATY</Option>
                                        <Option key="moviable" value="MOVIABLE">MOVIABLE</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="userId"
                                    label="User"
                                    rules={[{ required: true, message: 'Please select user' }]}
                                >
                                    <Select placeholder="Please select user" disabled={this.userId ? true : false}>
                                        {this.state.userList.map((item: any, i: number) => {
                                            return <Option key={i+'user'} value={item.userId}>{item.userName}</Option>
                                        })}
                                    </Select>
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
                                        <Option key="NEW" value="NEW">New</Option>
                                        <Option key="ACTIVE" value="ACTIVE">Active</Option>
                                        <Option key="DEACTIVE" value="DEACTIVE">Deactive</Option>
                                    </Select>
                                </Form.Item>
                            </Col> : null }
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="protocolId"
                                    label="Protocol"
                                    rules={[{ required: true, message: 'Please choose protocol' }]}
                                >
                                    <Select placeholder="Please choose protocol">
                                        {this.state.protocolList.map((item: any, i: number) => {
                                            return <Option key={i+'provi'} value={item.protocolId}>{item.protocolName}</Option>
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

export default DeviceMangementContainer;