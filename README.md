Documentação Técnica do Projeto SOC (Security Operations Center)
Data: 13 de Julho de 2025
Autor: Paulo Silas de Campos Filho
Versão: 1.0 (Situação Atual)

1. Visão Geral do Projeto

O projeto "APT Defense Universe" é uma plataforma educacional e de simulação de ponta, projetada para capacitar analistas de segurança cibernética. Ele simula um ambiente de SOC em tempo real, integrando funcionalidades essenciais de detecção, resposta, gerenciamento e análise de ameaças, além de oferecer um robusto centro de aprendizado e certificação. O objetivo principal é fornecer um ambiente prático e imersivo para o desenvolvimento de habilidades em cibersegurança, utilizando dados simulados e, em alguns casos, dados reais de APIs externas para maior realismo.

Propósito e Objetivos:

Educação Imersiva: Proporcionar um ambiente de aprendizado prático que simule operações de SOC do mundo real.
Desenvolvimento de Habilidades: Permitir que os usuários pratiquem detecção de ameaças, resposta a incidentes, threat hunting e outras disciplinas de segurança.
Validação de Conhecimento: Oferecer um sistema de certificação e gamificação para validar e motivar o aprendizado.
Realismo Operacional: Integrar dados simulados e reais para replicar a complexidade de um SOC ativo.
Escopo Atual:

A plataforma está desenvolvida como uma aplicação web de página única (SPA) com foco no frontend, utilizando React e TypeScript. A maior parte da funcionalidade é impulsionada por dados simulados e mockados, com integrações parciais a APIs públicas para adicionar uma camada de realismo. Não há um backend persistente customizado implementado no momento, o que posiciona o projeto como um protótipo ou ferramenta educacional avançada.

2. Arquitetura Geral

2.1. Frontend

Tecnologias Core:

React (com TypeScript): Biblioteca principal para construção da interface do usuário, garantindo componentes reutilizáveis e tipagem forte.
Tailwind CSS: Framework CSS utility-first, utilizado para estilização rápida e responsiva, com um tema "cyber" customizado (index.css) que define variáveis CSS para cores e fontes, conferindo uma identidade visual única.
Shadcn UI: Coleção de componentes React pré-estilizados com Tailwind CSS, utilizada para construir a interface de usuário de forma consistente e eficiente. Inclui componentes como: Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Checkbox, Collapsible, Command (para paletas de comando), ContextMenu, Dialog, Drawer, DropdownMenu, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast e Toaster (para notificações), Toggle, ToggleGroup, e Tooltip.
Recharts: Biblioteca para criação de gráficos e visualização de dados, encapsulada no componente Chart para integração com o tema visual da aplicação.
Wouter: Biblioteca leve para roteamento no lado do cliente (App.tsx).
Lucide React: Biblioteca de ícones (lucide-react) para uma iconografia consistente e expressiva em toda a aplicação.
Estrutura de Componentes:

A aplicação segue uma arquitetura modular baseada em componentes, organizada em diretórios lógicos (components, pages, hooks, lib). Cada funcionalidade principal (Dashboard, Incidentes, SOAR, etc.) é encapsulada em seu próprio componente React, promovendo a manutenibilidade e a escalabilidade.

Gerenciamento de Estado:

React Hooks (useState, useEffect, useCallback, useRef): Utilizados extensivamente para gerenciar o estado local dos componentes e o ciclo de vida.
Context API: Empregado para gerenciamento de estado global em alguns casos (ex: useThreatData, useRealApiData), permitindo que dados sejam compartilhados entre componentes sem a necessidade de prop-drilling.
React Query (@tanstack/react-query): Configurado (queryClient.ts) para gerenciamento de requisições assíncronas, caching, sincronização e tratamento de erros de forma eficiente. Embora a maioria dos dados seja mockada, a estrutura está pronta para um backend real.
React Hook Form: Utilizado através do componente Form (form.tsx) para gerenciamento de formulários, provendo validação e controle de campos de forma robusta e integrada com o estado da aplicação.
UI/UX:

O design é moderno e "futurista", com uma paleta de cores escuras e vibrantes (definidas em index.css), utilizando transparências (glass-panel) e efeitos visuais (animações de pulso, gradientes) para criar uma experiência imersiva e engajadora. A responsividade é tratada via Tailwind e media queries (index.css, use-mobile.tsx).

