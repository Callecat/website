
const { useState } = React;

const A = {
  bg:     '#FFFFFF',
  bgSoft: '#F5F4F1',
  ink:    '#0D0D0D',
  gold:   '#C4954A',
  muted:  '#888886',
  border: '#E6E4E0',
  dark:   '#0D0D0D',
};

// Cat images from cataas
function catSrc(i, w=400, h=300) {
  return `https://cataas.com/cat?width=${w}&height=${h}&i=${i}`;
}

// ── Shared Footer ─────────────────────────────────────────────────────────────

function SiteFooter({ setPage }) {
  return (
    <footer style={{ background:A.bgSoft, borderTop:`1px solid ${A.border}`, fontFamily:"'Inter',sans-serif" }}>
      <div className="cdl-grid-3" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', borderBottom:`1px solid ${A.border}` }}>
        <div className="cdl-border-r cdl-section-pad" style={{ padding:'48px 48px', borderRight:`1px solid ${A.border}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <img src="uploads/logo.png" alt="Calle de Luna" style={{ height:52 }}/>
            <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:A.ink }}>Calle de Luna Rescue</span>
          </div>
          <p style={{ fontSize:13, color:A.muted, lineHeight:1.7 }}>Community cat rescue since 2016.</p>
        </div>
        <div className="cdl-border-r cdl-section-pad" style={{ padding:'48px 40px', borderRight:`1px solid ${A.border}` }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:3.5, color:A.gold, textTransform:'uppercase', marginBottom:20 }}>Navigate</div>
          {['Home','Our Cats','Volunteer','Donate'].map(l => (
            <div key={l} onClick={()=>setPage && setPage(l.toLowerCase().replace(' ','-').replace('our-cats','cats'))}
              style={{ fontSize:13, color:A.muted, marginBottom:10, cursor:'pointer' }}>{l}</div>
          ))}
        </div>
        <div className="cdl-section-pad" style={{ padding:'48px 40px' }}>
          <div style={{ fontSize:9, fontWeight:700, letterSpacing:3.5, color:A.gold, textTransform:'uppercase', marginBottom:20 }}>Contact</div>
          <a href="mailto:team@callecat.org" style={{ display:'block', fontSize:13, color:A.muted, marginBottom:10, textDecoration:'none' }}>team@callecat.org</a>
          <a href="https://www.instagram.com/calledelunarescue/" target="_blank" rel="noopener noreferrer" style={{ display:'block', fontSize:13, color:A.muted, marginBottom:10, textDecoration:'none' }}>Instagram</a>
          <a href="https://www.tiktok.com/@calledelunarescue/" target="_blank" rel="noopener noreferrer" style={{ display:'block', fontSize:13, color:A.muted, marginBottom:10, textDecoration:'none' }}>TikTok</a>
          <a href="https://www.facebook.com/people/Calle-De-Luna-Rescue/61592118343821/" target="_blank" rel="noopener noreferrer" style={{ display:'block', fontSize:13, color:A.muted, textDecoration:'none' }}>Facebook</a>
        </div>
      </div>
      <div className="cdl-container" style={{ maxWidth:1200, margin:'0 auto', padding:'20px 48px', fontSize:11, color:'#C0BEBB' }}>
        © 2026 Calle de Luna Rescue. All rights reserved.
      </div>
    </footer>
  );
}

function PublicNav({ page, setPage, onPortal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { id:'home', label:'Home' },
    { id:'cats', label:'Our Cats' },
    { id:'volunteer', label:'Volunteer' },
    { id:'donate', label:'Donate' },
  ];
  const go = (id) => { setPage(id); setMobileOpen(false); };
  return (
    <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,0.97)', backdropFilter:'blur(12px)', borderBottom:`1px solid ${A.border}` }}>
      <div className="cdl-container" style={{ maxWidth:1200, margin:'0 auto', padding:'0 48px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <button onClick={()=>go('home')} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
          <img src="uploads/logo.png" alt="Calle de Luna" style={{ height:38, width:'auto', flexShrink:0 }}/>
          <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:A.ink, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>Calle de Luna Rescue</span>
        </button>
        <div className="cdl-nav-links" style={{ display:'flex', alignItems:'center', gap:4 }}>
          {links.map(l => {
            const active = page===l.id || (l.id==='cats' && page==='cat-detail');
            return (
              <button key={l.id} onClick={()=>go(l.id)} style={{ padding:'7px 14px', border:'none', background:'transparent', color: active ? A.ink : A.muted, fontWeight: active ? 600 : 400, fontSize:13, cursor:'pointer', fontFamily:"'Inter',sans-serif", letterSpacing:0.1 }}>{l.label}</button>
            );
          })}
          <button onClick={onPortal} style={{ marginLeft:14, padding:'7px 16px', background:A.bgSoft, border:`1px solid ${A.border}`, borderRadius:4, fontSize:12, fontWeight:600, color:A.ink, cursor:'pointer', fontFamily:"'Inter',sans-serif", letterSpacing:0.3 }}>
            Volunteer Portal
          </button>
        </div>
        <button className="cdl-nav-toggle" onClick={()=>setMobileOpen(o=>!o)} style={{ display:'none', alignItems:'center', justifyContent:'center', width:36, height:36, background:'none', border:'none', cursor:'pointer', padding:0, flexShrink:0 }} aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen ? (
              <path d="M4 4L18 18M18 4L4 18" stroke={A.ink} strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <>
                <line x1="2" y1="6" x2="20" y2="6" stroke={A.ink} strokeWidth="2" strokeLinecap="round"/>
                <line x1="2" y1="11" x2="20" y2="11" stroke={A.ink} strokeWidth="2" strokeLinecap="round"/>
                <line x1="2" y1="16" x2="20" y2="16" stroke={A.ink} strokeWidth="2" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="cdl-mobile-menu" style={{ display:'flex', flexDirection:'column', borderTop:`1px solid ${A.border}`, background:'#fff' }}>
          {links.map(l => {
            const active = page===l.id || (l.id==='cats' && page==='cat-detail');
            return (
              <button key={l.id} onClick={()=>go(l.id)} style={{ padding:'14px 24px', textAlign:'left', border:'none', borderBottom:`1px solid ${A.border}`, background:'transparent', color: active ? A.ink : A.muted, fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{l.label}</button>
            );
          })}
          <button onClick={()=>{ onPortal(); setMobileOpen(false); }} style={{ padding:'14px 24px', textAlign:'left', border:'none', background:A.bgSoft, color:A.ink, fontWeight:600, fontSize:14, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
            Volunteer Portal
          </button>
        </div>
      )}
    </nav>
  );
}

// ── Cat Card ──────────────────────────────────────────────────────────────────

function CatCard({ cat, index = 0 }) {
  const [hov, setHov] = useState(false);
  const sc = catStatusColors(cat.status);
  const adopted = cat.status === 'Adopted';
  const meta = [cat.gender, cat.age, cat.color].filter(Boolean).join(' · ');
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={()=>!adopted && window.__goCat(cat.id)}
      style={{ background:'#fff', border:`1px solid ${A.border}`, borderRadius:4, overflow:'hidden', cursor: adopted ? 'default' : 'pointer', transition:'box-shadow 0.2s', boxShadow: hov ? '0 6px 28px rgba(0,0,0,0.09)' : 'none', height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
        <img src={cat.img || catSrc(index+1)} alt={cat.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.3s', transform: hov ? 'scale(1.03)' : 'scale(1)' }}/>
      </div>
      <div style={{ padding:'16px 18px', display:'flex', flexDirection:'column', flex:1 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
          <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:A.ink }}>{cat.name}</span>
          <span style={{ fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase', padding:'3px 7px', borderRadius:3, background:sc.bg, color:sc.fg }}>{cat.status}</span>
        </div>
        {meta && <div style={{ fontSize:12, color:A.muted, marginBottom:8, letterSpacing:0.2 }}>{meta}</div>}
        {cat.teaser && <p style={{ fontSize:13, color:'#555', lineHeight:1.65, margin:'0 0 12px' }}>{cat.teaser}</p>}
        {!adopted && (
          <button onClick={(e)=>{e.stopPropagation(); window.__goCat(cat.id);}} style={{ fontSize:12, fontWeight:600, color:A.ink, background:'none', border:`1px solid ${A.border}`, borderRadius:4, padding:'7px 14px', cursor:'pointer', fontFamily:"'Inter',sans-serif", marginTop:'auto', alignSelf:'flex-start' }}>Learn more →</button>
        )}
      </div>
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  const cats = (window.CATS || []).slice(0, 4);
  return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:A.ink }}>

      {/* Hero — split: text left, photo grid right */}
      <section style={{ borderBottom:`1px solid ${A.border}` }}>
        <div className="cdl-grid-2" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
          {/* Left */}
          <div className="cdl-hero-text" style={{ padding:'80px 56px 80px 48px', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:`1px solid ${A.border}` }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:A.muted, textTransform:'uppercase', marginBottom:24 }}>Community Cat Rescue · Est. 2016</div>
            <h1 className="cdl-h1" style={{ fontFamily:"'DM Serif Display',serif", fontSize:'clamp(44px,4.5vw,68px)', fontWeight:400, color:A.ink, lineHeight:1.08, margin:'0 0 26px' }}>
              Every alley has<br/>
              <em style={{ fontStyle:'italic', color:A.gold }}>a cat</em><br/>
              that needs you.
            </h1>
            <p style={{ fontSize:15, color:A.muted, lineHeight:1.85, maxWidth:400, margin:'0 0 40px' }}>
              We connect people to rescue, foster, and adopt cats in our community. Over 300 cats helped since 2016 — through a network of dedicated volunteers.
            </p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <button onClick={()=>setPage('volunteer')} style={{ padding:'13px 24px', background:A.ink, color:'#fff', border:'none', borderRadius:4, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Become a volunteer</button>
              <button onClick={()=>setPage('donate')} style={{ padding:'13px 24px', background:'transparent', color:A.ink, border:`1px solid ${A.border}`, borderRadius:4, fontSize:13, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Make a donation</button>
            </div>
          </div>
          {/* Right — photo grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gridAutoRows:'auto' }}>
            <div style={{ aspectRatio:'1/1', overflow:'hidden', borderBottom:`1px solid ${A.border}` }}>
              <img src="uploads/home-hero-1.jpg" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} alt="cat"/>
            </div>
            <div style={{ aspectRatio:'1/1', borderLeft:`1px solid ${A.border}`, borderBottom:`1px solid ${A.border}`, background:A.bgSoft, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:4 }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, color:A.ink, lineHeight:1 }}>300+</div>
              <div style={{ fontSize:10, color:A.muted, letterSpacing:3, textTransform:'uppercase' }}>Cats Rescued</div>
            </div>
            <div style={{ aspectRatio:'1/1', background:A.ink, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:4 }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, color:A.gold, lineHeight:1 }}>50+</div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:3, textTransform:'uppercase' }}>Volunteers</div>
            </div>
            <div style={{ aspectRatio:'1/1', overflow:'hidden', borderLeft:`1px solid ${A.border}` }}>
              <img src="uploads/home-hero-2.jpg" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} alt="cat"/>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ borderBottom:`1px solid ${A.border}` }}>
        <div className="cdl-grid-2" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
          <div className="cdl-border-r cdl-order-last-mobile" style={{ borderRight:`1px solid ${A.border}`, overflow:'hidden', aspectRatio:'1/1' }}>
            <img src="uploads/home-mission.jpg" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} alt="cat"/>
          </div>
          <div className="cdl-section-pad-lg cdl-order-first-mobile" style={{ padding:'72px 56px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:A.muted, textTransform:'uppercase', marginBottom:20 }}>Our Mission</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:42, fontWeight:400, color:A.ink, lineHeight:1.15, margin:'0 0 22px' }}>
              Compassion for<br/><em style={{ fontStyle:'italic', color:A.gold }}>every cat</em> on the block.
            </h2>
            <p style={{ fontSize:16, color:A.ink, fontWeight:600, lineHeight:1.6, margin:'0 0 24px' }}>
              No cat left hungry. No colony left unmanaged.
            </p>
            <p style={{ fontSize:15, color:A.muted, lineHeight:1.85, margin:'0 0 18px' }}>
              Calle de Luna started in 2016 when neighbors noticed stray cats struggling on the streets. What began as informal feeding rounds grew into a coordinated rescue network.
            </p>
            <p style={{ fontSize:15, color:A.muted, lineHeight:1.85, margin:'0 0 32px' }}>
              Today we run five feeding stations, coordinate weekly vet checks, and maintain an active network of foster families.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, paddingTop:24, borderTop:`1px solid ${A.border}` }}>
              {[
                { n:'5', label:'Feeding Stations' },
                { n:'2016', label:'Year Founded' },
                { n:'Weekly', label:'Vet Check-ups' },
                { n:'Active', label:'Foster Network' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, color:A.ink }}>{s.n}</div>
                  <div style={{ fontSize:11, color:A.muted, marginTop:2, letterSpacing:0.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to help */}
      <section style={{ borderBottom:`1px solid ${A.border}` }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className="cdl-container" style={{ padding:'56px 48px 32px', borderBottom:`1px solid ${A.border}` }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:A.muted, textTransform:'uppercase', marginBottom:16 }}>Get Involved</div>
            <h2 className="cdl-h2" style={{ fontFamily:"'DM Serif Display',serif", fontSize:40, fontWeight:400, color:A.ink, margin:0 }}>There is a place for everyone.</h2>
          </div>
          <div className="cdl-grid-3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)' }}>
            {[
              { title:'Volunteer', sub:'Show up', desc:'Join as a daily feeder, foster carer, vet driver, or event helper. Any amount of time makes a difference.', cta:'Get involved', page:'volunteer' },
              { title:'Donate',    sub:'Give back', desc:'Food, vet bills, and supplies are ongoing needs. Your contribution — cash or in-kind — goes directly to the cats.', cta:'See how to give', page:'donate' },
              { title:'Foster',    sub:'Open your home', desc:'Give a cat a safe space while they wait for adoption. We provide support, supplies, and vet coordination.', cta:'Learn more', page:'volunteer' },
            ].map((item, i) => (
              <div key={item.title} className="cdl-border-r cdl-item-pad cdl-border-b-mobile" style={{ padding:'40px 40px 40px', borderRight: i < 2 ? `1px solid ${A.border}` : 'none' }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:A.muted, textTransform:'uppercase', marginBottom:14 }}>{item.sub}</div>
                <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:30, fontWeight:400, color:A.ink, margin:'0 0 14px' }}>{item.title}</h3>
                <p style={{ fontSize:14, color:A.muted, lineHeight:1.8, margin:'0 0 28px' }}>{item.desc}</p>
                <button onClick={()=>setPage(item.page)} style={{ padding:'9px 18px', background:'transparent', color:A.ink, border:`1px solid ${A.border}`, borderRadius:4, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{item.cta} →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cats preview */}
      <section style={{ borderBottom:`1px solid ${A.border}` }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className="cdl-container cdl-stack-mobile" style={{ padding:'56px 48px 32px', borderBottom:`1px solid ${A.border}`, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:A.muted, textTransform:'uppercase', marginBottom:14 }}>Our Cats</div>
              <h2 className="cdl-h2" style={{ fontFamily:"'DM Serif Display',serif", fontSize:40, fontWeight:400, color:A.ink, margin:0 }}>Some cats seeking homes</h2>
            </div>
            <button onClick={()=>setPage('cats')} style={{ padding:'9px 18px', background:'transparent', color:A.ink, border:`1px solid ${A.border}`, borderRadius:4, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif", whiteSpace:'nowrap' }}>See all cats →</button>
          </div>
          <div className="cdl-grid-4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'none' }}>
            {cats.map((cat, i) => (
              <div key={cat.id} className="cdl-border-r cdl-border-b-mobile" style={{ borderRight: i < 3 ? `1px solid ${A.border}` : 'none' }}>
                <CatCard cat={cat} index={i}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter setPage={setPage} />
    </div>
  );
}

// ── Cats Page ─────────────────────────────────────────────────────────────────

const PARTNER_SHELTERS = [
  { name:'Nine Lives Foundation', location:'Redwood City, CA', url:'https://ninelivesfoundation.org/' },
  { name:'Bay Area Cats', location:'Bay Area, CA', url:'https://bayareacats.org/' },
  { name:'Silicon Valley Animal Control Authority (SVACA)', location:'Santa Clara, CA', url:'https://www.svaca.com/' },
  { name:'San Jose Animal Care Center', location:'San Jose, CA', url:'https://www.sanjoseca.gov/your-government/departments-offices/animal-care-services/services/pet-adoption' },
  { name:'Humane Society Silicon Valley', location:'Milpitas, CA', url:'https://www.hssv.org/' },
];

function catStatusColors(status) {
  if (status === 'Looking for a Home') return { bg:'#EDFAED', fg:'#2A6A2A' };
  if (status === 'Adopted')            return { bg:'#FDEDF3', fg:'#A83B63' };
  return { bg:'#FEF8E6', fg:'#8A6020' }; // e.g. In Training
}

function CatsPage() {
  const cats = window.CATS || [];

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:A.ink }}>
      {/* Header */}
      <div style={{ borderBottom:`1px solid ${A.border}` }}>
        <div className="cdl-container" style={{ maxWidth:1200, margin:'0 auto', padding:'72px 48px 56px' }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:A.muted, textTransform:'uppercase', marginBottom:18 }}>Our Cats</div>
          <h1 className="cdl-h1" style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, fontWeight:400, color:A.ink, margin:'0 0 16px' }}>Cats in our care</h1>
          <p style={{ fontSize:15, color:A.muted, lineHeight:1.8, maxWidth:640 }}>
            Calle de Luna is a trap-neuter-return (TNR) and community cat support network — not an animal shelter. We don't take in surrendered cats or run a shelter-style adoption process. Most of the cats we care for stay right where they're already known and loved, out in the community. Every so often a cat is ready for a home of her own.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        {/* All cats */}
        <div className="cdl-container" style={{ padding:'52px 48px 40px', borderBottom:`1px solid ${A.border}` }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:24 }}>
            {cats.map((cat) => {
              const sc = catStatusColors(cat.status);
              const adopted = cat.status === 'Adopted';
              const meta = [cat.gender, cat.age, cat.color].filter(Boolean).join(' · ');
              return (
                <div key={cat.id} onClick={()=>!adopted && window.__goCat(cat.id)}
                  style={{ background:'#fff', border:`1px solid ${A.border}`, borderRadius:4, overflow:'hidden', cursor: adopted ? 'default' : 'pointer', height:'100%', display:'flex', flexDirection:'column' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={cat.img || catSrc(cat.id)} alt={cat.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                  </div>
                  <div style={{ padding:'18px 20px', display:'flex', flexDirection:'column', flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                      <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:A.ink }}>{cat.name}</span>
                      <span style={{ fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase', padding:'3px 8px', borderRadius:3, background:sc.bg, color:sc.fg }}>{cat.status}</span>
                    </div>
                    {!adopted ? (
                      <>
                        {meta && <div style={{ fontSize:12, color:A.muted, marginBottom:10 }}>{meta}</div>}
                        {cat.teaser && <p style={{ fontSize:13, color:'#555', lineHeight:1.6, margin:'0 0 14px' }}>{cat.teaser}</p>}
                        <button onClick={(e)=>{e.stopPropagation(); window.__goCat(cat.id);}} style={{ fontSize:12, fontWeight:600, color:A.ink, background:'none', border:`1px solid ${A.border}`, borderRadius:4, padding:'7px 14px', cursor:'pointer', fontFamily:"'Inter',sans-serif", marginTop:'auto', alignSelf:'flex-start' }}>Learn more →</button>
                      </>
                    ) : (
                      cat.caption && <p style={{ fontSize:12, color:A.muted, lineHeight:1.6, margin:0 }}>{cat.caption}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our approach / partner shelters */}
        <div className="cdl-container" style={{ padding:'52px 48px 80px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:32 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:A.muted, textTransform:'uppercase' }}>Our Approach</div>
            <div style={{ flex:1, height:1, background:A.border }}></div>
          </div>
          <p style={{ fontSize:14, color:A.muted, lineHeight:1.85, maxWidth:640, marginBottom:36 }}>
            We focus on trap-neuter-return, daily feeding, and vet care for cats already living in our community — we're not set up to take in new cats or run a formal intake and adoption process. If you're looking to adopt a cat or kitten, or need to rehome one, we recommend reaching out to one of these local shelters and rescues instead:
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16 }}>
            {PARTNER_SHELTERS.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display:'block', background:'#fff', border:`1px solid ${A.border}`, borderRadius:4, padding:'18px 20px', textDecoration:'none' }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:A.ink, marginBottom:6 }}>{s.name}</div>
                <div style={{ fontSize:12, color:A.muted, marginBottom:8 }}>{s.location}</div>
                <div style={{ fontSize:12, color:A.gold, fontWeight:600 }}>Visit website →</div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter setPage={window.__setPage} />
    </div>
  );
}

// ── Cat Detail Page ──────────────────────────────────────────────────────────

function CatDetailPage({ catId, setPage }) {
  const cat = (window.CATS || []).find(c => c.id === catId);
  if (!cat) {
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", color:A.ink, padding:'80px 48px', textAlign:'center' }}>
        <p style={{ color:A.muted, marginBottom:20 }}>We couldn't find that cat.</p>
        <button onClick={()=>setPage('cats')} style={{ padding:'10px 20px', background:A.ink, color:'#fff', border:'none', borderRadius:4, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>← Back to all cats</button>
      </div>
    );
  }
  const sc = catStatusColors(cat.status);
  const meta = [cat.gender, cat.age, cat.color].filter(Boolean).join(' · ');
  const images = [cat.img || catSrc(cat.id), ...(cat.gallery || [])];
  const [activeImg, setActiveImg] = useState(images[0]);

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:A.ink }}>
      <div className="cdl-container" style={{ maxWidth:900, margin:'0 auto', padding:'48px 48px 100px' }}>
        <button onClick={()=>setPage('cats')} style={{ background:'none', border:'none', color:A.muted, fontSize:13, cursor:'pointer', padding:0, marginBottom:28, fontFamily:"'Inter',sans-serif" }}>← Back to all cats</button>
        <div className="cdl-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
          <div>
            <div style={{ borderRadius:6, overflow:'hidden', border:`1px solid ${A.border}`, marginBottom: images.length > 1 ? 10 : 0 }}>
              <img src={activeImg} alt={cat.name} style={{ width:'100%', display:'block', objectFit:'cover' }}/>
            </div>
            {images.length > 1 && (
              <div style={{ display:'flex', gap:8 }}>
                {images.map(src => (
                  <div key={src} onClick={()=>setActiveImg(src)} style={{ width:64, height:64, borderRadius:4, overflow:'hidden', cursor:'pointer', border: activeImg===src ? `2px solid ${A.gold}` : `1px solid ${A.border}` }}>
                    <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <span style={{ fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase', padding:'4px 10px', borderRadius:3, background:sc.bg, color:sc.fg }}>{cat.status}</span>
            <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:44, fontWeight:400, color:A.ink, margin:'16px 0 8px' }}>{cat.name}</h1>
            {meta && <div style={{ fontSize:13, color:A.muted, marginBottom:24 }}>{meta}</div>}
            <p style={{ fontSize:15, color:'#444', lineHeight:1.85, whiteSpace:'pre-line', margin:'0 0 32px' }}>{cat.desc}</p>
            <a href="mailto:team@callecat.org" style={{ display:'inline-block', padding:'13px 26px', background:A.ink, color:'#fff', borderRadius:4, fontSize:13, fontWeight:600, textDecoration:'none', fontFamily:"'Inter',sans-serif" }}>Ask about {cat.name} →</a>
          </div>
        </div>
      </div>
      <SiteFooter setPage={window.__setPage} />
    </div>
  );
}

// ── Volunteer Page ────────────────────────────────────────────────────────────

function VolunteerPage() {
  const [form, setForm] = useState({ name:'', email:'', roles:[], message:'' });
  const [sent, setSent] = useState(false);
  const roles = ['Daily Feeder','Foster Carer','Vet Transport','Event Helper','Social Media','Fundraising'];
  const toggle = r => setForm(f => ({ ...f, roles: f.roles.includes(r) ? f.roles.filter(x=>x!==r) : [...f.roles,r] }));
  const fld = { width:'100%', padding:'11px 14px', borderRadius:4, border:`1px solid ${A.border}`, fontSize:14, color:A.ink, background:'#fff', outline:'none', boxSizing:'border-box', fontFamily:"'Inter',sans-serif" };
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Volunteer interest — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nInterested in: ${form.roles.join(', ') || 'Not specified'}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:team@callecat.org?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:A.ink }}>
      {/* Header */}
      <div style={{ borderBottom:`1px solid ${A.border}` }}>
        <div className="cdl-grid-2" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
          <div className="cdl-hero-text" style={{ padding:'80px 56px 72px 48px', borderRight:`1px solid ${A.border}` }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:A.muted, textTransform:'uppercase', marginBottom:20 }}>Volunteer</div>
            <h1 className="cdl-h1" style={{ fontFamily:"'DM Serif Display',serif", fontSize:52, fontWeight:400, color:A.ink, lineHeight:1.1, margin:'0 0 20px' }}>
              Join our<br/><em style={{ fontStyle:'italic', color:A.gold }}>team.</em>
            </h1>
            <p style={{ fontSize:15, color:A.muted, lineHeight:1.8 }}>Our work runs on people who care. Whether you have one hour or ten per week, there is a meaningful role waiting for you.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr' }}>
            {[
              { role:'Daily Feeder',  desc:'Cover a station once or twice a week.' },
              { role:'Foster Carer',  desc:'Open your home to a cat in transition.' },
              { role:'Vet Transport', desc:'Drive cats to and from vet appointments.' },
              { role:'Event Helper',  desc:'Support adoption days and fundraisers.' },
            ].map((item, i) => (
              <div key={item.role} className="cdl-border-l" style={{ padding:'28px 28px', borderLeft:`1px solid ${A.border}`, borderBottom: i < 2 ? `1px solid ${A.border}` : 'none', background: i===1||i===2 ? A.bgSoft : '#fff' }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:A.ink, marginBottom:6 }}>{item.role}</div>
                <div style={{ fontSize:12, color:A.muted, lineHeight:1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="cdl-container" style={{ maxWidth:680, margin:'0 auto', padding:'72px 48px 100px' }}>
        {sent ? (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:48, color:A.gold, marginBottom:16 }}>✓</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:36, fontWeight:400, color:A.ink, margin:'0 0 12px' }}>Thank you!</h2>
            <p style={{ fontSize:15, color:A.muted, lineHeight:1.75 }}>Your email app should have opened with your message ready to send to team@callecat.org. If it didn't, email us directly — we'll be in touch soon. Welcome to the Calle de Luna family.</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:34, fontWeight:400, color:A.ink, margin:'0 0 6px' }}>Get in touch</h2>
            <p style={{ fontSize:14, color:A.muted, margin:'0 0 36px', lineHeight:1.7 }}>Tell us a bit about yourself and how you would like to help.</p>
            <form onSubmit={submit}>
              <div className="cdl-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
                <div>
                  <label style={{ display:'block', fontSize:11, fontWeight:700, color:A.muted, marginBottom:6, letterSpacing:1, textTransform:'uppercase' }}>Name</label>
                  <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your name" style={fld}/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:11, fontWeight:700, color:A.muted, marginBottom:6, letterSpacing:1, textTransform:'uppercase' }}>Email</label>
                  <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="you@email.com" style={fld}/>
                </div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:A.muted, marginBottom:10, letterSpacing:1, textTransform:'uppercase' }}>Interested in</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {roles.map(r => (
                    <button key={r} type="button" onClick={()=>toggle(r)} style={{ padding:'7px 14px', borderRadius:20, border:`1px solid ${form.roles.includes(r)?A.ink:A.border}`, background: form.roles.includes(r)?A.ink:'transparent', color: form.roles.includes(r)?'#fff':A.muted, fontSize:12, cursor:'pointer', fontFamily:"'Inter',sans-serif", fontWeight:500 }}>{r}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom:28 }}>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:A.muted, marginBottom:6, letterSpacing:1, textTransform:'uppercase' }}>Anything else?</label>
                <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Availability, experience, questions..." rows={4} style={{ ...fld, resize:'vertical' }}/>
              </div>
              <button type="submit" style={{ padding:'13px 28px', background:A.ink, color:'#fff', border:'none', borderRadius:4, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Submit →</button>
            </form>
          </>
        )}
      </div>
      <SiteFooter setPage={window.__setPage} />
    </div>
  );
}

// ── Donate Page ───────────────────────────────────────────────────────────────

function DonatePage() {
  const ways = [
    { title:'GoFundMe',         desc:'The fastest way to give — support our GoFundMe campaign directly, securely, and online.', url:'https://www.gofundme.com/f/support-calle-de-luna-cat-rescue' },
    { title:'Bank Transfer',    desc:'Send directly to our rescue account. Email us for our banking details and we will reply within 24 hours.' },
    { title:'PayPal / Cash',    desc:'Pay via PayPal or arrange a cash hand-off with one of our coordinators at a location convenient to you.' },
    { title:'In-Kind Supplies', desc:'Cat food, carriers, bedding, litter, and medical supplies are always needed. Drop-off can be arranged.' },
    { title:'Sponsor a Cat',    desc:'Cover the monthly care costs for one of our community cats — food, vet visits, and supplies. We will send you regular updates.' },
    { title:'Foster a Cat',     desc:'Open your home temporarily to a cat that needs a safe space. We provide full support, supplies, and vet coordination.' },
    { title:'Spread the Word',  desc:'Follow us on social media and share our posts. Every reshare helps a cat find a home or a volunteer find us.' },
  ];
  return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:A.ink }}>
      {/* Header */}
      <div style={{ borderBottom:`1px solid ${A.border}` }}>
        <div className="cdl-grid-2" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
          <div className="cdl-hero-text" style={{ padding:'80px 56px 72px 48px', borderRight:`1px solid ${A.border}` }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:4, color:A.muted, textTransform:'uppercase', marginBottom:18 }}>Donate</div>
            <h1 className="cdl-h1" style={{ fontFamily:"'DM Serif Display',serif", fontSize:52, fontWeight:400, color:A.ink, lineHeight:1.1, margin:'0 0 20px' }}>
              Every contribution<br/><em style={{ fontStyle:'italic', color:A.gold }}>counts.</em>
            </h1>
            <p style={{ fontSize:15, color:A.muted, lineHeight:1.8, maxWidth:400, margin:'0 0 36px' }}>
              We are an all-volunteer rescue. 100% of everything we receive goes directly to cat food, vet care, and daily operations.
            </p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <a href="https://www.gofundme.com/f/support-calle-de-luna-cat-rescue" target="_blank" rel="noopener noreferrer" style={{ display:'inline-block', padding:'13px 26px', background:A.gold, color:'#fff', borderRadius:4, fontSize:13, fontWeight:600, textDecoration:'none', fontFamily:"'Inter',sans-serif" }}>Donate on GoFundMe →</a>
              <a href="mailto:team@callecat.org" style={{ display:'inline-block', padding:'13px 26px', background:A.ink, color:'#fff', borderRadius:4, fontSize:13, fontWeight:600, textDecoration:'none', fontFamily:"'Inter',sans-serif" }}>Get in touch →</a>
            </div>
          </div>
          <div className="cdl-section-pad-lg" style={{ padding:'80px 48px 72px 48px' }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:A.muted, textTransform:'uppercase', marginBottom:28 }}>Ways to give</div>
            <div style={{ display:'flex', flexDirection:'column' }}>
              {ways.map((w, i) => {
                const row = (
                  <div className="cdl-grid-2" style={{ display:'grid', gridTemplateColumns:'180px 1fr', gap:24, paddingBottom:20, marginBottom:20, borderBottom: i < ways.length-1 ? `1px solid ${A.border}` : 'none' }}>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:17, color: w.url ? A.gold : A.ink, paddingTop:2 }}>{w.title}{w.url ? ' →' : ''}</div>
                    <div style={{ fontSize:13, color:A.muted, lineHeight:1.75 }}>{w.desc}</div>
                  </div>
                );
                return w.url
                  ? <a key={w.title} href={w.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}>{row}</a>
                  : <div key={w.title}>{row}</div>;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Impact strip */}
      <div style={{ borderBottom:`1px solid ${A.border}` }}>
        <div className="cdl-grid-4" style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {[
            { n:'$20',    label:'Feeds a cat for one week' },
            { n:'$50',    label:'Covers a basic vet check-up' },
            { n:'$100',   label:'Sponsors a foster cat for a month' },
            { n:'$200',   label:'Covers vaccinations for two cats' },
          ].map((s, i) => (
            <div key={s.label} className="cdl-border-b-mobile" style={{ padding:'36px 32px', borderRight: i<3 ? `1px solid ${A.border}` : 'none', textAlign:'center' }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:32, color:A.gold, marginBottom:6 }}>{s.n}</div>
              <div style={{ fontSize:12, color:A.muted, lineHeight:1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter setPage={window.__setPage} />
    </div>
  );
}
