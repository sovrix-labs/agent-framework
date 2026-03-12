# Performance Checklist: {{FEATURE_NAME}}

**Feature ID**: {{FEATURE_ID}}  
**Based on**: specs/{{FEATURE_ID}}/spec.md and specs/{{FEATURE_ID}}/plan.md  
**Reviewer**: {{REVIEWER_NAME}}  
**Date**: {{DATE}}  
**Status**: {{STATUS}}

---

## Overview

This checklist ensures the feature meets performance requirements and follows best practices for optimization. All items must be verified before deployment.

**Performance Targets**:
- **Page Load Time**: < 2s (3G), < 1s (4G/WiFi)
- **Time to Interactive (TTI)**: < 3s
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **API Response Time**: < 200ms (p95), < 500ms (p99)

---

## 1. Frontend Performance

### 1.1 Assets & Loading

- [ ] **Images**
  - [ ] Images optimized (compressed, right format)
  - [ ] Appropriate image formats used (WebP with fallback)
  - [ ] Responsive images with `srcset` and `sizes`
  - [ ] Lazy loading for below-the-fold images
  - [ ] Critical images preloaded
  - [ ] No unnecessarily large images
  - [ ] Image dimensions specified (width/height attributes)
  - [ ] Modern formats leveraged (AVIF, WebP)

- [ ] **JavaScript**
  - [ ] JavaScript bundles minified
  - [ ] Code splitting implemented
  - [ ] Tree shaking enabled
  - [ ] Unused code removed (dead code elimination)
  - [ ] Lazy loading for non-critical JS
  - [ ] Critical JS inlined or preloaded
  - [ ] No blocking scripts in `<head>`
  - [ ] Async/defer attributes used appropriately
  - [ ] Third-party scripts loaded asynchronously

- [ ] **CSS**
  - [ ] CSS minified
  - [ ] Critical CSS inlined
  - [ ] Non-critical CSS deferred
  - [ ] Unused CSS removed (PurgeCSS, etc.)
  - [ ] CSS-in-JS optimized (if applicable)
  - [ ] No CSS blocking render

- [ ] **Fonts**
  - [ ] Web fonts optimized (subset, WOFF2)
  - [ ] Font loading strategy implemented (`font-display`)
  - [ ] System fonts used where appropriate
  - [ ] Preload critical fonts
  - [ ] Limit number of font weights/variants

**Notes**: [Any asset-specific considerations]

---

### 1.2 Rendering & Paint

- [ ] **Critical Rendering Path**
  - [ ] Above-the-fold content prioritized
  - [ ] Render-blocking resources minimized
  - [ ] Critical resources preloaded
  - [ ] Resource hints used (`dns-prefetch`, `preconnect`)

- [ ] **Layout Stability**
  - [ ] Image/video dimensions specified
  - [ ] Ad slots reserved
  - [ ] Dynamic content has placeholders
  - [ ] Fonts loaded without FOIT/FOUT issues
  - [ ] CLS score < 0.1

- [ ] **Repaints & Reflows**
  - [ ] DOM manipulation batched
  - [ ] Layout thrashing avoided
  - [ ] Forced synchronous layouts minimized
  - [ ] CSS transforms used for animations (not left/top)
  - [ ] `will-change` used sparingly

- [ ] **Animations**
  - [ ] GPU-accelerated properties used (`transform`, `opacity`)
  - [ ] 60fps maintained
  - [ ] Long-running animations avoided
  - [ ] `requestAnimationFrame` used for JS animations

**Notes**: [Any rendering-specific considerations]

---

### 1.3 JavaScript Execution

- [ ] **Script Performance**
  - [ ] Long tasks < 50ms
  - [ ] Main thread not blocked
  - [ ] Debouncing/throttling for frequent events
  - [ ] Web Workers for heavy computation
  - [ ] Synchronous operations avoided
  - [ ] Unnecessary re-renders prevented

- [ ] **Framework Optimization**
  - [ ] Memoization used appropriately (React.memo, useMemo)
  - [ ] Virtual scrolling for long lists
  - [ ] Pagination/infinite scroll for large datasets
  - [ ] Keys properly used in lists
  - [ ] Unnecessary component re-renders avoided
  - [ ] Production builds used (no dev mode)

- [ ] **Memory Management**
  - [ ] Event listeners cleaned up
  - [ ] Timers/intervals cleared
  - [ ] Memory leaks checked and fixed
  - [ ] Large objects released when not needed
  - [ ] DOM references not held unnecessarily

**Notes**: [Any JavaScript-specific considerations]

---

### 1.4 Network & Caching

- [ ] **HTTP/2 or HTTP/3**
  - [ ] HTTP/2 enabled on server
  - [ ] Connection reuse leveraged
  - [ ] Server push used appropriately (if applicable)

