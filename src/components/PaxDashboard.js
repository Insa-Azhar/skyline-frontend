import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../services/api';
import { KPI, tierBadge, pkr, EmptyState } from './PaxComponents';
export default function PaxDashboard({ user, navigate }) {
  const [bookings, setBookings] = useState([]);
  useEffect(() => { bookingsAPI.getMyBookings().then(r => setBookings(r.data||[])).catch(()=>{}); }, []);
  const confirmed = bookings.filter(b=>b.status==='Confirmed');
  const totalSpent = confirmed.reduce((s,b)=>s+(b.fare||0),0);
  return (
    <div>
      <div className="card" style={{marginBottom:18,background:'linear-gradient(135deg,var(--primary),var(--cyan))',color:'#fff'}}>
        <h2 style={{fontSize:20,fontWeight:700}}>Welcome back, {user?.name?.split(' ')[0]}! ✈️</h2>
        <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8}}>{tierBadge(user?.tier)}<span>{(user?.miles||0).toLocaleString()} Miles</span></div>
      </div>
      <div className="kpi-row" style={{marginBottom:18}}>
        <KPI val={bookings.length} label="Total Bookings" icon="🎫" color="var(--primary)"/>
        <KPI val={confirmed.length} label="Active" icon="✅" color="var(--green)"/>
        <KPI val={pkr(totalSpent)} label="Total Spent" icon="💰" color="var(--gold)"/>
      </div>
      <div className="card" style={{marginBottom:18}}>
        <div className="card-title">⚡ Quick Actions</div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <button className="btn" onClick={()=>navigate('p-book')}>🎫 Book a Flight</button>
          <button className="btn btn-sec" onClick={()=>navigate('p-flights')}>✈️ Browse Flights</button>
          <button className="btn btn-sec" onClick={()=>navigate('p-mybk')}>📋 My Bookings</button>
        </div>
      </div>
      {bookings.length===0?<EmptyState icon="🎫" text="NO BOOKINGS YET"/>:null}
    </div>
  );
}