Componente Sidebar (sidebar.tsx):

A Sidebar é um componente fundamental para a navegação e layout da aplicação. Implementada com um SidebarProvider que gerencia o estado de expansão/colapso (state: "expanded" | "collapsed"), tanto para desktop quanto para mobile (usando Sheet para o modo offcanvas em dispositivos móveis). O useSidebar hook permite que outros componentes acessem e manipulem o estado da barra lateral.

A Sidebar suporta diferentes variantes (sidebar, floating, inset) e modos colapsáveis (offcanvas, icon, none). Inclui sub-componentes para sua estrutura interna:

SidebarTrigger: Botão para alternar o estado da sidebar.
SidebarRail: Área de arrasto para redimensionar/colapsar a sidebar.
SidebarInset: Container principal para o conteúdo da aplicação quando a sidebar está no modo inset.
SidebarInput: Campo de entrada estilizado para uso dentro da sidebar.
SidebarHeader, SidebarFooter: Seções para cabeçalho e rodapé da sidebar.
SidebarSeparator: Separador visual.
SidebarContent: Área de conteúdo principal da sidebar.
SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent: Componentes para organizar grupos de itens na sidebar.
SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton: Componentes para construir menus de navegação, incluindo sub-menus, botões com ícones e badges, e estados de carregamento (esqueletos).
2.2. Backend/APIs (Conceitual e Integrações)

Atualmente, o projeto não possui um backend customizado. A persistência de dados e a lógica de negócios complexa são simuladas no frontend. No entanto, há um forte foco na integração com APIs externas, que servem como substitutos para dados de backend:

api-integration.ts: Este módulo centraliza a configuração e o consumo de APIs públicas de cibersegurança, incluindo:
VirusTotal: Reputação de arquivos/URLs/IPs.
AbuseIPDB: Banco de dados de reputação de IPs.
IP Geolocation (ipgeolocation.io e ip-api.com): Dados de geolocalização e inteligência de ameaças.
NVD NIST: Vulnerabilidades (CVEs).
URLhaus: Banco de dados de URLs maliciosas.
PhishTank: Banco de dados de URLs de phishing.
Controle de Rate Limiting: Implementa um RateLimiter para gerenciar o consumo das APIs e evitar bloqueios.
shodan-client.d.ts: A presença deste arquivo de declaração TypeScript sugere uma intenção futura ou uma integração em andamento com a API do Shodan para coleta de dados de hosts e serviços expostos na internet, o que enriqueceria ainda mais a inteligência de ameaças.
Simulação de WebSockets: O módulo socket-client.ts simula uma conexão WebSocket e a emissão de eventos em tempo real (security_event, new_threat, ai_update), permitindo que componentes como activity-feed.tsx exibam dados dinâmicos sem uma conexão de backend real.
3. Módulos e Funcionalidades Principais

A plataforma é dividida em vários módulos, acessíveis via sidebar.tsx, cada um focado em uma área específica de um SOC:

3.1. Dashboard de Operações (soc-dashboard.tsx)

metrics-panel.tsx: Exibe métricas chave como ameaças ativas, saúde da rede, ataques bloqueados e confiança da IA.
ai-status-panel.tsx: Detalha o status e performance dos "kernels" de IA (TactiCore e Mission Ops), com visualizações de atividade neural.
threat-map.tsx / enhanced-threat-map.tsx: Mapa global interativo que visualiza ameaças em tempo real (simuladas ou via API real), com indicadores de severidade e detalhes.
activity-feed.tsx: Um feed em tempo real de eventos de segurança e alertas.
mitre-framework.tsx: Apresenta a cobertura da plataforma em relação às táticas e técnicas do MITRE ATT&CK Framework.
api-status-panel.tsx: Monitora o status das integrações com APIs externas, indicando se as chaves estão configuradas e se as APIs estão online/limitadas.
3.2. Detecção e Análise de Ameaças (threat-list.tsx)

Lista de ameaças ativas com detalhes, severidade e ações de resposta.

