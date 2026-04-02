import sys
sys.stdout.reconfigure(encoding='utf-8')

NEW_DEMOS = r"""/* ── DEMO MODAL JS ── */

function demoSwitch(btn, key) {
  const nav = btn.closest('nav');
  const active = nav.dataset.active || '#c9a84c';
  nav.querySelectorAll('button').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = 'rgba(255,255,255,.55)';
  });
  btn.style.background = active;
  btn.style.color = '#fff';
  const pages = window._demoPages;
  btn.closest('#dsite').querySelector('#dpage').innerHTML = pages[key] || '';
  document.getElementById('demo-scroll').scrollTop = 0;
}

const STAMP = `<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-35deg);font-family:'Poppins',sans-serif;font-weight:900;font-size:4rem;color:rgba(255,0,0,.13);border:6px solid rgba(255,0,0,.13);padding:8px 24px;border-radius:8px;pointer-events:none;z-index:9999;white-space:nowrap;letter-spacing:.2em">DEMO</div>`;

function buildNav(pages, active, navBg) {
  const keys = Object.keys(pages);
  const links = keys.map((k,i) =>
    `<button data-page="${k}" onclick="demoSwitch(this,'${k}')" style="background:${i===0?active:'transparent'};color:${i===0?'#fff':'rgba(255,255,255,.5)'};border:none;padding:8px 14px;border-radius:20px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.78rem;cursor:pointer;white-space:nowrap">${k}</button>`
  ).join('');
  return `<nav data-active="${active}" style="background:${navBg};display:flex;align-items:center;padding:0 16px;height:54px;position:sticky;top:0;z-index:50;gap:4px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none">
    <span style="font-family:'Poppins',sans-serif;font-weight:800;color:#fff;font-size:.9rem;white-space:nowrap;margin-right:10px">Barbershop</span>
    ${links}
  </nav>`;
}

const FOOTER = (bg) => `<div style="background:${bg};padding:22px 24px;color:rgba(255,255,255,.35)"><p style="color:rgba(255,255,255,.7);font-family:'Poppins',sans-serif;font-weight:700;font-size:.85rem;margin-bottom:3px">Barbershop</p><p style="font-size:.72rem">Built by WisdomLayers · wisdomlayers.com</p></div>`;

/* =================================================
   TIER 1 — LANDING PAGE  (1 page, scroll only)
================================================= */
const landingHTML = () => `
<div id="dsite" style="font-family:'Inter',sans-serif;position:relative">
  ${STAMP}
  <nav style="background:#1a1a1a;display:flex;align-items:center;padding:0 20px;height:54px;position:sticky;top:0;z-index:50">
    <span style="font-family:'Poppins',sans-serif;font-weight:800;color:#fff;font-size:1rem">Barbershop</span>
    <a href="#" onclick="return false" style="margin-left:auto;background:#c9a84c;color:#fff;padding:9px 20px;border-radius:20px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.82rem;text-decoration:none">Book Now</a>
  </nav>

  <div style="background:linear-gradient(160deg,#1a1a1a,#2d2d2d);padding:64px 24px 52px;color:#fff;text-align:center">
    <div style="display:inline-block;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.35);color:#c9a84c;font-size:.7rem;font-weight:700;letter-spacing:.12em;padding:5px 14px;border-radius:20px;margin-bottom:16px">Walk-ins Welcome · Open 7 Days</div>
    <h1 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:2.1rem;line-height:1.15;margin-bottom:12px">Fresh Fades.<br><span style="color:#c9a84c">Sharp Lines.</span></h1>
    <p style="color:rgba(255,255,255,.6);max-width:360px;margin:0 auto 28px;line-height:1.7;font-size:.9rem">Your neighborhood barbershop for precision cuts, hot towel shaves, and lineup cleanups.</p>
    <a href="#" onclick="return false" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.92rem;text-decoration:none">Book an Appointment →</a>
  </div>

  <div style="background:#f9f9f9;padding:44px 24px">
    <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.3rem;color:#1a1a1a;margin-bottom:20px">Our Services</h2>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${[['Haircut','Classic or modern — your style, our craft','$25+'],['Beard Trim','Shape, edge, and define your beard','$15+'],['Hot Towel Shave','Relaxing straight razor shave with hot towel','$35+'],['Kids Cut','Gentle and patient cuts for the little ones','$20+'],['Lineup / Edge Up','Crisp edges to keep your look fresh','$10+']].map(([s,d,p])=>`
      <div style="background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div><p style="font-family:'Poppins',sans-serif;font-weight:700;font-size:.88rem;color:#1a1a1a">${s}</p><p style="font-size:.78rem;color:#777;margin-top:3px">${d}</p></div>
        <span style="background:#1a1a1a;color:#c9a84c;padding:5px 12px;border-radius:20px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.8rem;white-space:nowrap;flex-shrink:0">${p}</span>
      </div>`).join('')}
    </div>
  </div>

  <div style="background:#fff;padding:44px 24px">
    <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.3rem;color:#1a1a1a;margin-bottom:20px">Book Your Spot</h2>
    <div style="display:flex;flex-direction:column;gap:10px;max-width:420px">
      <input style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#f9f9f9" placeholder="Your name" readonly>
      <input style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#f9f9f9" placeholder="Phone number" readonly>
      <select style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#f9f9f9;color:#444"><option>Select a service</option><option>Haircut</option><option>Beard Trim</option><option>Hot Towel Shave</option></select>
      <button style="background:#1a1a1a;color:#c9a84c;border:none;border-radius:8px;padding:14px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.95rem;cursor:pointer">Request Appointment</button>
    </div>
  </div>

  ${FOOTER('#1a1a1a')}
</div>`;

/* =================================================
   TIER 2 — STARTER  (4 pages: Home/Services/Gallery/Contact)
================================================= */
const starterPages = {
  Home: `
    <div style="background:linear-gradient(160deg,#1a1a1a,#2d2d2d);padding:56px 24px 44px;color:#fff;text-align:center">
      <h1 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:2rem;line-height:1.15;margin-bottom:12px">Barbershop</h1>
      <p style="color:rgba(255,255,255,.6);max-width:340px;margin:0 auto 24px;line-height:1.7;font-size:.9rem">Walk-ins welcome. Sharp cuts, hot shaves, and good vibes — open 7 days a week.</p>
      <button onclick="demoSwitch(document.querySelector('[data-page=Contact]'),'Contact')" style="background:#c9a84c;color:#fff;border:none;padding:12px 28px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.9rem;cursor:pointer">Book an Appointment</button>
    </div>
    <div style="background:#f9f9f9;padding:36px 24px">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center">
        ${[['8yr','In Business'],['500+','Happy Clients'],['5★','Google Rating']].map(([n,l])=>`<div style="background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:16px"><p style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#1a1a1a">${n}</p><p style="font-size:.72rem;color:#888">${l}</p></div>`).join('')}
      </div>
    </div>
    <div style="background:#fff;padding:36px 24px">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.3rem;color:#1a1a1a;margin-bottom:16px">About Us</h2>
      <p style="font-size:.88rem;color:#555;line-height:1.8;margin-bottom:12px">We've been a staple of the community since 2016. We believe a great haircut is more than a service — it's an experience.</p>
      <p style="font-size:.88rem;color:#555;line-height:1.8">Our barbers are licensed, experienced, and passionate about their craft. Come in as a stranger, leave looking like yourself.</p>
    </div>`,
  Services: `
    <div style="padding:40px 24px;background:#f9f9f9">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#1a1a1a;margin-bottom:20px">Services & Pricing</h2>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${[['Haircut','$25+'],['Fade','$30+'],['Beard Trim','$15+'],['Hot Towel Shave','$35+'],['Kids Cut (12 & under)','$20+'],['Lineup / Edge Up','$10+'],['Full Service (Cut + Beard)','$40+']].map(([s,p])=>`
        <div style="background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-family:'Poppins',sans-serif;font-weight:600;font-size:.9rem;color:#1a1a1a">${s}</span>
          <span style="background:#1a1a1a;color:#c9a84c;padding:5px 12px;border-radius:20px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.8rem">${p}</span>
        </div>`).join('')}
      </div>
    </div>`,
  Gallery: `
    <div style="padding:40px 24px;background:#f9f9f9">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#1a1a1a;margin-bottom:20px">Our Work</h2>
      <div style="columns:2;gap:8px">
        ${[['#1a1a1a',120],['#2d2d2d',90],['#3d3d3d',110],['#c9a84c',85],['#1a1a1a',100],['#4a4a4a',130]].map(([bg,h])=>`
        <div style="background:${bg};height:${h}px;border-radius:10px;margin-bottom:8px;break-inside:avoid;display:flex;align-items:center;justify-content:center">
          <span style="color:rgba(255,255,255,.2);font-size:.65rem;font-weight:700;letter-spacing:.1em">PHOTO</span>
        </div>`).join('')}
      </div>
    </div>`,
  Contact: `
    <div style="padding:40px 24px;background:#f9f9f9">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#1a1a1a;margin-bottom:6px">Book an Appointment</h2>
      <p style="color:#888;font-size:.85rem;margin-bottom:20px">We'll confirm same day.</p>
      <div style="display:flex;flex-direction:column;gap:10px">
        <input style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#fff" placeholder="Your name" readonly>
        <input style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#fff" placeholder="Phone number" readonly>
        <select style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#fff;color:#444"><option>Select a service</option><option>Haircut</option><option>Beard Trim</option><option>Hot Towel Shave</option><option>Kids Cut</option></select>
        <button style="background:#1a1a1a;color:#c9a84c;border:none;border-radius:8px;padding:14px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.95rem">Book Now</button>
      </div>
      <div style="margin-top:24px;background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:18px">
        <p style="font-family:'Poppins',sans-serif;font-weight:700;color:#1a1a1a;margin-bottom:10px">Hours & Location</p>
        ${[['Mon–Fri','9am – 8pm'],['Saturday','8am – 7pm'],['Sunday','10am – 5pm']].map(([d,h])=>`<div style="display:flex;justify-content:space-between;font-size:.83rem;padding:5px 0;border-bottom:1px solid #f0f0f0"><span style="color:#555">${d}</span><span style="color:#1a1a1a;font-weight:600">${h}</span></div>`).join('')}
      </div>
    </div>`
};

const starterHTML = () => {
  window._demoPages = starterPages;
  return `<div id="dsite" style="font-family:'Inter',sans-serif;position:relative">
    ${STAMP}
    ${buildNav(starterPages, '#c9a84c', '#1a1a1a')}
    <div id="dpage">${starterPages.Home}</div>
    ${FOOTER('#1a1a1a')}
  </div>`;
};

/* =================================================
   TIER 3 — PROFESSIONAL  (6 pages)
================================================= */
const proPages = {
  Home: `
    <div style="display:grid;grid-template-columns:1fr 240px;background:#1a1a1a;min-height:220px">
      <div style="padding:44px 24px;color:#fff">
        <div style="display:inline-block;background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);color:#c9a84c;font-size:.68rem;font-weight:700;letter-spacing:.1em;padding:5px 12px;border-radius:20px;margin-bottom:14px">Now Accepting New Clients</div>
        <h1 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.8rem;line-height:1.15;margin-bottom:10px">Barbershop</h1>
        <p style="color:rgba(255,255,255,.6);font-size:.85rem;line-height:1.7;margin-bottom:20px">Precision cuts, expert barbers, and a shop that feels like home.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button onclick="demoSwitch(document.querySelector('[data-page=Book]'),'Book')" style="background:#c9a84c;color:#fff;border:none;padding:10px 20px;border-radius:24px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.82rem;cursor:pointer">Book Now</button>
          <button onclick="demoSwitch(document.querySelector('[data-page=Services]'),'Services')" style="background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.18);padding:10px 20px;border-radius:24px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.82rem;cursor:pointer">Services</button>
        </div>
      </div>
      <div style="background:rgba(255,255,255,.04);border-left:1px solid rgba(255,255,255,.08);padding:20px;display:flex;flex-direction:column;gap:8px">
        <p style="font-family:'Poppins',sans-serif;font-weight:700;color:#fff;font-size:.85rem;margin-bottom:4px">Quick Book</p>
        <input style="padding:10px 12px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.06);color:#fff;font-size:.82rem" placeholder="Your name" readonly>
        <select style="padding:10px 12px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.65);font-size:.82rem"><option>Choose service</option><option>Haircut</option><option>Fade</option><option>Beard Trim</option></select>
        <select style="padding:10px 12px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.65);font-size:.82rem"><option>Choose barber</option><option>Marcus</option><option>DeShawn</option><option>Any available</option></select>
        <button style="background:#c9a84c;color:#fff;border:none;border-radius:8px;padding:10px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.82rem">Book Appointment</button>
      </div>
    </div>
    <div style="background:#f9f9f9;padding:36px 24px">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;text-align:center">
        ${[['8yr','In Business'],['1,200+','Clients Served'],['4','Expert Barbers'],['5★','Avg Rating']].map(([n,l])=>`<div style="background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:14px"><p style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.3rem;color:#1a1a1a">${n}</p><p style="font-size:.68rem;color:#888;margin-top:2px">${l}</p></div>`).join('')}
      </div>
    </div>
    <div style="background:#fff;padding:36px 24px">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.2rem;color:#1a1a1a;margin-bottom:16px">What Clients Say</h2>
      ${[['Best fade I have ever gotten. Been coming here for 3 years.','— Darius T.'],['Hot towel shave is worth every penny. Best shop in town.','— Kevin M.']].map(([q,a])=>`
      <div style="background:#f9f9f9;border:1px solid #e5e5e5;border-radius:12px;padding:16px;margin-bottom:12px">
        <p style="color:#f59e0b;margin-bottom:8px">★★★★★</p>
        <p style="font-size:.85rem;color:#444;line-height:1.7;font-style:italic;margin-bottom:8px">"${q}"</p>
        <p style="font-size:.78rem;color:#888;font-weight:600">${a}</p>
      </div>`).join('')}
    </div>`,
  Services: `
    <div style="padding:40px 24px;background:#f9f9f9">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#1a1a1a;margin-bottom:20px">Services</h2>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${[['Haircut','Classic scissors or clipper cut, styled to your preference','$25+'],['Skin Fade','Zero to length, seamless fade — low, mid, or high','$30+'],['Beard Trim & Shape','Edge, shape, and taper your beard precisely','$15+'],['Hot Towel Straight Razor Shave','Full relaxing shave with pre-shave oil and hot towel','$35+'],['Kids Cut (12 & under)','Patient, gentle cuts for the little ones','$20+'],['Full Service','Haircut + beard trim combo','$40+'],['Lineup / Edge Up','Keep your shape between full cuts','$10+']].map(([s,d,p])=>`
        <div style="background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:16px;display:flex;gap:14px;align-items:flex-start">
          <div style="flex:1"><p style="font-family:'Poppins',sans-serif;font-weight:700;font-size:.88rem;color:#1a1a1a;margin-bottom:3px">${s}</p><p style="font-size:.78rem;color:#777;line-height:1.5">${d}</p></div>
          <span style="background:#1a1a1a;color:#c9a84c;padding:5px 12px;border-radius:20px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.78rem;white-space:nowrap;flex-shrink:0">${p}</span>
        </div>`).join('')}
      </div>
    </div>`,
  Barbers: `
    <div style="padding:40px 24px;background:#f9f9f9">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#1a1a1a;margin-bottom:20px">Meet the Team</h2>
      <div style="display:flex;flex-direction:column;gap:14px">
        ${[['Marcus J.','Master Barber · 12 years · Skin fades and designs','#1a1a1a'],['DeShawn W.','Senior Barber · 8 years · Textured cuts and beard styling','#2d2d2d'],['Tanya R.','Barber · 5 years · Kids cuts and natural hair','#c9a84c'],['Chris L.','Barber · 4 years · Classic cuts and hot towel shaves','#3d3d3d']].map(([n,r,bg])=>`
        <div style="background:#fff;border:1px solid #e5e5e5;border-radius:14px;padding:18px;display:flex;gap:14px;align-items:center">
          <div style="width:54px;height:54px;border-radius:50%;background:${bg};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:700;color:#fff;font-size:1rem">${n.split(' ').map(w=>w[0]).join('')}</div>
          <div><p style="font-family:'Poppins',sans-serif;font-weight:700;color:#1a1a1a;font-size:.92rem">${n}</p><p style="font-size:.78rem;color:#777;margin-top:3px;line-height:1.5">${r}</p></div>
        </div>`).join('')}
      </div>
    </div>`,
  Gallery: `
    <div style="padding:40px 24px;background:#f9f9f9">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#1a1a1a;margin-bottom:20px">Our Work</h2>
      <div style="columns:2;gap:8px">
        ${[['#1a1a1a',120],['#c9a84c',90],['#2d2d2d',110],['#3d3d3d',85],['#1a1a1a',100],['#4a4a4a',125],['#c9a84c',95],['#2d2d2d',110]].map(([bg,h])=>`
        <div style="background:${bg};height:${h}px;border-radius:10px;margin-bottom:8px;break-inside:avoid;display:flex;align-items:center;justify-content:center">
          <span style="color:rgba(255,255,255,.15);font-size:.65rem;font-weight:700;letter-spacing:.1em">PHOTO</span>
        </div>`).join('')}
      </div>
    </div>`,
  Blog: `
    <div style="padding:40px 24px;background:#f9f9f9">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#1a1a1a;margin-bottom:20px">Blog</h2>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${[['How to Maintain Your Fade Between Visits','March 2025'],['The Best Products for a Healthy Beard','February 2025'],['Why a Hot Towel Shave Is Worth It','January 2025'],['Choosing the Right Fade for Your Face Shape','December 2024']].map(([t,d])=>`
        <div style="background:#fff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;display:flex">
          <div style="width:72px;background:#1a1a1a;flex-shrink:0"></div>
          <div style="padding:14px"><p style="font-family:'Poppins',sans-serif;font-weight:700;font-size:.88rem;color:#1a1a1a;line-height:1.4;margin-bottom:5px">${t}</p><p style="font-size:.73rem;color:#aaa">${d}</p></div>
        </div>`).join('')}
      </div>
    </div>`,
  Book: `
    <div style="padding:40px 24px;background:#f9f9f9">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#1a1a1a;margin-bottom:6px">Book an Appointment</h2>
      <p style="color:#888;font-size:.85rem;margin-bottom:22px">We confirm same day.</p>
      <div style="display:flex;flex-direction:column;gap:10px">
        <input style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#fff" placeholder="Your name" readonly>
        <input style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#fff" placeholder="Phone number" readonly>
        <select style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#fff;color:#444"><option>Choose your barber</option><option>Marcus J.</option><option>DeShawn W.</option><option>Tanya R.</option><option>Chris L.</option><option>Any available</option></select>
        <select style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#fff;color:#444"><option>Select a service</option><option>Haircut — $25+</option><option>Skin Fade — $30+</option><option>Beard Trim — $15+</option><option>Full Service — $40+</option></select>
        <input style="padding:12px 16px;border:1.5px solid #e5e5e5;border-radius:8px;font-size:.88rem;background:#fff" placeholder="Preferred date & time" readonly>
        <button style="background:#1a1a1a;color:#c9a84c;border:none;border-radius:8px;padding:14px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.95rem">Confirm Booking</button>
      </div>
    </div>`
};

const proHTML = () => {
  window._demoPages = proPages;
  return `<div id="dsite" style="font-family:'Inter',sans-serif;position:relative">
    ${STAMP}
    ${buildNav(proPages, '#c9a84c', '#1a1a1a')}
    <div id="dpage">${proPages.Home}</div>
    ${FOOTER('#1a1a1a')}
  </div>`;
};

/* =================================================
   TIER 4 — PREMIUM  (8 pages, dark theme)
================================================= */
const premPages = {
  Home: `
    <div style="background:#0a0a0a;padding:0 0 40px">
      <div style="position:relative;overflow:hidden;padding:64px 24px 52px;text-align:center">
        <div style="position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 40%,rgba(201,168,76,.15),transparent 70%)"></div>
        <div style="position:relative">
          <div style="display:inline-block;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.25);color:#c9a84c;font-size:.68rem;font-weight:700;letter-spacing:.12em;padding:5px 14px;border-radius:20px;margin-bottom:16px;text-transform:uppercase">Premium Barbershop Experience</div>
          <h1 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:2.2rem;color:#fff;line-height:1.1;margin-bottom:12px">Barbershop.<br><span style="color:#c9a84c">Elevated.</span></h1>
          <p style="color:rgba(255,255,255,.55);max-width:380px;margin:0 auto 28px;line-height:1.7;font-size:.9rem">Expert barbers. Premium products. An atmosphere built for kings.</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            <button onclick="demoSwitch(document.querySelector('[data-page=Book]'),'Book')" style="background:#c9a84c;color:#fff;border:none;padding:12px 26px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.88rem;cursor:pointer">Book a Session</button>
            <button onclick="demoSwitch(document.querySelector('[data-page=Gallery]'),'Gallery')" style="background:rgba(255,255,255,.06);color:rgba(255,255,255,.8);border:1px solid rgba(255,255,255,.12);padding:12px 26px;border-radius:30px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.88rem;cursor:pointer">View Gallery</button>
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 20px">
        ${[['8yr','Running'],['4','Barbers'],['1,200+','Clients'],['5★','Rating']].map(([n,l])=>`<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:14px;text-align:center"><p style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.3rem;color:#c9a84c">${n}</p><p style="font-size:.68rem;color:rgba(255,255,255,.35);margin-top:2px">${l}</p></div>`).join('')}
      </div>
    </div>`,
  Services: `
    <div style="padding:40px 24px;background:#0a0a0a">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#fff;margin-bottom:20px">Services</h2>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${[['Haircut','$25+'],['Skin Fade','$30+'],['Beard Trim','$15+'],['Hot Towel Shave','$35+'],['Kids Cut','$20+'],['Full Service','$40+'],['Lineup','$10+'],['Scalp Treatment','$20+']].map(([s,p])=>`
        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:14px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-family:'Poppins',sans-serif;font-weight:600;color:#fff;font-size:.88rem">${s}</span>
          <span style="background:rgba(201,168,76,.15);color:#c9a84c;padding:5px 12px;border-radius:20px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.78rem">${p}</span>
        </div>`).join('')}
      </div>
    </div>`,
  Barbers: `
    <div style="padding:40px 24px;background:#0a0a0a">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#fff;margin-bottom:20px">The Team</h2>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${[['Marcus J.','Master Barber · 12yr · Fades & Designs'],['DeShawn W.','Senior Barber · 8yr · Textured Cuts'],['Tanya R.','Barber · 5yr · Kids & Natural Hair'],['Chris L.','Barber · 4yr · Classic Cuts & Shaves']].map(([n,r])=>`
        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:18px;display:flex;gap:14px;align-items:center">
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(201,168,76,.2);border:2px solid rgba(201,168,76,.4);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:700;color:#c9a84c">${n.split(' ').map(w=>w[0]).join('')}</div>
          <div><p style="font-family:'Poppins',sans-serif;font-weight:700;color:#fff;font-size:.9rem">${n}</p><p style="font-size:.77rem;color:rgba(255,255,255,.45);margin-top:2px">${r}</p></div>
        </div>`).join('')}
      </div>
    </div>`,
  Gallery: `
    <div style="padding:40px 24px;background:#0a0a0a">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#fff;margin-bottom:20px">Gallery</h2>
      <div style="columns:2;gap:8px">
        ${[['#1a1a1a',120],['#c9a84c',88],['#2d2d2d',110],['#3d3d3d',95],['#c9a84c',100],['#1a1a1a',120],['#2d2d2d',90],['#4a4a4a',115]].map(([bg,h])=>`
        <div style="background:${bg};height:${h}px;border-radius:10px;margin-bottom:8px;break-inside:avoid;display:flex;align-items:center;justify-content:center">
          <span style="color:rgba(255,255,255,.1);font-size:.65rem;font-weight:700;letter-spacing:.1em">PHOTO</span>
        </div>`).join('')}
      </div>
    </div>`,
  Blog: `
    <div style="padding:40px 24px;background:#0a0a0a">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#fff;margin-bottom:20px">Blog</h2>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${[['How to Maintain Your Fade Between Visits','March 2025'],['The Best Products for a Healthy Beard','February 2025'],['Why a Hot Towel Shave Is Worth It','January 2025'],['Choosing the Right Fade for Your Face Shape','December 2024']].map(([t,d])=>`
        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;overflow:hidden;display:flex">
          <div style="width:72px;background:#c9a84c;opacity:.4;flex-shrink:0"></div>
          <div style="padding:14px"><p style="font-family:'Poppins',sans-serif;font-weight:700;font-size:.88rem;color:#fff;line-height:1.4;margin-bottom:5px">${t}</p><p style="font-size:.73rem;color:rgba(255,255,255,.35)">${d}</p></div>
        </div>`).join('')}
      </div>
    </div>`,
  Reviews: `
    <div style="padding:40px 24px;background:#0a0a0a">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#fff;margin-bottom:20px">Client Reviews</h2>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${[['Best fade I have ever gotten. Been coming for 3 years.','Darius T.'],['Hot towel shave is 10/10. Best shop in town.','Kevin M.'],['Got me right before my wedding. Looked incredible.','Andre B.'],['Did my son\'s first cut and he actually sat still. Magic.','Tamara W.']].map(([q,n])=>`
        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:18px">
          <p style="color:#c9a84c;margin-bottom:8px;letter-spacing:2px">★★★★★</p>
          <p style="font-size:.85rem;color:rgba(255,255,255,.65);font-style:italic;line-height:1.7;margin-bottom:10px">"${q}"</p>
          <p style="font-size:.78rem;color:#c9a84c;font-weight:600">— ${n}</p>
        </div>`).join('')}
      </div>
    </div>`,
  Membership: `
    <div style="padding:40px 24px;background:#0a0a0a">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#fff;margin-bottom:6px">Membership Plans</h2>
      <p style="color:rgba(255,255,255,.4);font-size:.85rem;margin-bottom:24px">Save more, come in more.</p>
      <div style="display:flex;flex-direction:column;gap:14px">
        ${[['Basic','$39/mo','2 haircuts per month + 10% off products',false],['Gold','$65/mo','4 cuts/mo + beard trim + priority booking',true],['VIP','$99/mo','Unlimited cuts + all services + free products',false]].map(([n,p,d,feat])=>`
        <div style="background:${feat?'rgba(201,168,76,.1)':'rgba(255,255,255,.04)'};border:${feat?'1px solid rgba(201,168,76,.35)':'1px solid rgba(255,255,255,.07)'};border-radius:14px;padding:20px">
          ${feat?'<div style="display:inline-block;background:#c9a84c;color:#fff;font-size:.62rem;font-weight:700;padding:3px 10px;border-radius:10px;margin-bottom:10px;letter-spacing:.06em">MOST POPULAR</div>':''}
          <p style="font-family:\'Poppins\',sans-serif;font-weight:700;color:#fff;font-size:1rem">${n}</p>
          <p style="color:#c9a84c;font-weight:700;font-size:.95rem;margin:4px 0 10px">${p}</p>
          <p style="font-size:.82rem;color:rgba(255,255,255,.45);line-height:1.6">${d}</p>
        </div>`).join('')}
      </div>
    </div>`,
  Book: `
    <div style="padding:40px 24px;background:#0a0a0a">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#fff;margin-bottom:6px">Book a Session</h2>
      <p style="color:rgba(255,255,255,.4);font-size:.85rem;margin-bottom:24px">Confirmed same day.</p>
      <div style="display:flex;flex-direction:column;gap:10px">
        <input style="padding:12px 16px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;font-size:.88rem" placeholder="Your name" readonly>
        <input style="padding:12px 16px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;font-size:.88rem" placeholder="Phone number" readonly>
        <select style="padding:12px 16px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.07);color:rgba(255,255,255,.7);font-size:.88rem"><option>Choose your barber</option><option>Marcus J.</option><option>DeShawn W.</option><option>Tanya R.</option><option>Chris L.</option></select>
        <select style="padding:12px 16px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.07);color:rgba(255,255,255,.7);font-size:.88rem"><option>Select service</option><option>Haircut</option><option>Skin Fade</option><option>Full Service</option><option>Scalp Treatment</option></select>
        <input style="padding:12px 16px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.05);color:#fff;font-size:.88rem" placeholder="Preferred date & time" readonly>
        <button style="background:#c9a84c;color:#fff;border:none;border-radius:8px;padding:14px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.95rem">Confirm Booking</button>
      </div>
    </div>`
};

const premHTML = () => {
  window._demoPages = premPages;
  return `<div id="dsite" style="font-family:'Inter',sans-serif;background:#0a0a0a;position:relative">
    ${STAMP}
    ${buildNav(premPages, '#c9a84c', '#0a0a0a')}
    <div id="dpage">${premPages.Home}</div>
    <div style="background:#050505;padding:22px 24px;border-top:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.3)"><p style="color:rgba(255,255,255,.7);font-family:'Poppins',sans-serif;font-weight:700;font-size:.85rem;margin-bottom:3px">Barbershop</p><p style="font-size:.72rem">Built by WisdomLayers · wisdomlayers.com</p></div>
  </div>`;
};

/* =================================================
   TIER 5 — E-COMMERCE  (Shop + merch + cart)
================================================= */
const ecomPages = {
  Shop: `
    <div style="background:#0a0a0a;padding:20px 20px 100px">
      <div style="display:flex;gap:8px;margin-bottom:20px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:4px">
        ${['All','Hair Care','Beard','Clippers','Merch'].map((c,i)=>`<button style="background:${i===0?'#c9a84c':'rgba(255,255,255,.07)'};color:${i===0?'#fff':'rgba(255,255,255,.6)'};border:1px solid ${i===0?'#c9a84c':'rgba(255,255,255,.1)'};padding:7px 16px;border-radius:20px;font-size:.78rem;font-weight:600;white-space:nowrap;flex-shrink:0;cursor:pointer">${c}</button>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
        ${[
          ['Pomade','Hair Care','$18.99','#1a1a1a'],
          ['Beard Oil','Beard','$22.50','#2d2d2d'],
          ['Wave Brush','Hair Care','$14.99','#3d3d3d'],
          ['Beard Balm','Beard','$19.99','#c9a84c'],
          ['Shop Tee','Merch','$29.00','#1a1a1a'],
          ['Trimmer Kit','Clippers','$89.99','#2d2d2d'],
        ].map(([n,cat,price,bg],i)=>`
        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden">
          <div style="background:${bg};height:100px;display:flex;align-items:center;justify-content:center">
            <span style="color:rgba(255,255,255,.2);font-size:.65rem;font-weight:700;letter-spacing:.08em;text-align:center;padding:0 8px">${n.toUpperCase()}</span>
          </div>
          <div style="padding:12px">
            <p style="font-size:.62rem;color:rgba(255,255,255,.35);margin-bottom:3px;text-transform:uppercase;letter-spacing:.06em">${cat}</p>
            <p style="font-family:'Poppins',sans-serif;font-weight:700;font-size:.82rem;color:#fff;margin-bottom:8px;line-height:1.3">${n}</p>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-family:'Poppins',sans-serif;font-weight:800;color:#c9a84c">${price}</span>
              <button id="cart-btn-${i}" onclick="window._shopAdd(${i},'${n}',${price.replace('$','')})" style="background:#c9a84c;color:#fff;border:none;padding:6px 12px;border-radius:8px;font-size:.72rem;font-weight:700;cursor:pointer">Add to Cart</button>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>`,
  About: `
    <div style="padding:40px 24px;background:#0a0a0a">
      <div style="background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.2);border-radius:16px;padding:28px;margin-bottom:24px">
        <p style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#c9a84c;margin-bottom:8px;text-transform:uppercase">Our Story</p>
        <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.3rem;color:#fff;line-height:1.3;margin-bottom:12px">More than a haircut — it's a lifestyle.</h2>
        <p style="font-size:.85rem;color:rgba(255,255,255,.55);line-height:1.7">Started in 2016 with one chair and one mission: make every client feel like royalty. Now we've got a full shop, a product line, and a community built around the craft.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center">
        ${[['8yr','Running'],['4','Barbers'],['1,200+','Clients']].map(([n,l])=>`<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:14px"><p style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.3rem;color:#c9a84c">${n}</p><p style="font-size:.68rem;color:rgba(255,255,255,.35);margin-top:2px">${l}</p></div>`).join('')}
      </div>
    </div>`,
  Account: `
    <div style="padding:40px 24px;background:#0a0a0a">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.4rem;color:#fff;margin-bottom:20px">My Account</h2>
      <div style="background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.2);border-radius:14px;padding:20px;display:flex;align-items:center;gap:14px;margin-bottom:16px">
        <div style="width:48px;height:48px;border-radius:50%;background:#c9a84c;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:700;color:#fff">JD</div>
        <div><p style="font-family:'Poppins',sans-serif;font-weight:700;color:#fff">Jordan Davis</p><p style="font-size:.78rem;color:rgba(255,255,255,.4)">Gold Member · Since 2022</p></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${[['Order History','3 recent orders'],['Saved Addresses','2 saved'],['Membership','Gold Plan · Active'],['Upcoming Appointment','Marcus J. · This Saturday 2pm']].map(([t,d])=>`
        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center">
          <div><p style="font-family:'Poppins',sans-serif;font-weight:700;font-size:.88rem;color:#fff">${t}</p><p style="font-size:.75rem;color:rgba(255,255,255,.35);margin-top:2px">${d}</p></div>
          <span style="color:rgba(255,255,255,.25)">›</span>
        </div>`).join('')}
      </div>
    </div>`
};

const ecomHTML = () => {
  window._demoPages = ecomPages;
  window._shopCart = [];
  window._shopAdd = function(i, name, price) {
    window._shopCart.push({name, price});
    const bar = document.getElementById('shop-cart-bar');
    const cnt = document.getElementById('shop-cart-count');
    const tot = document.getElementById('shop-cart-total');
    if (bar) bar.style.display = 'flex';
    if (cnt) cnt.textContent = window._shopCart.length + ' item' + (window._shopCart.length > 1 ? 's' : '');
    if (tot) tot.textContent = '$' + window._shopCart.reduce((s,x)=>s+x.price,0).toFixed(2);
    const btn = document.getElementById('cart-btn-' + i);
    if (btn) { btn.textContent = 'Added!'; btn.style.background = '#15803d'; setTimeout(()=>{btn.textContent='Add to Cart';btn.style.background='#c9a84c';},1200); }
  };
  const navKeys = Object.keys(ecomPages);
  const links = navKeys.map((k,i)=>
    `<button data-page="${k}" onclick="demoSwitch(this,'${k}')" style="background:${i===0?'#c9a84c':'transparent'};color:${i===0?'#fff':'rgba(255,255,255,.5)'};border:none;padding:8px 14px;border-radius:20px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.78rem;cursor:pointer;white-space:nowrap">${k}</button>`
  ).join('');
  return `<div id="dsite" style="font-family:'Inter',sans-serif;background:#0a0a0a;position:relative">
    ${STAMP}
    <nav data-active="#c9a84c" style="background:#0a0a0a;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;padding:0 16px;height:54px;position:sticky;top:0;z-index:50;gap:4px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none">
      <span style="font-family:'Poppins',sans-serif;font-weight:800;color:#fff;font-size:.9rem;white-space:nowrap;margin-right:10px">Barbershop Shop</span>
      ${links}
      <button style="margin-left:auto;background:rgba(255,255,255,.08);color:#fff;border:none;padding:7px 14px;border-radius:20px;font-family:'Poppins',sans-serif;font-weight:600;font-size:.78rem;cursor:pointer;flex-shrink:0;white-space:nowrap" onclick="demoSwitch(document.querySelector('[data-page=Account]'),'Account')">Account</button>
    </nav>
    <div id="dpage">${ecomPages.Shop}</div>
    <div id="shop-cart-bar" style="display:none;position:sticky;bottom:0;background:#c9a84c;padding:14px 20px;align-items:center;justify-content:space-between;z-index:50">
      <div><p id="shop-cart-count" style="color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:.9rem">0 items</p><p id="shop-cart-total" style="color:rgba(255,255,255,.75);font-size:.75rem">$0.00</p></div>
      <button style="background:#fff;color:#c9a84c;border:none;padding:10px 22px;border-radius:20px;font-family:'Poppins',sans-serif;font-weight:700;font-size:.85rem;cursor:pointer">Checkout →</button>
    </div>
    <div style="background:#050505;padding:22px 24px;border-top:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.3)"><p style="color:rgba(255,255,255,.7);font-family:'Poppins',sans-serif;font-weight:700;font-size:.85rem;margin-bottom:3px">Barbershop</p><p style="font-size:.72rem">Built by WisdomLayers · wisdomlayers.com</p></div>
  </div>`;
};

const demos = {
  landing:      { label:'Landing Page',  sub:'$599 · 1 page · Single scroll',              url:'barbershop.com', html: landingHTML() },
  starter:      { label:'Starter',       sub:'$999 · 4 pages · Nav + gallery',              url:'barbershop.com', html: starterHTML() },
  professional: { label:'Professional',  sub:'$1,499 · 6 pages · Booking + blog + reviews', url:'barbershop.com', html: proHTML() },
  premium:      { label:'Premium',       sub:'$2,199 · 8 pages · Dark theme + membership',  url:'barbershop.com', html: premHTML() },
  ecommerce:    { label:'E-Commerce',    sub:'$4k+ · Full store + member accounts + cart',  url:'barbershop.com', html: ecomHTML() },
};

"""

with open('sales.html', 'r', encoding='utf-8') as f:
    content = f.read()

START_MARKER = '/* \u2500\u2500 DEMO MODAL JS \u2500\u2500 */\nconst demos = {'
END_MARKER   = '/* \u2500\u2500 DEMO MODAL OPEN/CLOSE'

start = content.index(START_MARKER)
end   = content.index(END_MARKER, start)

content = content[:start] + NEW_DEMOS + '\n' + content[end:]

with open('sales.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done. Lines:', content.count('\n'))