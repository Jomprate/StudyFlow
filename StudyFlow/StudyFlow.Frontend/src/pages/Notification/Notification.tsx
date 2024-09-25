import { Footer, NotificationGet } from "../../containers";
import { Navbar } from "../../Components";
import './Notification.css';

interface Notification {
  method?: string
}

const Notification = ({ method }: Notification) => {
  const getNotification = () => {
    if (method === 'post') return 
    
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
