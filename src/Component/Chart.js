import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function ChartPanel({ listData, cities }) {
  if (!Array.isArray(listData) || listData.length === 0 || !cities) return null;

  const midday = listData.filter(item => item.dt_txt.endsWith('12:00:00'));

  const tempData = midday.map(item => ({
    date: item.dt_txt.split(' ')[0].slice(5),
    temp: Math.round(item.main.temp),
  }));

  const humidityData = midday.map(item => ({
    date: item.dt_txt.split(' ')[0].slice(5),
    humidity: item.main.humidity,
  }));

  //  Day/Night calculation(changement de temps pour pie chart)
  const sunrise = new Date(cities.sunrise * 1000);
  const sunset = new Date(cities.sunset * 1000);
  const daylightHours = (sunset - sunrise) / (1000 * 60 * 60); // in hours
  const nightHours = 24 - daylightHours;

  const dayNightData = [
    { name: 'Daylight', value: +daylightHours.toFixed(2) },
    { name: 'Nighttime', value: +nightHours.toFixed(2) },
  ];
/* les couleurs de pie chart  yellow and light purple */ 
  const COLORS = ['#FFD700', '#4c4c70'];

  return (
    <div className="chart-panel text-light">
      {/* Temperature Chart  limoni*/}
      <div className="daynight-pie text-light">
        <h5 className="chart-title">5‑Day Temperature (°C)</h5>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={tempData} margin={{ top: 20, right: 15, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 14, fill: '#fff' }} />
            <YAxis unit="°C" tick={{ fontSize: 14, fill: '#fff' }} />
            <Tooltip
              formatter={(val) => `${val}°C`}
              labelStyle={{ fontSize: 13 }}
              contentStyle={{ fontSize: 13, backgroundColor: '#00000044', borderRadius: '6px' }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#ff9933"
              strokeWidth={3}
              dot={{ r: 6, fill: '#ff9933' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity Chart zreq */}
      <div className="daynight-pie text-light">
        <h5 className="chart-title">5‑Day Humidity (%)</h5>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={humidityData} margin={{ top: 20, right: 15, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 14, fill: '#fff' }} />
            <YAxis unit="%" tick={{ fontSize: 14, fill: '#fff' }} />
            <Tooltip
              formatter={(val) => `${val}%`}
              labelStyle={{ fontSize: 13 }}
              contentStyle={{ fontSize: 13, backgroundColor: '#333', borderRadius: '6px' }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#3399ff"
              strokeWidth={3}
              dot={{ r: 6, fill: '#3399ff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Day vs Night Pie Chart  colorehom css */}
      <div className="daynight-pie text-light">
        <h5 className="chart-title">Day vs Night Duration (hrs)</h5>
        <ResponsiveContainer width="100%" height={270}>
          <PieChart>
            <Pie
              data={dayNightData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}h`}
            >
              {dayNightData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
