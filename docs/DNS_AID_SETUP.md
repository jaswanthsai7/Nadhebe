# DNS for AI Discovery (DNS-AID) Setup Guide for nadhebe.com

This guide provides the exact DNS records and DNSSEC signing procedure to fulfill the **DNS for AI Discovery (DNS-AID)** standard (draft-mozleywilliams-dnsop-dnsaid and RFC 9460).

---

## 1. Required DNS Records

Log in to your DNS provider (e.g. Cloudflare DNS dashboard for `nadhebe.com`) and add the following **SVCB/HTTPS** records:

### Record 1: Index Discovery Endpoint
* **Type**: `HTTPS` (or `SVCB`)
* **Name**: `_index._agents`
* **Target / Service Name**: `nadhebe.com`
* **Priority**: `1`
* **Value / Parameters**: `alpn="h2,h3" port="443" uri="/index.json"`

### Record 2: Agent-to-Agent (A2A) Discovery Endpoint
* **Type**: `HTTPS` (or `SVCB`)
* **Name**: `_a2a._agents`
* **Target / Service Name**: `nadhebe.com`
* **Priority**: `1`
* **Value / Parameters**: `alpn="h2,h3" port="443" uri="/.well-known/agent-skills/index.json"`

---

## 2. BIND Zone File Copy-Paste Syntax

If managing zone files directly (or using BIND/PowerDNS):

```dns
; DNS-AID Entrypoint Records for nadhebe.com
_index._agents.nadhebe.com. IN HTTPS 1 nadhebe.com. ( alpn="h2,h3" port=443 uri="/index.json" )
_a2a._agents.nadhebe.com.   IN HTTPS 1 nadhebe.com. ( alpn="h2,h3" port=443 uri="/.well-known/agent-skills/index.json" )
```

---

## 3. Enable DNSSEC (Mandatory for Validating Resolvers)

1. In Cloudflare Dashboard, go to **DNS** -> **Settings**.
2. Click **Enable DNSSEC**.
3. Cloudflare will automatically generate `DS` records.
4. Copy the `DS` record parameters (`Key Tag`, `Algorithm`, `Digest Type`, `Digest`) to your domain registrar (e.g., Namecheap, Porkbun, GoDaddy) to complete authenticated zone validation.
