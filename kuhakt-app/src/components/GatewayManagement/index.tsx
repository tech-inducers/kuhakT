import * as React from "react";
import { Link } from "react-router-dom";
import ProtocolService from "../../services/ProtocolManagementService";
import GatewayService from "../../services/GatewayManagementService";
import { Table, Space, Spin, Row, Col, Breadcrumb, Button, Select, Drawer, Form, Input, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import Toaster from '../../utils/toaster';
import NumericInput from '../../utils/NumberField';
import moment from 'moment';

const toaster = new Toaster();
const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';
class GatewayMangementContainer extends React.Component<any, any> {
    private gatewayService: any;
    private protocolService: any;
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
            columns: [{
                    title: 'Gateway Ip',
                    dataIndex: 'gatewayIp',
                    key: 'gatewayIp',
                    render: (text: any) => text,
                },
                {
                    title: 'Gateway Port',
                    dataIndex: 'gatewayPort',
                    key: 'gatewayPort',
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
                // {
                //     title: 'Action',
                //     key: 'action',
                //     render: (text: any, record: any) => (
                //         <Space size="middle"  >
                //             <Button type="primary" onClick={() => this.openEditDrawer(record)}  icon={<EditOutlined />} size={'small'} />
                //         </Space>
                //     ),
                // }
            ]
        };
        this.gatewayService = new GatewayService();
        this.protocolService = new ProtocolService();
    }
    componentDidMount() {
        this.getGateway();
        this.getProtocols();
    }
    loader = (status: boolean) => {
        this.setState({
            loading: status,
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

    getGateway = () => {
        this.loader(true);

        this.gatewayService.fetchGateway().then(({ data }: any) => {
            this.setState({
                ...this.state,
                data: data.map((item: any, i: number) => {
                    return {
                        ...item,
                        'key' : 'gateway'+i
                    }
                })
            });
            this.loader(false);
        }).catch((error: any) => {
            this.loader(false);
        });
    };

    createOrUpdateGateway = (values: any) => {
        this.loader(true);
        if(this.state.editMode){
            // let requestData = {
            //     ...values,
            //     'gatewayId': this.state.selectedEditRow.gatewayId,
            //     'activated_on' : values.activated_on.toISOString()
            // }
    
            // this.gatewayService.updateGateway(requestData).then(({ data }: any) => {
            //     toaster.openNotificationWithIcon('success', 'Success', 'Gateway updated successfully');
            //     this.getGateway();
            //     this.onClose();
            // }).catch((error: any) => {
            //     this.loader(false);
            //     this.onClose();
            // });
        } else {
            let requestData = {
                ...values,
                'status': 'NEW',
                'activated_on' : values.activated_on.toISOString()
            }
    
            this.gatewayService.createGateway(requestData).then(({ data }: any) => {
                toaster.openNotificationWithIcon('success', 'Success', 'Gateway created successfully');
                this.getGateway();
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
                            <Breadcrumb.Item>Gateway</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button style={{ float: "right" }} type="primary" icon={<PlusOutlined />} size={'small'} onClick={this.showAddDrawer}>
                            Add Gateway
                        </Button>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={data} />
            </Spin>
            <Drawer
                title={this.state.editMode ? "Edit Gateway" :"Create a Gateway"}
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
                            <Button form="gatewayAddEdit" key="submit" htmlType="submit" type="primary">
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
                        id="gatewayAddEdit" 
                        onFinish={this.createOrUpdateGateway}
                    >
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="gatewayIp"
                                    label="Gateway Ip"
                                    rules={[{ required: true, message: 'Please enter Gateway Ip' }]}
                                >
                                    <Input placeholder="Please enter Gateway Ip" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="gatewayPort"
                                    label="Gateway Port"
                                    rules={[{ required: true, message: 'Please enter Gateway Port' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="Please enter Gateway Port"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="gatewaySuffix"
                                    label="Gateway Suffix"
                                    rules={[{ required: true, message: 'Please enter Gateway Suffix' }]}
                                >
                                    <Input placeholder="Please enter Gateway Suffix" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="gatwwayPrefix"
                                    label="Gateway Prefix"
                                    rules={[{ required: true, message: 'Please enter Gateway Prefix' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="Please enter Gateway Prefix"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="deviceCount"
                                    label="Device Count"
                                    rules={[{ required: true, message: 'Please enter Device Count' }]}
                                >
                                    <NumericInput placeholder="Please enter Device Count" maxLength="3" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="deviceLimit"
                                    label="Device Limit"
                                    rules={[{ required: true, message: 'Please enter Device Limit' }]}
                                >
                                    <NumericInput
                                        style={{ width: '100%' }}
                                        placeholder="Please enter Device Limit"
                                        maxLength="3"
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
                                {/* <Form.Item
                                    name="validUpto"
                                    label="Valid Upto"
                                    rules={[{ required: true, message: 'Please choose the date' }]}
                                >
                                    <DatePicker
                                        format={dateFormat}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item> */}
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
                                        <Option key="new" value="new">New</Option>
                                        <Option key="active" value="active">Active</Option>
                                        <Option key="inactive" value="inactive">Inactive</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="protocolId"
                                    label="Protocol"
                                    rules={[{ required: true, message: 'Please choose Protocol' }]}
                                >
                                    <Select placeholder="Please choose Protocol">
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

export default GatewayMangementContainer;