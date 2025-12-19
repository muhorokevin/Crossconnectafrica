import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', revenue: 4000, bookings: 24 },
  { name: 'Feb', revenue: 3000, bookings: 13 },
  { name: 'Mar', revenue: 2000, bookings: 9 },
  { name: 'Apr', revenue: 2780, bookings: 39 },
  { name: 'May', revenue: 1890, bookings: 48 },
  { name: 'Jun', revenue: 2390, bookings: 38 },
];

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-green mb-8">Mission Control</h1>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm font-bold uppercase">Total Revenue</h3>
              <DollarSign className="text-brand-gold" />
            </div>
            <p className="text-3xl font-bold text-brand-green">$15,240</p>
            <span className="text-green-500 text-xs font-bold">+12% vs last month</span>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm font-bold uppercase">Active Bookings</h3>
              <Calendar className="text-brand-gold" />
            </div>
            <p className="text-3xl font-bold text-brand-green">142</p>
          </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm font-bold uppercase">Participants</h3>
              <Users className="text-brand-gold" />
            </div>
            <p className="text-3xl font-bold text-brand-green">1,204</p>
          </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 text-sm font-bold uppercase">Utilization</h3>
              <TrendingUp className="text-brand-gold" />
            </div>
            <p className="text-3xl font-bold text-brand-green">88%</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
            <h3 className="text-lg font-bold text-brand-green mb-6">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#022c22', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#d97706' }}
                />
                <Bar dataKey="revenue" fill="#022c22" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
            <h3 className="text-lg font-bold text-brand-green mb-6">Booking Density</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#d97706" strokeWidth={3} dot={{ fill: '#d97706' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-brand-green">Recent Inquiries</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Program</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        <tr>
                            <td className="px-6 py-4 font-medium">Safaricom PLC</td>
                            <td className="px-6 py-4">Corporate Team Build</td>
                            <td className="px-6 py-4">Nov 20, 2023</td>
                            <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">Confirmed</span></td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-medium">St. Andrews Church</td>
                            <td className="px-6 py-4">Youth Camp</td>
                            <td className="px-6 py-4">Dec 05, 2023</td>
                            <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">Pending</span></td>
                        </tr>
                         <tr>
                            <td className="px-6 py-4 font-medium">John Kamau</td>
                            <td className="px-6 py-4">Mt. Kenya Hike</td>
                            <td className="px-6 py-4">Dec 12, 2023</td>
                            <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">Inquiry</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
