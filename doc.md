Documentação do Sistema: SOC Defense Universe
1. Visão Geral do Sistema
1.1 Introdução
O SOC Defense Universe é uma plataforma de cibersegurança multifacetada, projetada para simular um Centro de Operações de Segurança (SOC) e, ao mesmo tempo, servir como uma academia de treinamento avançado para profissionais de segurança cibernética. A plataforma integra funcionalidades de monitoramento de ameaças em tempo real, gestão de incidentes, análise de vulnerabilidades, automação de segurança (SOAR), e um robusto sistema de aprendizado e certificação com gamificação.

1.2 Arquitetura
A arquitetura do sistema é dividida em duas camadas principais: Frontend e Backend, com uma camada de persistência de dados e integração com APIs externas.

Frontend (Interface do Usuário): Desenvolvido com React e TypeScript, utilizando Wouter para roteamento e Tailwind CSS para estilização. A interface é rica em componentes interativos e visualizações de dados, oferecendo uma experiência imersiva de um SOC.
Backend (API e Lógica de Negócio): Construído com NestJS, um framework progressivo de Node.js, utilizando TypeORM para interação com o banco de dados. O backend gerencia a lógica de negócio, autenticação de usuários, persistência de dados e serve como um gateway para APIs externas.
Banco de Dados: Utiliza Drizzle ORM com Neon Database (PostgreSQL Serverless) para produção, e SQLite (soc_platform.db) com TypeORM para desenvolvimento. O sistema também possui uma implementação de armazenamento em memória (MemStorage) para fins de demonstração ou testes.
APIs Externas: Integra-se com diversas APIs públicas de inteligência de ameaças e vulnerabilidades (VirusTotal, AbuseIPDB, NVD NIST, URLhaus, PhishTank, IP Geolocation) para fornecer dados em tempo real.
WebSockets: Implementa um servidor WebSocket (via ws no backend e simulação no frontend) para comunicação em tempo real e atualização de eventos de segurança.
1.3 Tecnologias Utilizadas
Categoria	Tecnologia	Descrição
Frontend	React, TypeScript	Biblioteca e linguagem para construção da interface de usuário.
Wouter	Pequeno roteador para React.
Tailwind CSS, clsx, twMerge	Framework CSS utilitário para estilização rápida e responsiva.
Lucide React	Biblioteca de ícones.
shadcn/ui	Coleção de componentes de UI reutilizáveis.
Backend	NestJS	Framework Node.js para construção de APIs eficientes e escaláveis.
TypeORM	ORM (Object-Relational Mapper) para interação com o banco de dados.
Drizzle ORM	ORM TypeScript para bancos de dados relacionais (usado com Neon).
ws	Biblioteca para WebSockets.
bcrypt	Biblioteca para hashing de senhas.
jsonwebtoken (@nestjs/jwt)	Implementação de JSON Web Tokens para autenticação.
class-validator, class-transformer	Para validação de DTOs.
Banco de Dados	SQLite (better-sqlite3)	Banco de dados leve para desenvolvimento.
Neon Database (PostgreSQL Serverless)	Banco de dados escalável para produção.
APIs Externas	VirusTotal, AbuseIPDB, NVD NIST, URLhaus, PhishTank, IP Geolocation	Fontes de inteligência de ameaças, vulnerabilidades e geolocalização.
Ferramentas	Vite	Ferramenta de build frontend.
nanoid	Gerador de IDs únicos.
dotenv	Para gerenciamento de variáveis de ambiente.
drizzle-orm/neon-serverless	Conector Drizzle para Neon.
2. Módulos do Frontend (Interface do Usuário)
A interface do usuário é o ponto central de interação, oferecendo diversas visões e ferramentas para analistas SOC, estudantes e administradores.

2.1 Autenticação e Gestão de Usuários
Páginas de Autenticação (login.tsx, register.tsx):
Login: Permite que usuários existentes (student, analyst, admin) acessem a plataforma. Inclui campos para nome de usuário e senha, com opção de visualização da senha. Possui um "Modo Demo" para acesso rápido sem autenticação persistente.
Registro: Permite que novos usuários criem uma conta. Coleta informações como nome, sobrenome, email, nome de usuário, senha e instituição. Oferece seleção de tipo de conta (Estudante ou Analista). Inclui validação de senhas e aceitação de termos de uso.
Barra de Navegação de Autenticação (auth-navbar.tsx): Componente de navegação superior que inclui o logotipo do "SOC Defense Universe", links para as principais seções (Início, SOC Dashboard, Estudante, Admin) e botões de Login/Cadastro.
Resumo do Usuário (user-resume.tsx, UserGameProfile.tsx): Exibe um resumo do perfil do usuário logado na barra lateral, incluindo nome de usuário, nível, pontos totais, conquistas, certificações e progresso em cursos. Integra-se com o backend para buscar dados reais do usuário.
Painel Administrativo (admin-dashboard.tsx): Interface para gerenciamento de usuários e cursos.
Visão Geral: Exibe estatísticas sobre estudantes (total, ativos, novos), cursos (publicados, em rascunho) e taxas de conclusão.
Estudantes: Lista de usuários com detalhes como nome, email, papel, instituição, data de ingresso, último acesso, cursos concluídos e pontos. Permite busca e filtragem.
Funcionalidades: Inclui botões para adicionar novo usuário, configurações, exportar dados e ações de visualização/edição/exclusão por usuário.
2.2 Dashboard SOC (Security Operations Center)
O coração da plataforma, oferecendo uma visão abrangente e ferramentas interativas para operações de segurança.

