import * as React from "react";
import { Link } from "react-router-dom";
import ProtocolService from "../../services/ProtocolManagementService";
import { Table, Spin, Button, Row, Col, Breadcrumb } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Drawer, Form, Input } from 'antd'; 
import { FormInstance } from 'antd/lib/form';
import Toaster from '../../utils/toaster';
// import moment from 'moment';

const toaster = new Toaster();
// const { Option } = Select;
// const dateFormat = 'YYYY/MM/DD';
class ProtocolManagement extends React.Component<any, any> {
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
            columns: [{
                title: 'Protocol Name',
                dataIndex: 'protocolName',
                key: 'protocolName',
                render: (text: any) => text,
            }]
        };
        this.protocolService = new ProtocolService();
    }
    componentDidMount() {
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
                data: data.map((item: any, i: number) => {
                    return {
                        ...item,
                        'key' : 'protocol'+i
                    }
                })
            });
            this.loader(false);
        }).catch((error: any) => {
            this.loader(false);
        });
    };

    createOrUpdateProtocol = (values: any) => {
        this.loader(true);
        if(this.state.editMode){
            // let requestData = {
            //     ...values,
            //     'providerId': this.state.selectedEditRow.providerId,
            //     'validUpto': values.validUpto.toISOString(),
            //     'activated_on' : values.activated_on.toISOString()
            // }
    
            // this.providerService.updateProvider(requestData).then(({ data }: any) => {
            //     toaster.openNotificationWithIcon('success', 'Success', 'Provider updated successfully');
            //     this.getProviders();
            //     this.onClose();
            // }).catch((error: any) => {
            //     this.loader(false);
            //     this.onClose();
            // });
        } else {
            let requestData = {
                ...values
            }
    
            this.protocolService.createProtocol(requestData).then(({ data }: any) => {
                toaster.openNotificationWithIcon('success', 'Success', 'Provider created successfully');
                this.getProtocols();
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
                ...editRecord
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
        const { data, columns } = this.state;
        return (
            <>
                <Spin size="large" spinning={this.state.loading} delay={500}>
                    <Row gutter={[16, 24]} style={{ marginBottom: 20 }}>
                        <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12} >
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                                <Breadcrumb.Item>CDM</Breadcrumb.Item>
                                <Breadcrumb.Item>Protocols</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Button style={{ float: "right" }} type="primary" icon={<PlusOutlined />} size={'small'} onClick={this.showAddDrawer}>
                                Add Protocol
                            </Button>
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={data} />          
                </Spin>
                <Drawer
                    title={this.state.editMode ? "Edit Protocol" :"Create a Protocol"}
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
                                <Button form="ProtocolAddEdit" key="submit" htmlType="submit" type="primary">
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
                            id="ProtocolAddEdit" 
                            onFinish={this.createOrUpdateProtocol}
                        >
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item
                                        name="protocolName"
                                        label="Protocol Name"
                                        rules={[{ required: true, message: 'Please enter protocol name' }]}
                                    >
                                        <Input placeholder="Please enter protocol name" />
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

export default ProtocolManagement;