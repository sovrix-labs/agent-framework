# Example Usage

This document provides real-world examples of using the Agent Framework.

## Example 1: Building a User Authentication System

### Step 1: Gather Requirements

**Command in VS Code Copilot Chat:**
```
@requirements gather requirements for a user authentication system with email/password and OAuth support
```

**Agent Response:**
The requirements agent will ask clarifying questions:
- Which OAuth providers? (Google, GitHub, Microsoft?)
- Password requirements? (length, complexity)
- Token type? (JWT, session-based)
- 2FA required?
- Password reset flow?

After answering, it creates `specs/auth-requirements.md`:

```markdown
# User Authentication System Requirements

## Overview
Implement secure user authentication with multiple sign-in methods.

## User Stories

### US-1: Email/Password Registration
As a new user
I want to register with email and password
So that I can create an account

**Acceptance Criteria:**
- [ ] Email validation (format check)
- [ ] Password strength requirements (8+ chars, uppercase, number, special)
- [ ] Email confirmation required
- [ ] Duplicate email prevention
- [ ] Secure password hashing (bcrypt)

### US-2: OAuth Sign-in
As a user
I want to sign in with Google or GitHub
So that I can access my account quickly

**Acceptance Criteria:**
- [ ] Google OAuth integration
- [ ] GitHub OAuth integration
- [ ] Account linking for existing emails
- [ ] Profile info fetched from provider

## Technical Specifications

### Endpoints
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/me
- POST /auth/oauth/google
- POST /auth/oauth/github

### Security Requirements
- JWT tokens with refresh mechanism
- HTTPS only
- CORS configuration
- Rate limiting (5 attempts per minute)
- Password hashing with bcrypt (cost factor 12)
- Token expiry (access: 15min, refresh: 7 days)
```

### Step 2: Implement the System

**Command:**
```
@development implement the authentication system based on specs/auth-requirements.md
```

**Agent Response:**
The development agent will:
1. Read the requirements
2. Check existing project structure
3. Implement the features

Creates:
- `src/controllers/AuthController.ts`
- `src/services/AuthService.ts`
- `src/middleware/auth.ts`
- `src/utils/jwt.ts`
- `src/validation/auth.schemas.ts`
- `src/routes/auth.routes.ts`

Example implementation snippet:
```typescript
// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { RegisterSchema, LoginSchema } from '../validation/auth.schemas';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const data = RegisterSchema.parse(req.body);
      const result = await this.authService.register(data);
      res.status(201).json({ 
        message: 'Registration successful. Please check your email.',
        data: result 
      });
    } catch (error) {
      if (error.message === 'Email already exists') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Registration failed' });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = LoginSchema.parse(req.body);
      const result = await this.authService.login(data);
      res.json({ data: result });
    } catch (error) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }
}
```

### Step 3: Generate Tests

**Command:**
```
@testing create comprehensive tests for the authentication system
```

**Agent Response:**
Creates test files:
- `src/__tests__/AuthService.test.ts` (unit tests)
- `src/__tests__/auth.api.test.ts` (integration tests)
- `src/__tests__/auth.e2e.test.ts` (e2e tests)

Example test snippet:
```typescript
describe('AuthService', () => {
  describe('register', () => {
    it('should successfully register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        name: 'Test User'
      };

      const result = await authService.register(userData);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(userData.email);
      expect(result).not.toHaveProperty('password');
    });

    it('should reject weak passwords', async () => {
      await expect(authService.register({
        email: 'test@example.com',
        password: 'weak',
        name: 'Test'
      })).rejects.toThrow('Password does not meet requirements');
    });

    it('should prevent duplicate email registration', async () => {
      await authService.register({
        email: 'duplicate@example.com',
        password: 'SecurePass123!',
        name: 'First User'
      });

      await expect(authService.register({
        email: 'duplicate@example.com',
        password: 'AnotherPass123!',
        name: 'Second User'
      })).rejects.toThrow('Email already exists');
    });
  });
});
```

### Step 4: Quality Review

**Command:**
```
@quality review the authentication implementation for security issues
```