Componente Principal (soc-dashboard.tsx): Gerencia a navegação entre as diferentes abas do dashboard, renderizando o conteúdo correspondente.
Barra Lateral (sidebar.tsx): Navegação principal do SOC, com links para Dashboard, Incident Response, Threat Detection, Network Scanner, Attack Simulation, Threat Intelligence, ML/AI Analysis, SENTINEL System, Compliance, Learning Center e Real API Integration. Inclui um resumo do usuário e status do sistema/AI Kernel.
Detalhes: Este componente customizado utiliza primitivas de shadcn/ui como Button, Avatar, Badge e Separator para construir sua interface e funcionalidades de navegação.
Barra Superior (top-bar.tsx): Exibe o título da aba ativa, horário atual, uptime do sistema, status de ameaças e saúde da rede. Inclui barra de pesquisa avançada e botões de acesso rápido para terminal, notificações e perfil do usuário.
Painel de Métricas (metrics-panel.tsx): Exibe métricas chave do SOC como ameaças ativas (críticas), saúde da rede, ataques bloqueados e confiança da IA. Possui animações visuais para representar o fluxo de dados e status.
Painel de Status da IA (ai-status-panel.tsx): Monitora o status e desempenho dos modelos de IA ("TactiCore Kernel" e "Mission Ops Kernel"), exibindo precisão, previsões e tempo de resposta. Inclui uma visualização de atividade neural.
Framework MITRE ATT&CK (mitre-framework.tsx): Apresenta uma visão geral da cobertura do sistema em relação às táticas do MITRE ATT&CK, com porcentagens de detecção para cada categoria.
Mapa Global de Ameaças (threat-map.tsx, enhanced-threat-map.tsx):
Exibe ameaças ativas em um mapa mundial, com pontos pulsantes indicando a origem e severidade.
Permite alternar entre dados simulados e dados reais de APIs externas.
Exibe estatísticas de ameaças por país de origem e tipo.
Funcionalidade de tela cheia e detalhes de ameaças ao clicar nos pontos.
Feed de Atividade (activity-feed.tsx): Lista em tempo real os eventos de segurança detectados, com detalhes como tipo, origem, mensagem, severidade e timestamp.
Centro de Detecção de Ameaças (threat-list.tsx):
Visão Geral: Exibe estatísticas de severidade de ameaças (críticas, altas, médias, baixas), um contador de ameaças em tempo real e a confiança geral da detecção da IA.
Ameaças Ativas: Lista detalhada de ameaças com título, descrição, severidade, MITRE ID, IPs de origem/destino, confiança e status. Permite filtrar por severidade e realizar ações (investigar, bloquear, dispensar).
Configuração de Detecção (threat-detection-config.tsx): Permite gerenciar regras de detecção (habilitar/desabilitar, ajustar confiança), configurar limites de alerta, criar regras personalizadas e ajustar configurações do motor de detecção (IA aprimorada, análise comportamental, etc.).
Análise de Ameaças por IA (ai-threat-analysis.tsx): Simula um motor de análise de ameaças por IA com fases de coleta de dados, análise comportamental, reconhecimento de padrões, modelagem preditiva e avaliação de risco. Exibe logs detalhados e resultados da análise.
Scanner de Rede (network-scanner.tsx, enterprise-network-scanner.tsx, real-network-scanner.tsx):
Scanner Empresarial: Permite escanear alvos específicos (IPs ou sub-redes) e exibe dispositivos descobertos com detalhes como IP, hostname, tipo de dispositivo, SO, serviços e status.
Recursos Empresariais: Inclui funcionalidades avançadas como risco, conformidade, última varredura, vulnerabilidades, criticidade, departamento, proprietário, localização, segmento de rede, status de criptografia, nível de patch e impacto nos negócios.
Segmentos de Rede: Exibe uma lista de segmentos de rede com detalhes como sub-rede, contagem de dispositivos, nível de risco e status de isolamento.
Vulnerabilidades: Apresenta um painel para avaliação de vulnerabilidades, com estatísticas e resultados de varreduras.
Conformidade: Monitora a conformidade com frameworks regulatórios como PCI-DSS, ISO 27001, LGPD, etc.
Análises: Exibe gráficos e métricas de análise de rede, como distribuição de tipos de dispositivos e análise de risco.
Real Network Scanner: Integra-se com APIs externas para analisar IPs em tempo real, fornecendo geolocalização e reputação.
Sistema SENTINEL (surveillance-system.tsx, sentinel-interface.tsx):
Simula um sistema de vigilância avançado com múltiplas câmeras.
Exibe feeds de vídeo simulados, com opções de status (online, offline, manutenção) e alertas.
Inclui um console de logs do sistema e controles para visualização (grade, Sentinel), reset e filtros.
Nota: sentinel-interface.tsx parece ser uma versão mais simples ou base do surveillance-system.tsx. O surveillance-system.tsx é mais completo.
Simulação de Ataques (attack-simulation.tsx, SimulatedAPTChain.tsx):
Permite executar simulações de ataques complexos baseados em cenários realistas (APT, ransomware, insider, DeFi, cloud, mobile, IoT).
Cada cenário detalha objetivos, pré-requisitos e uma sequência de passos de ataque com comandos, resultados esperados, regras de detecção e pontos de aprendizado.
Console de Simulação: Exibe logs em tempo real da execução do ataque, incluindo comandos, resultados, alertas de segurança e explicações detalhadas.
Modo Manual/Automático: Permite a execução passo a passo ou automática da simulação.
Métricas de Desempenho: Calcula e exibe pontuações de discrição, velocidade, cobertura e evasão de detecção.
Laboratório Interativo (SimulatedAPTChain.tsx): Oferece um ambiente guiado para simulações passo a passo, incluindo explicações detalhadas sobre cada técnica e defesa.
Dados de Laboratório (lab-apt29.ts): Contém dados específicos para cenários de laboratório, como o APT29 Spear Phishing Investigation, com comandos de terminal, IOCs e templates de relatório.
Threat Intelligence (threat-intelligence.tsx, real-threat-intelligence.tsx):
Indicadores de Compromisso (IOCs): Lista de IOCs (IPs, domínios, hashes, emails) com nível de ameaça e confiança.
Atores de Ameaça: Perfil de grupos de ameaça conhecidos (APT29, Lazarus Group) com país de origem, atividade e última aparição.
Campanhas de Ataque: Detalhes sobre campanhas de ataque históricas e em andamento.
Feeds de Inteligência: Monitora o status de feeds de inteligência (MISP, AlienVault OTX, VirusTotal).
Real Threat Intelligence: Integração com APIs externas para análise de IPs e URLs em tempo real, incluindo dados de geolocalização e reputação de VirusTotal e AbuseIPDB, e listas de URLs de phishing.
Análise ML/IA (ml-analysis.tsx):
Monitora o status de modelos de IA de detecção, exibindo precisão, previsões e tempo de resposta.
Resultados de Análise Comportamental: Lista anomalias detectadas com confiança e status.
Previsões de Ameaças: Apresenta ameaças previstas com probabilidade e prazo.
Centro de Treinamento de Modelos: Simula o progresso de treinamento de modelos de IA, com opções de iniciar, pausar e parar o treinamento, além de gerenciar a fila de treinamento.
Permite configurar modelos de IA e iniciar o retreinamento.
Gestão de Incidentes (incident-management.tsx):
Gerencia o ciclo de vida completo de incidentes de segurança.
Lista de Incidentes: Exibe incidentes com título, descrição, severidade, status, prioridade, responsável, categoria e linha do tempo. Permite filtrar por status e severidade.
Kanban Board: Visualização de incidentes em um quadro Kanban por status (aberto, em progresso, resolvido, fechado).
Estatísticas: Painel com o total de incidentes, abertos, em progresso, críticos e atrasados.
Criação de Incidentes: Formulário para criar novos incidentes manualmente.
Detalhes do Incidente: Visualização detalhada de um incidente selecionado, incluindo linha do tempo de eventos (criação, atribuição, ações, comentários).
Gestão de Vulnerabilidades (vulnerability-management.tsx):
Identifica, avalia, prioriza e remedia vulnerabilidades em ativos de TI.
Estatísticas: Exibe o total de vulnerabilidades, críticas, altas, abertas, atrasadas e com exploits disponíveis.
Lista de Vulnerabilidades: Lista detalhada de vulnerabilidades com CVE ID, título, descrição, severidade, CVSS Score, status, data de descoberta, ativos afetados, vetor e disponibilidade de patch/exploit. Permite busca e filtragem.
Por Ativos: Visualiza vulnerabilidades agrupadas por ativos (servidores, estações de trabalho, etc.).
CVEs em Tendência: Destaca vulnerabilidades CISA KEV (Known Exploited Vulnerabilities).
Status de Conformidade: Monitora a conformidade com frameworks como NIST, LGPD, ISO 27001.
Automação SOAR (soar-automation.tsx):
Permite automatizar tarefas repetitivas e orquestrar fluxos de trabalho de segurança.
Playbooks: Lista de playbooks de automação com nome, descrição, categoria, gatilho, severidade e status. Inclui detalhes como total de execuções, taxa de sucesso e duração média.
Etapas do Playbook: Cada playbook é composto por etapas (condição, ação, atraso, notificação) com parâmetros e lógica de fluxo.
Execuções: Lista de execuções recentes de playbooks com status, hora de início, duração e progresso.
Logs de Execução: Exibe logs detalhados de cada etapa de uma execução de playbook.
Integrações: Lista de integrações com outras ferramentas (SIEM, EDR, Email Security, Firewall, etc.) e seu status.
Análises: Gráficos e métricas de desempenho dos playbooks.
Compliance e Relatórios (compliance-reporting.tsx):
Fornece relatórios sobre o status de segurança e aderência a requisitos regulatórios.
Estatísticas: Exibe o total de frameworks, conformes, score médio, avaliações atrasadas e relatórios pendentes de revisão.
Frameworks de Conformidade: Lista de frameworks (NIST CSF, ISO 27001, LGPD, SOX, PCI DSS) com status, score, datas de avaliação e progresso de implementação.
Relatórios: Lista de relatórios gerados (avaliação, auditoria, análise de lacunas) com status, período e descobertas.
Dashboard Executivo: Visão geral da conformidade, análise de risco e tendências.
Cronograma de Avaliações: Calendário de próximas avaliações de conformidade.
2.3 Centro de Aprendizado (LMS)
Um ambiente de treinamento robusto para o desenvolvimento profissional em cibersegurança.

