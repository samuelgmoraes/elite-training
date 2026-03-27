// ═══════════════════════════════════════════════
//  MÓDULO DE PAGAMENTO — SIMULAÇÃO COMPLETA
//  Quando for ao ar, substitua as funções marcadas
//  com [PRODUÇÃO] pela integração real do gateway.
// ═══════════════════════════════════════════════

let currentPlan = 'elite';
let currentMethod = 'cartao';

// ── Abre o modal ──
function openPayment(plan, price, title) {
  currentPlan = plan;
  document.getElementById('modalTitle').textContent = 'Assinar ' + title;
  document.getElementById('modalPrice').textContent = price + '/mês';
  document.getElementById('modalStep1').style.display = 'block';
  document.getElementById('modalStep2').style.display = 'none';
  document.getElementById('paymentForm').reset();
  document.getElementById('payBtn').textContent = 'CONFIRMAR ASSINATURA';
  document.getElementById('payBtn').disabled = false;
  setMethod('cartao');
  document.getElementById('paymentModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openPayment = openPayment;

// ── Fecha o modal ──
function closePayment() {
  document.getElementById('paymentModal').classList.remove('open');
  document.body.style.overflow = '';
}
window.closePayment = closePayment;

// Fecha ao clicar fora
document.getElementById('paymentModal').addEventListener('click', function(e) {
  if (e.target === this) closePayment();
});

// ── Troca método de pagamento ──
function setMethod(method) {
  currentMethod = method;
  document.querySelectorAll('.pay-method').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.method === method);
  });
  document.getElementById('cardFields').style.display  = method === 'cartao' ? 'block' : 'none';
  document.getElementById('pixFields').style.display   = method === 'pix'    ? 'block' : 'none';
  document.getElementById('boletoFields').style.display = method === 'boleto' ? 'block' : 'none';
}

document.querySelectorAll('.pay-method').forEach(btn => {
  btn.addEventListener('click', () => setMethod(btn.dataset.method));
});

// ── Máscaras de input ──
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', function() {
    let v = this.value.replace(/\D/g, '').slice(0, 16);
    this.value = v.replace(/(.{4})/g, '$1 ').trim();
  });
}
const cardExpiryInput = document.getElementById('cardExpiry');
if (cardExpiryInput) {
  cardExpiryInput.addEventListener('input', function() {
    let v = this.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    this.value = v;
  });
}
const cpfInput = document.getElementById('payCPF');
if (cpfInput) {
  cpfInput.addEventListener('input', function() {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/(\d{3})(\d{3})/, '$1.$2');
    this.value = v;
  });
}

// ── Validação básica ──
function validatePayment() {
  const name  = document.getElementById('payName').value.trim();
  const email = document.getElementById('payEmail').value.trim();
  const cpf   = document.getElementById('payCPF').value.trim();

  if (!name)  { showToast('Informe seu nome completo.', 'error'); return false; }
  if (!email || !email.includes('@')) { showToast('Informe um e-mail válido.', 'error'); return false; }
  if (cpf.length < 14) { showToast('Informe um CPF válido.', 'error'); return false; }

  if (currentMethod === 'cartao') {
    const num  = document.getElementById('cardNumber').value.replace(/\s/g,'');
    const exp  = document.getElementById('cardExpiry').value;
    const cvv  = document.getElementById('cardCVV').value;
    const cname = document.getElementById('cardName').value.trim();
    if (num.length < 16) { showToast('Número do cartão inválido.', 'error'); return false; }
    if (exp.length < 5)  { showToast('Data de validade inválida.', 'error'); return false; }
    if (cvv.length < 3)  { showToast('CVV inválido.', 'error'); return false; }
    if (!cname)           { showToast('Informe o nome no cartão.', 'error'); return false; }
  }
  return true;
}

