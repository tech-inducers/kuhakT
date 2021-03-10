import { notification } from "antd";
export default class Toaster {


    openNotificationWithIcon = (type: string, message: string, description: any) => {
        const config = {
            message: message,
            description: description,
            duration: 10,
        };

        switch (type) {
            case 'success':
                notification.success(config);
                break;
            case 'error':
                notification.error(config);
                break;
            case 'info':
                notification.info(config);
                break;
            case 'warning':
                notification.warning(config);
                break;
            default:
                notification.success(config);
                break;                  
        }
    }

}

