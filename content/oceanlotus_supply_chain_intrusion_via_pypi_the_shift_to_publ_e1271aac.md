---
title: "OceanLotus Supply Chain Intrusion via PyPI: The Shift to Public API C2 Infrastructure"
date: 2026-05-06
category: geoCTI
description: "OceanLotus has transitioned from traditional malware delivery to a sophisticated PyPI supply chain campaign using malicious wheel packages like 'colorinal' and 'uuid32-utils'."
tags: ["OceanLotus", "CTI", "attacks", "breaking"]
---

<p class="analysis-meta"><strong>Confidence:</strong> high | <strong>Triage Score:</strong> 8/10 | <strong>Category:</strong> Supply Chain | <strong>Key Actors:</strong> OceanLotus | <strong>SAT Techniques:</strong> Attack Tree Analysis, Key Assumptions Check, Indicators & Warnings</p>

OceanLotus has transitioned from traditional malware delivery to a sophisticated PyPI supply chain campaign using malicious wheel packages like 'colorinal' and 'uuid32-utils'. By leveraging the Zulip team chat app's REST APIs for command-and-control, the actor bypasses traditional network-level detection of dedicated C2 servers. This shift indicates a strategic move toward blending malicious traffic with legitimate enterprise communication patterns to evade perimeter security.

## Attack Tree Analysis

- The attack vector utilizes dependency confusion and package impersonation within the Python Package Index (PyPI) to achieve initial execution.
  - The actor uploaded malicious wheel packages, such as 'colorinal' and 'uuid3  utils', designed to mimic popular libraries. By including 'termncolor' as a benign-looking wrapper that imports the malicious 'colorinal' dependency, the attacker obscures the infection chain from simple static analysis of the top-level package.
  - *almost certainly*
- The blast radius extends to cross-platform development environments, specifically targeting both Windows and Linux-based software supply chains.
  - The presence of both .DLL and .SO (Linux shared library) payloads within the distributed packages demonstrates a capability to compromise diverse operating system environments. This allows for the simultaneous infection of developer workstations and production Linux servers running Python-based applications.
  - *almost certainly*
- Target selection logic prioritizes developers and automated CI/CD pipelines over end-user workstations.
  - The choice of PyPI as a distribution vector targets the very beginning of the software development lifecycle. By compromising the library level, the actor gains access to the build processes of any downstream application that pulls these dependencies, rather than relying on broad phishing campaigns.
  - *likely*

## Key Assumptions Check

- The primary objective of this campaign is long-term espionage and data exfiltration rather than immediate system disruption.
  - The use of the Zulip REST API for C2 infrastructure is optimized for stealth and persistence, which is characteristic of espionage-focused operations. If the actor's goal were disruption, the use of a highly visible, legitimate API would be less effective than a more aggressive, high-bandwidth method. Evidence of widespread file encryption or system wiping would reverse this assessment.
  - *almost certainly*
- The campaign was a targeted operation directed at specific high-value development ecosystems rather than an opportunistic mass-infection.
  - The creation of a multi-layered dependency chain (termncolor importing colorinal) and the use of specific, functional-looking libraries like 'uuid32-utils' suggest a deliberate attempt to infiltrate specific development workflows. If the packages had been uploaded with generic names or lacked functional code, it would suggest an opportunistic, low-effort attempt at mass infection.
  - *likely*

## Indicators & Warnings

- Defenders must monitor for anomalous outbound REST API traffic to Zulip domains originating from Python-based build environments.
  - Since ZiChatBot uses Zulip as its C2, standard C2 blacklists will fail to flag this traffic. Analysts should look for unexpected API calls to Zulip from non-user-facing server environments. A sudden spike in outbound traffic to Zulip from automated build agents would be a high-fidelity indicator of compromise.
  - *almost certainly*
- The appearance of new, unverified Python packages with high-entropy metadata or suspicious email domains (e.g., tutamail.com, proton.me) serves as an early warning.
  - The identified packages were authored by 'laz****' and 'sym****' using privacy-focused email providers. Monitoring PyPI for new packages that mimic existing utility libraries and are registered with these specific email providers can provide early detection. If new packages appear with established, corporate-linked email addresses, it would suggest a different, more deeply embedded actor.
  - *likely*
- Second-stage activity involving credential theft or lateral movement is expected within weeks of the initial infection.
  - Given the espionage focus, the actor will likely spend time performing reconnaissance within the compromised environment before executing visible lateral movement. If large-scale data exfiltration or destructive actions occur within days of the package installation, it would indicate a shift toward a disruption-oriented mandate.
  - *weeks-months*

## What to Watch For

Monitor PyPI for any new packages mimicking 'uuid' or 'color' utilities that utilize Proton or Tutamail registration. Watch for unexpected outbound HTTPS traffic to Zulip API endpoints from Linux and Windows development environments. An indicator that would challenge the OceanLotus attribution would be the discovery of TTPs or infrastructure previously tied exclusively to other regional APT groups.

## Discussion

- How does the migration of C2 traffic to legitimate SaaS platforms like Zulip alter the efficacy of traditional egress filtering in highly regulated sectors?
- To what extent does the increasing reliance on automated dependency management in DevOps pipelines create a permanent, unfixable vulnerability in the global software supply chain?

*SAT Techniques: Attack Tree Analysis, Key Assumptions Check, Indicators & Warnings*

---
Source: [Kaspersky Securelist](https://securelist.com/oceanlotus-suspected-pypi-zichatbot-campaign/119603/)