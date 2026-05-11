---
title: "HeartlessSoul's Targeting of Aviation GIS Data Points to Strategic Terrain Intelligence Collection"
date: 2026-05-11
category: geoCTI
description: "The threat group HeartlessSoul is executing a targeted espionage campaign against aerospace firms and drone operators to exfiltrate geospatial intelligence, including GIS shape files and GPS data."
tags: ["HeartlessSoul", "Kaspersky Lab", "BI.ZONE", "Positive Technologies", "IntelBroker", "Team Cymru", "CTI", "attacks", "breaking"]
---

<p class="analysis-meta"><strong>Confidence:</strong> medium | <strong>Triage Score:</strong> 9/10 | <strong>Category:</strong> Espionage | <strong>Key Actors:</strong> HeartlessSoul, Kaspersky Lab, BI.ZONE, Positive Technologies, IntelBroker, Team Cymru | <strong>SAT Techniques:</strong> Key Assumptions Check, Analysis of Competing Hypotheses, Opportunity Analysis</p>

The threat group HeartlessSoul is executing a targeted espionage campaign against aerospace firms and drone operators to exfiltrate geospatial intelligence, including GIS shape files and GPS data. This operation focuses heavily on Russian government and enterprise targets, utilizing malvertising and compromised SourceForge archives to deliver malware. The theft of these specific datasets allows an adversary to map the precise boundaries of an opponent's situational awareness, effectively turning a victim's own terrain models into a blueprint for bypassing their defensive sensor networks.

## Key Assumptions Check

- The HeartlessSoul campaign is a newly discovered phase of an ongoing, long-term collection requirement rather than a reactive response to recent kinetic shifts.
  - Kaspersky Lab's monitoring of command-and/or infrastructure traces back to February, while the earliest group activities date to September 2025. This timeline predates the immediate surge in 2024-2025 regional conflicts mentioned in the report. If future forensic analysis reveals the infrastructure was dormant for years before activation, I would revise this to a reactive, surge-based operation.
  - *likely*
- The primary driver of the campaign is strategic military intelligence rather than opportunistic financial gain.
  - The group specifically targets GIS, digital geographic relief files, and proprietary mapping files, which lack immediate liquidity on dark web forums compared to stolen credentials or PII. The use of complex, multi-stage infection and fileless execution is inconsistent with the high-volume, low-effort model of typical ransomware affiliates. Evidence of the group selling these specific GIS datasets to known ransomware brokers would reverse this assessment.
  - *almost certainly*

## Analysis of Competing Hypotheses

- Hypothesis 1: The campaign serves as a precursor to kinetic sabotage or precision strike planning.
  - Consistent with the theft of terrain models, GPS data, and infrastructure maps (roads, engineering networks) which are essential for targeting. Inconsistent with the group's focus on Russian enterprises and the lack of any observed destructive payloads or wiper malware in the reported TTPs.
  - *consistent*
- Hypothesis 2: The campaign is a decentralized hacktivist effort driven by regional political grievances.
  - Consistent with the existence of related groups like Paper Werewolf (GOFFEE) which target Russian defense contractors. Inconsistent with the high level of technical sophistication, specifically the use of the ZDI-CAN-25373 Windows shortcut exploit and multi-stage fileless execution, which typically exceeds hacktivist capabilities.
  - *inconsistent*
- Hypothesis 3: The campaign is an economic espionage operation designed to bolster domestic aerospace competitiveness.
  - Consistent with the targeting of proprietary GIS mapping files and software installers. Inconsistent with the heavy concentration of targets within the Russian government and the specific focus on geospatial data that has high utility for battlefield movement rather than just industrial manufacturing secrets.
  - *inconsistent*
- The hypothesis with the least disconfirming evidence is Hypothesis 1 (Precursor to kinetic/military planning).
  - The technical focus on terrain and navigation data aligns most closely with the observed data exfiltration patterns.
  - *strongest*

## Opportunity Analysis

- Access to these datasets enables the adversary to execute 'blind-spot' operations in contested airspace.
  - By acquiring the victim's GIS and terrain models, the adversary can identify gaps in radar coverage or sensor blind spots created by specific topographical features. This allows for the planning of drone or missile ingress routes that are invisible to the victim's existing monitoring infrastructure.
  - *likely*
- The theft provides a mechanism for degrading the efficacy of GNSS-denied navigation training.
  - Access to proprietary GPS and digital relief files allows an adversary to simulate the exact electronic warfare (EW) environments that Russian operators are training for. This intelligence allows the adversary to refine their jamming techniques to specifically target the frequencies and signal strengths used in these specific geographic corridors.
  - *likely*

## What to Watch For

Monitor for the deployment of the ZDI-CAN-25373 exploit in non-aviation sectors, which would indicate a shift toward broader infrastructure targeting. Watch for any overlap in C2 infrastructure between HeartlessSoul and the 'Werewolf' group cluster (Paper, Eagle, Versatile) over the next 3-6 months. A sudden shift toward the deployment of destructive payloads (wipers) within these hijacked GIS workstations would invalidate the current assessment of a purely espionage-driven mission.

## Discussion

- How does the theft of 'operational ground truth' via GIS data change the cost-benefit analysis for adversaries attempting to use low-cost attritable drones in high-intensity conflict?
- To what extent does the use of legitimate software distribution platforms like SourceForge for malware delivery necessitate a fundamental shift in how supply chain trust is verified for industrial engineering software?

*SAT Techniques: Key Assumptions Check, Analysis of Competing Hypotheses, Opportunity Analysis*

---
Source: [Dark Reading](https://www.darkreading.com/vulnerabilities-threats/cyber-espionage-group-aviation-firms-steal-map-data)