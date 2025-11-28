// Basic interactions: nav toggle, filters, resume print, contact form
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (navList.style.display === 'flex') {
        navList.style.display = '';
      } else {
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav
        if (window.innerWidth <= 980 && navList) navList.style.display = '';
      }
    });
  });

  // Project filtering
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projects.forEach(p => {
        if (filter === 'all') {
          p.style.display = '';
        } else {
          const tags = p.dataset.tags || '';
          p.style.display = tags.includes(filter) ? '' : 'none';
        }
      });
    });
  });

  // Resume print / download: opens printable HTML and triggers print
  function openResumePrint() {
    const resumeHTML = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <title>Resume — Jaya Surya</title>
        <style>
          body{font-family:Arial,Helvetica,sans-serif;padding:24px;color:#0f172a}
          h1{margin:0 0 6px}
          .muted{color:#6b7280}
          .section{margin-top:18px}
        </style>
      </head>
      <body>
        <h1>Jaya Surya</h1>
        <div class="muted">Frontend Developer — you@example.com</div>
        <div class="section"><h3>Summary</h3><p>Frontend developer focused on performance, accessibility and delightful UI.</p></div>
        <div class="section"><h3>Skills</h3><ul><li>HTML & CSS</li><li>JavaScript</li><li>React</li><li>Accessibility</li></ul></div>
        <script>setTimeout(()=>{window.print();},200);</script>
      </body>
      </html>
    `;
    const w = window.open('', '_blank');
    if (!w) { alert('Popup blocked — allow popups for this site to print the resume.'); return; }
    w.document.open();
    w.document.write(resumeHTML);
    w.document.close();
  }

  document.getElementById('resumeBtn').addEventListener('click', openResumePrint);
  document.getElementById('resumeBtn2').addEventListener('click', openResumePrint);

  // Contact form (local demo) — sends an email link
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      alert('Please fill all fields.');
      return;
    }
    // Create mailto link as a simple demo action
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
  });

});
