---
title: "PlugX Deployment via Claude-Branded Phishing Targets AI-Adopting Workforces"
date: 2026-04-13
category: geoCTI
description: "Threat actors are weaponizing the rapid adoption of Large Language Models by deploying a trojanized Anthropic Claude installer to compromise end-user workstations."
tags: ["Alibaba Cloud", "Anthropic", "CTI", "Espionage", "attacks", "security-news", "vulnerabilities"]
---

**Confidence:** medium | **Triage Score:** 7/10 | **Category:** Espionage | **Key Actors:** Anthropic, Alibaba Cloud | **SAT Techniques:** Key Assumptions Check, Analysis of Competing Hypotheses, Opportunity Analysis

Threat actors are weaponizing the rapid adoption of Large Language Models by deploying a trojanized Anthropic Claude installer to compromise end-user workstations. The campaign utilizes a sophisticated MSI installer that executes a legitimate Claude application while simultaneously deploying a PlugX variant via DLL sideloading of a signed G DATA antivirus updater. This operation exploits the trust gap in software supply chains where users prioritize functional access to new productivity tools over the verification of installation origins.

## Key Assumptions Check

- **The campaign's primary objective is the establishment of persistent access for long-term intelligence collection rather than immediate data exfiltration.**
  - The use of a VBScript dropper that deletes itself and the initial script, combined with the placement of files in the startup folder, indicates a preference for stealth and persistence. If the actor were focused on immediate theft, they would likely use more aggressive, noisier exfiltration methods rather than the subtle DLL sideloading of NOVUpdate.exe. Evidence of large-scale, rapid data egress from the infected hosts would reverse this assessment.
  - *almost certainly*
- **The campaign is a newly initiated operation targeting the current wave of AI integration in corporate environments.**
  - The threat actor specifically leveraged the popularity of Claude and a fake 'pro version' lure, which aligns with the recent surge in enterprise LLM adoption. The use of a February 2024 phishing campaign timeframe suggests an opportunistic exploitation of current software trends. Discovery of the same infrastructure or C2 patterns in much older, non-AI-related campaigns would reverse this assessment.
  - *likely*

## Analysis of Competing Hypotheses

- **Hypothesis 1: The operation is a state-sponsored espionage campaign aimed at intellectual property theft.**
  - The use of PlugX, a tool historically linked to Chinese espionage, and the deployment of a persistent, stealthy RAT are consistent with state-level collection requirements. However, the use of Alibaba Cloud for C2 infrastructure is a common, low-cost tactic used by both state and non-state actors, which does not uniquely confirm state sponsorship.
  - *consistent*
- **Hypothesis 2: The operation is a financially motivated campaign targeting corporate credentials for secondary sale.**
  - The use of a 'pro version' lure is a classic tactic for attracting users seeking paid features without subscription costs. This is inconsistent with the high-effort, stealthy deployment of a DLL sideloading chain and self-deleting scripts, which are typically overkill for simple credential harvesting.
  - *inconsistent*
- **Hypothesis 3: The operation is a broad-spectrum opportunistic campaign by a cybercriminal group using leaked malware.**
  - The availability of PlugX source code to various actors makes it a staple for diverse threat groups. This is inconsistent with the specific, timely social engineering lure of a Claude 'pro' installer, which requires active monitoring of software trends and targeted campaign preparation.
  - *inconsistent*
- **The hypothesis with the least disconfirming evidence is Hypothesis 1 (State-sponsored espionage).**
  - While attribution is difficult due to the shared nature of PlugX, the technical tradecraft—specifically the focus on persistence and error-suppression via 'On Error Resume Next'—aligns most closely with the requirements of a sustained espionage mission.
  - *strongest*

## Opportunity Analysis

- **Persistent access to developer and researcher workstations provides a window into proprietary AI model development and prompt engineering workflows.**
  - By compromising the environments where users interact with Claude, the actor can monitor sensitive queries, proprietary datasets being uploaded for analysis, and internal company prompts. This access allows for the theft of 'secret sauce' logic that is not visible through external API monitoring.
  - *likely*
- **The ability to hijack the installation chain of legitimate software enables the actor to bypass traditional endpoint detection through trusted process execution.**
  - The abuse of the signed G DATA antivirus updater for DLL sideloading allows the actor to execute malicious code under the guise of a trusted, legitimate process. This provides a mechanism for lateral movement within highly secured networks where unsigned binaries are blocked.
  - *almost certainly*

## What to Watch For

Monitor for unusual outbound TCP connections to Alibaba Cloud infrastructure originating from processes associated with antivirus updaters or legitimate software installers. A shift toward using more common, non-cloud-based C2 infrastructure or the sudden appearance of high-volume data transfers from these hosts would indicate a transition from stealthy persistence to active exfiltration.

## Discussion

- How does the weaponization of 'Pro' software lures change the risk profile for organizations that permit 'Bring Your Own AI' (BYOAI) policies?
- To what extent does the widespread availability of legacy RAT source code like PlugX render traditional malware-based attribution obsolete in the context of modern cloud-hosted C2?

---

**Source:** [SecurityWeek](https://www.securityweek.com/fake-claude-website-distributes-plugx-rat/)