- [ ] **Compression**
  - [ ] Gzip/Brotli compression enabled
  - [ ] Text assets compressed
  - [ ] Compression levels optimized

- [ ] **Caching**
  - [ ] Cache headers properly configured
  - [ ] Service workers implemented (PWA)
  - [ ] Static assets have long cache times
  - [ ] Cache-busting for changed assets (fingerprinting)
  - [ ] CDN caching configured
  - [ ] Browser caching optimized

- [ ] **Requests**
  - [ ] Number of requests minimized
  - [ ] Request/response sizes minimized
  - [ ] Unnecessary requests eliminated
  - [ ] API calls batched where possible
  - [ ] GraphQL instead of REST (if beneficial)

**Notes**: [Any network-specific considerations]

---

## 2. Backend Performance

### 2.1 API Performance

- [ ] **Response Times**
  - [ ] API response time < 200ms (p95)
  - [ ] No endpoints exceed 500ms (p99)
  - [ ] Timeouts configured appropriately
  - [ ] Slow queries identified and optimized

- [ ] **API Design**
  - [ ] Pagination implemented for lists
  - [ ] Field selection supported (sparse fieldsets)
  - [ ] Data overfetching avoided
  - [ ] N+1 query problem solved
  - [ ] GraphQL dataloaders used (if applicable)

- [ ] **Caching**
  - [ ] Response caching implemented
  - [ ] Cache keys properly designed
  - [ ] Cache invalidation strategy defined
  - [ ] CDN caching for static responses
  - [ ] HTTP caching headers set

**Notes**: [Any API-specific considerations]

---

### 2.2 Database Performance

- [ ] **Query Optimization**
  - [ ] Indexes created for common queries
  - [ ] Query plans analyzed (EXPLAIN)
  - [ ] Slow queries identified and fixed
  - [ ] N+1 queries eliminated
  - [ ] Unnecessary joins avoided
  - [ ] Query results paginated

- [ ] **Data Access**
  - [ ] Connection pooling configured
  - [ ] Query batching used where appropriate
  - [ ] Read replicas used for read-heavy workloads
  - [ ] Caching layer (Redis, Memcached) implemented
  - [ ] Database query cache enabled

- [ ] **Schema Design**
  - [ ] Proper normalization/denormalization balance
  - [ ] Indexes on foreign keys
  - [ ] Composite indexes for multi-column queries
  - [ ] Appropriate data types used
  - [ ] Large text/blob fields separated (if needed)

**Notes**: [Any database-specific considerations]

---

### 2.3 Server & Infrastructure

- [ ] **Server Configuration**
  - [ ] Server properly sized for load
  - [ ] Auto-scaling configured
  - [ ] Load balancing configured
  - [ ] Keep-alive connections enabled
  - [ ] Compression enabled (gzip/brotli)

- [ ] **Code Optimization**
  - [ ] Algorithms optimized (time complexity)
  - [ ] Memory usage optimized (space complexity)
  - [ ] Synchronous blocking operations avoided
  - [ ] Async/await used appropriately
  - [ ] Thread pools configured properly

- [ ] **Resource Management**
  - [ ] File handles properly closed
  - [ ] Database connections released
  - [ ] Memory leaks fixed
  - [ ] CPU-intensive operations optimized
  - [ ] Background job processing for heavy tasks

**Notes**: [Any server-specific considerations]

---

## 3. Performance Monitoring

### 3.1 Metrics Collection

- [ ] **Real User Monitoring (RUM)**
  - [ ] Core Web Vitals tracked (LCP, FID, CLS)
  - [ ] Custom metrics tracked
  - [ ] Performance API used
  - [ ] User timing marks/measures
  - [ ] RUM tool integrated (Google Analytics, Sentry, etc.)

- [ ] **Synthetic Monitoring**
  - [ ] Lighthouse CI in build pipeline
  - [ ] WebPageTest scheduled monitoring
  - [ ] Performance budget defined
  - [ ] Performance tests automated

- [ ] **Backend Monitoring**
  - [ ] APM tool integrated (New Relic, Datadog, etc.)
  - [ ] Response times monitored
  - [ ] Error rates monitored
  - [ ] Database query performance monitored
  - [ ] Custom metrics tracked

**Notes**: [Any monitoring-specific considerations]

---

### 3.2 Alerts & Thresholds

- [ ] **Performance Alerts**
  - [ ] Alerts on performance regressions
  - [ ] Alerts on error rate increases
  - [ ] Alerts on resource exhaustion
  - [ ] Alert thresholds defined

