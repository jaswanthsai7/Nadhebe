---
name: dns-aid
description: Agent skill for DNS for AI Discovery (DNS-AID) SVCB/HTTPS record discovery.
---

# DNS for AI Discovery (DNS-AID)

This skill enables agents to perform DNS-based agent discovery for `nadhebe.com` using ServiceMode SVCB/HTTPS (RFC 9460) records signed with DNSSEC.

## Discovery Records

* `_index._agents.nadhebe.com` IN HTTPS 1 nadhebe.com. alpn="h2,h3" port=443 uri="/index.json"
* `_a2a._agents.nadhebe.com` IN HTTPS 1 nadhebe.com. alpn="h2,h3" port=443 uri="/.well-known/agent-skills/index.json"

For step-by-step DNS zone record setup, see `docs/DNS_AID_SETUP.md`.
