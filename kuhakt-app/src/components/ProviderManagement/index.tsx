import * as React from "react";
import { Link } from "react-router-dom";
import ProviderManagementService from "../../services/ProviderManagementService";
import { Table, Space, Spin, Button, Row, Col, Breadcrumb } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Drawer, Form, Input, DatePicker, Select } from 'antd'; 
import { FormInstance } from 'antd/lib/form';
import Toaster from '../../utils/toaster';
import moment from 'moment';

const toaster = new Toaster();
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
class ProviderManagement extends React.Component<any, any> {
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
            columns: [{
                title: 'Provider Name',
                dataIndex: 'providerName',
                key: 'providerName',
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
                        <Button type="primary" onClick={() => this.openEditDrawer(record)}  icon={<EditOutlined />} size={'small'} />
                    </Space>
                ),
            }]
        };
        this.providerService = new ProviderManagementService();
    }
    componentDidMount() {
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
                data: data
            });
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
                'providerId': this.state.selectedEditRow.providerId,
                'validUpto': values.validUpto.toISOString(),
                'activated_on' : values.activated_on.toISOString()
            }
    
            this.providerService.updateProvider(requestData).then(({ data }: any) => {
                toaster.openNotificationWithIcon('success', 'Success', 'Provider updated successfully');
                this.getProviders();
                this.onClose();
            }).catch((error: any) => {
                this.loader(false);
                this.onClose();
            });
        } else {
            let requestData = {
                ...values,
                'status': 'NEW',
                'validUpto': values.validUpto.toISOString(),
                'activated_on' : values.activated_on.toISOString()
            }
    
            this.providerService.createProvider(requestData).then(({ data }: any) => {
                toaster.openNotificationWithIcon('success', 'Success', 'Provider created successfully');
                this.getProviders();
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
            // this.setState({
            //     visible: true,
            //     editMode: true
            // });
        });
    };

    showAddDrawer = () => {
        this.setState({
            selectedEditRow: null
        },() => {
            setTimeout(() => { 
                this.setState({
                    visible: true,
                    editMode: false
                });
            }, 1000);            
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
        this.formRef.current!.resetFields();
    };

    render() {
        const { data, columns } = this.state;
        return (
            <>
                <Spin size="large" spinning={this.state.loading} delay={500}>
                    <Row gutter={[16, 24]} style={{ marginBottom: 20 }}>
                        <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12} >
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                                <Breadcrumb.Item>CDM</Breadcrumb.Item>
                                <Breadcrumb.Item>Provider</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Button style={{ float: "right" }} type="primary" icon={<PlusOutlined />} size={'small'} onClick={this.showAddDrawer}>
                                Add Provider
                            </Button>
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={data} />          
                </Spin>
                <Drawer
                    title="Create a Provider"
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
                                <Button form="providerAddEdit" key="submit" htmlType="submit" type="primary">
                                    Submit
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
                            id="providerAddEdit" 
                            onFinish={this.createOrUpdateProvider}
                        >
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="providerName"
                                        label="Provider Name"
                                        rules={[{ required: true, message: 'Please enter provider name' }]}
                                    >
                                        <Input placeholder="Please enter provider name" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="providerExtId"
                                        label="Provider external Id"
                                        rules={[{ required: true, message: 'Please enter provider external Id' }]}
                                    >
                                        <Input
                                            style={{ width: '100%' }}
                                            // addonBefore="http://"
                                            // addonAfter=".com"
                                            placeholder="Please enter provider external Id"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            
                            <Row gutter={16}>                            
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="activated_on"
                                        label="Activated On"
                                        rules={[{ required: true, message: 'Please choose the date' }]}
                                    >
                                        <DatePicker
                                            format={dateFormat}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
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
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="status"
                                        label="Status"
                                        rules={[{ required: true, message: 'Please choose status' }]}
                                    >
                                        <Select placeholder="Please choose the status">
                                            <Option value="new">New</Option>
                                            <Option value="active">Active</Option>
                                            <Option value="inactive">Inactive</Option>
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

export default ProviderManagement;