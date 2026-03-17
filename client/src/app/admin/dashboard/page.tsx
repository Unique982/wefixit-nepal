export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">Total Orders</div>

        <div className="bg-white p-6 rounded-lg shadow">Total Customers</div>

        <div className="bg-white p-6 rounded-lg shadow">Revenue</div>

        <div className="bg-white p-6 rounded-lg shadow">Pending Repairs</div>
      </div>
    </div>
  );
}