threat-severity.tsx e threat-counter.tsx: Componentes de resumo de ameaças.
threat-detection-config.tsx: Permite configurar regras de detecção, thresholds de alerta e criar regras customizadas.
ai-threat-analysis.tsx: Simula um motor de análise de ameaças baseado em IA, com fases de coleta de dados, análise comportamental, reconhecimento de padrões, modelagem preditiva e avaliação de risco, gerando logs detalhados e um relatório final.
3.3. Gerenciamento de Incidentes (incident-management.tsx)

Gerencia o ciclo de vida completo de incidentes de segurança (abertura, progresso, resolução, fechamento).

Exibe detalhes do incidente, ativos afetados e uma linha do tempo de eventos.
Permite a criação manual de novos incidentes.
3.4. Gerenciamento de Vulnerabilidades (vulnerability-management.tsx)

Lista e detalha vulnerabilidades (CVEs) com severidade, score CVSS, status e ativos afetados.

vulnerability-monitor.tsx: Componente que integra dados reais do NVD NIST para monitoramento de vulnerabilidades.
Filtros por severidade e status, além de análises de ativos mais vulneráveis e tendências.
3.5. Gerenciamento de Ativos (asset-management.tsx)

Inventário detalhado de ativos de TI (servidores, estações de trabalho, rede, bancos de dados).

Informações como IP, OS, proprietário, localização, criticidade e status de segurança (vulnerabilidades, patch level, AV).
Visualização de topologia de rede (placeholder) e status de conformidade.
3.6. SOAR (Security Orchestration, Automation, and Response) (soar-automation.tsx)

Gerenciamento de playbooks de automação para incident response, threat hunting, vulnerabilidade, etc.
Simulação da execução de playbooks com logs de passos.
Visão de integrações com outras ferramentas de segurança (SIEM, EDR, Firewall).
3.7. Compliance e Relatórios (compliance-reporting.tsx)

Monitoramento de conformidade com frameworks regulatórios (NIST CSF, ISO 27001, LGPD, SOX, PCI-DSS).
Geração de relatórios de conformidade e dashboards executivos.
Acompanhamento de tendências e agendamento de avaliações.
3.8. Simulação de Ataques (attack-simulation.tsx)

SimulatedAPTChain.tsx: Componente central para simulações interativas de cadeias de ataque APT (Cozy Bear, Flash Loan em DeFi, Ransomware, Cloud Credential Theft, Mobile Banking Trojan, IoT Botnet).
Cada simulação detalha passos, comandos, resultados esperados, regras de detecção e pontos de aprendizado, com mapeamento MITRE ATT&CK.
Modos de execução automática e manual, com logs de terminal em tempo real e pontuação.
3.9. Inteligência de Ameaças (threat-intelligence.tsx)

real-threat-intelligence.tsx: Integração com APIs externas para obter IOCs, dados de reputação de IPs, URLs de phishing e informações sobre campanhas de ameaças.
Listagem de IOCs, atores de ameaças e campanhas ativas.
3.10. Monitoramento de Vigilância (surveillance-system.tsx)

sentinel-interface.tsx: Simula um sistema de vigilância com múltiplas câmeras, feeds de vídeo (mockados), detecção de alertas e logs do sistema. Inclui efeitos visuais como "glitch" para simular cenários de comprometimento.
3.11. Scanner de Rede (network-scanner.tsx / enterprise-network-scanner.tsx)

network-scanner.tsx: Versão básica para descoberta de dispositivos e serviços em uma rede.
enterprise-network-scanner.tsx: Versão avançada com gerenciamento de segmentos de rede, avaliação de risco, status de conformidade, e simulação de varredura de vulnerabilidades com resultados detalhados.
real-network-scanner.tsx: Utiliza APIs externas para analisar IPs e simular varreduras de rede com dados reais de geolocalização e reputação.
3.12. Centro de Aprendizado (learning-center.tsx)

Uma plataforma educacional completa com cursos (divididos em módulos e lições), conquistas e um sistema de certificação.