Componente Principal (learning-center.tsx): Gerencia as abas do centro de aprendizado (Cursos, Conquistas, Certificações, Progressão de Carreira, Mentoria, Desafios, etc.).
Centro de Aprendizado Demo (demo-learning-center.tsx): Versão simplificada do centro de aprendizado com dados mockados para demonstração, incluindo cursos, módulos, conquistas e certificações.
Cursos: Catálogo de cursos com título, descrição, nível, duração, módulos, alunos matriculados e avaliação. Permite visualizar detalhes do curso, objetivos de aprendizado, pré-requisitos e módulos.
Conquistas: Lista de conquistas que os usuários podem ganhar, com título, descrição, ícone, status (ganho/não ganho) e pontos.
Certificações (enterprise-certification-system.tsx, digital-certificate.tsx):
Sistema de Certificação Empresarial: Gerencia certificações profissionais com níveis (Foundation, Associate, Expert, Master, Executive), categorias (SOC, IR, TH, PE, CF, AI, ZT, BC, CM, EL), requisitos, valor de mercado e demanda da indústria.
Certificado Digital: Componente para exibir um certificado digital detalhado, incluindo informações do recipiente, emissor, data de emissão, número do certificado, habilidades validadas e opções de download/compartilhamento/verificação (com simulação de verificação em blockchain).
Plataforma de Aprendizado Corporativa (enterprise-learning-platform.tsx):
Visão Geral: Exibe o progresso de aprendizado do usuário, valor de mercado e reconhecimento da indústria.
Trilhas de Carreira: Detalha trilhas de especialização (Liderança SOC, Cibersegurança com IA, Red Team de Elite, Criptografia Quântica) com duração, certificações, demanda de mercado e roadmap.
Laboratórios Virtuais: Simula laboratórios práticos e experiências de simulação (resposta a violações, defesa de IA).
Programas de Mentoria: Lista programas de mentoria com perfis de mentores e detalhes do programa.
Parcerias Corporativas: Exibe empresas parceiras e benefícios (contratação direta, conteúdo exclusivo).
Competições Globais: Detalhes sobre competições de cibersegurança (CTF, Red Team, IR).
Painel do Estudante (student-dashboard.tsx): Painel personalizado para estudantes, exibindo seu progresso em cursos, conquistas, pontuação total e progressão para o próximo nível/patente. Inclui seções para cursos em andamento, conquistas recentes e ações rápidas.
Manual do Usuário (user-manual.tsx): Documentação interna da plataforma, detalhando a metodologia de ensino, trilhas de aprendizado, laboratórios práticos, módulos SOC avançados e melhores práticas.
2.4 Integração de APIs Externas
Painel de Status da API (api-status-panel.tsx): Exibe o status de conexão com as APIs externas integradas (VirusTotal, AbuseIPDB, NVD NIST, URLhaus, PhishTank, IP Geolocation), indicando se estão online, offline ou em modo limitado (sem chave de API). Permite recarregar os dados.
Monitor de Vulnerabilidades (vulnerability-monitor.tsx): Monitora vulnerabilidades em tempo real usando a API NVD NIST, exibindo CVEs recentes, estatísticas de severidade e análises de tendências.
Mapa de Ameaças Aprimorado (enhanced-threat-map.tsx): Versão do mapa de ameaças que pode exibir dados de ameaças reais obtidos de APIs externas, além dos dados simulados.
2.5 Utilitários e Componentes Comuns
Componente de Guia HUD Inteligente (intelligent-hud-guide.tsx): Um componente customizado que oferece um guia interativo passo a passo para o usuário, destacando elementos da interface e fornecendo descrições, ações e dicas. Pode ser configurado para iniciar automaticamente e exibir recompensas ao ser completado.
Terminal Avançado (advanced-terminal.tsx): Um componente de terminal simulado para interações de linha de comando, permitindo a execução de comandos predefinidos e exibindo a saída no console.
Componente de Perfil do Usuário (user-profile.tsx): Um componente customizado que exibe informações detalhadas do perfil do usuário, estatísticas de gamificação e preferências de configuração.
Central de Notificações (notification-center.tsx): Um componente customizado que exibe notificações do sistema em tempo real, permitindo filtrar, marcar como lidas e excluir notificações.
Hooks Customizados:
use-real-api-data.tsx: Hook para buscar dados de ameaças, vulnerabilidades e URLs de phishing de APIs externas.
use-ip-analysis.tsx: Hook para analisar IPs específicos usando APIs externas.
use-vulnerability-monitoring.tsx: Hook para monitorar vulnerabilidades em tempo real.
use-threat-data.tsx: Hook para gerar e gerenciar dados de ameaças simuladas em tempo real.
use-real-time-data.tsx: Hook genérico para simular atualizações de dados em tempo real.
use-threat-counter.tsx: Hook para um contador de ameaças em tempo real.
use-mobile.tsx: Hook para detectar se o dispositivo é mobile.
use-websocket.tsx: Hook para simular eventos WebSocket (para demonstração).
use-toast.ts: Hook para exibir notificações de toast.
Modo Demo (demo.tsx, demo-timer.tsx):
demo.tsx: Página de entrada para o modo de demonstração, com uma tela de boas-vindas que explica as limitações do modo demo (tempo limitado, progresso não salvo).
demo-timer.tsx: Componente que exibe um cronômetro regressivo no modo demo e, ao expirar, apresenta um modal de "upgrade" para criar uma conta completa.
Página Não Encontrada (not-found.tsx): Página de erro 404 padrão.
Roteamento (App.tsx): Componente principal que define as rotas da aplicação usando wouter.
Estilos Globais (index.css): Contém a configuração do Tailwind CSS, variáveis CSS personalizadas (cores do tema "Cyber") e utilitários como glass-panel, cyber-border e estilos para scrollbar futurista.
2.5.1 Componentes de UI (shadcn/ui)
A plataforma utiliza uma vasta gama de componentes de UI reusáveis baseados em shadcn/ui, que são construídos sobre Radix UI e estilizados com Tailwind CSS. Estes componentes fornecem uma base consistente e acessível para a interface do usuário.

