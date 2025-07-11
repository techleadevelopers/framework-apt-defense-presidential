# APT Defense Universe SOC - Security Operations Center

## Overview

This is a comprehensive Security Operations Center (SOC) application designed for cybersecurity threat detection, monitoring, and response. The application provides real-time threat analysis, network scanning, attack simulation, and AI-powered security intelligence in a modern, cyber-themed interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture (Standalone)
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **shadcn/ui** component library built on Radix UI primitives for accessible, customizable UI components
- **Tailwind CSS** for utility-first styling with custom cyber-themed color variables
- **Wouter** for lightweight client-side routing
- **Simulated data streams** for real-time threat monitoring and dashboard updates
- **Frontend-only architecture** with no backend dependencies

### Data Management
- **Local state management** using React useState and useEffect hooks
- **Simulated real-time data** for threat detection, network monitoring, and AI analysis
- **Mock data generators** for demonstrating SOC functionality
- **Interval-based updates** to simulate live threat feeds and system monitoring

### Real-time Simulation
- **Simulated WebSocket events** for threat notifications and system updates
- **Timed data generation** for activity feeds, threat counters, and AI metrics
- **Dynamic state updates** to demonstrate real-time SOC operations

## Key Components

### Dashboard & Monitoring
- **SOC Dashboard**: Central command center with threat metrics, AI status, and global threat map
- **Real-time Activity Feed**: Live security event streaming with severity-based color coding
- **AI Status Panel**: TactiCore and Mission Ops kernel monitoring with performance metrics
- **MITRE ATT&CK Framework**: Visual coverage mapping of attack techniques

### Threat Management
- **Threat Detection**: Advanced persistent threat (APT) identification and classification
- **Threat Intelligence**: IOC management, threat actor profiles, and campaign tracking
- **Real-time Threat Counter**: Live threat detection metrics with WebSocket updates

### Security Tools
- **Network Scanner**: Device discovery, vulnerability assessment, and network topology mapping
- **Attack Simulation**: MITRE-based attack scenario testing and red team exercises
- **SENTINEL Surveillance**: Camera monitoring with AI-powered anomaly detection
- **ML/AI Analysis**: Behavioral analysis, anomaly detection, and predictive threat modeling

### Learning & Training
- **Learning Center**: Cybersecurity courses, certifications, and skill development
- **Achievement System**: Gamified learning with progress tracking and certifications

## Data Flow (Frontend-Only)

1. **Simulated Data Generation**: Mock security events are generated using timers and random data
2. **State Management**: React state handles threat classification, analysis, and MITRE mappings
3. **AI Simulation**: Simulated ML models demonstrate behavioral analysis and network anomaly detection
4. **Interactive Updates**: User actions trigger state changes to demonstrate response workflows
5. **Dashboard Synchronization**: Components share state updates to maintain consistent SOC visualization

## External Dependencies

### Core Dependencies
- **wouter**: Lightweight routing for single-page application navigation
- **React hooks**: useState and useEffect for local state management and simulated real-time updates

