---
title: "OpenAI Certificate Revocation: Assessing the Scope of the Axios Supply Chain Breach"
date: 2026-04-13
category: geoCTI
description: "The compromise of the Axios npm package via the malicious 'plain-crypto-js' dependency allowed the North Korean group UNC1069 to execute the WAVESHAPER.V2 backdoor within OpenAI's macOS application..."
tags: ["Apple", "CTI", "Espionage", "OpenAI", "TeamPCP", "UNC1069", "attacks", "breaking", "vulnerabilities"]
---

**Confidence:** high | **Triage Score:** 8/10 | **Category:** Espionage | **Key Actors:** OpenAI, UNC1069, TeamPCP, Apple | **SAT Techniques:** Attack Tree Analysis, Key Assumptions Check, Indicators & Warnings

The compromise of the Axios npm package via the malicious 'plain-crypto-js' dependency allowed the North Korean group UNC1069 to execute the WAVESHAPER.V2 backdoor within OpenAI's macOS application signing pipeline. While OpenAI reports no evidence of data exfiltration, the breach of the GitHub Actions workflow provided the actor with temporary access to macOS notarization and signing materials. The rotation of these certificates forces a hard break in the software lifecycle for ChatGPT Desktop and Codex users, effectively weaponizing the trust model of the macOS ecosystem against legacy versions of the software.

## Attack Tree Analysis

- **The attack utilized a multi-stage dependency poisoning strategy to bridge the gap between open-source ecosystem vulnerabilities and high-value CI/CD pipelines.**
  - UNC106lar hijacked the npm account of the Axios maintainer to inject the 'plain-crypto-js' dependency into versions 1.14.1 and 0.30.4. This specific vector allowed the WAVESHAPER.V2 backdoor to bypass traditional perimeter defenses by piggybacking on a trusted, widely-used HTTP client library. If the actor had targeted a niche library instead of a foundational one like Axios, the reach into OpenAI's automated signing workflows would have been significantly diminished.
  - *almost certainly*
- **The blast radius extends beyond OpenAI to any developer environment or automated pipeline consuming the poisoned Axios versions.**
  - The use of a cross-platform backdoor (Windows, macOS, Linux) ensures that any downstream entity—ranging from AI infrastructure providers to telecommunications firms using similar npm-based toolchains—is vulnerable to persistent access. The compromise of the GitHub Actions workflow specifically endangered the integrity of the ChatGPT Desktop, Codex, and Atlas software lineages.
  - *likely*

## Key Assumptions Check

- **The primary objective of the UNC1069 operation was the establishment of persistent, high-integrity access rather than immediate data theft.**
  - The execution of the payload occurred within a narrow window during the GitHub Actions job, which OpenAI claims prevented the successful exfiltration of the signing certificate. The focus on injecting a backdoor (WAVESHAPER.V2) into a signing workflow suggests a preference for long-term, undetected presence in the software supply chain. Evidence of immediate, large-scale data exfiltration from OpenAI's internal databases would reverse this assessment.
  - *likely*
- **The intrusion into the OpenAI workflow was a targeted exploitation of the CI/CD pipeline rather than an opportunistic scan.**
  - The actor specifically leveraged the hijacked Axios package to reach a workflow that had direct access to macOS notarization and signing materials. This requires an understanding of how the Axios dependency is utilized within OpenAI's specific build automation. Evidence that the malicious payload was deployed across a wide, non-specific array of unrelated npm-dependent projects without any focus on signing-related workflows would reverse this assessment.
  - *even odds*

## Indicators & Warnings

- **Analysts should monitor for the emergence of new, split-file steganography or .pth auto-execution techniques in Python-based CI/CD pipelines.**
  - Trend Micro's analysis of TeamPCP shows a rapid evolution from Base64 encoding to complex steganography in the Telnyx and Trivy attacks. Continued monitoring of the Python Package Index (PyPI) for similar shifts in delivery methods is required to detect the next phase of this campaign. A sudden cessation of all new package updates in the affected ecosystems would suggest the actor has moved to a different, non-package-based delivery vector.
  - *weeks-months*
- **The appearance of unauthorized software signed with the revoked OpenAI certificate would indicate a failure in the revocation propagation.**
  - While OpenAI has stopped new notarizations, the presence of binaries claiming to be ChatGPT Desktop that bypass macOS security prompts would signal that the previous certificate's window of utility has not closed. Conversely, if we observe widespread, successful execution of the old certificate on macOS, it would suggest the actor's primary goal was not the certificate itself, but the use of the initial breach to plant other, non-certificate-dependent persistence.
  - *inconsistent*

## What to Watch For

Monitor the npm and PyPI ecosystems for any new dependencies appearing in the lineage of the 'plain-crypto-js' or 'Trivy' incidents, specifically looking for the WAVESHAPER.V2 signature. Watch for any unauthorized macOS binaries attempting to use the revoked OpenAI certificate within the next 30 days. An indicator that would challenge the current attribution to UNC1069 would be the discovery of the same payload being used in a purely financially motivated ransomware campaign without any associated credential harvesting or infrastructure targeting.

## Discussion

- How does the shift from simple credential theft to complex steganographic delivery in the TeamPCP campaign change the cost-benefit analysis for defenders of the open-source ecosystem?
- To what extent does the reliance on third-party notarization services like Apple's create a single point of failure for the integrity of the global software supply chain?

---

**Source:** [The Hacker News](https://thehackernews.com/2026/04/openai-revokes-macos-app-certificate.html)
