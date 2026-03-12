# Accessibility Checklist: {{FEATURE_NAME}}

**Feature ID**: {{FEATURE_ID}}  
**Based on**: specs/{{FEATURE_ID}}/spec.md and specs/{{FEATURE_ID}}/plan.md  
**Reviewer**: {{REVIEWER_NAME}}  
**Date**: {{DATE}}  
**Status**: {{STATUS}}

---

## Overview

This checklist ensures conformance to **WCAG 2.1 Level AA** standards. All items must be verified for web interfaces, mobile apps, and interactive components.

**Target Compliance**: WCAG 2.1 Level AA  
**Applicable To**: [Web | Mobile | Desktop | All]  
**User Impact**: [High | Medium | Low]

---

## 1. Perceivable

### 1.1 Text Alternatives (WCAG 1.1)

- [ ] **Images**
  - [ ] All images have appropriate `alt` text
  - [ ] Decorative images have empty `alt=""` or `role="presentation"`
  - [ ] Complex images (charts, diagrams) have detailed descriptions
  - [ ] Image text alternatives convey same information
  - [ ] Icons have accessible labels
  - [ ] Logos have appropriate alt text

- [ ] **Non-Text Content**
  - [ ] Audio has transcripts
  - [ ] Video has captions/subtitles
  - [ ] Video has audio descriptions (if applicable)
  - [ ] Interactive controls have text labels
  - [ ] CAPTCHAs have accessible alternatives

**Notes**: [Any specific accessibility considerations for non-text content]

---

### 1.2 Time-Based Media (WCAG 1.2)

- [ ] **Audio-Only Content**
  - [ ] Transcripts provided for audio-only content
  - [ ] Transcripts are accurate and complete

- [ ] **Video Content**
  - [ ] Captions provided for all video (synchronized)
  - [ ] Audio descriptions provided for important visual content
  - [ ] Media player controls are keyboard accessible
  - [ ] No auto-playing audio (or user can stop it)

**Notes**: [Any media-specific considerations]

---

### 1.3 Adaptable (WCAG 1.3)

- [ ] **Semantic HTML**
  - [ ] Proper heading hierarchy (h1 → h2 → h3, no skips)
  - [ ] Lists use `<ul>`, `<ol>`, `<dl>` elements
  - [ ] Forms use `<label>`, `<fieldset>`, `<legend>`
  - [ ] Tables use `<th>`, `<caption>`, `scope` attributes
  - [ ] Semantic HTML5 elements used (`<nav>`, `<main>`, `<article>`, etc.)
  - [ ] ARIA landmarks used appropriately

- [ ] **Structure & Relationships**
  - [ ] Content order is logical in DOM
  - [ ] Programmatic relationships defined (labels, descriptions)
  - [ ] Form inputs associated with labels (`for` attribute)
  - [ ] Error messages associated with fields (`aria-describedby`)
  - [ ] Related form controls grouped (`<fieldset>`)

- [ ] **Meaningful Sequence**
  - [ ] Reading order makes sense with CSS off
  - [ ] Tab order is logical
  - [ ] Flexbox/Grid order doesn't break logical sequence

- [ ] **Sensory Characteristics**
  - [ ] Instructions don't rely solely on shape, size, position
  - [ ] Instructions don't rely solely on sound
  - [ ] Multi-sensory cues provided (color + icon, color + text)

**Notes**: [Any structure-specific considerations]

---

### 1.4 Distinguishable (WCAG 1.4)

- [ ] **Color Contrast** ✅
  - [ ] Normal text: Minimum 4.5:1 contrast ratio
  - [ ] Large text (18pt+): Minimum 3:1 contrast ratio
  - [ ] UI components: Minimum 3:1 contrast ratio
  - [ ] Graphical objects: Minimum 3:1 contrast ratio
  - [ ] Tested with contrast checker tool

- [ ] **Use of Color**
  - [ ] Color is not the only visual means of conveying information
  - [ ] Error messages have icons or text in addition to red color
  - [ ] Links distinguishable without relying solely on color
  - [ ] Charts/graphs have patterns in addition to colors

