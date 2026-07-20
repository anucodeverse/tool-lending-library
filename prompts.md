# 🧠 Development Prompts & Problem-Solving Log

## Tool Lending Library

This document contains the important engineering prompts used during the development process.

The purpose of these prompts is to:
- Analyze requirements
- Solve implementation doubts
- Debug errors
- Improve code quality
- Validate production readiness
- Follow software engineering best practices

---

# 1. Requirement Analysis Prompts

## Understanding Feature Requirements

**Prompt:**

```
Analyze the given company requirements for a Feature Complete CRUD application.

Identify:
1. Required features
2. Happy path scenarios
3. Unhappy path scenarios
4. Edge cases
5. Non-functional requirements
6. Testing checklist

Explain how each requirement should be implemented in a production application.
```

**Purpose:**

Used to convert business requirements into technical tasks.

---

# 2. Application Architecture Prompts

## Planning Project Structure

**Prompt:**

```
Suggest a professional full-stack project structure for a React + Node.js CRUD application.

Requirements:
- Authentication
- Protected routes
- CRUD operations
- API services
- Database models
- Error handling
- Scalable folder organization

Explain why each folder is required.
```

**Purpose:**

Used to create a maintainable project architecture.

---

# 3. React Debugging Prompts

## Fixing Export Errors

**Problem:**

```
Uncaught SyntaxError:
The requested module does not provide an export named 'default'
```

**Prompt:**

```
Analyze this React import/export error.

Check:
- Component export
- Default export
- Named export
- File path issues

Explain the exact reason and provide the correct solution.
```

**Purpose:**

Used to solve module import/export issues.

---

# 4. React Hooks Error Prompts

## Fixing useEffect Problems

**Problem:**

```
Calling setState synchronously within an effect can trigger cascading renders
```

**Prompt:**

```
Analyze this React ESLint error:

react-hooks/set-state-in-effect

Explain:
1. Why this error occurs
2. Whether the code is functionally wrong
3. The recommended React approach
4. Provide the production-level fix.
```

**Purpose:**

Used to improve React hook usage and avoid unnecessary renders.

---

# 5. Fast Refresh Error Prompts

## Context Export Issue

**Problem:**

```
Fast refresh only works when a file only exports components.
```

**Prompt:**

```
Analyze why React Fast Refresh complains when a context file exports:
- Context
- Provider component
- Custom hooks

Suggest the best folder structure following React production practices.
```

**Purpose:**

Used to separate React contexts and hooks correctly.

---

# 6. Authentication Logic Prompts

## JWT Authentication Review

**Prompt:**

```
Review this React authentication implementation.

Check:
- JWT token storage
- User persistence
- Login flow
- Logout flow
- Protected routes
- Security issues

Suggest improvements suitable for production applications.
```

**Purpose:**

Used to validate authentication implementation.

---

# 7. CRUD Logic Validation Prompts

## Reviewing CRUD Implementation

**Prompt:**

```
Review this CRUD implementation.

Verify:
- Create operation
- Fetch operation
- Update operation
- Delete operation
- Loading states
- Error handling
- User feedback messages

Identify missing production-level improvements.
```

**Purpose:**

Used to ensure complete CRUD functionality.

---

# 8. Form Validation Prompts

## Improving Forms

**Prompt:**

```
Review this React form component.

Improve:
- Required field validation
- Error messages
- Accessibility
- Input handling
- Security
- User experience

Make it production ready.
```

**Purpose:**

Used for improving form quality.

---

# 9. Security Prompts

## Preventing XSS

**Prompt:**

```
Review user input handling in this React application.

Check:
- XSS vulnerabilities
- Unsafe HTML rendering
- Input sanitization
- Data validation

Suggest secure implementation.
```

**Purpose:**

Used to improve application security.

---

# 10. Accessibility Prompts

## Lighthouse Accessibility Improvement

**Prompt:**

```
Analyze this React component for accessibility issues.

Check:
- ARIA labels
- Keyboard navigation
- Semantic HTML
- Form accessibility
- Screen reader support

Suggest changes to achieve a high Lighthouse accessibility score.
```

**Purpose:**

Used to satisfy accessibility requirements.

---

# 11. UI Design Improvement Prompts

## Production UI Review

**Prompt:**

```
Review this CSS/UI design.

Improve:
- Professional appearance
- Responsive design
- Corporate design system
- Consistent spacing
- Mobile compatibility
- User experience

Do not change functionality.
```

**Purpose:**

Used to transform basic UI into production-quality design.

---

# 12. Responsive Design Prompts

## Mobile Compatibility

**Prompt:**

```
Analyze this React page CSS.

Check:
- Desktop responsiveness
- Tablet layout
- Mobile layout
- Overflow problems
- Navigation issues

Provide improvements.
```

**Purpose:**

Used for responsive testing.

---

# 13. Debugging Build Errors

## Production Build Failure

**Prompt:**

```
Analyze this Vite production build error.

Identify:
- Root cause
- File causing issue
- Required code changes
- Verification steps

Explain before providing the fix.
```

**Purpose:**

Used before deployment.

---

# 14. ESLint Cleanup Prompts

## Code Quality Review

**Prompt:**

```
Analyze this ESLint output.

For every warning/error:
1. Explain the reason
2. Identify affected file
3. Provide the correct fix
4. Ensure the solution follows React best practices.
```

**Purpose:**

Used to achieve clean production code.

---

# 15. Deployment Preparation Prompts

## Production Checklist

**Prompt:**

```
Review this full-stack project before deployment.

Check:
- Build success
- Environment variables
- Security
- API configuration
- GitHub readiness
- Deployment requirements

Provide a final checklist.
```

**Purpose:**

Used before publishing the application.

---

# 16. Code Review Prompt

## Final Engineering Review

**Prompt:**

```
Act as a senior software engineer reviewing this project.

Evaluate:
- Code quality
- Architecture
- Security
- Performance
- Accessibility
- Maintainability
- Production readiness

Give improvement suggestions.
```

**Purpose:**

Used for final project evaluation.

---

# Conclusion

These prompts were used as an engineering assistant during development to:

✅ Understand requirements  
✅ Debug implementation issues  
✅ Improve React architecture  
✅ Fix production errors  
✅ Improve security  
✅ Improve accessibility  
✅ Prepare the application for deployment
