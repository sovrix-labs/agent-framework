# Security Checklist: {{FEATURE_NAME}}

**Feature ID**: {{FEATURE_ID}}  
**Based on**: specs/{{FEATURE_ID}}/spec.md and specs/{{FEATURE_ID}}/plan.md  
**Reviewer**: {{REVIEWER_NAME}}  
**Date**: {{DATE}}  
**Status**: {{STATUS}}

---

## Overview

This checklist ensures that the feature implementation follows security best practices and mitigates common vulnerabilities. All items must be verified before deployment.

**Risk Level**: [High | Medium | Low]  
**Compliance Requirements**: [GDPR, SOC2, HIPAA, PCI-DSS, etc. - list applicable]

---

## 1. Authentication

- [ ] **User Authentication Required**
  - [ ] Authentication enforced on all protected endpoints
  - [ ] Session management properly implemented
  - [ ] Session timeout configured appropriately
  - [ ] Multi-factor authentication supported (if required)
  - [ ] Password reset flow is secure
  - [ ] Account lockout after failed attempts

- [ ] **Service Authentication**
  - [ ] API keys properly validated
  - [ ] OAuth2/OIDC properly implemented
  - [ ] JWT tokens validated (signature, expiration, claims)
  - [ ] Refresh token rotation implemented
  - [ ] Service-to-service authentication configured

**Notes**: [Any authentication-specific considerations]

---

## 2. Authorization

- [ ] **Access Control**
  - [ ] Role-based access control (RBAC) enforced
  - [ ] Principle of least privilege applied
  - [ ] Authorization checked on every operation
  - [ ] Horizontal privilege escalation prevented
  - [ ] Vertical privilege escalation prevented
  - [ ] Resource ownership validated

- [ ] **Data Access**
  - [ ] Users can only access their own data
  - [ ] Admin/privileged access properly scoped
  - [ ] Shared resource permissions validated
  - [ ] No direct object reference vulnerabilities

**Notes**: [Any authorization-specific considerations]

---

## 3. Input Validation

- [ ] **User Input**
  - [ ] All user inputs validated on server side
  - [ ] Input length limits enforced
  - [ ] Allowed characters whitelisted
  - [ ] File upload validation (type, size, content)
  - [ ] No executable uploads allowed
  - [ ] Mime type validation on uploads

- [ ] **Data Sanitization**
  - [ ] SQL injection prevention (parameterized queries)
  - [ ] XSS prevention (output encoding)
  - [ ] Command injection prevention
  - [ ] Path traversal prevention
  - [ ] LDAP injection prevention (if applicable)
  - [ ] XML injection prevention (if applicable)

- [ ] **API Input**
  - [ ] Request body validation with schema
  - [ ] Query parameters validated
  - [ ] Headers validated
  - [ ] Content-Type enforcement
  - [ ] Rate limiting implemented

**Notes**: [Any validation-specific considerations]

---

## 4. Data Protection

- [ ] **Sensitive Data**
  - [ ] PII (Personally Identifiable Information) identified
  - [ ] Sensitive data encrypted at rest
  - [ ] Sensitive data encrypted in transit (TLS 1.2+)
  - [ ] Database encryption enabled
  - [ ] Field-level encryption for highly sensitive data
  - [ ] Secrets stored in secure vault (not in code)

- [ ] **Password Security**
  - [ ] Passwords hashed with strong algorithm (bcrypt, Argon2)
  - [ ] Password complexity requirements enforced
  - [ ] Passwords never logged or exposed
  - [ ] Password history maintained (prevent reuse)

- [ ] **API Keys & Tokens**
  - [ ] API keys never in source code
  - [ ] API keys stored in environment variables
  - [ ] API keys rotated regularly
  - [ ] Tokens have appropriate expiration
  - [ ] Secrets manager used for production

**Notes**: [Any data protection-specific considerations]

---

## 5. Cryptography

- [ ] **Encryption Standards**
  - [ ] Strong algorithms used (AES-256, RSA-2048+)
  - [ ] No custom/homebrew crypto
  - [ ] TLS 1.2+ enforced (TLS 1.3 preferred)
  - [ ] Strong cipher suites configured
  - [ ] Certificate validation enabled
  - [ ] Perfect forward secrecy enabled

- [ ] **Key Management**
  - [ ] Cryptographic keys securely generated
  - [ ] Keys stored in secure location (HSM, KMS)
  - [ ] Key rotation policy defined
  - [ ] Key access properly logged

**Notes**: [Any cryptography-specific considerations]

---

## 6. Session Management

- [ ] **Session Security**
  - [ ] Secure session ID generation
  - [ ] HttpOnly flag on cookies
  - [ ] Secure flag on cookies (HTTPS)
  - [ ] SameSite attribute set
  - [ ] Session fixation prevention
  - [ ] Session timeout enforced
  - [ ] Logout properly invalidates session

- [ ] **CSRF Protection**
  - [ ] CSRF tokens implemented
  - [ ] Token validation on state-changing operations
  - [ ] SameSite cookie attribute set

**Notes**: [Any session management-specific considerations]

---

## 7. Error Handling & Logging

- [ ] **Error Handling**
  - [ ] Generic error messages to users (no stack traces)
  - [ ] Detailed errors logged server-side
  - [ ] No sensitive data in error messages
  - [ ] Proper exception handling (no unhandled exceptions)
  - [ ] Error responses don't leak system info

