# ⚡ Elite Training — Landing Page

> Landing page profissional para consultoria de treino online, com modal de pagamento simulado, área do aluno e formulário de contato validado.

![Elite Training Preview](assets/banner.jpg)

---

## 🚀 Demonstração

Abra o `index.html` com o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code ou execute:

```bash
python3 -m http.server 8080
```
Acesse: `http://localhost:8080`

---

## 📁 Estrutura do Projeto

```
treino-elite/
├── index.html              # Página principal
├── teste.html              # Suite de testes automáticos
├── assets/
│   ├── banner.jpg          # Imagem do hero
│   ├── treino.jpg          # Card de metodologia
│   └── resultado.jpg       # Card de resultados
├── css/
│   └── style.css           # Estilos e responsividade completa
├── js/
│   ├── main.js             # Navbar, menu mobile, formulário
│   └── payment.js          # Modal de pagamento (3 métodos)
└── pages/
    ├── area-aluno.html     # Painel do aluno (protegido)
    ├── privacidade.html    # Política de Privacidade (LGPD)
    ├── termos.html         # Termos de Uso
    └── reembolso.html      # Política de Reembolso
```

---

## ✨ Funcionalidades

### Frontend
- **Hero** com estatísticas animadas e scroll suave
- **Navbar** fixa que escurece ao rolar + menu hamburguer no mobile
- **Seção de metodologia** com 4 cards e imagens reais
- **6 depoimentos** com avatares e resultados dos alunos
- **3 planos de preço** (Starter, Elite, VIP) com destaque visual
- **Formulário de contato** com validação robusta de e-mail
- **SEO completo** — meta description, Open Graph, keywords
- **Totalmente responsivo** — mobile, tablet e desktop

### Pagamento (simulado / pronto para produção)
- Modal com **3 métodos**: Cartão de crédito, PIX e Boleto
- **Máscara automática** de CPF (`000.000.000-00`) e cartão (`0000 0000 0000 0000`)
- **Validação completa** antes de processar
- Fluxo de **PIX com QR Code** e **Boleto com instruções**
- Tela de **sucesso** com acesso à área do aluno

### Área do Aluno
- Painel com **treinos da semana** e status (feito / hoje / próximo)
- **Barras de progresso** do programa (semanas, treinos, nutrição)
- **Anotações** salvas no localStorage
- Dados do usuário por sessão

### Testes Automáticos
- Arquivo `teste.html` com **60+ verificações automatizadas**
- Testa estrutura HTML, imagens, navegação, modal, formulário, CSS e JS
- Relatório visual com ✅ passou / ❌ falhou / ⚠️ aviso

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura e acessibilidade |
| CSS3 + Custom Properties | Estilização e responsividade |
| JavaScript (ES6+) | Interatividade e validações |
| [AOS.js](https://michalsnik.github.io/aos/) | Animações ao rolar a página |
| Google Fonts (Montserrat) | Tipografia |

---

## 🔌 Integrações para Produção

### Formulário de Contato
```js
// Em js/main.js — descomente o bloco marcado com [PRODUÇÃO]
// e substitua pelo seu ID do Formspree:
fetch('https://formspree.io/f/SEU_ID_AQUI', { ... })
```
Crie sua conta gratuita em [formspree.io](https://formspree.io)

### Pagamento
```js
// Em js/payment.js — descomente o bloco marcado com [PRODUÇÃO]
// e conecte à sua API de pagamento:
fetch('/api/checkout', { ... })
```
- 🇧🇷 **Mercado Pago** (recomendado para Brasil): [developers.mercadopago.com](https://developers.mercadopago.com)
- 🌎 **Stripe** (internacional): [stripe.com/docs](https://stripe.com/docs)

---

## 📱 Responsividade

| Breakpoint | Layout |
|---|---|
| `> 1024px` | Desktop completo, 3 colunas |
| `768px – 1024px` | Tablet, 2 colunas |
| `< 768px` | Mobile, menu hamburguer |
| `< 480px` | Mobile pequeno, coluna única |

---

## 🧪 Como Rodar os Testes

1. Abra o projeto com Live Server
2. Acesse `teste.html` no navegador
3. Clique em **▶ RODAR TODOS OS TESTES**
4. Acompanhe o relatório em tempo real

> ⚠️ Os testes precisam de um servidor local (Live Server, Python ou Node) — não funcionam abrindo o arquivo diretamente pelo Finder/Explorer.

---

## 📦 Como Usar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/elite-training.git

# Entre na pasta
cd elite-training

# Abra com Live Server no VS Code
# ou rode um servidor local:
python3 -m http.server 8080
```

---

## 📋 Checklist para ir ao ar

- [ ] Substituir imagens por fotos reais da consultoria
- [ ] Atualizar e-mail, WhatsApp e CNPJ no `index.html`
- [ ] Atualizar links de Instagram, TikTok e YouTube
- [ ] Configurar Formspree (formulário de contato)
- [ ] Integrar gateway de pagamento (Mercado Pago ou Stripe)
- [ ] Fazer deploy na [Vercel](https://vercel.com) ou [Netlify](https://netlify.com)
- [ ] Configurar domínio customizado

---

## 👨‍💻 Autor

Desenvolvido como projeto de portfólio — landing page completa com frontend, simulação de pagamento e área restrita.

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais e de portfólio.
