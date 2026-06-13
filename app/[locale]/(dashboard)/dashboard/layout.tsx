import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { AuthGate } from '@/components/dashboard/AuthGate';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
    </AuthGate>
  );
}