Accordion (accordion.tsx): Um componente para exibir conteúdo que pode ser expandido e recolhido, ideal para seções de FAQ ou detalhes.
AlertDialog (alert-dialog.tsx): Um componente de diálogo modal que exige uma ação do usuário antes que ele possa continuar, usado para confirmações importantes.
Alert (alert.tsx): Um componente para exibir mensagens de alerta importantes, com diferentes variantes para indicar sucesso, erro, aviso, etc.
AspectRatio (aspect-ratio.tsx): Um utilitário para manter a proporção de um elemento, útil para vídeos, imagens ou mapas.
Avatar (avatar.tsx): Componente para exibir avatares de usuários, com suporte para imagens e fallbacks textuais.
Badge (badge.tsx): Pequenos rótulos ou tags usados para categorizar ou destacar informações.
Breadcrumb (breadcrumb.tsx): Componente de navegação que indica a localização atual do usuário dentro de uma hierarquia.
Button (button.tsx): Componente interativo fundamental para acionar ações. Possui diversas variantes e tamanhos.
Calendar (calendar.tsx): Um seletor de datas para entrada de informações de calendário.
Card (card.tsx): Um componente versátil para agrupar conteúdo relacionado, frequentemente usado para exibir informações ou formulários.
Carousel (carousel.tsx): Um componente para exibir uma sequência de conteúdo (imagens, cards, etc.) em um formato deslizante.
Chart (chart.tsx): Componentes para a criação de gráficos e visualizações de dados, baseados em Recharts.
Checkbox (checkbox.tsx): Um controle de formulário para seleção de opções binárias (ligar/desligar).
Collapsible (collapsible.tsx): Um componente para exibir ou ocultar conteúdo, similar ao Accordion mas focado em uma única seção.
Command (command.tsx): Um componente para construir interfaces de linha de comando ou paletas de comando, útil para busca rápida e execução de ações.
ContextMenu (context-menu.tsx): Um menu que aparece ao clicar com o botão direito (ou toque longo) em um elemento.
Dialog (dialog.tsx): Um componente de diálogo modal genérico para exibir conteúdo sobre o resto da interface.
Drawer (drawer.tsx): Um componente de painel deslizante que emerge da parte inferior da tela, comum em interfaces móveis.
DropdownMenu (dropdown-menu.tsx): Um menu suspenso que aparece quando um elemento é clicado.
Form (form.tsx): Um conjunto de componentes para construir formulários de forma estruturada, integrando-se com react-hook-form para gerenciamento de estado e validação.
HoverCard (hover-card.tsx): Um pequeno popover que aparece quando o usuário passa o mouse sobre um elemento.
Input (input.tsx): Um campo de entrada de texto padrão para formulários.
InputOTP (input-otp.tsx): Um componente especializado para entrada de códigos de uso único (OTP), com suporte a múltiplos slots.
Label (label.tsx): Um componente para associar rótulos a controles de formulário.
Menubar (menubar.tsx): Uma barra de menu horizontal, comum em aplicações desktop.
NavigationMenu (navigation-menu.tsx): Um componente de navegação horizontal com submenus expansíveis.
Pagination (pagination.tsx): Componentes para navegação entre páginas de conteúdo.
Popover (popover.tsx): Um pequeno pop-up que aparece quando um elemento é clicado, usado para conteúdo adicional ou formulários.
Progress (progress.tsx): Um componente para exibir o progresso de uma tarefa ou o preenchimento de um valor.
RadioGroup (radio-group.tsx): Um grupo de botões de rádio que permite ao usuário selecionar uma única opção.
Resizable (resizable.tsx): Componentes para criar layouts com painéis redimensionáveis.
ScrollArea (scroll-area.tsx): Um componente para criar áreas de rolagem personalizadas com barras de rolagem estilizadas.
Select (select.tsx): Um controle de formulário para seleção de uma opção a partir de uma lista suspensa.
Separator (separator.tsx): Uma linha horizontal ou vertical usada para agrupar ou separar conteúdo.
Sheet (sheet.tsx): Um painel deslizante que emerge das laterais da tela, útil para menus ou formulários.
Skeleton (skeleton.tsx): Componentes de placeholder usados para indicar que o conteúdo está sendo carregado.
Slider (slider.tsx): Um controle para selecionar um valor dentro de um intervalo.
Switch (switch.tsx): Um controle de alternância para ligar/desligar opções.
Table (table.tsx): Componentes para construir tabelas de dados estruturadas.
Tabs (tabs.tsx): Um componente para organizar conteúdo em seções tabuladas.
Textarea (textarea.tsx): Um campo de entrada de texto multi-linha.
Toast (toast.tsx): Componentes para exibir mensagens de notificação temporárias (toasts).
Toaster (toaster.tsx): O contêiner para exibir as mensagens de toast.
Toggle (toggle.tsx): Um botão que pode ser ativado ou desativado.
ToggleGroup (toggle-group.tsx): Um grupo de botões de alternância relacionados.
Tooltip (tooltip.tsx): Um pequeno pop-up que exibe informações adicionais quando o usuário passa o mouse sobre um elemento.
3. Módulos do Backend (API e Lógica de Negócio)
O backend é responsável por gerenciar dados, autenticação e integração com serviços externos.