enterprise-learning-platform.tsx: Foca em trilhas de carreira, programas de mentoria, laboratórios virtuais e parcerias corporativas.
enterprise-certification-system.tsx: Detalha certificações de nível empresarial, seus requisitos, valor de mercado e impacto salarial.
digital-certificate.tsx: Componente para exibir e validar certificados digitais, com simulação de verificação em blockchain.
Guia HUD Inteligente (intelligent-hud-guide.tsx): Um sistema de guia interativo que oferece tutoriais passo a passo dentro da aplicação. Configurações de guias (GuideConfig) definem título, descrição, categoria, dificuldade, tempo estimado, e uma série de passos (GuideStep). Cada passo pode ter um alvo (target) para destacar elementos da UI, uma ação sugerida, uma dica, um ícone e até mesmo animações. O sistema gerencia o progresso, permite pular ou reiniciar guias, e pode ser configurado para exibir guias apenas uma vez, armazenando o estado no localStorage.
3.13. Testes de Regras (interactive-rule-testing.tsx)

Permite testar regras de detecção (regex) contra amostras de dados, simulando a eficácia e gerando logs detalhados com explicações sobre o processo de detecção e validação.

3.14. Manual do Usuário (user-manual.tsx)

Um guia interativo que descreve a metodologia de ensino da plataforma, trilhas de aprendizado, laboratórios práticos, e um roadmap de carreira em cibersegurança.

3.15. Terminal Avançado (advanced-terminal.tsx)

Um componente de terminal simulado que oferece uma interface de linha de comando para interagir com a plataforma. Permite a execução de comandos simulados como scan, threat-hunt, mitre, alert, status e clear. Possui funcionalidades de histórico de comandos, minimização/maximização e fechamento, proporcionando uma experiência imersiva de console de segurança.

3.16. Perfil do Usuário e Configurações (user-profile.tsx)

Um componente abrangente para visualização e gerenciamento do perfil do usuário. Exibe informações como nome, função, nível, experiência, status (online/offline), turno de trabalho, último login e estatísticas de desempenho (ameaças detectadas, sessões, certificações). Inclui um painel de preferências para configurar opções como notificações, alertas sonoros, auto-refresh e modo avançado, além de ações rápidas para configurações do sistema e segurança.

3.17. Central de Notificações (notification-center.tsx)

Um sistema de notificação em tempo real que exibe alertas e eventos importantes da plataforma. As notificações são categorizadas por tipo (crítico, aviso, informação, sucesso) e incluem título, mensagem, timestamp e fonte. Oferece funcionalidades para filtrar notificações (todas, não lidas, críticas), marcar como lidas (individualmente ou todas) e excluir. O componente simula a chegada de novas notificações periodicamente, mantendo a interface dinâmica.

4. Integrações e Dados

O projeto faz uso extensivo de dados para simular um ambiente dinâmico:

Dados Simulados/Mockados: A maioria dos dados exibidos nos componentes é gerada ou mockada diretamente no frontend (ex: use-threat-data.tsx para ameaças em tempo real, dados mockados em ml-analysis.tsx, asset-management.tsx, etc.). Isso permite que a aplicação funcione de forma autônoma sem um backend complexo.
Integrações Reais com APIs Públicas:
use-real-api-data.tsx: Orquestra chamadas a APIs como NVD NIST (CVEs), PhishTank (URLs de phishing), AbuseIPDB e VirusTotal (reputação de IP/URL), e IP Geolocation. Essas integrações, embora sujeitas a limites de taxa e necessidade de chaves API, trazem um elemento de dados do mundo real para a simulação.
Simulação de WebSockets: socket-client.ts e use-websocket.tsx simulam eventos em tempo real, como novos alertas de segurança ou atualizações de IA, para manter a interface dinâmica.
5. Infraestrutura e Ambiente de Desenvolvimento

Ambiente: A aplicação é configurada para desenvolvimento frontend com Vite (main.tsx, index.html), permitindo hot-module replacement e build otimizado.
Gerenciamento de Dependências: package.json (não fornecido diretamente, mas inferido) gerencia as bibliotecas e ferramentas.
Configuração de Ambiente: Variáveis de ambiente (import.meta.env.VITE_...) são usadas para gerenciar chaves de API, garantindo que não sejam expostas no código-fonte.
6. Boas Práticas e Padrões de Código