- [ ] **Logging**
  - [ ] Security events logged (auth, authz, access)
  - [ ] No passwords or secrets in logs
  - [ ] No PII in logs (or properly masked)
  - [ ] Log tampering prevention
  - [ ] Logs retained according to policy
  - [ ] Centralized logging configured
  - [ ] Alerts on security events

**Notes**: [Any logging-specific considerations]

---

## 8. API Security

- [ ] **API Design**
  - [ ] Authentication required on all endpoints
  - [ ] Authorization checked on all operations
  - [ ] Rate limiting implemented
  - [ ] Request size limits enforced
  - [ ] CORS properly configured
  - [ ] API versioning strategy implemented

- [ ] **API Documentation**
  - [ ] Security requirements documented
  - [ ] Authentication flows documented
  - [ ] Rate limits documented
  - [ ] Error responses documented

**Notes**: [Any API security-specific considerations]

---

## 9. Infrastructure Security

- [ ] **Network Security**
  - [ ] HTTPS enforced (HTTP redirects to HTTPS)
  - [ ] Security headers configured (see below)
  - [ ] Firewall rules properly configured
  - [ ] VPC/network segmentation in place
  - [ ] Database not publicly accessible
  - [ ] Internal services not exposed publicly

- [ ] **Security Headers**
  - [ ] `Content-Security-Policy` configured
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `X-Frame-Options: DENY or SAMEORIGIN`
  - [ ] `X-XSS-Protection: 1; mode=block`
  - [ ] `Strict-Transport-Security` (HSTS)
  - [ ] `Referrer-Policy` configured

- [ ] **Container/Server Security**
  - [ ] Base images from trusted sources
  - [ ] Images scanned for vulnerabilities
  - [ ] Containers run as non-root
  - [ ] Secrets not in Docker images
  - [ ] Updates and patches applied

**Notes**: [Any infrastructure-specific considerations]

---

## 10. Dependency Security

- [ ] **Third-Party Dependencies**
  - [ ] All dependencies reviewed for security
  - [ ] No known vulnerabilities in dependencies
  - [ ] Dependency scanning automated (Snyk, Dependabot)
  - [ ] Dependencies from trusted sources only
  - [ ] Minimal dependencies (reduce attack surface)
  - [ ] Dependencies kept up to date

- [ ] **Package Management**
  - [ ] Lock files committed (package-lock.json, requirements.txt)
  - [ ] Private package registry secured
  - [ ] Package integrity verification

**Notes**: [Any dependency-specific considerations]

---

## 11. Data Privacy & Compliance

- [ ] **Privacy Requirements**
  - [ ] User consent obtained for data collection
  - [ ] Privacy policy updated
  - [ ] Data retention policy implemented
  - [ ] Right to deletion implemented (GDPR)
  - [ ] Data portability supported (GDPR)
  - [ ] Data minimization practiced
  - [ ] Purpose limitation honored

- [ ] **Compliance**
  - [ ] Regulatory requirements identified
  - [ ] Required auditing/logging in place
  - [ ] Data residency requirements met
  - [ ] Compliance documentation updated

**Notes**: [Any compliance-specific considerations]

---

## 12. Monitoring & Incident Response

- [ ] **Security Monitoring**
  - [ ] Failed authentication attempts logged
  - [ ] Authorization failures logged
  - [ ] Unusual activity detected and alerted
  - [ ] Security dashboard configured
  - [ ] Penetration testing scheduled

- [ ] **Incident Response**
  - [ ] Incident response plan in place
  - [ ] Security contact identified
  - [ ] Rollback plan documented
  - [ ] Data breach notification process defined

**Notes**: [Any monitoring-specific considerations]

---

## 13. Code Security

- [ ] **Secure Coding Practices**
  - [ ] Code review completed
  - [ ] Static analysis performed (SAST)
  - [ ] Dynamic analysis performed (DAST) if applicable
  - [ ] No hardcoded credentials
  - [ ] No commented-out sensitive code
  - [ ] Secure random number generation
  - [ ] Time-constant comparison for secrets

- [ ] **Secret Management**
  - [ ] No secrets in version control
  - [ ] `.env` files in `.gitignore`
  - [ ] Git history scanned for secrets
  - [ ] Secret rotation process documented

**Notes**: [Any code security-specific considerations]

---

## 14. Testing

- [ ] **Security Testing**
  - [ ] Unit tests for security logic
  - [ ] Integration tests for auth/authz
  - [ ] Penetration testing (if high risk)
  - [ ] Security regression tests
  - [ ] Fuzzing tests (if applicable)

**Notes**: [Any testing-specific considerations]

---

## Sign-Off

### Security Review

**Reviewed By**: {{REVIEWER_NAME}}  
**Date**: {{DATE}}  
**Status**: [Approved | Needs Revision | Blocked]

**Comments**:
[Security reviewer comments]

### Security Risks Identified

| Risk | Severity | Mitigation | Status |
|------|----------|------------|--------|
| [Risk description] | [High/Med/Low] | [How mitigated] | [Open/Resolved] |

### Approval

- [ ] All critical security items verified
- [ ] All high-risk items addressed
- [ ] Security testing completed
- [ ] Documentation reviewed
- [ ] Approved for deployment

**Approver**: {{APPROVER_NAME}}  
**Signature**: ___________________  
**Date**: {{DATE}}

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- Project constitution: `.specify/memory/constitution.md`
- [Company security policy](link)

---

**Notes:**
- This checklist must be completed before deployment
- All items marked as not applicable must include justification
- Consult security team for high-risk features
- Update this checklist as new security requirements emerge

*Last updated: {{DATE}}*
