import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Link } from "react-router-dom";
// import { Route, , RouteProps } from 'react-router-dom';
import { Result, Button } from 'antd';

interface IProps {
    exact?: boolean;
    path: string;
    pagePermissions: any;
    isAuthenticated: any;
    sessionHasBeenFetched: any;
    component: React.ComponentType<any>;
}

const PageAccessRoute = ({
    component: Component,
    path,
    pagePermissions,
    isAuthenticated,
    sessionHasBeenFetched,
    ...otherProps
}: IProps) => {
    const checkAuthorities = (props: any) =>{
        // console.log('props', props)
        return true ? (
            <Component {...props} />
        ) : (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
            />
        );
    }


    const renderRedirect = (props:any) => {
        return isAuthenticated ? (
            checkAuthorities(props)
        ) : (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    };


    return (
        <>
            <Route
                path={path}
                {...otherProps}
                render={renderRedirect}
            />
        </>
    );
};

const mapStateToProps = ({ aclManagementReducer }: any) => ({
    pagePermissions: aclManagementReducer.pagePermissions,
    isAuthenticated: aclManagementReducer.isAuthenticated,
    sessionHasBeenFetched: aclManagementReducer.sessionHasBeenFetched
});

export default connect(mapStateToProps)(PageAccessRoute);
