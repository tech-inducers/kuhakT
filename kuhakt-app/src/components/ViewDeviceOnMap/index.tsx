import * as React from "react";
import { NavLink } from "react-router-dom";
import { Spin, Row, Col, Breadcrumb } from 'antd';
import { FormInstance } from 'antd/lib/form';
import firebase from "../../config/firebaseConfig";
import { compose, withProps, lifecycle, withHandlers, withState } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DeviceMarker from './DeviceMarker';


const equals = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
// Map With A Marker.
const MapWithAMarker: React.ComponentClass<any, any> = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMoW_VX0Szv0yU5NJ0wv9eZ-qLASPHMaI&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `76vh` }} />,
        containerElement: <div style={{ height: `76vh` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withState('mapRef', 'setMapRef', null),
    withHandlers(() => {  
      return {
        zoomToMarkers: ({mapRef} :any) => () => {
            if(mapRef){
                const bounds =  new google.maps.LatLngBounds();
                mapRef.props.children.forEach((child: any) => {
                    if (child.type === DeviceMarker) {
                        bounds.extend( new google.maps.LatLng(child.props.Lat, child.props.Long));
                    }
                })
                mapRef.fitBounds(bounds);
            }
        }
      }
    }),
    lifecycle({
        componentDidUpdate(prevProps: any, prevState){
            if(!equals(this.props.markers, prevProps.markers)){
                this.props.zoomToMarkers();
            }
        },
        componentDidMount() {
            let _: any= this;
            this.setState({

                onMapMounted: (map: any) => {
                    if(map){
                        _.props.setMapRef(map, () => {
                            _.props.zoomToMarkers();
                        });
                    }
                }
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)((props: any) =>
    <GoogleMap ref={props.onMapMounted} >
        {props.markers.map((props: any) => <DeviceMarker key={props.DeviceExtID} {...props} />)}
    </GoogleMap>
)

class ViewDeviceOnMap extends React.Component<any, any> {
    private unSubscribeGetDevicesLongLat: any;
    formRef = React.createRef<FormInstance>();
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            devices: []
        };
    }
    componentDidMount() {
        this.getDevicesLongLat();
        console.log(this.props.location.state.deviceExtIds);
    }

    componentWillUnmount() {
        this.unSubscribeGetDevicesLongLat();
    }
    loader = (status: boolean) => {
        this.setState({
            loading: status,
        });
    };

    getDevicesLongLat = () => {
        this.loader(true);
        const db = firebase.firestore();
        this.unSubscribeGetDevicesLongLat = db.collection("Location").where("DeviceExtID", "in", this.props.location.state.deviceExtIds)
            .onSnapshot((querySnapshot) => {
                let devices: any = [];
                querySnapshot.forEach((doc) => {
                    devices.push(doc.data());
                });
                this.setState({
                    devices
                });
                // if(this.pageMap){
                //     this.handleApiLoaded(this.pageMap, this.pageMaps);
                // }
                this.loader(false);

            }, err => {
                console.log(`Encountered error: ${err}`);
                this.setState({
                    devices: []
                });
                this.loader(false);
            });
    };

    render() {
        const { devices } = this.state;
        const { deviceExtIds, userId } = this.props.location.state;
        return (
            <>
                <Spin size="large" spinning={this.state.loading} delay={500}>
                    <Row gutter={[16, 24]} style={{ marginBottom: 20 }}>
                        <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12} >
                            <Breadcrumb>
                                <Breadcrumb.Item><NavLink to="/">Home </NavLink></Breadcrumb.Item>
                                <Breadcrumb.Item>CDM</Breadcrumb.Item>
                                {userId ? <>
                                    <Breadcrumb.Item><NavLink to="/users">User</NavLink></Breadcrumb.Item>
                                    <Breadcrumb.Item>{userId}</Breadcrumb.Item>
                                </> : null}
                                {deviceExtIds.length > 1 ?
                                    userId ? <Breadcrumb.Item><NavLink to={`/user/${userId}/devices`} >All Devices</NavLink></Breadcrumb.Item> :
                                        <Breadcrumb.Item><NavLink to="/devices" >All Devices</NavLink></Breadcrumb.Item>
                                    : <>
                                        <Breadcrumb.Item><NavLink to={`/user/${userId}/devices`}>Devices</NavLink></Breadcrumb.Item>
                                        <Breadcrumb.Item>{deviceExtIds[0]}</Breadcrumb.Item>
                                    </>}

                                <Breadcrumb.Item>Map</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>

                        </Col>
                    </Row>

                    {devices.length > 0 && (
                        <MapWithAMarker markers={devices} />
                    )}
                </Spin>
            </>
        );
    }
}


export default ViewDeviceOnMap;