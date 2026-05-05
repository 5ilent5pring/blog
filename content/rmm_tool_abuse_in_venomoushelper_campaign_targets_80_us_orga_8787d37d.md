---
title: "RMM Tool Abuse in VENOMOUS#HELPER Campaign Targets 80+ U.S. Organizations"
date: 2026-05-05
category: geoCTI
description: "Since April 2025, the VENOMOUS#HELPER campaign has utilized legitimate Remote Monitoring and Management (RMM) software, specifically SimpleHelp and ScreenConnect, to establish persistent access within over 80 organizations."
tags: ["Securonix", "CTI", "attacks", "breaking"]
---

<p class="analysis-meta"><strong>Confidence:</strong> medium | <strong>Triage Score:</strong> 6/10 | <strong>Category:</strong> Supply Chain | <strong>Key Actors:</strong> Securonix | <strong>SAT Techniques:</strong> Attack Tree Analysis, Key Assumptions Check, Indicators & Warnings</p>

Since April 2025, the VENOMOUS#HELPER campaign has utilized legitimate Remote Monitoring and Management (RMM) software, specifically SimpleHelp and ScreenConnect, to establish persistent access within over 80 organizations. The heavy concentration of victims within the United States suggests a deliberate selection of targets rather than a random scanning operation. The use of trusted administrative tools indicates the actor's priority is maintaining long-term, low-noise persistence that evades traditional endpoint detection by masquerading as legitimate IT maintenance traffic.

## Attack Tree Analysis

- The entry vector relies on the exploitation of trust in legitimate administrative software via phishing.
  - The actor bypasses perimeter defenses by delivering SimpleHelp and ScreenConnect payloads through phishing vectors, effectively turning authorized remote access tools into a primary mechanism for host compromise. This method avoids the need for custom malware that might trigger signature-based alerts. An assessment of a different entry vector, such as zero-day exploitation of edge gateways, would require evidence of non-phishing-based initial access.
  - *almost certainly*
- The blast radius is concentrated within the U.S. corporate and organizational landscape.
  - With over 80 organizations impacted, the majority of which are located in the United States, the campaign demonstrates a high capacity for lateral movement within domestic networks. The scale of the impact suggests the actor has successfully bypassed standard RMM monitoring for dozens of distinct environments. A shift in the blast radius to non-U.S. entities would indicate a change in the actor's geographic targeting priorities.
  - *almost certainly*

## Key Assumptions Check

- The campaign is a targeted operation rather than an opportunistic mass-phishing effort.
  - The high concentration of victims within the U.S. and the specific use of RMM tools to establish persistence suggest a selection process aimed at organizations where such tools are standard. If the actor were purely opportunistic, the victim distribution would likely show a more global, non-specific geographic spread. Evidence of the same phishing templates being used against unrelated, low-value targets in non-U.S. regions would reverse this assessment.
  - *likely*
- The primary objective is long-term persistence for intelligence collection.
  - The reliance on ScreenConnect and SimpleHelp—tools designed for continuous, legitimate remote management—is inconsistent with a short-term disruption or purely financial motive, which typically favors more destructive or immediate-impact payloads. If the actor were observed deploying ransomware or wiper malware immediately following the RMM installation, this assessment would be invalidated. The absence of immediate secondary payloads supports a mission of stealthy access.
  - *likely*

## Indicators & Warnings

- Second-stage activity will likely involve credential harvesting or lateral movement via existing administrative sessions.
  - Analysts should monitor for unusual outbound traffic from ScreenConnect or SimpleHelp processes to unrecognized external IP addresses, particularly during non-standard maintenance windows. If the actor's objective is espionage, these patterns should remain stable over months. A sudden spike in large-scale data exfiltration or the deployment of encryption payloads would indicate a shift toward a disruption-focused mission.
  - *weeks-months*
- The presence of high-volume, automated credential stuffing from these RMM endpoints would suggest a different actor or a shift to a purely financial motive.
  - The current VENOMESS#HELPER pattern is characterized by the use of legitimate tools for access rather than brute-force noise. If monitoring reveals the RMM tools being used to launch widespread, automated attacks against third-party services, it would indicate the infrastructure is being repurposed for a botnet or a financially motivated campaign rather than targeted espionage.
  - *inconsistent*

## What to Watch For

Monitor for unauthorized configuration changes or new remote user accounts within SimpleHelp and ScreenConnect environments, specifically looking for activity originating from non-standard geographic regions. A sudden increase in the use of these tools for rapid, destructive actions across unrelated sectors would challenge the current assessment of a targeted espionage-focused campaign.

## Discussion

- How does the use of legitimate RMM tools in VENOMESS#HELPER compare to the 'living off the land' strategies used by APTs in the SolarWinds supply chain compromise?
- If the U.S. government implements stricter regulations on the deployment of remote management software, how might this shift the actor's preference toward more traditional, detectable malware delivery methods?

*SAT Techniques: Attack Tree Analysis, Key Assumptions Check, Indicators & Warnings*

---
Source: [The Hacker News](https://thehackernews.com/2026/05/phishing-campaign-hits-80-orgs-using.html)