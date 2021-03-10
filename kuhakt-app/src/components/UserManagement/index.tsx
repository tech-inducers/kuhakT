import * as React from "react";
import UserService from "../../services/UserManagementService";
import { Table, Space} from 'antd';

class UserMangementContainer extends React.Component<any, any> {
    // constructor(props: any) {
    //     super(props);
    // }

    loader = (status: boolean) => {
        this.setState({
            loading: status,
        });
    };

    render() {
        const columns = [
            {
              title: 'User Name',
              dataIndex: 'userName',
              key: 'userName',
              render: (text: any) => <a>{text}</a>,
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
                  <a>View</a>
                </Space>
              ),
            },
        ];
        let data = [
            {
              "userExtId": 100,
              "userId": 1,
              "userName": "nokia1",
              "status": "ACTIVE",
              "validUpto": "2022-01-19T02:46:34.853",
              "activated_on": "2021-01-19T02:46:34.853",
              "providerId": 1
            },
            {
              "userExtId": 0,
              "userId": 2,
              "userName": "test",
              "status": "ACTIVE",
              "validUpto": "2021-01-19T14:20:37.142",
              "activated_on": "2022-01-19T14:20:37.142",
              "providerId": 1
            }
        ];
        return (
            <Table columns={columns} dataSource={data} />
        );
    }
}

export default UserMangementContainer;