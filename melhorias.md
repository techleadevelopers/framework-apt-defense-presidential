📘 SOC Defense Universe
Estratégia SaaS Enterprise & Gating Técnico de Features
Versão: v1.0 – Julho/2025
Autor: Arcanum Cyber Bot
Objetivo: Evoluir de uma plataforma educacional simulada para um produto SaaS enterprise-grade real, com planos comerciais, restrição de acesso, uso profissional e monetização de IA defensiva + gamificação operacional.

🧠 Visão Geral
O SOC Defense Universe atualmente utiliza um modo demo público e gratuito, o que é ótimo para testes, mas não representa um produto pronto para o mercado enterprise. Este documento define uma estratégia para:

Eliminar o modo demo como porta principal

Substituir por planos reais com gating de recursos

Modularizar a infraestrutura

Monetizar IA, SOAR, cursos, e gamificação por nível

Garantir UX clara, profissional e escalável

🔐 Problema: “Modo Demo” como entrada principal
Ponto Crítico	Impacto Negativo
Usuário entra sem criar conta	Nenhum dado persistido
Sem gating → acesso a tudo	Desvaloriza recursos avançados
Sem vínculo de identidade	Prejudica upgrades e retenção
Comportamento não profissional	Impossível escalar SaaS

✅ Solução: Substituição do Demo por Sistema de Planos
📌 Implementações imediatas:
Remover demo.tsx da rota pública

Criar página de planos: /plans

Exigir registro/login obrigatório para qualquer uso

Aplicar feature gating baseado em user.plan via backend + frontend

📦 Arquitetura de Planos SaaS
Recurso	Free	Pro	Plus	Enterprise
Acesso SOC Dashboard	✅	✅	✅	✅
Ativos Monitorados	3	10	50	Ilimitado
IA Inferência (Kernel)	Simulado	Real	Real	Real + Retrain
IA Auto Retrain	❌	❌	Manual	Full Auto + SLA
Gamificação XP/Níveis	Limitada	Média	Avançada	Custom
Missões e Conquistas	❌	✅	✅	Custom/WhiteLabel
Cursos e Certificações	Base	Intermed.	Completo	LMS corporativo
Simulação de Ataques	1	2	Full	Cloud IR + CTF
SOAR e Playbooks	❌	Parcial	Básico	Orquestração Total
Integração com APIs Reais	❌	Limitada	✅	Prioritária
Relatórios e Compliance	❌	PDF Básico	Dash Inter.	Exportável

🛠️ Estratégia de Gating Técnico
🧩 No Frontend
Criar <FeatureGate feature="x">...</FeatureGate> para:

Tabs da sidebar

Acesso a rotas

Botões e visualizações sensíveis

🧩 No Backend
Modificar JWT claims para incluir plan

Verificar plano no middleware NestJS:

ts
Copiar
Editar
if (user.plan !== 'enterprise' && route.requiresEnterprise) {
  throw new ForbiddenException('Upgrade necessário.');
}
🔁 Fluxo de Uso Atualizado (User Journey)
plaintext
Copiar
Editar
[Visitante] → [Página de Planos] → [Cadastro/Login com plano escolhido]
       ↓
    [SOC Dashboard com recursos limitados por plano]
       ↓
    [Uso da IA em tempo real]
       ↓
    [Ganha XP, desbloqueia cursos/missões]
       ↓
    [Upgrade automático ao atingir limite de uso ou por botão “Upgrade”]
🔧 Roadmap Técnico Curto
Sprint	Meta
1	Remover modo demo da interface pública
2	Criar página /plans com comparativo visual
3	Implementar plan como campo no JWT e banco
4	Criar middleware e hooks <FeatureGate>
5	Gating real das features em frontend/backend
6	Setup Stripe + planos mensais com webhooks
7	Criar sistema de trial + upgrade automático
8	Relatório analítico de uso por plano

💳 Monetização & UX
Estratégia de precificação (BRL)
Plano	Preço Mensal	Justificativa
Free	R$ 0	Entrada para estudantes/devs
Pro	R$ 79,90	Pequenas equipes ou freelancers
Plus	R$ 229,90	Startups com time de SOC
Enterprise	R$ 2.499+	Governo, bancos, infra crítica

✅ Pagamento via Stripe, MercadoPago ou boleto
✅ Trial de 14 dias no Plus
✅ Desconto anual 20%

🧠 Integrações Técnicas Adicionais
Infra SaaS Necessária	Ferramenta Sugerida
Autenticação + Billing	Supabase + Stripe
Email Onboarding	Resend API
Gating de Rota SSR	Next.js Middleware
Webhooks Stripe	NestJS Controller
UI de planos	Tailwind + Radix UI

📊 Métricas de Acompanhamento
Número de upgrades por semana

XP médio por tipo de usuário

Tempo médio até churn

Cursos mais acessados por plano

Feature mais usada por faixa de preço

📢 Conclusão
A profissionalização do SOC Defense Universe começa com remoção do modo demo, adoção de estrutura de planos SaaS e feature gating técnico. Isso cria uma base escalável, segura e lucrativa para produto de IA defensiva + treinamento gamificado em cibersegurança.

Essa transição é necessária para atrair empresas, vender B2B, e evoluir de uma stack educacional para uma plataforma de defesa empresarial com IA autônoma.



