import { LoadingScreen } from '@/components/shared/LoadingScreen';

export default function DashboardLoading() {
  return (
    <LoadingScreen
      label="Opening your dashboard"
      caption="Loading sessions, lessons, and requests."
    />
  );
}
