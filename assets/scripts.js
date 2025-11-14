// Basic interactivity: mobile nav toggle, tabs, and easter - konami-like codes
(function(){
  // mobile nav toggles (support multiple headers)
  document.querySelectorAll('.nav-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const nav = btn.nextElementSibling || document.querySelector('.site-nav');
      if(!nav) return;
      nav.classList.toggle('open');
    });
  });

  // tabs on Brothers page
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const tabPanels = Array.from(document.querySelectorAll('.tab-panel'));

  // Remove duplicate brother entries across all panels (keep first occurrence)
  (function dedupeRoster(){
    const seen = new Set();
    tabPanels.forEach(panel=>{
      const items = Array.from(panel.querySelectorAll('.roster li'));
      items.forEach(li=>{
        const name = (li.dataset.name || '').trim().toLowerCase();
        if(!name) return;
        if(seen.has(name)){
          // remove duplicate entry from DOM
          li.remove();
        } else {
          seen.add(name);
        }
      });
    });
  })();
  tabs.forEach(t=>{
    t.addEventListener('click', ()=>{
      tabs.forEach(x=>x.classList.remove('active'));
      tabPanels.forEach(p=>p.classList.remove('active'));
      t.classList.add('active');
      const target = document.getElementById(t.dataset.target);
      if(target) target.classList.add('active');
      // after switching tabs, re-apply the current filter (so panels display correctly)
      if(typeof applyRosterFilter === 'function'){
        applyRosterFilter();
      }
    });
  });

  // Konami and "GEORGE" secret - shows a fun modal
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
  const george = ['KeyG','KeyE','KeyO','KeyR','KeyG','KeyE'];
  let pressed = [];
  window.addEventListener('keydown', e=>{
    pressed.push(e.code);
    // trim to max length
    if(pressed.length>konami.length) pressed.shift();
    if(pressed.join(',').includes(konami.join(','))){
      showModal('Easter Egg','You found the Konami-style easter egg!');
      pressed = [];
    }
    if(pressed.join(',').includes(george.join(','))){
      showModal('George','Hello from George — this is a custom hidden page placeholder.');
      pressed = [];
    }
  });

  function showModal(title, text){
    const existing = document.getElementById('site-modal');
    if(existing) existing.remove();
    const div = document.createElement('div');
    div.id='site-modal';
    div.innerHTML = `<div class="modal-backdrop"><div class="modal"><h3>${title}</h3><p>${text}</p><button id="modal-close">Close</button></div></div>`;
    Object.assign(div.style,{position:'fixed',inset:0,'zIndex':99999});
    document.body.appendChild(div);
    document.getElementById('modal-close').addEventListener('click', ()=>div.remove());
    // small style
    const style = document.createElement('style');
    style.textContent = `.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center}.modal{background:#fff;padding:1.25rem;border-radius:10px;max-width:520px;width:90%;box-shadow:0 8px 30px rgba(0,0,0,0.2)}.modal h3{margin:0 0 .5rem}`;
    document.head.appendChild(style);
  }

  // Brothers roster filter (search across all class years)
  const filterInput = document.getElementById('brothers-filter');
  const rosterEmpty = document.getElementById('roster-empty');

  function applyRosterFilter(){
    const q = (filterInput && filterInput.value || '').trim().toLowerCase();
    let anyMatchOverall = false;
    tabPanels.forEach(panel=>{
      const items = Array.from(panel.querySelectorAll('.roster li'));
      let anyVisible = false;
      items.forEach(li=>{
        const name = (li.dataset.name || '').toLowerCase();
        const match = q === '' ? true : name.includes(q);
        li.style.display = match ? '' : 'none';
        if(match) anyVisible = true;
      });
      if(q === ''){
        // restore normal tab behavior: only active panel visible
        panel.style.display = panel.classList.contains('active') ? '' : 'none';
      } else {
        // when searching, show panels that have matches and hide empty ones
        panel.style.display = anyVisible ? '' : 'none';
      }
      if(anyVisible) anyMatchOverall = true;
    });
    if(rosterEmpty){
      rosterEmpty.style.display = anyMatchOverall ? 'none' : 'block';
    }
  }

  if(filterInput){
    filterInput.addEventListener('input', applyRosterFilter);
  }
})();

// Contact form handler (graceful mailto fallback)
(function(){
  const form = document.getElementById('contact-form');
  const result = document.getElementById('contact-result');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    if(!name || !email || !message){
      result.textContent = 'Please fill out all fields.';
      result.style.display = 'block';
      return;
    }
    // Build mailto link
    const to = 'president@lodge804.com';
    const subject = encodeURIComponent('Website Contact from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    // open user's mail client
    window.location.href = mailto;
    // show confirmation message
    result.textContent = 'Opening your mail client to send the message. If nothing opens, please email president@lodge804.com directly.';
    result.style.display = 'block';
    // optional: clear form
    // form.reset();
  });
})();