3.1 Autenticação e Autorização
Módulo de Autenticação (auth.module.ts): Agrupa os componentes relacionados à autenticação. Importa UsersModule para interagir com o serviço de usuários e JwtModule para gerenciamento de tokens JWT.
Serviço de Autenticação (auth.service.ts):
Registro (register): Valida dados de entrada (RegisterDto), verifica se o nome de usuário já existe, faz o hash da senha usando bcrypt e cria o novo usuário no banco de dados. Gera um token JWT para o novo usuário.
Login (login): Valida credenciais (LoginDto), verifica o nome de usuário e compara a senha fornecida com o hash armazenado no banco de dados. Se as credenciais forem válidas, gera e retorna um token JWT.
Controlador de Autenticação (auth.controller.ts): Define os endpoints da API para registro (/auth/register) e login (/auth/login). Utiliza DTOs para validação dos dados do corpo da requisição.
Estratégia JWT (jwt.strategy.ts): Implementa a estratégia de autenticação JWT para o Passport. Extrai o token do cabeçalho Authorization: Bearer, valida sua assinatura e expiração, e busca o usuário associado no serviço de usuários.
3.2 Gestão de Usuários
Módulo de Usuários (users.module.ts): Gerencia a entidade User. Registra a entidade User com TypeOrmModule.forFeature e exporta UsersService para que outros módulos (como AuthModule) possam utilizá-lo.
Serviço de Usuários (users.service.ts):
Criação (create): Cria um novo registro de usuário no banco de dados. Recebe um objeto UserCreationData que já contém a senha hashed e o papel do usuário.
Busca por Nome de Usuário (findByUsername): Encontra um usuário pelo nome de usuário.
Busca por ID (findById): Encontra um usuário pelo ID.
Controlador de Usuários (users.controller.ts): Define um endpoint para buscar um usuário pelo nome de usuário (/users/:username). Lança NotFoundException se o usuário não for encontrado.
Entidade de Usuário (user.entity.ts): Define a estrutura da tabela users no banco de dados, incluindo id (UUID), username (único), passwordHash, email (opcional, único), role (padrão 'user'), createdAt e updatedAt.
DTOs de Usuário (create-user.dto.ts, register.dto.ts, login.dto.ts, create-user-internal.dto.ts): Definem a estrutura e regras de validação para os dados de entrada e transferência de usuários.
3.3 Camada de Armazenamento
Interface de Armazenamento (storage.ts - IStorage): Define o contrato para as operações de persistência de dados para todas as entidades do sistema (Usuários, Ameaças, Dispositivos de Rede, Eventos de Segurança, Modelos de IA, Cursos, Módulos, Progresso do Estudante, Certificações, Conquistas).
Implementação em Memória (storage.ts - MemStorage): Uma implementação da interface IStorage que armazena todos os dados em memória (Mapas JavaScript). Inclui dados de inicialização para modelos de IA, ameaças, cursos e conquistas, e um usuário admin padrão.
Implementação de Banco de Dados (storage.ts - DatabaseStorage): Uma implementação da interface IStorage que interage com o banco de dados real usando Drizzle ORM. Contém métodos assíncronos para todas as operações CRUD e de consulta.
Conexão com o Banco de Dados (db.ts): Configura a conexão com o banco de dados Neon (PostgreSQL Serverless) em produção e Drizzle ORM, utilizando ws para WebSockets.
Seed de Dados (seed.ts): Script para popular o banco de dados com dados iniciais, incluindo cursos brasileiros de cibersegurança, módulos, certificações, conquistas, ameaças e modelos de IA.
3.4 Rotas da API
Definição de Rotas (routes.ts): Utiliza Express para definir as rotas da API e um servidor WebSocket para atualizações em tempo real.
Autenticação: /api/auth/register (POST), /api/auth/login (POST).
Usuários: /api/user/:id (GET - para perfil e gamificação).
Ameaças: /api/threats (GET, POST), /api/threats/:id (GET), /api/threats/:id/status (PATCH).
Dispositivos de Rede: /api/network-devices (GET), /api/network-devices/:id (GET).
Eventos de Segurança: /api/security-events (GET), /api/security-events (POST).
Modelos de IA: /api/ai-models (GET).
Métricas do Dashboard: /api/dashboard/metrics (GET).
Simulação de Eventos: Inclui um setInterval para simular a geração de eventos de segurança em tempo real e transmiti-los via WebSocket.
WebSockets: /ws (endpoint WebSocket) para broadcast de eventos em tempo real (new_threat, threat_status_update, security_event).
3.5 Integração de APIs Externas
Configuração e Requisições (api-integration.ts):
Define configurações para diversas APIs externas (VirusTotal, AbuseIPDB, IP Geolocation, NVD NIST, URLhaus, PhishTank, IP Geolocation), incluindo URLs base, headers (com chaves de API carregadas de variáveis de ambiente) e limites de taxa.
Inclui um utilitário de RateLimiter para controlar o número de requisições por API.
Funções para realizar requisições genéricas (makeApiRequest) e específicas para:
Verificação de reputação de IP (checkIpReputation).
Análise de domínio/URL (analyzeUrl).
Obtenção de vulnerabilidades recentes (getRecentVulnerabilities).
Geolocalização de IP (getIpGeolocation).
Obtenção de URLs de phishing (getPhishingThreats).
Utilitários DataTransformers (atualmente um placeholder) para transformar dados de API em formatos internos.
3.6 Configuração do Servidor
Ponto de Entrada Principal (index.ts):
Configura o servidor Express.
Inicializa o banco de dados com dados de seed (seedDatabase).
Registra as rotas da API e o servidor WebSocket (registerRoutes).
Configura middleware para parsing de JSON e URL-encoded bodies.
Implementa logging de requisições HTTP.
Integra o Vite para servir o frontend em modo de desenvolvimento.
Define a porta do servidor (variável de ambiente PORT ou 5000).
Módulo Principal NestJS (app.module.ts):
Configura o ConfigModule para carregar variáveis de ambiente.
Configura o TypeOrmModule para a conexão com o banco de dados (SQLite em desenvolvimento, com synchronize: true para auto-criação de tabelas).
Importa AuthModule e UsersModule.
Configura ValidationPipe globalmente para validação automática de DTOs.
Bootstrap NestJS (main.ts): Ponto de entrada da aplicação NestJS, inicializando o AppModule e ouvindo em uma porta.
Integração Vite (vite.ts): Gerencia a integração entre o servidor Express e o Vite para hot-module replacement (HMR) e servir os arquivos do frontend em desenvolvimento e produção.
4. Modelagem de Dados (Esquema)
O sistema utiliza um esquema de banco de dados abrangente para gerenciar diversas entidades relacionadas a operações SOC e aprendizado. As entidades são definidas em @shared/schema (inferidas pelos arquivos storage.ts e seed.ts).

