// ── AOS ──
AOS.init({ duration: 900, once: true, offset: 60 });

// ── NAVBAR scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
let mobileMenu = null;

hamburger.addEventListener('click', () => {
  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    [
      { text: 'Metodologia', href: '#metodologia' },
      { text: 'Resultados',  href: '#resultados'  },
      { text: 'Planos',      href: '#planos'       },
      { text: 'Contato',     href: '#contato'      },
      { text: '⚡ ASSINAR AGORA', href: '#planos'  },
    ].forEach(item => {
      const a = document.createElement('a');
      a.textContent = item.text;
      a.href = item.href;
      a.addEventListener('click', closeMobileMenu);
      mobileMenu.appendChild(a);
    });
    document.body.appendChild(mobileMenu);
  }
  const isOpen = mobileMenu.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMobileMenu() {
  if (mobileMenu) { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }
}

// ── Scroll suave ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); closeMobileMenu(); }
  });
});

// ── Toast global ──
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = 'toast'; }, 3200);
}
window.showToast = showToast;

// ── Formulário de contato (simulado) ──
// Quando for ao ar: substituir o bloco setTimeout por fetch() para sua API real
// ou configurar o Formspree: action="https://formspree.io/f/SEU_ID_REAL"
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('formSubmitBtn');
  const status = document.getElementById('formStatus');
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();

  // Validação de e-mail com regex — exige formato nome@dominio.extensao
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!name) {
    status.textContent = '⚠ Informe seu nome completo.';
    status.className = 'form-status error';
    return;
  }
  if (!email || !emailRegex.test(email)) {
    status.textContent = '⚠ Informe um e-mail válido (ex: nome@email.com).';
    status.className = 'form-status error';
    document.getElementById('cEmail').focus();
    return;
  }
  if (!msg) {
    status.textContent = '⚠ Escreva sua mensagem antes de enviar.';
    status.className = 'form-status error';
    return;
  }

  btn.textContent = 'ENVIANDO...';
  btn.disabled = true;

  // SIMULAÇÃO — remover quando tiver backend/Formspree real
  setTimeout(() => {
    status.textContent = '✅ Mensagem enviada! Entraremos em contato em até 24h.';
    status.className = 'form-status success';
    this.reset();
    btn.textContent = 'ENVIAR MENSAGEM';
    btn.disabled = false;
    showToast('Mensagem enviada com sucesso!', 'success');
  }, 1500);

  /* ── PRODUÇÃO (descomente quando for ao ar) ──
  const formData = new FormData(this);
  fetch('https://formspree.io/f/SEU_ID_AQUI', {
    method: 'POST', body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(r => {
    if (r.ok) {
      status.textContent = '✅ Mensagem enviada! Retornaremos em até 24h.';
      status.className = 'form-status success';
      this.reset();
    } else {
      status.textContent = '❌ Erro ao enviar. Tente novamente.';
      status.className = 'form-status error';
    }
    btn.textContent = 'ENVIAR MENSAGEM'; btn.disabled = false;
  }).catch(() => {
    status.textContent = '❌ Sem conexão. Tente novamente.';
    status.className = 'form-status error';
    btn.textContent = 'ENVIAR MENSAGEM'; btn.disabled = false;
  });
  */
});
