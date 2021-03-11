import * as React from "react";
import ProviderManagementService from "../../services/ProviderManagementService";
import { Table, Space, Spin } from 'antd';

class ProviderManagement extends React.Component<any, any> {
    private providerService: any;
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
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
                    <Space size="middle">
                        View
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

    render() {
        const {data, columns} = this.state;
        return (
            <Spin size="large" spinning={this.state.loading} delay={500}>
                <Table columns={columns} dataSource={data} />
            </Spin>
        );
    }
}

export default ProviderManagement;