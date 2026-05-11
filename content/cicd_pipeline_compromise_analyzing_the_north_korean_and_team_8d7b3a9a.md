---
title: "CI/CD Pipeline Compromise: Analyzing the North Korean and TeamPCP Supply Chain Campaigns"
date: 2026-05-11
category: geoCTI
description: "In early 2026, North Korean actors and the TeamPCP group executed a series of high-impact supply chain operations targeting the software build process."
tags: ["North Korean actors", "TeamPCP", "European Commission", "InvisiRisk", "CTI", "attacks", "breaking"]
---

<p class="analysis-meta"><strong>Confidence:</strong> high | <strong>Triage Score:</strong> 8/10 | <strong>Category:</strong> Supply Chain | <strong>Key Actors:</strong> North Korean actors, TeamPCP, European Commission, InvisiRisk | <strong>SAT Techniques:</strong> Attack Tree Analysis, Key Assumptions Check, Indicators & Warnings</p>

In early 2026, North Korean actors and the TeamPCP group executed a series of high-impact supply chain operations targeting the software build process. By hijacking the Axios npm library and compromising critical security tools like Trivy and LiteLLM, these actors bypassed traditional perimeter defenses to inject malicious code directly into downstream environments. The successful exfiltration of 300Gb of data from the European Commission proves that the primary vulnerability is no longer the software perimeter, but the integrity of the automated build-time dependencies.

## Attack Tree Analysis

- The primary entry vector is the compromise of trusted upstream dependencies and build-time security tooling.
  - Actors specifically targeted the Axios npm library via account hijacking and compromised the Trivy vulnerability scanner to gain access to CI/SD pipelines. This method bypasses static analysis by ensuring the malicious payload is introduced during the automated execution of the build process itself. Evidence of a shift toward targeting the 'doorman' (scanners) rather than the 'guest' (code) would reverse this assessment.
  - *almost certainly*
- The blast radius extends to thousands of downstream organizations and critical governmental data repositories.
  - The Axios compromise affected approximately 3% of its userbase, while the LiteLLM attack impacted thousands of companies, including Mercor. The most severe impact was the loss of 300Gb of data from the European Commission. A shift toward localized, single-target compromises rather than broad-spectrum dependency poisoning would reverse this assessment.
  - *almost certainly*
- Target selection logic prioritizes high-trust, automated-pull dependencies to maximize silent distribution.
  - The selection of Axios and Trivy demonstrates a preference for components that are automatically pulled by build systems without manual developer intervention. This choice reveals an intelligence priority on achieving persistence within the software development lifecycle (SDLC) rather than immediate disruption. A move toward targeting bespoke, low-usage enterprise software would reverse this assessment.
  - *likely*

## Key Assumptions Check

- The North Korean operation was a targeted effort to establish long-term remote access rather than a purely opportunistic financial theft.
  - The deployment of a remote access trojan via the Axios library suggests a focus on establishing a foothold for future operations. The presence of immediate, destructive ransomware or large-scale cryptocurrency theft during the brief window of the Axios compromise would reverse this assessment.
  - *likely*
- The TeamPCP campaign was designed for large-scale data exfiltration and credential harvesting.
  - The compromise of the Trivy scanner directly led to the theft of 300Gb of data from the European Commission via compromised API keys. If the TeamPCP activity had resulted in only localized system disruption or service outages without evidence of data movement, this assessment would be reversed.
  - *almost certainly*

## Indicators & Warnings

- Watch for anomalous outbound traffic from CI/CD runners to legitimate cloud providers like GitHub or PyPI.
  - Since the article notes that hardened runners often permit DNS traffic to trusted destinations, defenders must monitor for deep packet inspection anomalies where 'legitimate' destinations receive unexpected data payloads. The discovery of attackers using entirely new, non-standard C2 infrastructure instead of hijacking existing cloud services would reverse this assessment.
  - *days-weeks*
- Monitor for unauthorized API key usage or unexpected secret distribution during the build phase.
  - The European Commission breach was facilitated by a compromised API key originating from the Trivy supply chain attack. An indicator that would challenge the current assessment is the emergence of attacks that bypass the build process entirely to target developers via social engineering or endpoint compromise.
  - *weeks-months*

## What to Watch For

Analysts should monitor for unexpected outbound data flows from build environments to GitHub and PyPI, specifically looking for payloads that deviate from standard package metadata. A signal that would challenge the current focus on CI/CD poisoning would be a sudden spike in successful breaches targeting developer workstations via phishing, suggesting a return to traditional endpoint-centric vectors.

## Discussion

- How does the rise of 'Build Application Firewalls' change the cost-benefit calculus for nation-state actors who currently rely on the 'Mythos effect' of undetected zero-days?
- If the integrity of the software supply chain can no longer be verified via static SBOMs, what new regulatory frameworks are required to govern the liability of upstream open-source maintainers?

*SAT Techniques: Attack Tree Analysis, Key Assumptions Check, Indicators & Warnings*

---
Source: [SecurityWeek](https://www.securityweek.com/build-application-firewalls-aim-to-stop-the-next-supply-chain-attack/)