User: Informações do usuário (id, username, passwordHash, email, role, createdAt, updatedAt).
Threat: Detalhes de ameaças detectadas (id, title, description, severity, mitreId, sourceIp, targetHost, confidence, status, detectedAt, metadata).
NetworkDevice: Informações sobre dispositivos de rede (id, ipAddress, hostname, deviceType, operatingSystem, status, services, vulnerabilities, lastScanned, criticality, department, owner, location, networkSegment, encryptionStatus, patchLevel, uptime, businessImpact).
SecurityEvent: Registros de eventos de segurança (id, eventType, source, message, severity, timestamp, metadata).
AiModel: Modelos de inteligência artificial (id, name, type, status, accuracy, predictions, responseTime, lastUpdated, version, description, lastTrained).
Course: Cursos de aprendizado (id, title, description, level, category, duration, instructor, price, rating, totalModules, prerequisites, learningObjectives, isPublished, createdAt, updatedAt, enrolledCount, language, isActive, tags).
CourseModule: Módulos de cursos (id, courseId, title, description, content, duration, orderIndex, exercises, resources, createdAt, isRequired, isActive).
StudentProgress: Progresso do estudante em cursos e módulos (id, userId, courseId, moduleId, progress, isCompleted, timeSpent, lastAccessed, completedAt).
Certification: Certificações disponíveis (id, name, issuer, level, requiredCourses, duration, description, badgeUrl, isActive, createdAt).
StudentCertification: Certificações obtidas por estudantes (id, userId, certificationId, progress, isEarned, earnedAt, expiresAt, certificateUrl).
Achievement: Conquistas/troféus (id, title, description, icon, points, rarity, requirements, category, isActive, createdAt).
StudentAchievement: Conquistas obtidas por estudantes (id, userId, achievementId, progress, isEarned, earnedAt).
5. Considerações de Segurança
Autenticação JWT: O sistema utiliza JSON Web Tokens (JWT) para autenticação. Após o login, um token é emitido e deve ser incluído nas requisições subsequentes para acessar rotas protegidas.
Hashing de Senhas: As senhas dos usuários são armazenadas no banco de dados como hashes (passwordHash) usando bcrypt, garantindo que as senhas em texto claro nunca sejam armazenadas.
Validação de Entrada: DTOs (register.dto.ts, login.dto.ts, etc.) com class-validator são usados para validar a entrada de dados nas requisições da API, prevenindo ataques como injeção.
Variáveis de Ambiente: Chaves de API e segredos (como JWT_SECRET) são carregados de variáveis de ambiente (.env), evitando que sejam hardcoded no código.
Controle de Acesso: Embora não explicitamente detalhado para todas as rotas, o campo role na entidade User e a lógica de JwtStrategy sugerem que o sistema está preparado para implementar controle de acesso baseado em função (RBAC).
6. Implantação e Execução
6.1 Requisitos
Node.js (versão compatível com NestJS e React)
npm ou Yarn (gerenciador de pacotes)
Variáveis de ambiente configuradas (.env na raiz do projeto) para chaves de API e conexão com banco de dados.
6.2 Configuração
Instalar Dependências:
bash

