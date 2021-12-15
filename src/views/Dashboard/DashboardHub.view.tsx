import { useStore } from 'hooks';
import DashboardView from './Dashboard.view';
import UserDashboard from './UserDashboard.view';

const DashboardHub: React.FC = () => {
  const {
    dataStore: {
      authStore: { user },
    },
  } = useStore();
  return <>{user?.role === 1 ? <DashboardView /> : <UserDashboard />}</>;
};

export default DashboardHub;
