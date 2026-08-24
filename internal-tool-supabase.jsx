
const { useState, useEffect, useCallback } = React;

// supabase client is initialised in the main HTML as window.__supabase
const sb = window.__supabase;

const S = {
  bg:     '#FFFFFF',
  bgSoft: '#F5F4F1',
  ink:    '#0D0D0D',
  gold:   '#C4954A',
  muted:  '#888886',
  border: '#E6E4E0',
  green:  '#2A6A2A',
  greenBg:'#EDFAED',
  red:    '#C0392B',
};

const sfld = { width:'100%', padding:'11px 14px', borderRadius:4, border:`1.5px solid ${S.border}`, fontSize:14, color:S.ink, background:'#fff', outline:'none', boxSizing:'border-box', fontFamily:"'Inter',sans-serif", transition:'border-color 0.15s' };
const slbl = { display:'block', fontSize:11, fontWeight:700, color:S.muted, marginBottom:6, textTransform:'uppercase', letterSpacing:1 };

// ── Login ─────────────────────────────────────────────────────────────────────

function SBLogin({ onLogin }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  const loadProfile = useCallback(async (user) => {
    const { data: profile, error: pe } = await sb
      .from('profiles').select('*').eq('id', user.id).single();
    if (pe || !profile) { setError('Profile not found. Contact your admin.'); setLoading(false); return; }
    onLogin({ id: user.id, email: user.email, name: profile.name, role: profile.role });
  }, [onLogin]);

  // Resume existing session
  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadProfile(session.user);
      else setLoading(false);
    });
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
      if (session?.user) loadProfile(session.user);
    });
    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error: authErr } = await sb.auth.signInWithPassword({ email, password });
    if (authErr) { setError(authErr.message); setLoading(false); }
  };

  if (loading) return (
    <div style={{ minHeight:'100vh', background:S.ink, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ color:'rgba(255,255,255,0.4)', fontFamily:"'Inter',sans-serif", fontSize:14 }}>Loading…</div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:S.ink, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Inter',sans-serif", padding:20, boxSizing:'border-box' }}>
      <div style={{ background:'#fff', borderRadius:8, padding:'52px 48px', width:'100%', maxWidth:420, boxSizing:'border-box', boxShadow:'0 24px 80px rgba(0,0,0,0.35)' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <img src="uploads/logo.png" alt="Calle de Luna" style={{ height:68, width:'auto', marginBottom:8 }}/>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:S.muted, textTransform:'uppercase', margin:0 }}>Volunteer Portal</p>
        </div>
        <form onSubmit={handleLogin}>
          <label style={slbl}>Email</label>
          <input type="email" required value={email} onChange={e=>{setEmail(e.target.value);setError('');}}
            placeholder="you@email.com" style={{ ...sfld, marginBottom:14 }}/>
          <label style={slbl}>Password</label>
          <input type="password" required value={password} onChange={e=>{setPassword(e.target.value);setError('');}}
            placeholder="••••••••" style={{ ...sfld, marginBottom:24 }}/>
          {error && <p style={{ color:S.red, fontSize:13, margin:'-12px 0 16px', lineHeight:1.5 }}>{error}</p>}
          <button type="submit" style={{ width:'100%', padding:'13px 0', background:S.ink, color:'#fff', border:'none', borderRadius:4, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:"'Space Grotesk',sans-serif" }}>
            Sign In →
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:20, fontSize:12, color:S.muted }}>
          No account? Ask your admin to invite you.
        </p>
      </div>
    </div>
  );
}

// ── Top Bar ───────────────────────────────────────────────────────────────────

function PortalBar({ user, isAdmin }) {
  const signOut = async () => {
    await sb.auth.signOut();
    window.location.reload();
  };
  return (
    <div style={{ background: isAdmin ? S.ink : '#fff', borderBottom:`1px solid ${isAdmin ? 'rgba(255,255,255,0.08)' : S.border}`, padding:'0 32px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <img src="uploads/logo.png" alt="logo" style={{ height:34 }}/>
        <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:15, color: isAdmin ? '#fff' : S.ink }}>
          {isAdmin ? 'Admin Dashboard' : 'Feeding Log'}
        </span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:16 }}>
        <span style={{ fontSize:13, color: isAdmin ? 'rgba(255,255,255,0.5)' : S.muted }}>
          <strong style={{ color: isAdmin ? '#fff' : S.ink }}>{user.name}</strong>
          {isAdmin && <span style={{ marginLeft:8, fontSize:10, background:'rgba(196,149,74,0.2)', color:S.gold, padding:'2px 7px', borderRadius:3, fontWeight:700, letterSpacing:1, textTransform:'uppercase' }}>Admin</span>}
        </span>
        <button onClick={signOut} style={{ fontSize:12, color: isAdmin ? S.gold : S.ink, background:'none', border:`1px solid ${isAdmin ? 'rgba(255,255,255,0.15)' : S.border}`, borderRadius:4, padding:'6px 12px', cursor:'pointer', fontWeight:600, fontFamily:"'Inter',sans-serif" }}>Sign out</button>
      </div>
    </div>
  );
}

