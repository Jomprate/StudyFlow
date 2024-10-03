import { Footer, NotificationCreate, NotificationGet, NotificationUpdate } from "../../containers";
import { Navbar } from "../../components";
import './Notification.css';

interface Notification {
    method?: string
}

const Notification = ({ method = 'get' }: Notification) => {
    const getNotification = () => {
        if (method === 'post') return <NotificationCreate />
        if (method === 'put') return <NotificationUpdate />

        return <NotificationGet />
    }

    return (
        <div className="notification-ctn">
            <Navbar />
            {getNotification()}
            <Footer />
        </div>
    );
};

export default Notification;