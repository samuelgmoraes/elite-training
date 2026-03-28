# Elite Training ⚡

Esse projeto é uma landing page que fiz para uma consultoria de treino online. A ideia era criar algo completo de verdade — não só a parte visual, mas também simular como funcionaria o pagamento, a área do aluno e o formulário de contato.

![Preview do projeto](assets/banner.jpg)

---

## O que tem no projeto

A página tem tudo que uma landing page de verdade precisa:

- Menu fixo no topo que escurece ao rolar, com versão mobile (hamburguer)
- Seção hero com animações e botões que levam direto para os planos
- 4 cards explicando a metodologia de treino
- 6 depoimentos de alunos com avatar e resultado de cada um
- 3 opções de plano (Starter, Elite e VIP) com preços e benefícios
- Formulário de contato com validação de e-mail — não deixa enviar com e-mail errado
- Footer com links legais (privacidade, termos, reembolso)

**Área do aluno** — uma página separada que simula o painel de quem assinou:
- Treinos da semana com status (feito, hoje, próximo)
- Barras de progresso do programa
- Campo de anotações que salva no navegador

**Modal de pagamento** — simula o fluxo completo de compra:
- Cartão de crédito com máscara automática nos campos
- PIX com geração de QR Code
- Boleto com instruções
- Tela de sucesso após confirmar

---

## Como rodar

Você precisa abrir o projeto com um servidor local — se abrir o arquivo direto pelo Finder/Explorer alguns recursos não vão funcionar.

A forma mais fácil é usar o **Live Server** no VS Code:

1. Instala o VS Code em [code.visualstudio.com](https://code.visualstudio.com)
2. Instala a extensão **Live Server** na aba de extensões
3. Clica com botão direito no `index.html` → **Open with Live Server**
4. Abre no navegador em `http://127.0.0.1:5500`

Ou se tiver Python instalado, abre o terminal na pasta do projeto e roda:

```bash
python3 -m http.server 8080
```

Depois acessa `http://localhost:8080` no navegador.

---

## Arquivos do projeto

```
elite-training/
├── index.html           — página principal
├── teste.html           — testes automáticos
├── assets/              — imagens
├── css/
│   └── style.css        — todo o visual e responsividade
├── js/
│   ├── main.js          — navegação, menu mobile e formulário
│   └── payment.js       — modal de pagamento
└── pages/
    ├── area-aluno.html  — painel do aluno
    ├── privacidade.html — política de privacidade
    ├── termos.html      — termos de uso
    └── reembolso.html   — política de reembolso
```

---

## Tecnologias usadas

- HTML, CSS e JavaScript puros — sem framework
- [AOS.js](https://michalsnik.github.io/aos/) para as animações ao rolar
- Google Fonts (Montserrat)
- LocalStorage para salvar as anotações do aluno

---

## Testes automáticos

Tem um arquivo `teste.html` que roda mais de 60 verificações automáticas no projeto — checa se as imagens carregaram, se os links funcionam, se o modal abre e fecha, se o formulário rejeita e-mail inválido, entre outras coisas.

Para usar: abre o `teste.html` pelo Live Server e clica em **Rodar todos os testes**.

---

## Responsividade

Funciona em qualquer tamanho de tela — testei em mobile, tablet e desktop. No mobile o menu vira hamburguer e os cards empilham em coluna única.

---

## Quer colocar no ar?

O pagamento e o formulário estão simulados. Quando quiser ativar de verdade, os pontos de integração estão marcados com `[PRODUÇÃO]` nos arquivos JS — é só descomentar e colocar as chaves reais.

Para o formulário: [formspree.io](https://formspree.io) (gratuito)

Para pagamento: [Mercado Pago](https://developers.mercadopago.com) para Brasil ou [Stripe](https://stripe.com/docs) para outros países

Para hospedar o site grátis: [Vercel](https://vercel.com) ou [Netlify](https://netlify.com)

---

## Autor

Samuel Moraes — projeto desenvolvido para portfólio.
