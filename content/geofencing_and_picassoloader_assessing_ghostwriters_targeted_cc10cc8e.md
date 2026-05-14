---
title: "Geofencing and PicassoLoader: Assessing Ghostwriter's Targeted Ukrainian Campaign"
date: 2026-05-14
category: geoCTI
description: "The Belarus-aligned threat group Ghostwriter has deployed a new, geographically-restricted phishing chain targeting Ukrainian government, military, and defense sectors."
tags: ["Ghostwriter", "Gamaredon", "BO Team", "Head Mare", "Hive0117", "Ukrtelecom", "CTI", "attacks", "breaking"]
---

<p class="analysis-meta"><strong>Confidence:</strong> high | <strong>Triage Score:</strong> 9/10 | <strong>Category:</strong> Attribution | <strong>Key Actors:</strong> Ghostwriter, Gamaredon, BO Team, Head Mare, Hive0117, Ukrtelecom | <strong>SAT Techniques:</strong> Key Assumptions Check, Analysis of Competing Hypotheses, Indicators & Warnings</p>

The Belarus-aligned threat group Ghostwriter has deployed a new, geographically-restricted phishing chain targeting Ukrainian government, military, and defense sectors. By utilizing geofencing to serve benign PDFs to non-Ukrainian IP addresses, the actor minimizes the exposure of their JavaScript-based PicassoLoader and Cobalt Strike infrastructure to international security researchers. This operational shift from broad European targeting to highly localized Ukrainian strikes indicates a transition from general influence operations toward high-fidelity intelligence collection synchronized with kinetic-era requirements.

## Key Assumptions Check

- Ghostwriter's use of geofencing is a deliberate measure to prevent discovery by global threat intelligence vendors.
  - The actor's deployment of server-side validation, combining user-agent and IP address checks, specifically targets Ukrainian IPs to hide the malicious payload from external scanners. If researchers observe the same PicassoLoader infrastructure serving identical malicious payloads to non-Ukrainian IPs, this assessment is false.
  - *almost certainly true*
- The primary objective of the March 2026 campaign is long-term espionage rather than immediate disruption.
  - The deployment of Cobalt Strike Beacon and the use of a 10-minute heartbeat for host profiling suggest a need for persistent access and data exfiltration capabilities. If the group begins using the infrastructure to deploy wiper malware or execute immediate destructive commands against Ukrainian energy or telecom sectors, this assessment is false.
  - *likely true*

## Analysis of Competing Hypotheses

- Hypothesis 1: Ghostwriter is conducting a state-directed espionage campaign on behalf of Belarusian or Russian interests.
  - The targeting of Ukrainian military and defense sectors aligns with the group's historical role in regional influence operations. The use of localized lures, such as the Ukrtelecom PDF, demonstrates a high-effort, targeted approach consistent with state-aligned intelligence requirements.
  - *consistent*
- Hypothesis 2: The campaign is a secondary effect of a broader, non-state hacktivist movement using Ghostwriter's infrastructure.
  - The article notes the presence of other active groups like BO Team and Gamaredon in the same theater. However, the specific use of geofencing and the manual validation of victims by operators suggest a level of controlled, resource-intensive operational security that exceeds typical hacktivist capabilities.
  - *inconsistent*
- Hypothesis 3: The operation is a criminal enterprise utilizing Ghostwriter's toolkit for credential theft and financial gain.
  - The use of Cobalt Strike and the theft of credentials are common in ransomware-as-a-service models. However, the specific targeting of Ukrainian government entities and the avoidance of broader European industrial sectors—where the group previously operated—contradicts a purely profit-driven, opportunistic model.
  - *inconsistent*
- The strongest hypothesis is Hypothesis 1 because it is the only explanation that accounts for both the high-precision geofencing and the specific, non-monetizable target profile.
  - *almost certainly true*

## Indicators & Warnings

- Discovery of Cobalt Strike Beacon activity within Ukrainian telecommunications infrastructure.
  - This would confirm the successful execution of the current Ghostwriter campaign and the effectiveness of the Ukrtelecom-themed lure.
  - *days-weeks*
- The appearance of the same PicassoLoader variant in campaigns targeting Polish or Lithuanian industrial sectors.
  - This would deny the current assessment that the group has pivoted exclusively to a localized Ukrainian focus and suggest a return to broader regional targeting.
  - *weeks-months*
- Coordinated use of the ZeroSSH backdoor by Ghostwriter infrastructure.
  - This would suggest a merger of capabilities between the Belarus-aligned Ghostwriter and the pro-Ukraine BO Team, fundamentally altering the attribution landscape.
  - *months-quarters*

## What to Watch For

Monitor for any shift in the use of the PicassoLoader downloader toward non-Ukrainian IP ranges, which would indicate a breakdown in the group's geofencing discipline. Watch for overlapping C2 infrastructure between Ghostwriter and the Gamaredon group, specifically regarding the use of RAR-based delivery mechanisms, over the next three months.

## Discussion

- How does the integration of automated geofencing and manual operator validation change the cost-benefit analysis for threat intelligence vendors attempting to map adversary infrastructure?
- To what extent does the convergence of infrastructure between hacktivist groups like BO Team and established actors like Ghostwriter suggest a formalization of the 'cyber-proxy' model in the Russo-Ukrainian conflict?

*SAT Techniques: Key Assumptions Check, Analysis of Competing Hypotheses, Indicators & Warnings*

---
Source: [The Hacker News](https://thehackernews.com/2026/05/ghostwriter-targets-ukrainian.html)