- [ ] **Performance Budgets**
  - [ ] Bundle size budget: [XX KB]
  - [ ] Image size budget: [XX KB]
  - [ ] LCP budget: < 2.5s
  - [ ] FID budget: < 100ms
  - [ ] CLS budget: < 0.1
  - [ ] API response budget: < 200ms

**Notes**: [Any alerting-specific considerations]

---

## 4. Mobile Performance

- [ ] **Mobile Optimization**
  - [ ] Responsive design implemented
  - [ ] Touch targets appropriately sized (44×44px)
  - [ ] Mobile-first approach used
  - [ ] Adaptive loading based on network quality
  - [ ] Service worker for offline support
  - [ ] Progressive Web App features utilized

- [ ] **Network Awareness**
  - [ ] Network Information API used
  - [ ] Reduced data mode supported
  - [ ] Content adapted for slow connections
  - [ ] Essential content prioritized on 3G

**Notes**: [Any mobile-specific considerations]

---

## 5. Testing & Validation

### 5.1 Performance Testing

- [ ] **Load Testing**
  - [ ] Expected load traffic simulated
  - [ ] Peak load traffic tested
  - [ ] Stress testing performed
  - [ ] No performance degradation under load

- [ ] **Performance Benchmarks**
  - [ ] Lighthouse score 90+ (Performance)
  - [ ] WebPageTest performance grade A/B
  - [ ] Core Web Vitals pass
  - [ ] No console errors affecting performance

- [ ] **Profile Analysis**
  - [ ] Chrome DevTools Performance profile analyzed
  - [ ] Long tasks identified and fixed
  - [ ] Render-blocking resources identified
  - [ ] Memory leaks checked with heap snapshots

**Notes**: [Any testing-specific considerations]

---

### 5.2 Tool Results

**Lighthouse Scores**:
- Performance: [XX]/100
- Accessibility: [XX]/100
- Best Practices: [XX]/100
- SEO: [XX]/100

**WebPageTest Results**:
- First Byte Time: [XXX ms]
- Start Render: [XXX ms]
- Speed Index: [XXXX]
- LCP: [XXX ms]

**Core Web Vitals**:
- LCP: [XXX ms] (target < 2.5s)
- FID: [XXX ms] (target < 100ms)
- CLS: [0.XX] (target < 0.1)

**API Performance**:
- p50: [XXX ms]
- p95: [XXX ms]
- p99: [XXX ms]

**Notes**: [Tool results and analysis]

---

## 6. Optimization Checklist

- [ ] **Critical Path Optimization**
  - [ ] Critical CSS inlined
  - [ ] Critical JS inlined or preloaded
  - [ ] Fonts preloaded
  - [ ] Resource hints used

- [ ] **Code Optimization**
  - [ ] Minification enabled
  - [ ] Compression enabled
  - [ ] Tree shaking enabled
  - [ ] Code splitting implemented
  - [ ] Lazy loading implemented

- [ ] **Asset Optimization**
  - [ ] Images optimized
  - [ ] Modern image formats used
  - [ ] Responsive images implemented
  - [ ] Videos optimized

- [ ] **Caching Strategy**
  - [ ] Client-side caching configured
  - [ ] Server-side caching configured
  - [ ] CDN caching configured
  - [ ] Service worker caching implemented

- [ ] **Database Optimization**
  - [ ] Indexes created
  - [ ] Queries optimized
  - [ ] Connection pooling configured
  - [ ] Query caching enabled

---

## Sign-Off

### Performance Review

**Reviewed By**: {{REVIEWER_NAME}}  
**Date**: {{DATE}}  
**Status**: [Approved | Needs Revision | Blocked]

**Comments**:
[Performance reviewer comments]

### Performance Issues Identified

| Issue | Impact | Optimization | Status |
|-------|--------|-------------|--------|
| [Issue description] | [High/Med/Low] | [How optimized] | [Open/Resolved] |

### Performance Achievements

- **Lighthouse Score**: [XX]/100
- **LCP**: [XXX ms] (target: < 2.5s)
- **FID**: [XXX ms] (target: < 100ms)
- **CLS**: [0.XX] (target: < 0.1)
- **API p95**: [XXX ms] (target: < 200ms)

### Approval

- [ ] All performance targets met
- [ ] Critical performance issues resolved
- [ ] Performance testing completed
- [ ] Monitoring configured
- [ ] Approved for deployment

**Approver**: {{APPROVER_NAME}}  
**Signature**: ___________________  
**Date**: {{DATE}}

---

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- Project constitution: `.specify/memory/constitution.md`

---

**Notes:**
- This checklist must be completed before deployment
- All items marked as not applicable must include justification
- Performance budgets should be defined and enforced
- Regular performance testing recommended post-deployment
- Consider A/B testing for significant optimizations

*Last updated: {{DATE}}*