Modularidade: Código bem organizado em módulos e componentes reutilizáveis.
Componentização: Forte adesão ao paradigma de componentes, com responsabilidades claras para cada um.
Uso de Hooks: Exploração eficaz dos Hooks do React para lógica de estado e ciclo de vida, incluindo hooks personalizados como useSidebar e useIsMobile.
Tipagem Forte: Uso consistente de TypeScript para melhorar a qualidade do código, detectar erros em tempo de desenvolvimento e facilitar a manutenção.
Estilização: Abordagem moderna com Tailwind CSS, complementada por variáveis CSS customizadas para um tema coeso, e o uso de class-variance-authority para variantes de componentes.
Padrões de UI: Utilização de uma biblioteca de componentes (Shadcn UI) e padrões como Radix UI para garantir consistência visual e funcional, acessibilidade e interações complexas.
Separação de Preocupações: Lógica de negócio (simulada) e chamadas a APIs encapsuladas em hooks (use-threat-data, use-real-api-data, api-integration), separando-as da lógica de apresentação.
Responsividade: Design adaptável a diferentes tamanhos de tela, com componentes que ajustam seu comportamento e layout.
7. Pontos Fortes

Experiência do Usuário (UX) Imersiva: Design visualmente atraente e interativo, com gamificação e simulações detalhadas. A inclusão de componentes como o IntelligentHudGuide aprimora a experiência de aprendizado.
Modularidade e Escalabilidade: A estrutura de componentes facilita a adição de novas funcionalidades e a manutenção do código existente.
Realismo Educacional: A combinação de dados simulados ricos e integrações com APIs reais proporciona um ambiente de aprendizado altamente relevante.
Foco na Prática: As simulações de ataque (APT Chain), o AdvancedTerminal e os laboratórios interativos são um diferencial para o aprendizado prático.
Tecnologias Modernas: Utilização de um stack tecnológico atualizado (React, TypeScript, Tailwind, React Query, Recharts, Radix UI) que é relevante no mercado.
Documentação Interna: O componente user-manual.tsx já serve como uma base para a documentação do usuário final, o que é uma boa prática.
Preparação para Backend: A arquitetura com React Query e a separação de lógica de dados em hooks facilitam a transição para um backend real no futuro.
8. Oportunidades de Melhoria / Próximos Passos

Implementação de Backend Real:
Autenticação e Autorização: Implementar um sistema de login/registro e controle de acesso baseado em roles.
Persistência de Dados: Migrar dados mockados para um banco de dados real (SQL ou NoSQL) para armazenar informações de usuários, progresso, incidentes, ativos, etc.
Lógica de Negócios no Servidor: Mover a lógica complexa de simulação e processamento de eventos para o backend, aliviando a carga do cliente e garantindo a integridade dos dados.
WebSockets Reais: Substituir a simulação de WebSockets por uma implementação real para comunicação em tempo real e push notifications.
Cobertura de Testes:
Testes Unitários: Implementar testes para componentes React e funções utilitárias.
Testes de Integração: Validar a interação entre diferentes módulos e serviços.
Testes E2E (End-to-End): Utilizar ferramentas como Cypress ou Playwright para simular fluxos de usuário completos.
Otimização de Performance:
Para grandes volumes de dados (simulados ou reais), otimizar a renderização de listas e mapas (virtualização de listas, otimização de SVG).
Considerar o lazy loading de componentes e rotas para reduzir o tempo de carregamento inicial.
Internacionalização (i18n):
Implementar suporte a múltiplos idiomas para tornar a plataforma acessível a um público global.
Segurança da Aplicação (Frontend e Backend):
Se a plataforma for para produção, implementar medidas de segurança como validação de entrada, proteção contra XSS/CSRF, gerenciamento seguro de segredos (chaves API), etc.
Documentação Adicional:
Documentar APIs internas (se um backend for desenvolvido).
Criar diagramas de arquitetura (C4 model, diagramas de fluxo de dados).
Elaborar um roadmap de produto detalhado.
9. Conclusão

O projeto SOC "APT Defense Universe" demonstra uma base sólida e um grande potencial. A escolha de tecnologias modernas e a abordagem modular resultaram em uma aplicação frontend robusta e visualmente impressionante. O foco na simulação e na educação é um diferencial forte. Para evoluir de um protótipo educacional para uma plataforma completa, a próxima etapa crítica seria a implementação de um backend real e a transição dos dados mockados para um sistema persistente, além de um investimento contínuo em testes e otimizações. A base técnica existente é excelente para essa transição.