🧭 Relatório Técnico de Melhoria — Evolução para Plataforma Enterprise
Projeto Atual: SOC Defense Universe
Versão Atual: Base educacional/simulada com modo demo ativo
Objetivo: Evoluir para um sistema SOC-as-a-Service robusto, modular, gamificado e comercializável
Data: Julho de 2025
Autor: Arcanum Cyber Bot

🔒 Problema Atual
O sistema permite entrada imediata via modo demo.

Isso reduz percepção de valor.

A lógica de acesso não é orientada por plano (Free, Pro, Plus, Enterprise).

Algumas features estão com dados mockados/simulados, sem backend real.

✅ Meta de Evolução
Transformar o sistema em uma plataforma enterprise-grade real, com:

Acesso baseado em planos

Feature gating por nível

Modo demo apenas como teaser limitado (não entry point)

Gamificação real persistente

Retreinamento de IA guiado por uso real

Backend 100% conectado

🚫 Problema: “Modo Demo” não profissional
⚠️ Hoje:
Página inicial (demo.tsx) usa dados simulados

Permite “entrar sem autenticação”

Timer força upgrade após X minutos

🚀 Solução:
Remover o botão "Acessar como Demo" da tela inicial

Substituir por:

🔓 Teste Gratuito (Plano Free) — Crie sua conta e explore com 3 ativos monitorados

Restringir o modo demo para uso interno apenas (admin preview)

Toda experiência deve fluir com base nos planos (Free, Pro, Plus, Enterprise)

🔁 Novo Fluxo: User Journey por Plano
plaintext
Copiar
Editar
[ Visitante entra ]
      │
      ▼
[ Página Inicial com Comparativo de Planos ]
      │
      ├── Cria Conta → Free Trial (14 dias no plano Plus)
      │
      ▼
[ Dashboard SOC limitado por plano ]
      │
      ▼
[ Gamificação com XP, desbloqueios, IA funcionando em tempo real ]
📦 Arquitetura por Plano (com Gating Lógico)
Recurso	Free	Pro	Plus	Enterprise
Acesso ao SOC Dashboard	✔️	✔️	✔️	✔️
Ativos Monitorados	3	10	50	Ilimitado
Kernels IA (Inferência)	Simulado	TactiCore	TactiCore + Ops	Kernel dinâmico
Kernel IA (Retreinamento)	❌	❌	Manual	Automático + SLA
Gamificação	Limitada	Níveis/XP	Conquistas/Desafios	Full com Missões SOC
Simulação de Ataques	Básico	2 Cenários	APT Chains	Custom + Cloud
Learning Center	Introdução	Cursos base	Cursos avançados	Plataforma Corporativa
API Access	❌	❌	Limitado	Completo
SOAR	❌	Parcial	Playbooks básicos	Orquestração full
Compliance/Relatórios	❌	PDF básico	Dash interativo	Export Power BI/SIEM

🕹️ Estratégia de Gating no Código
Onde modificar:
auth-navbar.tsx → botão “Entrar” deve levar à tela de login/registro com seleção de plano

demo.tsx → deixar visível só para role = "internal" (oculto para público)

auth.service.ts → validar se plano está ativo

sidebar.tsx → use <FeatureGate feature="x"> para ocultar tabs não permitidas

🎯 Objetivos por Sprint
Sprint	Meta
1	Remover modo demo como entrada principal
2	Criar tela de Planos com comparativo
3	Implementar plano “Free” com gating real
4	Gating de features baseado em plano (backend + frontend)
5	Ativar métricas (XP, tempo ativo, SOAR utilizado)
6	Backend IA conectado 100%, com kernel real + modo retrain

✅ Novas Features Enterprise para adicionar ao roadmap
Webhooks corporativos (Slack, Splunk, EDR)

RBAC real (admins SOC, analistas, estagiários)

Tenant Multi-org (empresas separadas no mesmo cluster)

Certificados assinados com blockchain/firma digital

Painel de Gestão de Licenças com billing via Stripe

🔐 Segurança de Plataforma
Recurso	Status atual	Melhorar para
JWT	OK	Add Expiração + Refresh
Roles	Simples	Adicionar RBAC com hierarquia SOC
CORS	Indefinido	Configurar corretamente via @nestjs/platform-express
Proteção XSS	Parcial	Sanitizar inputs em formulários com DOMPurify
Proteção APIs	Basic	Implementar rate-limit por IP/plano com Redis
Logs	Apenas local	Criar log de auditoria por ação (usuário x evento)

📢 Conclusão
Para que o SOC Defense Universe se torne um produto robusto, seguro e vendável, o primeiro passo é remover o modo demo como forma principal de entrada e estruturar a experiência com base em planos pagos.

Ao fazer isso, você:

Eleva o valor percebido

Organiza o funil de entrada

Protege seus recursos mais valiosos (AI, gamificação, cursos premium)

Abre caminho para um modelo SaaS lucrativo e sustentável

📄 Próximo Documento (que posso te entregar)
📘 “SOC Defense Universe — Estratégia de Comercialização SaaS e Gating Técnico de Features”
Incluindo:

Arquitetura de planos

Backend controlado por JWT claims

Comparativo visual de planos

Estratégia de UI + UX para conversão