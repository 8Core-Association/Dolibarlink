(function(){
  'use strict';
  
  const form = document.getElementById('dlb-form');
  if (!form || typeof OC === 'undefined') return;
  
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const rules = document.getElementById('rules').value || '[]';
    
    // Validate JSON before sending
    try {
      JSON.parse(rules);
    } catch(err) {
      document.getElementById('dlb-status').textContent = 'Greška: Neispravan JSON format';
      return;
    }
    
    fetch(OC.generateUrl('/apps/dolibarrlink/admin/rules'), {
      method: 'POST',
      headers: {
        'requesttoken': OC.requestToken, 
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: 'rules=' + encodeURIComponent(rules)
    }).then(r=>r.json()).then(j=>{
      document.getElementById('dlb-status').textContent = j.ok ? 'Spremljeno.' : ('Greška: ' + (j.error||'nepoznato'));
    }).catch((err)=>{ 
      console.error('DolibarrLink error:', err);
      document.getElementById('dlb-status').textContent='Mrežna greška'; 
    });
  });
})();