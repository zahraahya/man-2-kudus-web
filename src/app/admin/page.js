import AdminDashboard from "../../components/admin/AdminDashboard";

export const metadata = {
  title: "Dashboard Admin | MAN 2 Kudus",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}