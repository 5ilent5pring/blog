---
title: "Russian Intelligence Targeting Polish Water Infrastructure for Operational Pre-positioning"
date: 2026-05-07
category: geoCTI
description: "The Polish Internal Security Agency (ABW) confirmed that attackers breached water treatment facilities in five specific towns, including Jabłonna Lacka and Szczytno, during 2025."
tags: ["Poland", "Russian Federation", "ABW", "Belarus", "CTI", "attacks", "breaking"]
---

<p class="analysis-meta"><strong>Confidence:</strong> high | <strong>Triage Score:</strong> 9/10 | <strong>Category:</strong> Infrastructure | <strong>Key Actors:</strong> Poland, Russian Federation, ABW, Belarus | <strong>SAT Techniques:</strong> Key Assumptions Check, Scenario Analysis, Indicators & Warnings</p>

The Polish Internal Security Agency (ABW) confirmed that attackers breached water treatment facilities in five specific towns, including Jabłonna Lacka and Szczytno, during 2025. These intrusions achieved access to industrial control systems (ICS) with the capability to alter technical device parameters. This activity represents a shift from purely information-gathering espionage toward the establishment of persistent, actionable access within critical utility networks. The presence of unauthorized parameter changes suggests the attackers are testing the threshold between undetected reconnaissance and active sabotage.

## Key Assumptions Check

- The current intrusions into the Jabłonna Lacka and Szczytno water facilities serve as operational pre-positioning for future disruption rather than immediate destructive intent.
  - The ABW report notes the ability to alter technical parameters, yet the primary impact reported was the risk to continuity rather than a realized large-scale outage. The focus on gaining access to ICS suggests a focus on establishing persistence. I would reverse this assessment if evidence emerged of widespread, unprovoked, and non-recoverable physical damage to pumps or filtration systems without a preceding geopolitical trigger.
  - *almost certainly*
- Russian intelligence services possess the capability to execute physical sabotage but are currently constrained by the need to avoid direct NATO-level escalation.
  - The ABW identifies a surge in espionage investigations and reconnaissance of military sites, indicating a buildup of intelligence. However, the shift toward using organized crime proxies for arson and railway damage suggests a preference for deniable, low-level kinetic pressure. I would reverse this if the Russian Federation initiated a direct, large-scale cyber-kinetic strike on Polish energy or water infrastructure during a period of relative diplomatic stability.
  - *likely*

## Scenario Analysis

- Scenario 1: Persistent Intelligence Collection via ICS Access.
  - The actor maintains access to the five identified water treatment stations to monitor Polish utility response patterns and technical configurations. This persists as long as the intrusion remains undetected by the ABW and does not trigger a significant Polish diplomatic or kinetic retaliation. The primary target is the telemetry data from the ICS.
  - *consistent*
- Scenario 2: Demonstrative Disruption to Signal Resolve.
  - The actor executes a visible but non-lethal alteration of pump settings or alarms, similar to the reported incident in the unnamed facility where administrator accounts were compromised. This would be triggered by a specific Polish policy shift regarding Ukraine military aid. The target is public confidence in Polish municipal stability.
  - *consistent*
- Scenario 3: Full-Scale Wartime Sabotage.
  - During a period of active kinetic conflict, the actor utilizes the established access in Szczytno and Małdyty to cause widespread water supply failure. This follows the escalation path seen in the reported Russian attacks on Polish energy infrastructure. The target is the total degradation of Polish logistics capabilities for Western military aid.
  - *consistent*

## Indicators & Warnings

- Deployment of specialized ICS-specific malware or wipers within the Polish water or energy sectors indicates an imminent transition to the destructive phase.
  - The presence of tools designed to overwrite firmware or wipe PLC configurations would signal that the actor has moved beyond reconnaissance. This follows the pattern of previous infrastructure-focused operations where access was followed by destructive payloads.
  - *weeks-months*
- A shift in activity from IT-based credential harvesting to the direct manipulation of OT/SCADA protocols in the identified towns indicates active staging.
  - The ABW has already noted the ability to alter technical parameters; further movement toward unauthorized command execution in the identified water facilities would suggest the actor is preparing for kinetic impact.
  - *days-weeks*
- The removal of unauthorized administrator accounts or the cessation of reconnaissance activity in Polish railway and air traffic networks indicates a de-escalation of the current campaign.
  - If the ABW reports a decrease in the 48 espionage investigations opened in 2025, or if the identified water facilities show no further unauthorized parameter changes, it would suggest the actor is rotating targets or de-prioritizing the Polish theater.
  - *months*

## What to Watch For

Monitor the ABW's quarterly reports for any increase in the frequency of 'technical parameter' alterations in the identified towns. A sudden spike in the use of cryptocurrency-linked recruitment for physical sabotage in Poland would confirm the expansion of the Russian-linked organized crime network. Conversely, any evidence of the actor purging access from the Polish railway communications network would suggest a strategic withdrawal or a shift in focus away from the Polish logistics corridor.

## Discussion

- How does the integration of organized crime networks into Russian intelligence operations change the threshold for what constitutes an 'act of war' under NATO's Article 5?
- To what extent does the use of 'low-level' kinetic sabotage, such as the reported railway arson, serve as a more effective tool for long-term societal destabilization than high-visibility cyberattacks?

*SAT Techniques: Key Assumptions Check, Scenario Analysis, Indicators & Warnings*

---
Source: [The Record by Recorded Future](https://therecord.media/polish-intelligence-warns-hackers-attacked-water-treatment)