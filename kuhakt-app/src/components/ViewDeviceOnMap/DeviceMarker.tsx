import * as React from "react";
import { Marker, InfoWindow } from "react-google-maps"; // InfoWindow

// DeviceMarker.
class DeviceMarker extends React.Component<any, any> {

    // State.
    constructor(props: any) {
        super(props);
        this.state = {
            open: true
        }
    }
    handleToggle = () => {

        this.setState({
            open: !this.state.open
        });
    }
    render() {
        const { DeviceExtID, Lat, Long }: any = this.props
        return (
            <Marker key={DeviceExtID} 
                position={{ lat: Lat, lng: Long }}
                onClick={() => this.handleToggle()} 
                // options={{ icon: 'https://image.ibb.co/evMHxF/shopping_zone_marker_1.png' }}
            >
                {this.state.open && DeviceExtID? <InfoWindow onCloseClick={() => this.handleToggle()}><>DeviceExtID - {DeviceExtID}</></InfoWindow> : <></>}
            </Marker>
        )
    }

}
export default DeviceMarker;