Copiar
npm install
Configurar Variáveis de Ambiente: Criar um arquivo .env na raiz do projeto com as seguintes variáveis:
ini

Copiar
# JWT Secret para autenticação
JWT_SECRET="sua_chave_secreta_jwt"

# Frontend API Keys (para api-integration.ts)
VITE_FIREBASE_API_KEY="..."
VITE_FIREBASE_AUTH_DOMAIN="..."
VITE_FIREBASE_PROJECT_ID="..."
VITE_FIREBASE_STORAGE_BUCKET="..."
VITE_FIREBASE_MESSAGING_SENDER_ID="..."
VITE_FIREBASE_APP_ID="..."
VITE_FIREBASE_MEASUREMENT_ID="..." # Opcional

VITE_VIRUSTOTAL_API_KEY="..."
VITE_ABUSEIPDB_API_KEY="..."
VITE_IP_GEOLOCATION_API_KEY="..." # Pode ser opcional se usar fallback
VITE_SHODAN_API_KEY="..." # Não usado diretamente em api-integration.ts, mas presente em firebase.ts

# Database URL (para db.ts)
DATABASE_URL="postgresql://user:password@host:port/database"
Para desenvolvimento, o SQLite (soc_platform.db) é usado por padrão e não requer DATABASE_URL no .env, a menos que se queira usar um PostgreSQL local.
6.3 Execução
Modo de Desenvolvimento (com Vite para frontend e NestJS para backend):
bash