// ── Submit do pagamento ──
// [PRODUÇÃO] Substitua o setTimeout por fetch() para sua API ou SDK do gateway:
//   Mercado Pago: https://www.mercadopago.com.br/developers
//   Stripe:       https://stripe.com/docs/payments
document.getElementById('paymentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!validatePayment()) return;

  const btn = document.getElementById('payBtn');
  btn.textContent = 'PROCESSANDO...';
  btn.disabled = true;

  // SIMULAÇÃO — remove quando integrar gateway real
  setTimeout(() => {
    if (currentMethod === 'pix') {
      // Simula geração de QR Code PIX
      showPixModal();
    } else if (currentMethod === 'boleto') {
      showBoletoModal();
    } else {
      showSuccess();
    }
  }, 2000);

  /* ── PRODUÇÃO — Mercado Pago (exemplo) ──
  const payload = {
    plan: currentPlan,
    method: currentMethod,
    payer: {
      name:  document.getElementById('payName').value,
      email: document.getElementById('payEmail').value,
      cpf:   document.getElementById('payCPF').value,
    },
    card: currentMethod === 'cartao' ? {
      number:  document.getElementById('cardNumber').value,
      expiry:  document.getElementById('cardExpiry').value,
      cvv:     document.getElementById('cardCVV').value,
      holder:  document.getElementById('cardName').value,
    } : null,
  };
  fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  .then(r => r.json())
  .then(data => {
    if (data.status === 'approved') showSuccess();
    else if (data.status === 'pending' && data.pix_qr) showPixQR(data.pix_qr);
    else if (data.status === 'pending' && data.boleto_url) window.open(data.boleto_url);
    else { showToast('Pagamento recusado. Tente outro método.', 'error'); btn.textContent = 'CONFIRMAR ASSINATURA'; btn.disabled = false; }
  })
  .catch(() => { showToast('Erro de conexão. Tente novamente.', 'error'); btn.textContent = 'CONFIRMAR ASSINATURA'; btn.disabled = false; });
  */
});

function showSuccess() {
  document.getElementById('modalStep1').style.display = 'none';
  document.getElementById('modalStep2').style.display = 'block';
  showToast('✅ Pagamento confirmado! Bem-vindo!', 'success');
}

function showPixModal() {
  const form = document.getElementById('paymentForm');
  form.innerHTML = `
    <div style="text-align:center;padding:1rem 0">
      <p style="color:#888;font-size:0.8rem;margin-bottom:1rem">QR CODE PIX — SIMULAÇÃO</p>
      <div style="width:160px;height:160px;background:#fff;margin:0 auto 1rem;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;color:#333;padding:1rem;text-align:center;">
        [QR Code gerado pelo Mercado Pago / Stripe]
      </div>
      <p style="font-size:0.83rem;color:#bbb;margin-bottom:0.5rem">Valor: <strong style="color:var(--primary)">${document.getElementById('modalPrice').textContent}</strong></p>
      <p style="font-size:0.75rem;color:#555;margin-bottom:1.5rem">Expira em 30 minutos. O acesso é liberado automaticamente.</p>
      <button class="btn-primary full-width" onclick="showSuccess()">✅ SIMULAR PAGAMENTO CONFIRMADO</button>
    </div>`;
}

function showBoletoModal() {
  const form = document.getElementById('paymentForm');
  form.innerHTML = `
    <div style="text-align:center;padding:1rem 0">
      <p style="font-size:2rem;margin-bottom:0.75rem">🧾</p>
      <h4 style="margin-bottom:0.75rem">Boleto gerado!</h4>
      <p style="font-size:0.83rem;color:#bbb;margin-bottom:0.5rem">Em produção, o boleto seria aberto automaticamente e enviado ao seu e-mail.</p>
      <p style="font-size:0.75rem;color:#555;margin-bottom:1.5rem">O acesso é liberado em 1–2 dias úteis após compensação.</p>
      <button class="btn-primary full-width" onclick="showSuccess()">✅ SIMULAR BOLETO PAGO</button>
    </div>`;
}
