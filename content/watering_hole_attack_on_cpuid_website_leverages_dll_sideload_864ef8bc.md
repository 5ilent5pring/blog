---
title: "Watering Hole Attack on CPUID Website Leverages DLL Sideloading for STX RAT Distribution"
date: 2026-04-13
category: geoCTI
description: "Threat actors compromised a secondary API on the CPUID website to redirect users to malicious installers for hardware monitoring tools like CPU-Z and HWMonitor."
tags: ["Analysis", "Breakglass Intelligence", "CPUID", "CTI", "Kaspersky", "attacks", "security-news", "vulnerabilities"]
---

**Confidence:** high | **Triage Score:** 7/10 | **Category:** Analysis | **Key Actors:** CPUID, Kaspersky, Breakglass Intelligence | **SAT Techniques:** Attack Tree Analysis, Key Assumptions Check, Indicators & Warnings

Threat actors compromised a secondary API on the CPUID website to redirect users to malicious installers for hardware monitoring tools like CPU-Z and HWMonitor. This operation successfully distributed the STX RAT to over 150 victims, including organizations in the manufacturing, telecom, and agriculture sectors. The use of a long-running, 10-month campaign involving FileZilla trojanization suggests this is not a transient opportunistic strike, but a sustained effort to establish persistent access within industrial and telecommunications supply chains.

## Attack Tree Analysis

- **The attack utilized a watering hole vector targeting the CPUID website's secondary API to redirect legitimate software requests to third-party domains.**
  - Attackers did not modify the original software binaries but instead manipulated the website's API to serve links to trojanized versions of CPU-Z and HWMonitor. This method bypasses file integrity checks on the original software while exploiting the high trust users place in the CPUID domain.
  - *almost certainly*
- **The blast radius extends beyond individual users to critical industrial and infrastructure sectors, specifically manufacturing, telecom, and agriculture.**
  - While the majority of the 150 identified victims are individuals, the presence of organizations in telecom and manufacturing indicates a successful breach of professional environments. The geographic concentration in Brazil, China, and Russia suggests the actor is successfully targeting regions with high concentrations of these industrial sectors.
  - *likely*
- **The actor's selection of hardware monitoring tools indicates a priority for gaining deep visibility into host system configurations and hardware specifications.**
  - By compromising tools like CPU-Z and HWMonitor, which provide detailed processor and motherboard data, the actor gains immediate intelligence on the hardware environment of the victim. This choice of software facilitates the deployment of the STX RAT, which is specifically designed for credential and wallet theft.
  - *likely*

## Key Assumptions Check

- **The CPUID compromise was a targeted component of a broader, multi-month espionage campaign rather than an isolated opportunistic event.**
  - Evidence from Breakglass Intelligence links this incident to a 10-month campaign involving FileZilla and suggests the CPUID compromise began as early as April 3. If future forensic analysis shows the attackers only interacted with the API during the six-hour window on April 10 without any prior reconnaissance or lateral movement in the FileZilla infrastructure, this assessment would be reversed.
  - *likely*
- **The primary objective of the Russian-speaking actor is financial theft and credential harvesting rather than large-scale infrastructure disruption.**
  - The deployment of STX RAT, which focuses on stealing browser credentials, cryptocurrency wallets, and FTP passwords, aligns with a profit-driven or intelligence-gathering motive. If the attackers were found to be deploying wipers or ransomware following the initial STX RAT infection, the objective would be reassessed as disruption.
  - *almost certainly*

## Indicators & Warnings

- **Defenders should monitor for the presence of 'cryptbase.dll' being loaded via DLL sideloading in processes associated with CPU-Z or HWMonitor.**
  - The attackers utilized a specific TTP of delivering legitimate software alongside a malicious DLL to achieve execution. Identifying this specific file name and loading pattern in system logs is a high-fidelity indicator of this specific campaign's activity.
  - *consistent*
- **The emergence of similar watering hole attacks targeting software repositories or API endpoints in the hardware utility ecosystem would indicate a widening campaign.**
  - If new compromises appear in the software supply chains of other hardware-related utilities, it would confirm the actor is systematically targeting the hardware-monitoring ecosystem. An indicator that would contradict the current Russian-speaking actor hypothesis would be the discovery of infrastructure or code overlaps with known North Korean or Chinese-state-sponsored groups.
  - *consistent*

## What to Watch For

Monitor for unauthorized API modifications or unexpected redirects on hardware utility download sites. Watch for the deployment of STX RAT-related artifacts, specifically 'cryptbase.dll', within manufacturing and telecom networks. A sudden shift toward destructive payloads or widespread system encryption would challenge the current assessment of a credential-focused, financially or espionage-driven campaign.

## Discussion

- How does the use of a 10-month multi-vector campaign (FileZilla and CPUID) change the way we evaluate the 'dwell time' of supply chain threats compared to traditional single-exploit zero-day attacks?
- To what extent does the targeting of hardware-specific monitoring tools suggest a shift in adversary interest toward hardware-level reconnaissance as a precursor to more advanced firmware-based persistence?

---

**Source:** [SecurityWeek](https://www.securityweek.com/cpuid-hacked-to-serve-trojanized-cpu-z-and-hwmonitor-downloads/)