Copiar
npm run dev
Isso iniciará o servidor NestJS e o servidor de desenvolvimento Vite, com hot-reloading para o frontend. O backend será acessível em http://localhost:5000 (ou a porta configurada).
Modo de Produção:
Construir o Frontend:
bash

Copiar
npm run build:client
Construir o Backend:
bash

Copiar
npm run build:server
Iniciar o Servidor de Produção:
bash

Copiar
npm run start:server
O servidor de produção servirá tanto o frontend quanto o backend.
7. Próximos Passos e Melhorias Futuras
A versão atual do "SOC Defense Universe" apresenta uma base sólida e rica em funcionalidades de simulação e treinamento. Para futuras iterações, as seguintes melhorias podem ser consideradas:

Integração Completa do Backend:
Conectar todos os módulos do frontend ao backend real (ameaças, dispositivos, eventos, LMS) em vez de usar dados mockados ou simulações puramente frontend.
Implementar a lógica de negócios completa para todas as rotas da API (CRUD e consultas complexas).
Garantir a persistência de dados para todas as interações do usuário (progresso de cursos, conquistas, etc.).
Sistema de Notificações em Tempo Real: Aprimorar o uso de WebSockets para notificações mais granulares e personalizadas para o usuário.
Gamificação Persistente: Garantir que todos os aspectos de gamificação (pontos, níveis, conquistas) sejam persistidos no banco de dados e reflitam o progresso real do usuário.
Segurança Aprimorada:
Implementar validação de token JWT em todas as rotas protegidas do backend.
Adicionar validação de esquema de banco de dados mais robusta.
Considerar a implementação de CORS e outras medidas de segurança de API.
Funcionalidades de Admin: Expandir o painel administrativo para permitir a criação/edição/exclusão de cursos, módulos, certificações e conquistas diretamente pela interface.
Relatórios e Análises Avançadas: Desenvolver dashboards de relatórios mais dinâmicos e personalizáveis para SOC e LMS.
Otimização de Desempenho: Otimizar consultas de banco de dados e a performance do frontend para grandes volumes de dados.
Testes Abrangentes: Implementar testes unitários, de integração e end-to-end para garantir a estabilidade e confiabilidade do sistema.
Internacionalização (i18n): Adicionar suporte a múltiplos idiomas.
Documentação Adicional: Criar documentação técnica para o backend (endpoints, DTOs, etc.) e um guia de contribuição para desenvolvedores.