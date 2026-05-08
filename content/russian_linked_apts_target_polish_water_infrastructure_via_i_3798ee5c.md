---
title: "Russian-Linked APTs Target Polish Water Infrastructure via ICS Vulnerabilities"
date: 2026-05-08
category: geoCTI
description: "The Polish Internal Security Agency (ABW) has documented direct intrusions into industrial control systems at five water treatment facilities, including Jabłonna Lacka and Szczytno, throughout 2024 and 2025."
tags: ["ABW", "APT28", "APT29", "UNC1151", "Russia", "CTI", "attacks", "breaking"]
---

<p class="analysis-meta"><strong>Confidence:</strong> high | <strong>Triage Score:</strong> 9/10 | <strong>Category:</strong> Infrastructure | <strong>Key Actors:</strong> ABW, APT28, APT29, UNC1151, Russia | <strong>SAT Techniques:</strong> Key Assumptions Check, Scenario Analysis, Indicators & Warnings</p>

The Polish Internal Security Agency (ABW) has documented direct intrusions into industrial control systems at five water treatment facilities, including Jabłonna Lacka and Szczytno, throughout 2024 and 2025. These operations, attributed to groups like APT28, APT29, and UNC1151, leverage internet-exposed OT assets and weak authentication to gain the ability to modify operational parameters. The shift from credential harvesting in supply chains to direct manipulation of water supply parameters indicates that these actors have moved beyond intelligence collection toward establishing the capability for kinetic-effect disruption.

## Key Assumptions Check

- The current intrusions into Polish water utilities represent active pre-positioning for future disruption rather than purely passive intelligence collection.
  - The ABW reported that attackers obtained the ability to modify operational parameters in facilities like Małdyty and Tolkmicko, a capability that exceeds the requirements for simple data theft. If future investigations reveal that the accessed data was strictly limited to administrative project documentation without any interaction with PLC logic or setpoints, this assessment would be reversed. 
  - *almost certainly*
- The identified threat actors possess the technical intent to trigger physical service outages in Poland.
  - The August 2025 report of a thwarted attack that could have caused a city to lose its water supply demonstrates a move toward operational impact. This assessment depends on the assumption that the actors are willing to risk diplomatic escalation for localized disruption; if the observed activity remains confined to credential harvesting in the supply chain without any manipulation of ICS setpoints, the intent would be downgraded to espionage.
  - *likely*

## Scenario Analysis

- Scenario 1: Persistent Access Maintenance for Strategic Intelligence.
  - Actors maintain access to the supply chains of municipal utilities to monitor contract data and authentication credentials. This persists as long as the geopolitical tension remains below the threshold of kinetic conflict, allowing Russia to map the dependencies of Polish critical infrastructure without triggering a massive NATO-aligned response.
  - *consistent*
- Scenario 2: Demonstrative Disruption of Municipal Services.
  - A targeted, visible manipulation of water parameters in a single municipality like Sierakowo to signal capability. This would be triggered by a specific diplomatic or military provocation, resulting in localized public panic and forcing the Polish government to divert resources to emergency OT remediation.
  - *consistent*
- Scenario 3: Full-Scale Wartime Activation of OT Assets.
  - Simultaneous, large-scale manipulation of water and wastewater treatment plants across Poland during a period of high-intensity conflict. The escalation path involves the transition from the observed 'weak password' exploits to the deployment of specialized ICS-disruptive malware, aiming to degrade civilian morale and logistical stability.
  - *consistent*

## Indicators & Warnings

- Deployment of specialized ICS-specific malware or wipers alongside existing access indicates an imminent move toward the 'Wartime Activation' scenario.
  - The presence of tools designed to overwrite firmware or wipe PLC configurations, similar to the patterns seen in previous energy sector attacks, would signal that the window for intelligence collection has closed and the window for destruction has opened. This would be a direct escalation from the current state of parameter manipulation.
  - *weeks-months*
- A shift in activity back toward purely administrative IT networks or the removal of access from OT-facing systems would indicate a de-escalation of the threat.
  - If ABW monitoring shows APT28 or UNC1151 withdrawing from the identified water treatment stations in favor of less sensitive municipal targets, it would suggest the actors are prioritizing stealth and avoiding the detection that follows high-risk OT intrusions. This would contradict the current trend of increasing ICS-focused attacks.
  - *months*

## What to Watch For

Monitor for any deployment of destructive payloads or wipers within the identified Polish water treatment facilities, as this would confirm the transition to active disruption. Conversely, any evidence of APT28 or UNC1151 abandoning the identified ICS setpoint manipulation in favor of purely administrative data theft would suggest a retreat to traditional espionage. Watch for changes in the targeting of Polish supply chains for project documentation over the next three to six months.

## Discussion

- How does the use of 'hacktivist' personas by Russian-linked groups like APT28 alter the threshold for a state-level attribution response under international law?
- In what ways does the vulnerability of municipal-level OT infrastructure in NATO-member states create a 'gray zone' vulnerability that bypasses traditional collective defense frameworks?

*SAT Techniques: Key Assumptions Check, Scenario Analysis, Indicators & Warnings*

---
Source: [SecurityWeek](https://www.securityweek.com/polish-security-agency-reports-ics-breaches-at-five-water-treatment-plants/)