### UI/UX Dependencies
- **@radix-ui/***: Accessible, unstyled UI primitives for building custom components
- **tailwindcss**: Utility-first CSS framework with custom cyber theme
- **lucide-react**: Consistent icon library with security-focused icons
- **class-variance-authority**: Type-safe component variant management

### Development Tools
- **vite**: Fast build tool with TypeScript support and development server
- **tsx**: TypeScript execution environment for server development
- **@replit/vite-plugin-***: Replit-specific development and debugging tools

## Deployment Strategy

### Development Environment
- **Vite development server** with hot module replacement for frontend
- **Standalone client** with no server dependencies
- **Simulated real-time data** for development and demonstration

### Production Build
- **Vite build** generates optimized static assets for deployment
- **Static hosting** compatible with any web server or CDN
- **No server requirements** for deployment or operation

### Demo Mode
- **Simulated threat feeds** with realistic cybersecurity scenarios
- **Interactive demonstrations** of SOC workflows and threat response
- **Randomized data generation** for live dashboard feel

The application follows a standalone frontend architecture with simulated data streams and real-time updates, providing a comprehensive SOC demonstration without requiring backend infrastructure or external dependencies.

## Recent Changes

### January 2025 - Frontend Independence Update
- **Removed backend dependencies**: Converted from full-stack to frontend-only architecture
- **Implemented simulated data**: All threat detection, network monitoring, and AI analysis now use mock data
- **Real-time simulation**: Created interval-based updates to simulate live SOC operations
- **Standalone deployment**: Application now runs entirely in the browser without server requirements

### January 2025 - SENTINEL Advanced Interface Integration
- **SENTINEL surveillance system**: Integrated advanced 6-camera surveillance interface within existing surveillance component
- **Visual effects**: Added glitch animations, scanning lines, and cyber-punk visual effects
- **Real-time logs**: Implemented live system logs with random security event generation
- **Interactive controls**: Grid layout switching, system reset, glitch triggers, and color mode toggles
- **Camera feeds**: CAM_01-06 with live/offline status simulation and location mapping
- **Compromised system theme**: Dark cyber aesthetic with red/blue color scheme and terminal-style interface

### January 2025 - Ultra Advanced Version Final Release
- **Premium UI/UX Components**: Integrated advanced terminal, user profile management, and notification center
- **Enhanced TopBar**: Real-time system status indicators, advanced search with auto-complete, live threat counters
- **Advanced Terminal**: Interactive SOC command interface with help system, threat hunting commands, and MITRE lookups
- **User Profile System**: Complete analyst profile with experience levels, achievements, certifications, and preferences
- **Notification Center**: Real-time security alerts with filtering, severity classification, and action management
- **Interactive Global Threat Map**: Enhanced with zoom controls, multiple layers, threat detail popups, and live updates
- **Complete Learning Center**: 6 full cybersecurity courses with 50+ modules, real content, exercises, and certification tracking
- **Frontend Independence**: 100% standalone operation with simulated real-time data and no backend dependencies
- **Educational Platform**: Comprehensive cybersecurity training environment for students and professionals


Documentação do Sistema de Monitoramento e Análise de Segurança Cibernética
Estrutura do Projeto
O projeto é um sistema integrado que oferece funcionalidades de monitoramento e análise de segurança cibernética, incluindo detecção de ameaças, simulação de ataques, análise de IA e aprendizado. A estrutura é organizada em componentes reutilizáveis e páginas, cada um com sua funcionalidade específica.

Componentes Principais
1. UI Components
Button.tsx

Componente de botão personalizável com variantes de estilo.
Card.tsx

Componente de cartão para agrupar conteúdo com cabeçalho, descrição e footer.
Input.tsx

Componente de entrada de texto, estilizado para integração com o tema.
Textarea.tsx

Componente de área de texto com estilo adaptável.
Badge.tsx

Componente de distintivo, utilizado para exibir notificações ou status.
Popover.tsx

Componente de popover, utilizado para exibir informações adicionais ao passar o mouse ou clicar.
Tooltip.tsx

Componente de tooltip, que fornece dicas contextuais sobre elementos da interface.
2. Form Components
Form.tsx

Gerencia formulários com integração a react-hook-form, incluindo contexto para campos.
Label.tsx

Componente de rótulo que se integra ao formulário, estilizado e acessível.
3. Navigation Components
Sidebar.tsx

Componente de barra lateral que permite a navegação entre diferentes seções do aplicativo.
Tabs.tsx

Componente de abas, utilizado para organizar conteúdos em seções.
DropdownMenu.tsx

Componente de menu suspenso, que permite a seleção entre várias opções.
NavigationMenu.tsx

Componente de menu de navegação, que organiza links de forma hierárquica.
Menubar.tsx

Componente de barra de menu, que permite interações rápidas e navegação.
4. Interaction Components
Dialog.tsx

Componente de diálogo modal para interações importantes com o usuário.
AlertDialog.tsx

Componente para exibir alertas e confirmações ao usuário.
Collapsible.tsx

Componente para seções que podem ser expandidas ou contraídas.
Checkbox.tsx

Componente de caixa de seleção, estilizado para uso em formulários.
RadioGroup.tsx

Componente de grupo de botões de opção, permitindo a seleção única entre opções.
Switch.tsx

Componente de botão deslizante para alternar configurações.
Slider.tsx

Componente de controle deslizante para selecionar valores dentro de um intervalo.
5. Data Display Components
Table.tsx

Componente de tabela, utilizado para exibir dados em formato tabular.
Pagination.tsx

Componente de paginação, que facilita a navegação entre conjuntos de dados.
ScrollArea.tsx

Componente para áreas de rolagem, permitindo a navegação em conteúdos longos.
Chart.tsx

Componente para exibir gráficos e visualizações de dados.
ActivityFeed.tsx

Componente que exibe eventos de segurança em tempo real.
MetricsPanel.tsx

Componente que apresenta métricas de desempenho e segurança.
6. Specialized Components
AdvancedTerminal.tsx

Componente de terminal avançado para interações de linha de comando.
NotificationCenter.tsx

Componente para gerenciar e exibir notificações ao usuário.
UserProfile.tsx

Componente que exibe informações do perfil do usuário e suas preferências.
MLAnalysis.tsx

Componente que apresenta resultados de análises de aprendizado de máquina.
ThreatIntelligence.tsx

Componente que exibe informações sobre IOCs, atores de ameaças e campanhas.
ThreatMap.tsx

Mapa interativo que mostra a localização e a gravidade das ameaças.
Hooks
useWebSocket.ts

Hook para gerenciar a conexão WebSocket e eventos relacionados.
useRealTimeData.ts

Hook para gerenciar e atualizar dados em tempo real.
useToast.ts

Hook para gerenciar notificações e mensagens de feedback ao usuário.