export const labAPT29 = {
  id: "apt29-spearphishing",
  title: "APT29 - Spear Phishing Investigation",
  description:
    "Investigação de um incidente de spear-phishing suspeito na rede. Seu objetivo é analisar os logs, identificar o vetor de ataque e correlacionar os IOCs envolvidos.",
  objectives: [
    "Analisar os headers de e-mail suspeito",
    "Correlacionar domínio malicioso com feed de inteligência",
    "Identificar o host comprometido",
    "Preencher relatório técnico com IOC e recomendações"
  ],
  hints: [
    "Use o terminal para inspecionar logs SMTP",
    "Cheque o domínio: `malicious-domain.com`",
    "Analise comportamento do host `192.168.1.167`"
  ],
  terminalCommands: [
    {
      command: "cat /var/log/mail.log",
      response: `
[10:02:01] Received mail from phishing@fake.com
[10:02:02] Subject: Urgente! Relatório financeiro
[10:02:04] Attachment: invoice.pdf (SHA256: a1b2c3d4e5f6...)
[10:02:07] Clicked link: http://malicious-domain.com/login.html
[10:03:22] Lateral activity from 192.168.1.167 detected via SMB`
    },
    {
      command: "whois malicious-domain.com",
      response: `Registrar: FakeName Corp - Created 3 days ago - ASN: 185.220.101.7`
    },
    {
      command: "cat /var/log/endpoint/192.168.1.167.log",
      response: `
[10:03:30] Reverse shell to 185.220.101.7
[10:03:35] File download: credentials_dump.zip
[10:03:40] DNS beaconing every 5s - exfil suspected
[10:04:01] Connection to C2 confirmed`
    }
  ],
  iocs: [
    {
      type: "domain",
      value: "malicious-domain.com",
      confidence: 88,
      status: "active",
      threat: "APT29"
    },
    {
      type: "ip",
      value: "185.220.101.7",
      confidence: 95,
      status: "active",
      threat: "APT29"
    },
    {
      type: "hash",
      value: "a1b2c3d4e5f6...",
      confidence: 92,
      status: "blocked",
      threat: "Ransomware"
    }
  ],
  analysisTemplate: `
# 🧠 APT29 Phishing Incident Report

## IOC Summary

- Malicious Domain: malicious-domain.com
- Command & Control IP: 185.220.101.7
- Malware Hash: a1b2c3d4e5f6...

## Host Affected

- 192.168.1.167

## Attack Vector

- Phishing e-mail with malicious PDF attachment.
- User clicked on embedded link leading to C2 infrastructure.

## Mitigation

- Block domain & IP at perimeter.
- Isolate and reimage host 192.168.1.167.
- Search for IOC in logs and endpoints.
`
}
