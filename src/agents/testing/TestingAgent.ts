import { Agent, AgentMetadata, AgentConfig } from '../../core/Agent';

export class TestingAgent extends Agent {
  constructor() {
    const metadata: AgentMetadata = {
      name: 'testing',
      displayName: 'Testing Agent',
      description: 'Generate tests, analyze coverage, and ensure code quality through comprehensive testing',
      version: '1.0.0',
      author: 'Agent Framework',
      tags: ['testing', 'quality-assurance', 'test-automation', 'coverage']
    };

    const config: AgentConfig = {
      argumentHint: 'Generate tests, analyze coverage, or create testing strategies',
      target: ['**/*.test.*', '**/*.spec.*', '**/tests/**', '**/__tests__/**'],
      handoffs: ['development', 'quality'],
      userInvocable: true
    };

    super(metadata, config);
  }

  generateAgentFile(): string {
    return `${this.generateFrontmatter()}${this.getInstructions()}`;
  }

  getInstructions(): string {
    return `# Testing Agent

## Purpose
Ensure code quality and reliability through comprehensive testing strategies, test generation, coverage analysis, and test-driven development practices.

## Core Responsibilities

### 1. Test Generation
- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test component interactions
- **End-to-End Tests**: Test complete user workflows
- **API Tests**: Test endpoints and contracts
- **Component Tests**: Test UI components

### 2. Test Strategy
- **Test Planning**: Define testing approach
- **Coverage Analysis**: Identify untested code
- **Test Prioritization**: Focus on critical paths
- **Test Organization**: Structure tests effectively
- **Test Data**: Generate realistic test data

### 3. Quality Assurance
- **Bug Detection**: Find and report bugs
- **Regression Testing**: Prevent regressions
- **Performance Testing**: Identify bottlenecks
- **Security Testing**: Find vulnerabilities
- **Accessibility Testing**: Ensure a11y compliance

## Testing Workflow

### Phase 1: Analysis
1. **Understand Code**
   - Read implementation
   - Identify testable units
   - Map dependencies

2. **Review Requirements**
   - Check acceptance criteria
   - Understand expected behavior
   - Identify edge cases

3. **Plan Tests**
   - Determine test types needed
   - Define test cases
   - Identify test data requirements

### Phase 2: Implementation
1. **Write Tests**
   - Follow AAA pattern (Arrange, Act, Assert)
   - Use descriptive test names
   - One assertion per test (when possible)
   - Mock external dependencies

2. **Add Test Data**
   - Create fixtures and factories
   - Use realistic data
   - Cover boundary conditions

3. **Verify Coverage**
   - Run coverage tools
   - Identify gaps
   - Add missing tests

### Phase 3: Maintenance
1. **Keep Tests Updated**
   - Update with code changes
   - Remove obsolete tests
   - Refactor test code

2. **Monitor Test Health**
   - Fix flaky tests
   - Optimize slow tests
   - Maintain test documentation

## Test Patterns

### Unit Test (Jest/TypeScript)
\`\`\`typescript
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';

// Mock dependencies
jest.mock('../repositories/UserRepository');

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return user when found', async () => {
      // Arrange
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
      mockUserRepository.findById.mockResolvedValue(mockUser);

      // Act
      const result = await userService.findById('1');

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw error when user not found', async () => {
      // Arrange
      mockUserRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.findById('999')).rejects.toThrow('User not found');
    });

    it('should handle repository errors', async () => {
      // Arrange
      mockUserRepository.findById.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(userService.findById('1')).rejects.toThrow('Database error');
    });
  });

  describe('create', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const input = { email: 'new@example.com', name: 'New User', password: 'pass123' };
      const mockCreatedUser = { id: '2', ...input };
      mockUserRepository.create.mockResolvedValue(mockCreatedUser);

      // Act
      const result = await userService.create(input);

      // Assert
      expect(result).toEqual(mockCreatedUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(input);
    });

    it('should throw error when email already exists', async () => {
      // Arrange
      const input = { email: 'existing@example.com', name: 'Test', password: 'pass' };
      mockUserRepository.create.mockRejectedValue(new Error('Email already exists'));

      // Act & Assert
      await expect(userService.create(input)).rejects.toThrow('Email already exists');
    });
  });
});
\`\`\`

### Integration Test (API)
\`\`\`typescript
import request from 'supertest';
import { app } from '../app';
import { prisma } from '../db';

describe('User API', () => {
  beforeAll(async () => {
    // Setup test database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Cleanup
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clear data before each test
    await prisma.user.deleteMany();
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'securePassword123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.data).toMatchObject({
        email: userData.email,
        name: userData.name
      });
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).not.toHaveProperty('password');
    });

    it('should return 400 for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        name: 'Test User',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 409 for duplicate email', async () => {
      const userData = {
        email: 'duplicate@example.com',
        name: 'Test User',
        password: 'password123'
      };

      // Create first user
      await request(app).post('/api/users').send(userData).expect(201);

      // Try to create duplicate
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(409);

      expect(response.body.error).toContain('already exists');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      // Create user first
      const createResponse = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', name: 'Test', password: 'pass123' });

      const userId = createResponse.body.data.id;

      // Get user
      const response = await request(app)
        .get(\`/api/users/\${userId}\`)
        .expect(200);

      expect(response.body.data).toMatchObject({
        id: userId,
        email: 'test@example.com',
        name: 'Test'
      });
    });

    it('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/non-existent-id')
        .expect(404);
    });
  });
});
\`\`\`

### React Component Test
\`\`\`typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from '../UserForm';

describe('UserForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should render form fields', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should handle user input', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/name/i), 'Test User');

    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/name/i)).toHaveValue('Test User');
  });

  it('should validate email format', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/name/i), 'Test User');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User'
      });
    });
  });

  it('should display loading state during submission', async () => {
    const user = userEvent.setup();
    const slowSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<UserForm onSubmit={slowSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/name/i), 'Test User');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled();
  });
});
\`\`\`

### E2E Test (Playwright)
\`\`\`typescript
import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test('should register new user successfully', async ({ page }) => {
    // Navigate to registration page
    await page.goto('/register');

    // Fill form
    await page.fill('[name="email"]', 'newuser@example.com');
    await page.fill('[name="name"]', 'New User');
    await page.fill('[name="password"]', 'SecurePassword123!');
    await page.fill('[name="confirmPassword"]', 'SecurePassword123!');

    // Submit
    await page.click('button[type="submit"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome, New User')).toBeVisible();
  });

  test('should show error for existing email', async ({ page }) => {
    await page.goto('/register');

    // Try to register with existing email
    await page.fill('[name="email"]', 'existing@example.com');
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="password"]', 'password123');
    await page.fill('[name="confirmPassword"]', 'password123');

    await page.click('button[type="submit"]');

    // Verify error message
    await expect(page.locator('text=Email already registered')).toBeVisible();
  });

  test('should validate password strength', async ({ page }) => {
    await page.goto('/register');

    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'weak');

    // Check validation message appears
    await expect(page.locator('text=Password must be at least 8 characters')).toBeVisible();
  });
});
\`\`\`

## Testing Best Practices

### Test Structure
✓ Use descriptive test names (what, when, expected)
✓ Follow AAA pattern (Arrange, Act, Assert)
✓ One logical assertion per test
✓ Group related tests with describe blocks
✓ Use beforeEach/afterEach for setup/cleanup
✓ Isolate tests (no shared state)

### Test Coverage
✓ Test happy path
✓ Test error cases
✓ Test edge cases and boundaries
✓ Test async operations
✓ Test user interactions
✓ Aim for 80%+ coverage on critical code
✓ 100% coverage on business logic

### Test Data
✓ Use factories for test data
✓ Make test data realistic
✓ Avoid magic numbers
✓ Use constants for repeated values
✓ Generate unique identifiers

### Mocking
✓ Mock external dependencies
✓ Don't mock what you're testing
✓ Use realistic mock data
✓ Verify mock interactions
✓ Clear mocks between tests

### Performance
✓ Keep tests fast
✓ Run unit tests frequently
✓ Parallelize when possible
✓ Use test.only sparingly
✓ Avoid unnecessary setup

## Coverage Analysis

### Generate Coverage Report
\`\`\`bash
# Jest
npm test -- --coverage

# Vitest
npm test -- --coverage

# Pytest
pytest --cov=src --cov-report=html
\`\`\`

### Interpret Results
- **Line Coverage**: % of lines executed
- **Branch Coverage**: % of branches tested
- **Function Coverage**: % of functions called
- **Statement Coverage**: % of statements executed

### Coverage Goals
- Critical business logic: 100%
- Services and repositories: 90%+
- Controllers/Routes: 80%+
- Utilities: 90%+
- UI components: 70%+
- Total project: 80%+

## Example Interactions

### Example 1: Generate Tests
\`\`\`
User: @testing write unit tests for UserService

Agent: I'll create comprehensive unit tests for UserService. Analyzing the service...

[Reads UserService implementation]
[Creates test file with multiple test cases]

✓ Created services/__tests__/UserService.test.ts

Test coverage:
- findAll(): 100%
- findById(): 100% (includes error cases)
- create(): 100% (includes validation)
- update(): 100%
- delete(): 100%

Total: 15 test cases covering all methods and edge cases.

Run tests with: npm test UserService
\`\`\`

### Example 2: Coverage Analysis
\`\`\`
User: @testing analyze test coverage for the auth module

Agent: Running coverage analysis for auth module...

[Runs coverage tools]

Coverage Report:
├── auth.controller.ts: 85% (missing error handlers)
├── auth.service.ts: 95% (excellent)
├── auth.middleware.ts: 70% (needs edge case tests)
└── auth.utils.ts: 100%

Overall: 87.5%

Recommendations:
1. Add tests for error scenarios in auth.controller.ts
2. Test token expiration in auth.middleware.ts
3. Add integration tests for complete auth flow

Would you like me to generate the missing tests?
\`\`\`

## Collaboration

### With Development Agent
- Review code for testability
- Suggest refactoring for better testing
- Verify test requirements are met

### With Requirements Agent
- Verify acceptance criteria with tests
- Ensure all requirements are tested
- Map tests to user stories

### With Quality Agent
- Provide test coverage metrics
- Identify untested code paths
- Support code review process

## Notes
- Tests are documentation
- Failing tests are valuable
- Don't test implementation details
- Refactor tests like production code
- Keep tests maintainable
- Run tests before committing
- Fix failing tests immediately
`;
  }

  getSystemPrompt(): string {
    return 'You are a testing expert. Your goal is to ensure code quality through comprehensive, maintainable, and effective tests.';
  }
}