**Agent Response:**
```
Security Analysis Report:

✅ Good Practices Found:
- Password hashing with bcrypt
- JWT tokens properly signed
- Input validation with Zod
- Rate limiting implemented
- HTTPS enforcement

⚠️ Issues Found:

1. MEDIUM: JWT Secret in Code (AuthService.ts:12)
   - Secret key should be in environment variables
   - Fix: Use process.env.JWT_SECRET

2. HIGH: No Email Verification (AuthService.ts:45)
   - Users can log in without verifying email
   - Fix: Add email verification check in login flow

3. LOW: Weak Token Expiry (jwt.ts:8)
   - Access token expires in 24h (too long)
   - Recommended: 15 minutes

Recommendations:
1. Move secrets to .env file immediately
2. Implement email verification flow
3. Add refresh token rotation
4. Implement account lockout after failed attempts
5. Add security headers (helmet)

Security Score: 7/10
```

### Step 5: Fix Issues

**Command:**
```
@development fix the security issues identified by @quality
```

The development agent implements the fixes:
- Moves secrets to environment variables
- Adds email verification flow
- Reduces token expiry time
- Implements account lockout
- Adds helmet for security headers

## Example 2: Building a REST API

### Complete Command Sequence

```
# 1. Requirements
@requirements create REST API spec for a todo list app with:
- CRUD operations for todos
- User authentication
- Todo sharing between users
- Due dates and reminders

# 2. Development
@development implement the todo API based on the requirements

# 3. Testing
@testing write unit and integration tests for the todo API

# 4. Quality
@quality review the implementation for performance and best practices

# 5. Iterate
@development optimize database queries based on @quality feedback
@testing add performance tests
@quality verify the improvements
```

## Example 3: Frontend Component Development

```
# 1. Requirements
@requirements design a reusable data table component with:
- Sorting
- Filtering
- Pagination
- Row selection
- Custom cell renderers

# 2. Development
@development implement the DataTable component in React with TypeScript

# 3. Testing
@testing write component tests using React Testing Library

# 4. Quality
@quality review for accessibility and performance
```

## Example 4: Refactoring Legacy Code

```
# 1. Analysis
@quality analyze the UserService class for code smells and issues

# 2. Requirements
@requirements document the refactoring plan based on @quality analysis

# 3. Development
@development refactor UserService to use repository pattern and dependency injection

# 4. Testing
@testing ensure all existing tests still pass and add missing test coverage

# 5. Verification
@quality verify the refactoring improved code quality metrics
```

## Example 5: Bug Investigation and Fix

```
# 1. Investigation
@development investigate why users are getting intermittent login failures

# Agent analyzes code and finds race condition

# 2. Requirements
@requirements document the bug and proposed solution

# 3. Fix
@development implement the fix with proper locking mechanism

# 4. Testing
@testing write tests to prevent regression of this bug

# 5. Verification
@quality verify the fix doesn't introduce new issues
```

## Example 6: Creating Custom Agents

If you need a specialized agent:

```bash
# Create deployment agent
acli create agent

# Name: deployment
# Description: Handle deployment and DevOps tasks
```

Edit `.github/agents/deployment/.agent.md`:
```markdown
---
name: deployment
description: Handle deployment and DevOps tasks
---

# Deployment Agent

## Purpose
Assist with deployment, CI/CD, and DevOps tasks.

## Instructions

When invoked with @deployment:
1. Check deployment configuration
2. Verify environment variables
3. Run deployment scripts
4. Monitor deployment status
5. Rollback if needed

## Workflows

### Deploy to Production
1. Run tests
2. Build production bundle
3. Deploy to cloud provider
4. Run smoke tests
5. Verify deployment

... (add your specific deployment procedures)
```

Now use it:
```
@deployment deploy the current version to staging
@deployment create a production deployment checklist
@deployment setup CI/CD pipeline for this project
```

## Tips for Effective Usage

1. **Be Specific**: Provide clear, detailed requests
2. **Iterate**: Use agents in sequence for complex tasks
3. **Context**: Reference files and previous work
4. **Verify**: Always review agent output
5. **Customize**: Tailor agents to your workflow
6. **Document**: Keep specifications updated

## Common Patterns

### Pattern 1: Feature Development Cycle
```
@requirements → @development → @testing → @quality
```

### Pattern 2: Bug Fix Cycle
```
@development (investigate) → @requirements (document) → 
@development (fix) → @testing (regression tests) → @quality (verify)
```

### Pattern 3: Refactoring Cycle
```
@quality (analyze) → @requirements (plan) → 
@development (refactor) → @testing (verify) → @quality (confirm)
```

### Pattern 4: Documentation Cycle
```
@requirements (specs) → @development (code) → 
@development (doc comments) → @quality (doc review)
```

Happy building! 🚀