- [ ] **Audio Control**
  - [ ] Auto-playing audio can be paused/stopped
  - [ ] Audio doesn't auto-play for more than 3 seconds

- [ ] **Resize Text**
  - [ ] Text can be resized to 200% without loss of content/functionality
  - [ ] Layout doesn't break at 200% zoom
  - [ ] No horizontal scrolling at 200% zoom (responsive design)

- [ ] **Images of Text**
  - [ ] Real text used instead of images of text (except logos)
  - [ ] If images of text used, essential or customizable

- [ ] **Reflow**
  - [ ] Content reflows at 320px width (mobile)
  - [ ] No horizontal scrolling at 400% zoom
  - [ ] No loss of content or functionality

- [ ] **Non-Text Contrast**
  - [ ] UI components have 3:1 contrast against adjacent colors
  - [ ] Focus indicators clearly visible

- [ ] **Text Spacing**
  - [ ] Content adapts to increased text spacing
  - [ ] Line height at least 1.5x font size
  - [ ] Paragraph spacing at least 2x font size
  - [ ] No loss of content when spacing increased

- [ ] **Content on Hover/Focus**
  - [ ] Tooltips/popovers dismissible (ESC key)
  - [ ] Tooltips/popovers hoverable (can move pointer over them)
  - [ ] Tooltips/popovers persistent (don't disappear automatically)

**Notes**: [Any visual design-specific considerations]

---

## 2. Operable

### 2.1 Keyboard Accessible (WCAG 2.1)

- [ ] **Keyboard Operation** ✅
  - [ ] All functionality available via keyboard
  - [ ] No keyboard traps (can navigate in and out)
  - [ ] Tab order is logical and follows visual flow
  - [ ] Custom widgets keyboard accessible
  - [ ] Keyboard shortcuts documented

- [ ] **No Keyboard Trap**
  - [ ] Users can navigate away from all components with keyboard only
  - [ ] Modal dialogs closeable with ESC key
  - [ ] Dropdowns closeable with ESC key

- [ ] **Keyboard Shortcuts**
  - [ ] Shortcuts can be disabled or remapped
  - [ ] Shortcuts only active when component has focus
  - [ ] Shortcuts don't use only letter/number (unless in text input)

**Notes**: [Any keyboard navigation-specific considerations]

---

### 2.2 Enough Time (WCAG 2.2)

- [ ] **Timing Adjustable**
  - [ ] Users can turn off, adjust, or extend time limits
  - [ ] Warning before timeout with option to extend
  - [ ] Sessions don't timeout without warning

- [ ] **Pause, Stop, Hide**
  - [ ] Auto-updating content can be paused/stopped
  - [ ] Carousels have pause button
  - [ ] Animations can be paused
  - [ ] Live regions don't update too frequently

- [ ] **No Timing**
  - [ ] Time limits only when essential
  - [ ] 20+ hour time limit for essential activities

**Notes**: [Any timing-specific considerations]

---

### 2.3 Seizures and Physical Reactions (WCAG 2.3)

- [ ] **Three Flashes or Below**
  - [ ] No content flashes more than 3 times per second
  - [ ] Flashing elements avoid red-blue combinations
  - [ ] Users can disable animations

- [ ] **Animation from Interactions**
  - [ ] Motion animation can be disabled
  - [ ] `prefers-reduced-motion` CSS media query respected
  - [ ] Essential animations only

**Notes**: [Any animation-specific considerations]

---

### 2.4 Navigable (WCAG 2.4)

- [ ] **Bypass Blocks**
  - [ ] "Skip to main content" link provided
  - [ ] Proper heading structure allows navigation
  - [ ] ARIA landmarks used (`main`, `navigation`, `complementary`, etc.)

- [ ] **Page Titled**
  - [ ] Every page has descriptive `<title>`
  - [ ] Title describes page topic or purpose
  - [ ] Title is unique per page

- [ ] **Focus Order**
  - [ ] Focus order is logical
  - [ ] Tab order follows visual layout
  - [ ] Custom tab order (tabindex) used only when necessary

- [ ] **Link Purpose**
  - [ ] Link text describes destination
  - [ ] No "click here" or "read more" without context
  - [ ] Links distinguishable from surrounding text
  - [ ] Icon-only links have accessible labels

- [ ] **Multiple Ways**
  - [ ] Multiple ways to find pages (menu, search, sitemap)
  - [ ] Breadcrumbs provided (if applicable)

- [ ] **Headings and Labels**
  - [ ] Headings describe topic/purpose
  - [ ] Form labels describe purpose
  - [ ] Labels positioned correctly

- [ ] **Focus Visible** ✅
  - [ ] Keyboard focus indicator clearly visible
  - [ ] Focus indicator has sufficient contrast (3:1)
  - [ ] Focus indicator not removed with `outline: none`
  - [ ] Custom focus styles meet contrast requirements

**Notes**: [Any navigation-specific considerations]

---

### 2.5 Input Modalities (WCAG 2.5)

- [ ] **Pointer Gestures**
  - [ ] All functionality available with single pointer
  - [ ] Multi-point gestures have alternatives (pinch-zoom → buttons)
  - [ ] Path-based gestures have alternatives (swipe → buttons)

- [ ] **Pointer Cancellation**
  - [ ] Click action on "up" event (not "down")
  - [ ] Ability to abort or undo accidental clicks
  - [ ] Drag-and-drop has keyboard alternative

- [ ] **Label in Name**
  - [ ] Visible label text included in accessible name
  - [ ] Icon buttons have accessible names
  - [ ] Speech recognition users can activate by visible label

- [ ] **Motion Actuation**
  - [ ] Functionality relying on device motion has alternative
  - [ ] Shaking device, tilting device functions have button alternatives
  - [ ] Motion activation can be disabled

- [ ] **Target Size**
  - [ ] Touch targets at least 44×44px
  - [ ] Sufficient spacing between targets
  - [ ] Exception: inline text links

**Notes**: [Any input-specific considerations]

---

## 3. Understandable

### 3.1 Readable (WCAG 3.1)

- [ ] **Language of Page**
  - [ ] Page language set with `lang` attribute
  - [ ] Correct language codes used (en, es, fr, etc.)

- [ ] **Language of Parts**
  - [ ] Content in different language marked with `lang` attribute
  - [ ] Quotes in foreign language have `lang` attribute

**Notes**: [Any language-specific considerations]

---

### 3.2 Predictable (WCAG 3.2)

- [ ] **On Focus**
  - [ ] Focus doesn't trigger unexpected context changes
  - [ ] No auto-submitting forms on focus
  - [ ] No automatic navigation on focus

- [ ] **On Input**
  - [ ] Input doesn't trigger unexpected context changes
  - [ ] Changes explained before they occur
  - [ ] Submit buttons required (no auto-submit)

- [ ] **Consistent Navigation**
  - [ ] Navigation menus in same order across pages
  - [ ] Common UI elements consistently placed

- [ ] **Consistent Identification**
  - [ ] Icons/buttons with same function have same labels
  - [ ] Same icons used consistently

**Notes**: [Any predictability-specific considerations]

---

### 3.3 Input Assistance (WCAG 3.3)

- [ ] **Error Identification**
  - [ ] Errors clearly identified
  - [ ] Error messages describe the problem
  - [ ] Errors announced to screen readers (`aria-live`, `role="alert"`)
  - [ ] Errors associated with fields (`aria-describedby`)

- [ ] **Labels or Instructions**
  - [ ] Labels provided for all inputs
  - [ ] Required fields marked (not just with asterisk)
  - [ ] Input format explained (date format, phone format)
  - [ ] Instructions provided where needed

- [ ] **Error Suggestion**
  - [ ] Suggestions provided for fixing errors
  - [ ] Suggestions specific and helpful
  - [ ] Error correction examples provided

- [ ] **Error Prevention (Legal, Financial, Data)**
  - [ ] Submissions reversible, verifiable, or confirmed
  - [ ] Confirmation step for important actions
  - [ ] Ability to review before final submission

**Notes**: [Any form-specific considerations]

---

## 4. Robust

### 4.1 Compatible (WCAG 4.1)

- [ ] **Parsing**
  - [ ] HTML validates (no major errors)
  - [ ] Start/end tags properly used
  - [ ] IDs are unique
  - [ ] No duplicate attributes

- [ ] **Name, Role, Value**
  - [ ] UI components have accessible names
  - [ ] Roles properly defined for custom widgets
  - [ ] States communicated (checked, expanded, selected)
  - [ ] Custom widgets use ARIA appropriately
  - [ ] Form controls have labels
  - [ ] Status messages announced (`role="status"`, `aria-live`)

**Notes**: [Any markup-specific considerations]

---

## 5. ARIA Usage

- [ ] **Proper ARIA Implementation**
  - [ ] ARIA used only when semantic HTML insufficient
  - [ ] ARIA roles appropriate to element
  - [ ] ARIA attributes valid for role
  - [ ] `aria-label`, `aria-labelledby`, `aria-describedby` used correctly
  - [ ] `aria-hidden` doesn't hide focusable elements
  - [ ] Live regions used appropriately
  - [ ] Dynamic content changes announced

- [ ] **ARIA Patterns**
  - [ ] Dialogs follow modal pattern
  - [ ] Dropdowns follow menu/disclosure pattern
  - [ ] Tabs follow tabs pattern
  - [ ] Custom widgets follow WAI-ARIA Authoring Practices

**Notes**: [Any ARIA-specific considerations]

---

## 6. Screen Reader Testing

- [ ] **Screen Reader Compatibility**
  - [ ] Tested with NVDA (Windows) or JAWS
  - [ ] Tested with VoiceOver (macOS/iOS)
  - [ ] Tested with TalkBack (Android)
  - [ ] All content announced correctly
  - [ ] Navigation works with screen reader
  - [ ] Interactive elements announced with role/state

**Notes**: [Screen reader testing results]

---

## 7. Assistive Technology Testing

- [ ] **Browser Testing**
  - [ ] Tested with keyboard only navigation
  - [ ] Tested with browser zoom (200%, 400%)
  - [ ] Tested with browser text spacing override
  - [ ] Tested with high contrast mode

- [ ] **Device Testing**
  - [ ] Tested on mobile devices
  - [ ] Tested with mobile screen readers
  - [ ] Tested with voice control (if applicable)

**Notes**: [Testing results]

---

## 8. Tools & Validation

- [ ] **Automated Testing**
  - [ ] axe DevTools (browser extension) - no violations
  - [ ] WAVE (browser extension) - no errors
  - [ ] Lighthouse accessibility score 90+
  - [ ] Pa11y CI in build pipeline
  - [ ] ESLint jsx-a11y rules enforced

- [ ] **Manual Testing**
  - [ ] Keyboard navigation tested
  - [ ] Screen reader tested
  - [ ] Color contrast verified
  - [ ] Focus indicators verified
  - [ ] Zoom/reflow tested

**Notes**: [Tool results and scores]

---

## Sign-Off

### Accessibility Review

**Reviewed By**: {{REVIEWER_NAME}}  
**Date**: {{DATE}}  
**Status**: [Approved | Needs Revision | Blocked]

**WCAG Compliance**: [Level A | Level AA | Level AAA]

**Comments**:
[Accessibility reviewer comments]

### Accessibility Issues Identified

| Issue | WCAG Criterion | Severity | Mitigation | Status |
|-------|----------------|----------|------------|--------|
| [Issue description] | [1.4.3, etc.] | [Critical/High/Med/Low] | [How fixed] | [Open/Resolved] |

### Approval

- [ ] All WCAG 2.1 Level AA criteria met
- [ ] Critical accessibility issues resolved
- [ ] Screen reader testing completed
- [ ] Documentation reviewed
- [ ] Approved for deployment

**Approver**: {{APPROVER_NAME}}  
**Signature**: ___________________  
**Date**: {{DATE}}

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- Project constitution: `.specify/memory/constitution.md`

---

**Notes:**
- This checklist must be completed before deployment
- All items marked as not applicable must include justification
- Consult accessibility specialist for complex components
- Automated tools catch ~30-40% of issues - manual testing essential
- Test with actual users with disabilities when possible

*Last updated: {{DATE}}*
