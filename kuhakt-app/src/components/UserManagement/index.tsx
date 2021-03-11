import * as React from "react";
import UserService from "../../services/UserManagementService";
import { Table, Space, Spin } from 'antd';

class UserMangementContainer extends React.Component<any, any> {
    private userService: any;
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            data: [],
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
                    <Space size="middle">
                        View
                    </Space>
                ),
            }]
        };
        this.userService = new UserService();
    }
    componentDidMount() {
        this.getUsers();
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

export default UserMangementContainer;