// ── Feeding Log (Volunteer) ───────────────────────────────────────────────────

function SBFeedingLog({ user }) {
  const today = new Date().toISOString().split('T')[0];
  const now   = new Date().toTimeString().slice(0,5);
  const [form, setForm]   = useState({ date:today, time:now, station:'', catsText:'', amount:'', unit:'g', notes:'' });
  const [ok, setOk]       = useState(false);
  const [saving, setSaving] = useState(false);
  const [myLogs, setMyLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const up = (k,v) => setForm(f=>({...f,[k]:v}));

  // Load my logs
  useEffect(() => {
    sb.from('feeding_logs')
      .select('*')
      .eq('volunteer_id', user.id)
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => { setMyLogs(data || []); setLoadingLogs(false); });
  }, [user.id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.station || !form.amount) return;
    setSaving(true);
    const cats = form.catsText.split(',').map(s=>s.trim()).filter(Boolean);
    const { error } = await sb.from('feeding_logs').insert({
      date: form.date,
      time: form.time,
      volunteer_id: user.id,
      volunteer_name: user.name,
      station: form.station,
      cats,
      amount: form.amount + form.unit,
      notes: form.notes,
    });
    if (!error) {
      setOk(true);
      setTimeout(()=>setOk(false), 4000);
      setForm({ date:today, time:now, station:'', catsText:'', amount:'', unit:'g', notes:'' });
      // refresh logs
      const { data } = await sb.from('feeding_logs').select('*').eq('volunteer_id', user.id).order('created_at', { ascending:false }).limit(6);
      setMyLogs(data || []);
    }
    setSaving(false);
  };

  const stations = window.STATIONS || [];
  const cats     = window.CATS || [];

  return (
    <div style={{ minHeight:'100vh', background:S.bgSoft, fontFamily:"'Inter',sans-serif" }}>
      <PortalBar user={user} isAdmin={false}/>
      <div style={{ maxWidth:700, margin:'0 auto', padding:'40px 24px' }}>

        {/* Form card */}
        <div style={{ background:'#fff', borderRadius:6, padding:'36px', border:`1px solid ${S.border}`, marginBottom:28 }}>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, color:S.ink, margin:'0 0 4px' }}>Record a Feeding</h2>
          <p style={{ color:S.muted, fontSize:13, margin:'0 0 28px' }}>Log what you observed and fed today</p>

          {ok && (
            <div style={{ background:S.greenBg, border:`1.5px solid ${S.green}30`, borderRadius:4, padding:'12px 16px', marginBottom:22, color:S.green, fontSize:14, fontWeight:600, display:'flex', alignItems:'center', gap:8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill={S.green}/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Logged — thank you, {user.name}!
            </div>
          )}

          <form onSubmit={submit}>
            <div className="cdl-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
              <div><label style={slbl}>Date</label><input type="date" value={form.date} onChange={e=>up('date',e.target.value)} style={sfld}/></div>
              <div><label style={slbl}>Time</label><input type="time" value={form.time} onChange={e=>up('time',e.target.value)} style={sfld}/></div>
            </div>

            <div style={{ marginBottom:16 }}>
              <label style={slbl}>Station <span style={{ color:'#C0392B' }}>*</span></label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {stations.map(s => (
                  <button key={s.id} type="button" onClick={()=>up('station',s.id)} style={{ padding:'8px 14px', borderRadius:20, border:`1.5px solid ${form.station===s.id ? S.ink : S.border}`, background: form.station===s.id ? S.ink : 'transparent', color: form.station===s.id ? '#fff' : S.muted, fontSize:13, cursor:'pointer', fontFamily:"'Inter',sans-serif", fontWeight: form.station===s.id ? 600 : 400 }}>{s.label}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:16 }}>
              <label style={slbl}>Cats Seen</label>
              <input value={form.catsText} onChange={e=>up('catsText',e.target.value)} placeholder="e.g. Luna, Mochi, unknown calico" style={{ ...sfld, marginBottom:8 }}/>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {cats.map(c => (
                  <button key={c.id} type="button" onClick={()=>{
                    const ex = form.catsText.split(',').map(s=>s.trim()).filter(Boolean);
                    if (!ex.includes(c.name)) up('catsText', [...ex, c.name].join(', '));
                  }} style={{ padding:'4px 10px', borderRadius:12, border:`1px solid ${S.border}`, background:S.bgSoft, color:S.muted, fontSize:12, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>+ {c.name}</button>
                ))}
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:12, marginBottom:16 }}>
              <div><label style={slbl}>Amount <span style={{ color:'#C0392B' }}>*</span></label><input type="number" min="0" value={form.amount} onChange={e=>up('amount',e.target.value)} placeholder="e.g. 200" style={sfld}/></div>
              <div><label style={slbl}>Unit</label>
                <select value={form.unit} onChange={e=>up('unit',e.target.value)} style={sfld}>
                  <option value="g">grams (g)</option>
                  <option value=" cans">cans</option>
                  <option value=" cups">cups</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom:26 }}>
              <label style={slbl}>Notes</label>
              <textarea value={form.notes} onChange={e=>up('notes',e.target.value)} placeholder="Health observations, new cats, unusual behavior…" rows={3} style={{ ...sfld, resize:'vertical' }}/>
            </div>

            <button type="submit" disabled={saving} style={{ padding:'12px 32px', background:S.ink, color:'#fff', border:'none', borderRadius:4, fontSize:14, fontWeight:600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1, fontFamily:"'DM Serif Display',serif" }}>
              {saving ? 'Saving…' : 'Submit Log →'}
            </button>
          </form>
        </div>

        {/* My logs */}
        {!loadingLogs && myLogs.length > 0 && (
          <div>
            <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:S.ink, margin:'0 0 12px' }}>My Recent Logs</h3>
            {myLogs.map(log => <SBLogRow key={log.id} log={log}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────

function SBAdminDashboard({ user }) {
  const [tab, setTab]   = useState('overview');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const stations = window.STATIONS || [];

  useEffect(() => {
    sb.from('feeding_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setLogs(data || []); setLoading(false); });
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const stats = [
    { label:'Total Feedings',    value: logs.length },
    { label:"Today's Logs",      value: logs.filter(l=>l.date===todayStr).length },
    { label:'Active Volunteers', value: [...new Set(logs.map(l=>l.volunteer_name))].length },
    { label:'Cats Tracked',      value: [...new Set(logs.flatMap(l=>l.cats||[]))].filter(Boolean).length },
  ];

  const byStation = stations.map(s => ({
    ...s,
    count: logs.filter(l=>l.station===s.id).length,
    totalG: logs.filter(l=>l.station===s.id).reduce((sum,l)=>sum+(parseFloat(l.amount)||0),0)
  }));

  const byVol = [...new Set(logs.map(l=>l.volunteer_name))].map(v => {
    const vl = logs.filter(l=>l.volunteer_name===v);
    return { name:v, count:vl.length, lastDate: vl[0]?.date };
  });

  return (
    <div style={{ minHeight:'100vh', background:S.bgSoft, fontFamily:"'Inter',sans-serif" }}>
      <PortalBar user={user} isAdmin={true}/>
      <div style={{ maxWidth:1000, margin:'0 auto', padding:'36px 24px' }}>

        {/* Stats */}
        <div className="cdl-grid-4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:28 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background:'#fff', borderRadius:6, padding:'22px 24px', border:`1px solid ${S.border}` }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:34, color:S.ink, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:12, color:S.muted, marginTop:6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', borderBottom:`1.5px solid ${S.border}`, marginBottom:0, overflowX:'auto' }}>
          {['overview','all logs','by volunteer','by station'].map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{ padding:'9px 20px', border:'none', background:'transparent', color: tab===t ? S.ink : S.muted, fontWeight: tab===t ? 700 : 400, fontSize:13, cursor:'pointer', textTransform:'capitalize', borderBottom:`2px solid ${tab===t ? S.ink : 'transparent'}`, marginBottom:-1.5, fontFamily:"'Inter',sans-serif", whiteSpace:'nowrap', flexShrink:0 }}>{t}</button>
          ))}
        </div>

        <div style={{ paddingTop:24 }}>
          {loading && <p style={{ color:S.muted, fontSize:14 }}>Loading logs…</p>}

          {!loading && tab === 'overview' && (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:S.muted, letterSpacing:2, textTransform:'uppercase', marginBottom:14 }}>Recent Activity</div>
              {logs.slice(0,10).map(log => <SBLogRow key={log.id} log={log} showVol/>)}
              {logs.length === 0 && <p style={{ color:S.muted, fontSize:14 }}>No logs yet.</p>}
            </div>
          )}

          {!loading && tab === 'all logs' && (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:S.muted, letterSpacing:2, textTransform:'uppercase', marginBottom:14 }}>All Logs ({logs.length})</div>
              {logs.map(log => <SBLogRow key={log.id} log={log} showVol/>)}
            </div>
          )}

          {!loading && tab === 'by volunteer' && (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:S.muted, letterSpacing:2, textTransform:'uppercase', marginBottom:14 }}>Volunteer Summary</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10 }}>
                {byVol.map(v => (
                  <div key={v.name} style={{ background:'#fff', borderRadius:6, padding:'20px', border:`1px solid ${S.border}` }}>
                    <div style={{ width:36, height:36, borderRadius:'50%', background:S.bgSoft, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
                      <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:S.ink }}>{v.name[0]}</span>
                    </div>
                    <div style={{ fontWeight:700, color:S.ink, fontSize:14, marginBottom:3 }}>{v.name}</div>
                    <div style={{ fontSize:12, color:S.muted }}>{v.count} feedings</div>
                    <div style={{ fontSize:11, color:'#C0BEBB', marginTop:3 }}>Last: {v.lastDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && tab === 'by station' && (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:S.muted, letterSpacing:2, textTransform:'uppercase', marginBottom:14 }}>Station Summary</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:10 }}>
                {byStation.map(s => (
                  <div key={s.id} style={{ background:'#fff', borderRadius:6, padding:'22px', border:`1px solid ${S.border}` }}>
                    <div style={{ display:'inline-block', background:S.bgSoft, color:S.ink, borderRadius:3, padding:'2px 8px', fontSize:10, fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:10 }}>Station {s.id}</div>
                    <div style={{ fontWeight:600, color:S.ink, fontSize:14, marginBottom:10 }}>{s.label.split('–')[1]?.trim()}</div>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:30, color:S.ink, lineHeight:1 }}>{s.count}</div>
                    <div style={{ fontSize:12, color:S.muted, marginTop:4 }}>feedings recorded</div>
                    {s.totalG > 0 && <div style={{ fontSize:11, color:'#C0BEBB', marginTop:3 }}>{s.totalG}g total</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Log Row ───────────────────────────────────────────────────────────────────

function SBLogRow({ log, showVol }) {
  const stations = window.STATIONS || [];
  const stLabel = stations.find(s=>s.id===log.station)?.label || `Station ${log.station}`;
  return (
    <div style={{ background:'#fff', borderRadius:6, padding:'13px 16px', border:`1px solid ${S.border}`, marginBottom:6, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
      <div>
        {showVol && <span style={{ fontSize:13, fontWeight:700, color:S.ink, marginRight:10 }}>{log.volunteer_name}</span>}
        <span style={{ fontSize:13, color:S.muted }}>{stLabel.split('–')[0].trim()}</span>
        <span style={{ color:S.border, margin:'0 7px' }}>·</span>
        <span style={{ fontSize:13, color:S.muted }}>{log.amount}</span>
        {(log.cats||[]).length > 0 && <><span style={{ color:S.border, margin:'0 7px' }}>·</span><span style={{ fontSize:13, color:S.muted }}>{log.cats.join(', ')}</span></>}
        {log.notes && <p style={{ margin:'4px 0 0', fontSize:12, color:'#C0BEBB', fontStyle:'italic' }}>{log.notes}</p>}
      </div>
      <span style={{ fontSize:11, color:'#C0BEBB', whiteSpace:'nowrap', marginLeft:14 }}>{log.date} {log.time?.slice(0,5)}</span>
    </div>
  );
}

Object.assign(window, { SBLogin, SBFeedingLog, SBAdminDashboard });
