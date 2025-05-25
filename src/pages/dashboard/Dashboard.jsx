import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EventsList from '../../features/events/EventsList'
import AddEvent from '../../features/events/AddEvent'
import Navbar from '../../components/Navbar'
import { useGetDashboardStatsQuery } from './dashboardApi'; 
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];
const Dashboard = () =>  {
  const user = useSelector(state => state.auth.user)
  const { data, error, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) return <p>Chargement des statistiques...</p>;
  if (error) return <p>Erreur lors du chargement des statistiques.</p>;

  const dataPie = [
    { name: 'Événements', value: data.totalEvents },
    { name: 'Participants', value: data.totalParticipants },
  ];
  return (
<div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">

  <div className="w-full max-w-[600px] bg-gray-700 p-6 rounded shadow">
<main>
      <h2>Statistiques du Dashboard</h2>
      <p>Total d'événements : {data.totalEvents}</p>
      <p>Total de participants : {data.totalParticipants}</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataPie}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      
     
       
        <AddEvent />
        <EventsList />
      </main>
    </div>
    </div>
  )
}
 export default Dashboard