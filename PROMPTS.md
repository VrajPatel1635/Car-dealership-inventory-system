# PROMPTS

This document contains the AI prompts used during the development of this project, strictly following the structured format provided during the conversation.

---

# 1. MongoDB Configuration

**Task**: 
Configure MongoDB for the Express backend.

**Context**: 
The project already has a basic Express application with app.js and server.js. This commit is only for configuring the database connection.

**Requirements**:
- Install and configure Mongoose.
- Create a database connection utility inside src/config/db.js.
- Use dotenv to load environment variables.
- Add MONGODB_URI to .env.example.
- Connect to MongoDB before starting the server.
- If the database connection succeeds, start the server.
- If the database connection fails, log the error and exit the process.
- Keep the database configuration modular and reusable.

**Constraints**:
- Use JavaScript.
- Do not create any models.
- Do not create routes.
- Do not create controllers.
- Do not implement authentication.
- Do not add business logic.
- Keep the implementation simple and production-ready.

---

# 2. Testing Setup (Jest & Supertest)

**Task**: 
Configure the testing environment for the Express backend.

**Context**: 
The project already has a working Express application and MongoDB configuration. This commit should only prepare the project for Test-Driven Development.

**Requirements**:
- Install and configure Jest and Supertest.
- Create a jest.config.js file.
- Configure the package.json test scripts.
- Create src/tests/setup.js for shared test configuration.
- Ensure the Express app can be imported without starting the HTTP server.
- Add a simple placeholder test that verifies the testing setup is working.
- Keep the testing configuration clean and easy to extend.

**Constraints**:
- Use JavaScript.
- Do not create feature tests yet.
- Do not create models.
- Do not create routes.
- Do not implement authentication.
- Do not implement business logic.
- Keep the implementation minimal.

---

# 3. User Registration (Failing Test)

**Task**: 
Write the first failing test for user registration using Test-Driven Development.

**Context**: 
The project already has Express, MongoDB configuration, Jest, and Supertest set up. This is the first TDD cycle.

**Requirements**:
- Create a test for POST /api/auth/register.
- The test should send a valid name, email, and password.
- The expected behavior is that the endpoint returns a successful response for a valid registration.
- Do not implement the endpoint.
- Do not create controllers or services.
- The test should fail because the feature does not exist yet.

**Constraints**:
- Use Jest and Supertest.
- Keep the test simple and focused on a single behavior.
- Do not add validation tests.
- Do not test duplicate emails.
- Do not implement any production code.

---

# 4. User Registration (Implementation)

**Task**: 
Implement the minimum production code required to make the user registration test pass.

**Context**: 
A failing Jest and Supertest test already exists for POST /api/auth/register. This is the GREEN phase of the first TDD cycle.

**Requirements**:
- Create the User model.
- Create auth_routes.js, auth_controller.js, and auth_service.js.
- Implement POST /api/auth/register.
- Accept name, email, and password.
- Save the user to MongoDB.
- Return the response expected by the existing test.
- Do not return the password in the response.
- Keep the implementation minimal.

**Constraints**:
- Do not implement duplicate email checking.
- Do not hash passwords yet.
- Do not generate JWT tokens.
- Do not add input validation.
- Do not implement login.
- Do not add functionality beyond what is required to make the existing test pass.

---

# 5. Duplicate Email Protection (Failing Test)

**Task**: 
Write a failing test for duplicate email registration using Test-Driven Development.

**Context**: 
The project already supports successful user registration. The next behavior is preventing users from registering with an email that already exists.

**Requirements**:
- Write a Jest and Supertest test for POST /api/auth/register.
- Register a user successfully.
- Attempt to register another user with the same email.
- Expect the request to fail with an appropriate HTTP status code and error message.
- Do not modify the existing implementation.
- The test should fail because duplicate email handling has not been implemented yet.

**Constraints**:
- Do not implement production code.
- Do not add input validation tests.
- Do not implement password hashing.
- Keep the test focused on one behavior.

---

# 6. Duplicate Email Protection (Implementation)

**Task**: 
Implement duplicate email protection for user registration.

**Context**: 
The project already supports successful user registration. A failing Jest and Supertest test exists for duplicate email registration. This is the GREEN phase of the TDD cycle.

**Requirements**:
- Before creating a new user, check whether another user already exists with the same email.
- If the email already exists, return the HTTP status code expected by the existing test with an appropriate error message.
- If the email does not exist, continue with the existing registration flow.
- Modify only the code necessary to make the failing test pass.

**Constraints**:
- Do not implement password hashing.
- Do not implement JWT.
- Do not add input validation.
- Do not refactor unrelated code.
- Keep the implementation minimal.

---

# 7. Secure Authentication

**Task**: 
Implement secure user authentication.

**Context**: 
The backend already supports user registration and prevents duplicate email registration. Passwords are currently stored in plain text, and there is no login functionality.

**Requirements**:
- Install and configure bcrypt.
- Hash the user's password before saving it during registration.
- Create POST /api/auth/login.
- The login endpoint should accept email and password.
- Verify the user's credentials using bcrypt.
- Return a successful response when the credentials are valid.
- Return an appropriate error response when the email does not exist or the password is incorrect.
- Do not return the user's password in any response.
- Keep all business logic inside auth_service.js.

**Constraints**:
- Use JavaScript.
- Do not implement JWT.
- Do not implement authentication middleware.
- Do not implement authorization middleware.
- Do not add request validation.
- Do not add refresh tokens.
- Keep the implementation clean and minimal.

---

# 8. JWT Authentication (Failing Test)

**Task**: 
Write failing tests for JWT-based authentication.

**Context**: 
The project already supports user registration, password hashing, and login. Authentication currently ends after verifying the user's credentials.

**Requirements**:
- Write a test that expects POST /api/auth/login to return a JWT token after successful authentication.
- Write a test that verifies a protected endpoint rejects requests without a valid JWT.
- Do not implement JWT generation.
- Do not implement authentication middleware.
- The tests should fail because JWT support does not exist yet.

**Constraints**:
- Use Jest and Supertest.
- Keep the tests focused only on JWT authentication.
- Do not modify the existing login implementation.
- Do not add authorization tests.

---

# 9. JWT Authentication (Implementation)

**Task**: 
Implement JWT-based authentication.

**Context**: 
The project already supports secure user registration and login. Failing tests exist for JWT authentication. This is the GREEN phase of the TDD cycle.

**Requirements**:
- Install and configure jsonwebtoken.
- Generate a JWT after successful login.
- Include the authenticated user's id and role in the token payload.
- Create auth_middleware.js to verify JWTs.
- Reject requests with missing, invalid, or expired tokens.
- Attach the authenticated user to req.user after successful verification.
- Implement only the functionality required to make the existing JWT tests pass.

**Constraints**:
- Use JavaScript.
- Do not implement role-based authorization.
- Do not implement refresh tokens.
- Do not implement logout.
- Do not add validation.
- Keep the implementation minimal and clean.

---

# 10. Vehicle Creation (Failing Test)

**Task**: 
Write a failing test for vehicle creation using Test-Driven Development.

**Context**: 
The backend already supports user registration, login, password hashing, and JWT authentication. The next feature is vehicle inventory management.

**Requirements**:
- Create a failing Jest and Supertest test for POST /api/vehicles.
- Authenticate a user and include a valid JWT in the Authorization header.
- Send valid vehicle data.
- Expect the vehicle to be created successfully with the appropriate HTTP status code.
- Verify that the response contains the created vehicle details.
- The test should fail because the endpoint has not been implemented yet.
Vehicle fields:
- make
- model
- year
- price
- mileage
- fuelType
- transmission
- color
- stock

**Constraints**:
- Do not implement production code.
- Do not create the Vehicle model.
- Do not create routes, controllers, or services.
- Do not add validation tests.
- Keep the test focused on successful vehicle creation only.

---

# 11. Vehicle Creation (Implementation)

**Task**: 
Implement vehicle creation using Test-Driven Development.

**Context**: 
The backend already supports user registration, secure authentication (bcrypt + JWT), and protected routes. The next feature is vehicle inventory management.

**Requirements**:
- Write a Jest and Supertest test for POST /api/vehicles.
- Create a Vehicle model with the required fields: make, model, year, price, mileage, fuelType, transmission, color, stock.
- Create vehicle_routes.js, vehicle_controller.js, and vehicle_service.js.
- Implement POST /api/vehicles.
- Require a valid JWT to access the endpoint.
- Save the vehicle to MongoDB.
- Return HTTP 201 with the created vehicle.
- Keep business logic inside vehicle_service.js.
- Implement only the functionality required for successful vehicle creation.

**Constraints**:
- Use JavaScript.
- Do not implement vehicle listing.
- Do not implement vehicle update.
- Do not implement vehicle deletion.
- Do not implement purchase or restock.

---

# 12. Vehicle Listing

**Task**: 
Implement vehicle listing using Test-Driven Development.

**Context**: 
The backend already supports user authentication and vehicle creation. The next feature is listing vehicles in the inventory.

**Requirements**:
- Write a Jest and Supertest test for GET /api/vehicles.
- Implement GET /api/vehicles.
- Return HTTP 200 on success.
- Return an empty array if no vehicles exist.
- Return all vehicles from the database when records exist.
- Keep business logic inside vehicle_service.js.
- Reuse the existing Vehicle model, controller, and routes.

**Constraints**:
- Use JavaScript.
- Do not implement filtering.
- Do not implement searching.
- Do not implement pagination.
- Do not implement sorting.
- Do not implement vehicle update.
- Do not implement vehicle deletion.
- Do not implement purchase.
- Do not implement restock.
- Do not implement role-based authorization.
- Do not add request validation.
- Keep the implementation simple and focused on listing vehicles only.

---

# 13. Vehicle Search & Filtering

**Task**: 
Implement vehicle search and filtering using Test-Driven Development.

**Context**: 
The backend already supports authentication, vehicle creation, and vehicle listing. The next feature is searching the vehicle inventory.

**Requirements**:
- Write Jest and Supertest tests for GET /api/vehicles/search.
- Implement filtering using query parameters.
- Support filtering by: make, model, fuelType, transmission, minPrice, maxPrice.
- Return HTTP 200.
- Return an empty array when no vehicles match.
- Return only the matching vehicles when filters are provided.
- Keep the business logic inside vehicle_service.js.

**Constraints**:
- Use JavaScript.
- Do not implement pagination.
- Do not implement sorting.
- Do not implement fuzzy search.
- Do not implement vehicle update.
- Do not implement vehicle deletion.
- Do not implement purchase.
- Do not implement restock.
- Do not add validation.
- Keep the implementation clean and minimal.

---

# 14. Vehicle Purchase

**Task**: 
Implement vehicle purchasing using Test-Driven Development.

**Context**: 
The backend already supports authentication and vehicle inventory management. The next feature is purchasing a vehicle.

**Requirements**:
- Write Jest and Supertest tests for POST /api/vehicles/:id/purchase.
- Reduce the vehicle stock by one after a successful purchase.
- Return HTTP 200 with the updated vehicle.
- Prevent purchases when the stock is zero.
- Return an appropriate error response when the vehicle is out of stock.
- Return an appropriate error response when the vehicle does not exist.
- Keep all business logic inside vehicle_service.js.

**Constraints**:
- Use JavaScript.
- Do not implement payment processing.
- Do not create purchase history.
- Do not implement transactions.
- Do not implement reservations.
- Do not implement admin authorization.
- Keep the implementation focused only on inventory updates.

---

# 15. Admin Seed Script

**Task**: 
Implement an admin seed script for the backend.

**Context**: 
The project already supports user registration, secure authentication (bcrypt + JWT), and role-based users with USER as the default role. Admin-only features will be implemented next, so the project needs a reliable way to create an administrator account for development and testing.

**Requirements**:
- Create a seed script inside scripts/seed_admin.js.
- Create an ADMIN user only if one does not already exist.
- Read the admin credentials from environment variables: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD.
- Hash the password using bcrypt before saving it.
- Save the user with role set to ADMIN.
- Connect to MongoDB using the existing database configuration.
- Print a success message when the admin is created.
- Print an informative message if the admin already exists.
- Close the database connection before exiting.
- Add an npm script named seed:admin.

**Constraints**:
- Use JavaScript.
- Reuse the existing User model.
- Do not modify the existing database configuration.

---

# 16. Admin Authorization

**Task**: 
Implement reusable admin authorization middleware using Test-Driven Development.

**Context**: 
The backend already supports JWT authentication and an admin seed script. Authenticated users include their role in the JWT payload. The next step is to restrict admin-only operations using reusable middleware.

**Requirements**:
- Create admin_middleware.js.
- Write Jest and Supertest tests for the middleware.
- Allow requests to continue only when req.user.role is ADMIN.
- Return HTTP 403 Forbidden when the authenticated user is not an ADMIN.
- Return a clear error message for forbidden access.
- Keep the middleware reusable for future admin-only endpoints.
- Apply the middleware to a temporary protected test route or an existing endpoint used only for testing the authorization behavior.

**Constraints**:
- Use JavaScript.
- Reuse the existing authentication middleware.
- Do not modify JWT generation.
- Do not implement vehicle update.
- Do not implement vehicle deletion.
- Do not implement vehicle restocking.

---

# 17. Admin Vehicle Management

**Task**: 
Implement admin vehicle management using Test-Driven Development.

**Context**: 
The backend already supports authentication, JWT authorization, vehicle creation, vehicle listing, vehicle search, vehicle purchasing, and reusable admin authorization middleware. The next feature is managing the inventory through admin-only operations.

**Requirements**:
- Write Jest and Supertest tests for the following endpoints:
  - PUT /api/vehicles/:id
  - POST /api/vehicles/:id/restock
  - DELETE /api/vehicles/:id
- Protect all three endpoints using the existing authentication and admin authorization middleware.
- Implement vehicle updates.
- Implement vehicle restocking by increasing the stock quantity.
- Implement vehicle deletion.
- Return appropriate HTTP status codes and error responses.
- Return 403 Forbidden for authenticated non-admin users.
- Return 404 Not Found when the vehicle does not exist.
- Keep all business logic inside vehicle_service.js.
- Reuse the existing Vehicle model, controller, routes, and middleware.

**Constraints**:
- Use JavaScript.
- Keep the implementation simple and focused on the required functionality.

---

# 18. Backend Refactoring

**Task**: 
Refactor the backend to improve code organization and readability without changing application behavior.

**Context**: 
The backend is functionally complete and all existing tests are passing. The goal of this commit is to improve code quality while preserving all current functionality.

**Requirements**:
- Keep all existing API behavior unchanged.
- Keep all existing tests passing.
- Remove duplicated code where appropriate.
- Improve method and variable names if they are unclear.
- Simplify complex methods by extracting small helper functions where it improves readability.
- Ensure controllers only handle HTTP request/response logic.
- Keep business logic inside service files.
- Remove unused imports, variables, and dead code.
- Ensure consistent response structure across controllers where possible.
- Keep error handling consistent throughout the application.
- Improve overall code readability without introducing unnecessary abstractions.

**Constraints**:
- Use JavaScript.
- Do not add new features.
- Do not create new tests.

---

# 19. Backend Documentation & Code Review

**Task**: 
Perform a comprehensive backend code review and improve the implementation where appropriate without changing any existing functionality.

**Context**: 
The backend implementation is feature complete. All existing tests are passing. The goal of this task is to review the project as a senior software engineer before release and improve code quality while preserving behavior.

**Requirements**:
Review the project for the following:
Architecture
- Verify separation of concerns between routes, controllers, services, middleware, models, and configuration.
- Ensure controllers remain thin and business logic resides in services.
- Remove unnecessary coupling.
Code Quality
- Improve naming where necessary.
- Remove duplicated logic.
- Remove unused code, imports, variables, and comments.
- Simplify overly complex methods.
- Ensure consistent formatting and readability.
API Design
- Verify consistent HTTP status codes.
- Verify response structure consistency where practical.
- Verify error messages are meaningful and consistent.

**Constraints**:
- Use JavaScript.
- Do not add new features.
- Do not break existing tests.

---

# 20. Theme CSS Foundation

**Task**: 
Create a production-ready `theme.css` file for a React + Tailwind CSS v4 application.

**Context**: 
This file will serve as the design system foundation for the entire project. It should only generate design tokens and global theme variables, not component styles.

**Requirements**:
- **Theme**: Support Light and Dark themes using `:root` and `.dark` CSS variables. No duplicated styles.
- **Base Color Palette**:
  - Light: Background `#F6F4EF`, Secondary `#EAE7DF`, Text `#1A1C1A`, Primary Accent `#1E4030`, Secondary Accent `#5A1D26`.
  - Dark: Background `#0D0F0E`, Secondary `#161917`, Text `#ECEAE4`, Primary Accent `#2E5943`, Secondary Accent `#6B2430`.
- **Typography**: Headings `Fraunces`, Body `General Sans`. Generate a complete fluid typography scale (h1-h6, body-lg, body, body-sm, caption, label) including font-size, line-height, letter-spacing, and font-weight.
- **Semantic Color Tokens**: Generate variables for Background, Surface, Text, Primary, Secondary, Destructive, Status, Borders, Forms, Buttons, Cards, Navbar, Sidebar, Overlay, Scrollbar, Selection, and Focus Ring. Do not hardcode colors elsewhere.
- **Scales**:
  - Spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128.
  - Radius: xs, sm, md, lg, xl, 2xl, full (modern premium SaaS appearance).
  - Shadow: xs, sm, md, lg, xl (soft and subtle, no exaggerated shadows).
- **Motion Tokens**: Durations (fast, normal, slow) and Easing (standard, decelerate, accelerate). Avoid CSS animations that conflict with GSAP.
- **Other Tokens**: Border (thin, normal, thick), Opacity (disabled, muted, overlay), Z-index (dropdown, sticky, fixed, modal, popover, toast, tooltip).
- **Accessibility & Polish**: Include `prefers-reduced-motion`, visible focus styles, high contrast friendly colors, selection colors, scrollbar styling, smooth font rendering, and `color-scheme` support.
- **Code Style**: Organize with clear comment sections, group variables logically, use consistent naming, follow modern CSS conventions, and write maintainable production-quality code.

**Constraints**:
- Use CSS variables only.
- Do not generate component classes, utility classes, or button styles.
- Only generate design tokens and global theme definitions.

---

# 21. Frontend Application Requirements

**Task**: 
Implement the core frontend application requirements, starting with the authentication pages.

**Context**: 
The backend is complete. This prompt establishes the baseline requirements for the React SPA, focusing on building a visually appealing, premium car dealership experience.

**Requirements**:
- **Technology**: Build a modern, single-page application (SPA) using HTML5, CSS3, Tailwind, and React.
- **Core Functionality**:
  - User registration and login forms.
  - A dashboard or homepage to display all available vehicles.
  - Functionality to search and filter vehicles.
  - A "Purchase" button on each vehicle, which should be disabled if the quantity is zero.
  - Forms/UI to add, update, and delete vehicles (for Admin Users).
- **Design**: The application should be visually appealing, responsive, and provide a great user experience. Draw inspiration from premium car dealership inventory systems to make it the best possible design.

**Constraints**:
- Do not build more or less than the specified requirements.

---

# 22. Authentication Experience Redesign

**Task**: 
Redesign the complete authentication experience.

**Context**: 
This is a UI/UX improvement only. The goal is to create a premium, modern, and responsive authentication experience suitable for an inventory management system without modifying any business logic, validation, routing, authentication flow, or API integration.

**Requirements**:
- **Design Philosophy**: Premium, clean, elegant, professional, minimal, spacious, and responsive. Avoid flashy designs, unnecessary visual effects, photos, or cars. Impress through typography, spacing, hierarchy, and subtle motion.
- **Overall Layout**: Keep the authentication form centered both vertically and horizontally. Maintain generous whitespace around the card. Ensure the layout adapts beautifully across all screen sizes.
- **Background Design**: Use a subtle premium background using only CSS (e.g., soft radial gradients, subtle grid pattern, faint geometric shapes). Do not animate the background.
- **Authentication Card**: Must have a clean border, soft shadow, premium spacing, elegant border radius, and strong visual hierarchy.
- **Branding**: Display the application name above the authentication heading subtly.
- **Typography**: Use `Fraunces` for headings and `General Sans` for all other text.
- **Authentication Header**:
  - Login: Heading "Welcome Back", Supporting text "Sign in to manage your dealership inventory."
  - Register: Heading "Create Account", Supporting text "Create your account to access the dealership inventory management system."
- **Forms & Inputs**: Improve spacing, alignment, label hierarchy, focus states, placeholder appearance, and error presentation. Reuse the existing `Input` and `PasswordInput` components.
- **Buttons & Links**: Improve hover, active, loading, and disabled states. Reuse the existing `Button` component.
- **Theme Support**: Ensure the design looks polished in both Light and Dark themes using only existing design tokens. Do not introduce new colors.
- **Motion**: Use subtle animations with Framer Motion (e.g., page fade, card fade + slight upward movement, button hover).
- **Accessibility**: Maintain keyboard navigation, visible focus states, semantic HTML, ARIA attributes, and screen-reader compatibility.

**Constraints**:
- Do not modify authentication logic, validation, routing, business logic, or API integration.
- Reuse existing components; do not create unnecessary components or duplicate code.
- Maintain the existing architecture.



# 23. Two Production-ready CSS Files For A React + Tailw

**Task**:
Create two production-ready CSS files for a React + Tailwind CSS v4 project:

1. utilities.css
2. index.css

The project already contains a complete theme.css with all design tokens and CSS variables.

Do not regenerate theme variables.

Consume the variables from theme.css.

---

# utilities.css

Create reusable utility classes only.

Do not style page-specific components.

The utilities should use CSS variables from theme.css.

Generate utilities for the following:

--------------------------------------------------
LAYOUT
--------------------------------------------------

.container
.section
.page
.page-header
.page-content

.flex-center
.flex-between
.flex-column

.grid-auto
.grid-2
.grid-3
.grid-4

.stack-xs
.stack-sm
.stack-md
.stack-lg

.cluster

--------------------------------------------------
SURFACES
--------------------------------------------------

.surface
.surface-hover
.surface-raised

.card
.card-hover

.panel

--------------------------------------------------
TYPOGRAPHY
--------------------------------------------------

.text-gradient
.text-primary
.text-secondary
.text-muted
.text-success
.text-warning
.text-error

.heading

--------------------------------------------------
BUTTONS
--------------------------------------------------

.btn

.btn-primary

.btn-secondary

.btn-outline

.btn-danger

.btn-ghost

.btn-icon

Support:

hover

active

disabled

focus-visible

loading state

small

medium

large

--------------------------------------------------
INPUTS
--------------------------------------------------

.input

.textarea

.select

.checkbox

.radio

.input-group

Support

focus

disabled

placeholder

invalid

--------------------------------------------------
BADGES
--------------------------------------------------

.badge

.badge-success

.badge-warning

.badge-error

.badge-info

--------------------------------------------------
TABLES
--------------------------------------------------

.table

.table-row

.table-header

--------------------------------------------------
ALERTS
--------------------------------------------------

.alert

.alert-success

.alert-warning

.alert-error

.alert-info

--------------------------------------------------
EMPTY STATE
--------------------------------------------------

.empty-state

--------------------------------------------------
LOADER
--------------------------------------------------

.spinner

.skeleton

--------------------------------------------------
IMAGES
--------------------------------------------------

.image-cover

.image-contain

--------------------------------------------------
HELPERS
--------------------------------------------------

.visually-hidden

.truncate

.line-clamp-2

.line-clamp-3

.no-scrollbar

.glass

.backdrop

.divider

--------------------------------------------------
TRANSITIONS
--------------------------------------------------

.transition-default

.hover-lift

.hover-scale

.hover-opacity

--------------------------------------------------
SCROLL
--------------------------------------------------

.scroll-area

--------------------------------------------------
RESPONSIVE HELPERS
--------------------------------------------------

.mobile-only

.desktop-only

---

# index.css

This file should remain very small.

Generate:

1. Imports

@import "./theme.css";
@import "./utilities.css";
@import "tailwindcss";

2. CSS Reset

Use a modern reset.

3. html

4. body

5. #root

6. img

7. button

8. input

9. textarea

10. a

11. ul

12. table

13. selection

14. scrollbar compatibility

15. Font rendering improvements

16. Color scheme support

17. Accessibility improvements

18. prefers-reduced-motion support

19. Lenis compatibility

Do NOT enable

scroll-behavior: smooth;

Lenis controls scrolling.

Include only the styles necessary for Lenis integration.

20. Small global utility improvements

No page-specific CSS.

No component-specific CSS.

No duplicated variables.

No duplicated colors.

Consume everything from theme.css.

---

# Code Quality

Use professional organization.

Separate sections with comments.

Write maintainable production-ready CSS.

Avoid unnecessary specificity.

Prefer reusable utility classes.

Do not use !important unless absolutely necessary.

Keep index.css lightweight.

Most styling should exist inside utilities.css.

---

# 24. A Reusable Button Component For The React Applicat

**Task**:
Implement a reusable Button component for the React application.

**Context**:
The frontend setup and global design system are complete. The next step is to build reusable UI components that will be used throughout the application.

**Requirements**:
- Create a reusable Button component.
- Use React and JavaScript.
- Use the existing theme.css variables and utility classes.
- Implement a cn utility using clsx and tailwind-merge.
- Support the following variants:
  - primary
  - secondary
  - outline
  - ghost
  - danger
- Support sizes:
  - sm
  - md
  - lg
- Support:
  - loading state
  - disabled state
  - fullWidth
  - leftIcon
  - rightIcon
- Forward all native button props.
- Forward refs using React.forwardRef.
- Keep the component accessible.
- Export the component through index.js.

**Constraints**:
- Do not create page-specific styles.
- Do not hardcode colors.
- Use only the existing design tokens and utility classes.
- Keep the component clean, reusable, and production-ready.

---

# 25. The Reusable UI Component Library For The React Ap

**Task**:
Implement the reusable UI component library for the React application.

Context

The project already includes:

- React
- Tailwind CSS v4
- theme.css
- utilities.css
- index.css
- clsx
- tailwind-merge
- React Hook Form
- Zod
- Framer Motion
- GSAP
- Lenis

The frontend architecture has already been finalized.

Do not modify the architecture.

Do not introduce new folders.

Follow the existing project structure.

--------------------------------------------------
Design System Rules
--------------------------------------------------

The project follows a hybrid styling architecture.

Use CSS variables from theme.css for every color, typography, spacing, shadow, border radius, and transition.

Use reusable utility classes from utilities.css for:

- buttons
- typography
- cards
- forms
- surfaces
- alerts
- badges
- feedback components

Use Tailwind utilities only for:

- layout
- flex
- grid
- spacing
- sizing
- responsive behavior
- positioning

Never hardcode colors.

Never duplicate design tokens.

Maintain visual consistency across every component.

--------------------------------------------------
Update Existing Button Component
--------------------------------------------------

Review the existing Button component.

Improve it where necessary.

Do not rewrite it unless required.

Requirements

Variants

- primary
- secondary
- outline
- ghost
- danger

Sizes

- sm
- md
- lg

States

- loading
- disabled

Options

- fullWidth
- leftIcon
- rightIcon

Implementation

- React.forwardRef
- accept native button props
- keyboard accessible
- accessible loading state
- use cn utility
- consume design tokens
- reuse utility classes
- no duplicated logic

--------------------------------------------------
Implement Form Components
--------------------------------------------------

Create

- Input
- Textarea
- Select
- Checkbox
- Radio
- Label

Requirements

Each component should

- use React with JavaScript
- follow the same API style as Button
- accept native HTML props
- forward refs where appropriate
- support disabled state
- support required state
- support readOnly state
- support error state
- support helper text
- use semantic HTML
- keyboard accessible
- consume design tokens
- reuse utility classes
- avoid duplicated logic

--------------------------------------------------
Implement Feedback Components
--------------------------------------------------

Create

Badge

Support variants

- default
- success
- warning
- error
- info

Alert

Support variants

- success
- warning
- error
- info

Support

- title
- description

Spinner

Support

- sm
- md
- lg

Skeleton

Support

- width
- height
- rounded

EmptyState

Support

- title
- description
- optional icon
- optional action button

--------------------------------------------------
Utilities
--------------------------------------------------

Implement

utils/cn.js

using

- clsx
- tailwind-merge

Every reusable UI component should use this helper.

--------------------------------------------------
Barrel Export
--------------------------------------------------

Create a single

components/ui/index.js

Export every reusable component.

Example

export { default as Button } from "./Button/Button";
export { default as Input } from "./forms/Input/Input";
export { default as Textarea } from "./forms/Textarea/Textarea";

Do not create index.js inside individual component folders.

--------------------------------------------------
Component Responsibility
--------------------------------------------------

Every reusable UI component must have a single responsibility.

Reusable components must remain framework-agnostic.

Do not couple them to application logic.

Components must not

- depend on React Hook Form
- contain Zod validation
- perform API requests
- manage authentication
- manage application state
- contain business logic

Components should only

- render UI
- expose reusable props
- expose visual states
- forward native HTML props
- remain reusable across the application

Validation, form state management, and business logic will be implemented in feature-level components and pages.

--------------------------------------------------
Composition
--------------------------------------------------

Prefer composition over excessive configuration.

Do not create components with large numbers of optional props.

Keep every component focused.

Keep the API predictable.

Allow feature components and pages to compose multiple reusable components together.

Avoid "god components".

--------------------------------------------------
Accessibility
--------------------------------------------------

Every component should

- support keyboard navigation
- expose proper ARIA attributes where appropriate
- preserve browser accessibility
- expose visible focus states
- maintain sufficient color contrast
- support screen readers

--------------------------------------------------
Code Quality
--------------------------------------------------

Every component should

- be reusable
- be composable
- be production-ready
- follow React best practices
- follow consistent naming
- use meaningful props
- avoid duplicated code
- prefer readability over clever abstractions
- use default props where appropriate
- export a single default component

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- create layouts
- create pages
- integrate APIs
- create business logic
- introduce new dependencies
- change the folder structure
- create component-specific CSS files
- hardcode colors
- duplicate utility classes
- duplicate design tokens

The goal is to build a reusable, maintainable, production-ready UI component library that will serve as the foundation for the rest of the application.

**Context**:
The project already includes:

- React
- Tailwind CSS v4
- theme.css
- utilities.css
- index.css
- clsx
- tailwind-merge
- React Hook Form
- Zod
- Framer Motion
- GSAP
- Lenis

The frontend architecture has already been finalized.

Do not modify the architecture.

Do not introduce new folders.

Follow the existing project structure.

--------------------------------------------------
Design System Rules
--------------------------------------------------

The project follows a hybrid styling architecture.

Use CSS variables from theme.css for every color, typography, spacing, shadow, border radius, and transition.

Use reusable utility classes from utilities.css for:

- buttons
- typography
- cards
- forms
- surfaces
- alerts
- badges
- feedback components

Use Tailwind utilities only for:

- layout
- flex
- grid
- spacing
- sizing
- responsive behavior
- positioning

Never hardcode colors.

Never duplicate design tokens.

Maintain visual consistency across every component.

--------------------------------------------------
Update Existing Button Component
--------------------------------------------------

Review the existing Button component.

Improve it where necessary.

Do not rewrite it unless required.

Requirements

Variants

- primary
- secondary
- outline
- ghost
- danger

Sizes

- sm
- md
- lg

States

- loading
- disabled

Options

- fullWidth
- leftIcon
- rightIcon

Implementation

- React.forwardRef
- accept native button props
- keyboard accessible
- accessible loading state
- use cn utility
- consume design tokens
- reuse utility classes
- no duplicated logic

--------------------------------------------------
Implement Form Components
--------------------------------------------------

Create

- Input
- Textarea
- Select
- Checkbox
- Radio
- Label

Requirements

Each component should

- use React with JavaScript
- follow the same API style as Button
- accept native HTML props
- forward refs where appropriate
- support disabled state
- support required state
- support readOnly state
- support error state
- support helper text
- use semantic HTML
- keyboard accessible
- consume design tokens
- reuse utility classes
- avoid duplicated logic

--------------------------------------------------
Implement Feedback Components
--------------------------------------------------

Create

Badge

Support variants

- default
- success
- warning
- error
- info

Alert

Support variants

- success
- warning
- error
- info

Support

- title
- description

Spinner

Support

- sm
- md
- lg

Skeleton

Support

- width
- height
- rounded

EmptyState

Support

- title
- description
- optional icon
- optional action button

--------------------------------------------------
Utilities
--------------------------------------------------

Implement

utils/cn.js

using

- clsx
- tailwind-merge

Every reusable UI component should use this helper.

--------------------------------------------------
Barrel Export
--------------------------------------------------

Create a single

components/ui/index.js

Export every reusable component.

Example

export { default as Button } from "./Button/Button";
export { default as Input } from "./forms/Input/Input";
export { default as Textarea } from "./forms/Textarea/Textarea";

Do not create index.js inside individual component folders.

--------------------------------------------------
Component Responsibility
--------------------------------------------------

Every reusable UI component must have a single responsibility.

Reusable components must remain framework-agnostic.

Do not couple them to application logic.

Components must not

- depend on React Hook Form
- contain Zod validation
- perform API requests
- manage authentication
- manage application state
- contain business logic

Components should only

- render UI
- expose reusable props
- expose visual states
- forward native HTML props
- remain reusable across the application

Validation, form state management, and business logic will be implemented in feature-level components and pages.

--------------------------------------------------
Composition
--------------------------------------------------

Prefer composition over excessive configuration.

Do not create components with large numbers of optional props.

Keep every component focused.

Keep the API predictable.

Allow feature components and pages to compose multiple reusable components together.

Avoid "god components".

--------------------------------------------------
Accessibility
--------------------------------------------------

Every component should

- support keyboard navigation
- expose proper ARIA attributes where appropriate
- preserve browser accessibility
- expose visible focus states
- maintain sufficient color contrast
- support screen readers

--------------------------------------------------
Code Quality
--------------------------------------------------

Every component should

- be reusable
- be composable
- be production-ready
- follow React best practices
- follow consistent naming
- use meaningful props
- avoid duplicated code
- prefer readability over clever abstractions
- use default props where appropriate
- export a single default component

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- create layouts
- create pages
- integrate APIs
- create business logic
- introduce new dependencies
- change the folder structure
- create component-specific CSS files
- hardcode colors
- duplicate utility classes
- duplicate design tokens

The goal is to build a reusable, maintainable, production-ready UI component library that will serve as the foundation for the rest of the application.

**Requirements**:
Variants

- primary
- secondary
- outline
- ghost
- danger

Sizes

- sm
- md
- lg

States

- loading
- disabled

Options

- fullWidth
- leftIcon
- rightIcon

Implementation

- React.forwardRef
- accept native button props
- keyboard accessible
- accessible loading state
- use cn utility
- consume design tokens
- reuse utility classes
- no duplicated logic

--------------------------------------------------
Implement Form Components
--------------------------------------------------

Create

- Input
- Textarea
- Select
- Checkbox
- Radio
- Label

Requirements

Each component should

- use React with JavaScript
- follow the same API style as Button
- accept native HTML props
- forward refs where appropriate
- support disabled state
- support required state
- support readOnly state
- support error state
- support helper text
- use semantic HTML
- keyboard accessible
- consume design tokens
- reuse utility classes
- avoid duplicated logic

--------------------------------------------------
Implement Feedback Components
--------------------------------------------------

Create

Badge

Support variants

- default
- success
- warning
- error
- info

Alert

Support variants

- success
- warning
- error
- info

Support

- title
- description

Spinner

Support

- sm
- md
- lg

Skeleton

Support

- width
- height
- rounded

EmptyState

Support

- title
- description
- optional icon
- optional action button

--------------------------------------------------
Utilities
--------------------------------------------------

Implement

utils/cn.js

using

- clsx
- tailwind-merge

Every reusable UI component should use this helper.

--------------------------------------------------
Barrel Export
--------------------------------------------------

Create a single

components/ui/index.js

Export every reusable component.

Example

export { default as Button } from "./Button/Button";
export { default as Input } from "./forms/Input/Input";
export { default as Textarea } from "./forms/Textarea/Textarea";

Do not create index.js inside individual component folders.

--------------------------------------------------
Component Responsibility
--------------------------------------------------

Every reusable UI component must have a single responsibility.

Reusable components must remain framework-agnostic.

Do not couple them to application logic.

Components must not

- depend on React Hook Form
- contain Zod validation
- perform API requests
- manage authentication
- manage application state
- contain business logic

Components should only

- render UI
- expose reusable props
- expose visual states
- forward native HTML props
- remain reusable across the application

Validation, form state management, and business logic will be implemented in feature-level components and pages.

--------------------------------------------------
Composition
--------------------------------------------------

Prefer composition over excessive configuration.

Do not create components with large numbers of optional props.

Keep every component focused.

Keep the API predictable.

Allow feature components and pages to compose multiple reusable components together.

Avoid "god components".

--------------------------------------------------
Accessibility
--------------------------------------------------

Every component should

- support keyboard navigation
- expose proper ARIA attributes where appropriate
- preserve browser accessibility
- expose visible focus states
- maintain sufficient color contrast
- support screen readers

--------------------------------------------------
Code Quality
--------------------------------------------------

Every component should

- be reusable
- be composable
- be production-ready
- follow React best practices
- follow consistent naming
- use meaningful props
- avoid duplicated code
- prefer readability over clever abstractions
- use default props where appropriate
- export a single default component

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- create layouts
- create pages
- integrate APIs
- create business logic
- introduce new dependencies
- change the folder structure
- create component-specific CSS files
- hardcode colors
- duplicate utility classes
- duplicate design tokens

The goal is to build a reusable, maintainable, production-ready UI component library that will serve as the foundation for the rest of the application.

**Constraints**:
--------------------------------------------------

Do not

- create layouts
- create pages
- integrate APIs
- create business logic
- introduce new dependencies
- change the folder structure
- create component-specific CSS files
- hardcode colors
- duplicate utility classes
- duplicate design tokens

The goal is to build a reusable, maintainable, production-ready UI component library that will serve as the foundation for the rest of the application.

---

# 26. The Existing Reusable UI Component Library To Matc

**Task**:
Refactor the existing reusable UI component library to match the finalized frontend architecture.

Do not regenerate components from scratch.

Modify the existing implementation where necessary.

--------------------------------------------------


**Requirements**:
- Accept native HTML props.
- Forward refs where appropriate.
- Support:
    - disabled
    - required
    - readOnly
    - error
    - helperText
- Keep components framework-agnostic.
- Use semantic HTML.
- Use existing design tokens.
- Reuse utility classes.

--------------------------------------------------
Update Feedback Components
--------------------------------------------------

Review:

- Badge
- Alert
- Spinner
- Skeleton
- EmptyState

Badge

Variants

- default
- success
- warning
- error
- info

Alert

Variants

- success
- warning
- error
- info

Props

- title
- description

Spinner

Sizes

- sm
- md
- lg

Skeleton

Props

- width
- height
- rounded

EmptyState

Props

- title
- description
- icon
- action

--------------------------------------------------
Single Responsibility
--------------------------------------------------

Every reusable UI component must have a single responsibility.

Components must NOT:

- know about React Hook Form
- know about Zod
- perform validation
- perform API requests
- manage authentication
- manage application state
- contain business logic

Components should only:

- render UI
- expose reusable props
- expose visual states
- accept native HTML props

--------------------------------------------------
Composition
--------------------------------------------------

Prefer composition over configuration.

Avoid unnecessary props.

Keep every component focused.

Do not build "god components".

--------------------------------------------------
Barrel Export
--------------------------------------------------

Create only one barrel export:

client/
            └── index.js

Export every reusable component from this file.

Do not create index.js files inside subdirectories.

--------------------------------------------------
Utilities
--------------------------------------------------

Review utils/cn.js.

Ensure it correctly combines:

- clsx
- tailwind-merge

Use this helper throughout every reusable component.

--------------------------------------------------
Accessibility
--------------------------------------------------

Ensure every component:

- supports keyboard navigation
- exposes visible focus styles
- uses semantic HTML
- includes appropriate ARIA attributes where necessary
- preserves screen-reader compatibility

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready.
- Readable.
- Maintainable.
- Consistent naming.
- No duplicated logic.
- No hardcoded colors.
- No component-specific CSS files.
- Consume theme.css variables.
- Reuse utilities.css classes.
- Do not introduce new dependencies.
- Do not change the project architecture.

---

# 27. The Foundational Application Layout Architecture

**Task**:
Implement the foundational application layout architecture.

Context

The reusable UI component library has already been implemented.

The next step is to establish the application's layout system, theme management, and provider architecture.

Do not modify the existing frontend architecture.

--------------------------------------------------
Theme System
--------------------------------------------------

Implement ThemeContext and useTheme.

Requirements

- Support light and dark themes.
- Persist the selected theme using localStorage.
- Respect the user's system preference on first load.
- Toggle the `.dark` class on the root document element.
- Keep the implementation simple and maintainable.

--------------------------------------------------
Providers
--------------------------------------------------

Create:

providers/AppProvider.jsx

Purpose

This component will act as the root provider wrapper for the application.

For now it should wrap only ThemeProvider.

Design it so additional providers can easily be added later without changing App.jsx.

Do not add unnecessary providers.

--------------------------------------------------
Reusable Layout Components
--------------------------------------------------

Create

- Navbar
- Footer
- Container
- ThemeToggle

Navbar

Include

- application logo/title
- placeholder navigation links
- theme toggle
- placeholder login button

Do not implement routing.

Do not implement authentication.

Footer

Create a minimal responsive footer.

Container

Create a reusable responsive max-width wrapper.

Requirements

- accepts children
- accepts className
- reusable across the application

ThemeToggle

Requirements

- uses ThemeContext
- uses lucide-react icons
- accessible
- smooth transition
- reusable

--------------------------------------------------
Layouts
--------------------------------------------------

Create

MainLayout

Structure

Navbar

Main Content

Footer

AuthLayout

Responsive centered layout suitable for authentication pages.

AdminLayout

Create a placeholder responsive layout.

Include

- header
- content area

Do not create sidebar yet.

--------------------------------------------------
Update App.jsx
--------------------------------------------------

Replace the default Vite starter implementation.

App.jsx should become the application entry point.

Requirements

- Remove all Vite demo content.
- Wrap the application using AppProvider.
- Render MainLayout.
- Render temporary placeholder content inside MainLayout so the layout can be visually verified.
- Keep App.jsx clean and minimal.

--------------------------------------------------
General Requirements
--------------------------------------------------

- Use the existing reusable UI components where appropriate.
- Use the existing design system.
- Keep layouts responsive.
- Keep components composable.
- Keep implementations simple.
- Avoid duplicated code.
- Use semantic HTML.

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- integrate React Router
- implement authentication
- implement API calls
- create pages
- create business logic
- introduce new dependencies
- modify the project architecture
- overengineer the implementation

The goal of this commit is to establish the application's layout and provider foundation for future feature development.

I would not put the placeholder content directly inside MainLayout.

Instead, render it from App.jsx:

<AppProvider>
  <MainLayout>
    <div className="container py-12">
      <h1>Application Shell Ready</h1>
    </div>
  </MainLayout>
</AppProvider>

This keeps MainLayout completely generic. It shouldn't know about placeholder or demo content—it should only define the page structure (Navbar → Main → Footer). That's a small design choice, but it keeps the layout component focused on a single responsibility.

**Context**:
/
    │   └── ThemeContext.jsx
    │
    │   └── useTheme.js
    │
    │   └── AppProvider.jsx
    │
    └── App.jsx

Task

Implement the foundational application layout architecture.

Context

The reusable UI component library has already been implemented.

The next step is to establish the application's layout system, theme management, and provider architecture.

Do not modify the existing frontend architecture.

--------------------------------------------------
Theme System
--------------------------------------------------

Implement ThemeContext and useTheme.

Requirements

- Support light and dark themes.
- Persist the selected theme using localStorage.
- Respect the user's system preference on first load.
- Toggle the `.dark` class on the root document element.
- Keep the implementation simple and maintainable.

--------------------------------------------------
Providers
--------------------------------------------------

Create:

providers/AppProvider.jsx

Purpose

This component will act as the root provider wrapper for the application.

For now it should wrap only ThemeProvider.

Design it so additional providers can easily be added later without changing App.jsx.

Do not add unnecessary providers.

--------------------------------------------------
Reusable Layout Components
--------------------------------------------------

Create

- Navbar
- Footer
- Container
- ThemeToggle

Navbar

Include

- application logo/title
- placeholder navigation links
- theme toggle
- placeholder login button

Do not implement routing.

Do not implement authentication.

Footer

Create a minimal responsive footer.

Container

Create a reusable responsive max-width wrapper.

Requirements

- accepts children
- accepts className
- reusable across the application

ThemeToggle

Requirements

- uses ThemeContext
- uses lucide-react icons
- accessible
- smooth transition
- reusable

--------------------------------------------------
Layouts
--------------------------------------------------

Create

MainLayout

Structure

Navbar

Main Content

Footer

AuthLayout

Responsive centered layout suitable for authentication pages.

AdminLayout

Create a placeholder responsive layout.

Include

- header
- content area

Do not create sidebar yet.

--------------------------------------------------
Update App.jsx
--------------------------------------------------

Replace the default Vite starter implementation.

App.jsx should become the application entry point.

Requirements

- Remove all Vite demo content.
- Wrap the application using AppProvider.
- Render MainLayout.
- Render temporary placeholder content inside MainLayout so the layout can be visually verified.
- Keep App.jsx clean and minimal.

--------------------------------------------------
General Requirements
--------------------------------------------------

- Use the existing reusable UI components where appropriate.
- Use the existing design system.
- Keep layouts responsive.
- Keep components composable.
- Keep implementations simple.
- Avoid duplicated code.
- Use semantic HTML.

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- integrate React Router
- implement authentication
- implement API calls
- create pages
- create business logic
- introduce new dependencies
- modify the project architecture
- overengineer the implementation

The goal of this commit is to establish the application's layout and provider foundation for future feature development.

I would not put the placeholder content directly inside MainLayout.

Instead, render it from App.jsx:

<AppProvider>
  <MainLayout>
    <div className="container py-12">
      <h1>Application Shell Ready</h1>
    </div>
  </MainLayout>
</AppProvider>

This keeps MainLayout completely generic. It shouldn't know about placeholder or demo content—it should only define the page structure (Navbar → Main → Footer). That's a small design choice, but it keeps the layout component focused on a single responsibility.

**Requirements**:
- Support light and dark themes.
- Persist the selected theme using localStorage.
- Respect the user's system preference on first load.
- Toggle the `.dark` class on the root document element.
- Keep the implementation simple and maintainable.

--------------------------------------------------
Providers
--------------------------------------------------

Create:

providers/AppProvider.jsx

Purpose

This component will act as the root provider wrapper for the application.

For now it should wrap only ThemeProvider.

Design it so additional providers can easily be added later without changing App.jsx.

Do not add unnecessary providers.

--------------------------------------------------
Reusable Layout Components
--------------------------------------------------

Create

- Navbar
- Footer
- Container
- ThemeToggle

Navbar

Include

- application logo/title
- placeholder navigation links
- theme toggle
- placeholder login button

Do not implement routing.

Do not implement authentication.

Footer

Create a minimal responsive footer.

Container

Create a reusable responsive max-width wrapper.

Requirements

- accepts children
- accepts className
- reusable across the application

ThemeToggle

Requirements

- uses ThemeContext
- uses lucide-react icons
- accessible
- smooth transition
- reusable

--------------------------------------------------
Layouts
--------------------------------------------------

Create

MainLayout

Structure

Navbar

Main Content

Footer

AuthLayout

Responsive centered layout suitable for authentication pages.

AdminLayout

Create a placeholder responsive layout.

Include

- header
- content area

Do not create sidebar yet.

--------------------------------------------------
Update App.jsx
--------------------------------------------------

Replace the default Vite starter implementation.

App.jsx should become the application entry point.

Requirements

- Remove all Vite demo content.
- Wrap the application using AppProvider.
- Render MainLayout.
- Render temporary placeholder content inside MainLayout so the layout can be visually verified.
- Keep App.jsx clean and minimal.

--------------------------------------------------
General Requirements
--------------------------------------------------

- Use the existing reusable UI components where appropriate.
- Use the existing design system.
- Keep layouts responsive.
- Keep components composable.
- Keep implementations simple.
- Avoid duplicated code.
- Use semantic HTML.

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- integrate React Router
- implement authentication
- implement API calls
- create pages
- create business logic
- introduce new dependencies
- modify the project architecture
- overengineer the implementation

The goal of this commit is to establish the application's layout and provider foundation for future feature development.

I would not put the placeholder content directly inside MainLayout.

Instead, render it from App.jsx:

<AppProvider>
  <MainLayout>
    <div className="container py-12">
      <h1>Application Shell Ready</h1>
    </div>
  </MainLayout>
</AppProvider>

This keeps MainLayout completely generic. It shouldn't know about placeholder or demo content—it should only define the page structure (Navbar → Main → Footer). That's a small design choice, but it keeps the layout component focused on a single responsibility.

**Constraints**:
--------------------------------------------------

Do not

- integrate React Router
- implement authentication
- implement API calls
- create pages
- create business logic
- introduce new dependencies
- modify the project architecture
- overengineer the implementation

The goal of this commit is to establish the application's layout and provider foundation for future feature development.

I would not put the placeholder content directly inside MainLayout.

Instead, render it from App.jsx:

<AppProvider>
  <MainLayout>
    <div className="container py-12">
      <h1>Application Shell Ready</h1>
    </div>
  </MainLayout>
</AppProvider>

This keeps MainLayout completely generic. It shouldn't know about placeholder or demo content—it should only define the page structure (Navbar → Main → Footer). That's a small design choice, but it keeps the layout component focused on a single responsibility.

---

# 28. The Application's Routing Foundation

**Task**:
Implement the application's routing foundation.

Context

The application layout architecture has already been completed.

The next step is to establish the routing structure that future features will build upon.

--------------------------------------------------
Pages
--------------------------------------------------

Create placeholder pages for:

- Home
- Login
- Register
- Inventory
- VehicleDetails
- AdminDashboard
- NotFound

Each page should:

- export a default React component
- render minimal placeholder content
- use MainLayout or AuthLayout where appropriate
- avoid business logic

--------------------------------------------------
Routing
--------------------------------------------------

Implement AppRouter using React Router.

Create routes for:

/

/login

/register

/inventory

/vehicles/:id

/admin

*

Use the existing layouts.

--------------------------------------------------
ProtectedRoute
--------------------------------------------------

Create a reusable ProtectedRoute component.

For now:

- simply render <Outlet />

Do not implement authentication yet.

--------------------------------------------------
AdminRoute
--------------------------------------------------

Create a reusable AdminRoute component.

For now:

- simply render <Outlet />

Do not implement authorization yet.

--------------------------------------------------
App.jsx
--------------------------------------------------

Replace the temporary placeholder.

Render AppRouter inside AppProvider.

--------------------------------------------------
General Requirements
--------------------------------------------------

- Keep routing clean.
- Use nested layouts where appropriate.
- Use React Router best practices.
- Do not implement authentication.
- Do not implement API integration.
- Keep placeholder pages minimal.

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- create feature logic
- create forms
- connect backend
- implement authentication checks
- implement admin checks
- add new dependencies

The goal is to establish the application's routing architecture only.

**Context**:
The application layout architecture has already been completed.

The next step is to establish the routing structure that future features will build upon.

--------------------------------------------------
Pages
--------------------------------------------------

Create placeholder pages for:

- Home
- Login
- Register
- Inventory
- VehicleDetails
- AdminDashboard
- NotFound

Each page should:

- export a default React component
- render minimal placeholder content
- use MainLayout or AuthLayout where appropriate
- avoid business logic

--------------------------------------------------
Routing
--------------------------------------------------

Implement AppRouter using React Router.

Create routes for:

/

/login

/register

/inventory

/vehicles/:id

/admin

*

Use the existing layouts.

--------------------------------------------------
ProtectedRoute
--------------------------------------------------

Create a reusable ProtectedRoute component.

For now:

- simply render <Outlet />

Do not implement authentication yet.

--------------------------------------------------
AdminRoute
--------------------------------------------------

Create a reusable AdminRoute component.

For now:

- simply render <Outlet />

Do not implement authorization yet.

--------------------------------------------------
App.jsx
--------------------------------------------------

Replace the temporary placeholder.

Render AppRouter inside AppProvider.

--------------------------------------------------
General Requirements
--------------------------------------------------

- Keep routing clean.
- Use nested layouts where appropriate.
- Use React Router best practices.
- Do not implement authentication.
- Do not implement API integration.
- Keep placeholder pages minimal.

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- create feature logic
- create forms
- connect backend
- implement authentication checks
- implement admin checks
- add new dependencies

The goal is to establish the application's routing architecture only.

**Requirements**:
--------------------------------------------------

- Keep routing clean.
- Use nested layouts where appropriate.
- Use React Router best practices.
- Do not implement authentication.
- Do not implement API integration.
- Keep placeholder pages minimal.

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- create feature logic
- create forms
- connect backend
- implement authentication checks
- implement admin checks
- add new dependencies

The goal is to establish the application's routing architecture only.

**Constraints**:
--------------------------------------------------

Do not

- create feature logic
- create forms
- connect backend
- implement authentication checks
- implement admin checks
- add new dependencies

The goal is to establish the application's routing architecture only.

---

# 29. The Authentication Infrastructure For The Applicat

**Task**:
Implement the authentication infrastructure for the application.

Context

The application layout architecture and routing foundation are complete.

The next step is to establish the authentication infrastructure before implementing the login and registration pages.

The application is an inventory management system.

There is no landing page.

Unauthenticated users should always begin at the Login page.

Do not modify the existing project architecture.

--------------------------------------------------
Application Routing
--------------------------------------------------

Update the routing behavior.

Requirements

- Redirect "/" to "/login".
- Do not create or display a landing page.
- Login should become the application's default entry point.
- Keep the remaining route structure unchanged.

--------------------------------------------------
Axios
--------------------------------------------------

Create a reusable Axios instance.

Implement:

- baseURL configuration
- JSON headers
- request interceptor
- response interceptor

Do not implement refresh tokens.

Keep the implementation clean and reusable.

--------------------------------------------------
Storage Utilities
--------------------------------------------------

Create reusable storage helpers.

Implement:

- getItem
- setItem
- removeItem

These helpers should remain generic and reusable across the application.

--------------------------------------------------
Authentication Token Service
--------------------------------------------------

Create:

services/auth_token_service.js

Responsibilities

- getToken
- setToken
- removeToken

This service should only manage authentication tokens.

Do not include authentication logic.

--------------------------------------------------
Authentication Service
--------------------------------------------------

Create:

services/auth_service.js

Responsibilities

- login
- register
- logout

This layer should only communicate with the backend.

Do not manage React state.

Do not perform navigation.

--------------------------------------------------
Authentication Context
--------------------------------------------------

Create:

context/AuthContext.jsx

Responsibilities

- current user
- authentication state
- login
- logout

Persist authentication using auth_token_service.js.

Keep the implementation simple.

Do not introduce unnecessary abstractions.

--------------------------------------------------
useAuth Hook
--------------------------------------------------

Create:

hooks/useAuth.js

Provide a reusable hook for consuming AuthContext.

--------------------------------------------------
Providers
--------------------------------------------------

Update:

providers/AppProvider.jsx

Wrap providers in the following order:

ThemeProvider

↓

AuthProvider

The provider architecture should remain extensible for future providers.

--------------------------------------------------
ProtectedRoute
--------------------------------------------------

Update ProtectedRoute.

If authenticated

Render:

<Outlet />

Otherwise

Redirect to:

/login

--------------------------------------------------
AdminRoute
--------------------------------------------------

Update AdminRoute.

Only allow users with the ADMIN role.

If unauthorized

Redirect to:

/login

Do not implement role fetching logic yet.

Only prepare the route architecture.

--------------------------------------------------
Architecture Rules
--------------------------------------------------

Maintain separation of responsibilities.

services/

- backend communication

context/

- authentication state

hooks/

- reusable context access

routes/

- route protection

utils/

- generic utilities

Do not mix responsibilities.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Consistent naming
- Small focused files
- No duplicated logic
- No unnecessary abstractions
- Follow the existing frontend architecture

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- implement Login UI
- implement Register UI
- create forms
- connect pages to backend
- implement refresh tokens
- introduce new dependencies
- modify the project architecture

The goal of this commit is to establish the authentication foundation that future pages will consume.

I would make one small routing adjustment.

Instead of having a placeholder Home page, remove it completely for now.

So your routes become:

/login
/register
/inventory
/vehicles/:id
/admin
*

and

/

simply redirects to:

/login

Once a user successfully logs in, then navigate them based on their role:

USER → /inventory
ADMIN → /admin

This mirrors how a real inventory management system behaves and avoids introducing a page that serves no purpose in the current application flow. It also means you won't waste time building or maintaining a landing/home page that isn't required by the assessment. I think that's the cleanest user flow for your project.

**Context**:
/
    │   └── AuthContext.jsx
    │
    │   └── useAuth.js
    │
    │   ├── api.js
    │   ├── auth_service.js
    │   └── auth_token_service.js
    │
    │   └── storage.js
    │
    │   └── AppProvider.jsx
    │
    │   ├── AppRouter.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── AdminRoute.jsx
    │   └── index.js
    │
    └── App.jsx

Task

Implement the authentication infrastructure for the application.

Context

The application layout architecture and routing foundation are complete.

The next step is to establish the authentication infrastructure before implementing the login and registration pages.

The application is an inventory management system.

There is no landing page.

Unauthenticated users should always begin at the Login page.

Do not modify the existing project architecture.

--------------------------------------------------
Application Routing
--------------------------------------------------

Update the routing behavior.

Requirements

- Redirect "/" to "/login".
- Do not create or display a landing page.
- Login should become the application's default entry point.
- Keep the remaining route structure unchanged.

--------------------------------------------------
Axios
--------------------------------------------------

Create a reusable Axios instance.

Implement:

- baseURL configuration
- JSON headers
- request interceptor
- response interceptor

Do not implement refresh tokens.

Keep the implementation clean and reusable.

--------------------------------------------------
Storage Utilities
--------------------------------------------------

Create reusable storage helpers.

Implement:

- getItem
- setItem
- removeItem

These helpers should remain generic and reusable across the application.

--------------------------------------------------
Authentication Token Service
--------------------------------------------------

Create:

services/auth_token_service.js

Responsibilities

- getToken
- setToken
- removeToken

This service should only manage authentication tokens.

Do not include authentication logic.

--------------------------------------------------
Authentication Service
--------------------------------------------------

Create:

services/auth_service.js

Responsibilities

- login
- register
- logout

This layer should only communicate with the backend.

Do not manage React state.

Do not perform navigation.

--------------------------------------------------
Authentication Context
--------------------------------------------------

Create:

context/AuthContext.jsx

Responsibilities

- current user
- authentication state
- login
- logout

Persist authentication using auth_token_service.js.

Keep the implementation simple.

Do not introduce unnecessary abstractions.

--------------------------------------------------
useAuth Hook
--------------------------------------------------

Create:

hooks/useAuth.js

Provide a reusable hook for consuming AuthContext.

--------------------------------------------------
Providers
--------------------------------------------------

Update:

providers/AppProvider.jsx

Wrap providers in the following order:

ThemeProvider

↓

AuthProvider

The provider architecture should remain extensible for future providers.

--------------------------------------------------
ProtectedRoute
--------------------------------------------------

Update ProtectedRoute.

If authenticated

Render:

<Outlet />

Otherwise

Redirect to:

/login

--------------------------------------------------
AdminRoute
--------------------------------------------------

Update AdminRoute.

Only allow users with the ADMIN role.

If unauthorized

Redirect to:

/login

Do not implement role fetching logic yet.

Only prepare the route architecture.

--------------------------------------------------
Architecture Rules
--------------------------------------------------

Maintain separation of responsibilities.

services/

- backend communication

context/

- authentication state

hooks/

- reusable context access

routes/

- route protection

utils/

- generic utilities

Do not mix responsibilities.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Consistent naming
- Small focused files
- No duplicated logic
- No unnecessary abstractions
- Follow the existing frontend architecture

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- implement Login UI
- implement Register UI
- create forms
- connect pages to backend
- implement refresh tokens
- introduce new dependencies
- modify the project architecture

The goal of this commit is to establish the authentication foundation that future pages will consume.

I would make one small routing adjustment.

Instead of having a placeholder Home page, remove it completely for now.

So your routes become:

/login
/register
/inventory
/vehicles/:id
/admin
*

and

/

simply redirects to:

/login

Once a user successfully logs in, then navigate them based on their role:

USER → /inventory
ADMIN → /admin

This mirrors how a real inventory management system behaves and avoids introducing a page that serves no purpose in the current application flow. It also means you won't waste time building or maintaining a landing/home page that isn't required by the assessment. I think that's the cleanest user flow for your project.

**Requirements**:
- Redirect "/" to "/login".
- Do not create or display a landing page.
- Login should become the application's default entry point.
- Keep the remaining route structure unchanged.

--------------------------------------------------
Axios
--------------------------------------------------

Create a reusable Axios instance.

Implement:

- baseURL configuration
- JSON headers
- request interceptor
- response interceptor

Do not implement refresh tokens.

Keep the implementation clean and reusable.

--------------------------------------------------
Storage Utilities
--------------------------------------------------

Create reusable storage helpers.

Implement:

- getItem
- setItem
- removeItem

These helpers should remain generic and reusable across the application.

--------------------------------------------------
Authentication Token Service
--------------------------------------------------

Create:

services/auth_token_service.js

Responsibilities

- getToken
- setToken
- removeToken

This service should only manage authentication tokens.

Do not include authentication logic.

--------------------------------------------------
Authentication Service
--------------------------------------------------

Create:

services/auth_service.js

Responsibilities

- login
- register
- logout

This layer should only communicate with the backend.

Do not manage React state.

Do not perform navigation.

--------------------------------------------------
Authentication Context
--------------------------------------------------

Create:

context/AuthContext.jsx

Responsibilities

- current user
- authentication state
- login
- logout

Persist authentication using auth_token_service.js.

Keep the implementation simple.

Do not introduce unnecessary abstractions.

--------------------------------------------------
useAuth Hook
--------------------------------------------------

Create:

hooks/useAuth.js

Provide a reusable hook for consuming AuthContext.

--------------------------------------------------
Providers
--------------------------------------------------

Update:

providers/AppProvider.jsx

Wrap providers in the following order:

ThemeProvider

↓

AuthProvider

The provider architecture should remain extensible for future providers.

--------------------------------------------------
ProtectedRoute
--------------------------------------------------

Update ProtectedRoute.

If authenticated

Render:

<Outlet />

Otherwise

Redirect to:

/login

--------------------------------------------------
AdminRoute
--------------------------------------------------

Update AdminRoute.

Only allow users with the ADMIN role.

If unauthorized

Redirect to:

/login

Do not implement role fetching logic yet.

Only prepare the route architecture.

--------------------------------------------------
Architecture Rules
--------------------------------------------------

Maintain separation of responsibilities.

services/

- backend communication

context/

- authentication state

hooks/

- reusable context access

routes/

- route protection

utils/

- generic utilities

Do not mix responsibilities.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Consistent naming
- Small focused files
- No duplicated logic
- No unnecessary abstractions
- Follow the existing frontend architecture

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- implement Login UI
- implement Register UI
- create forms
- connect pages to backend
- implement refresh tokens
- introduce new dependencies
- modify the project architecture

The goal of this commit is to establish the authentication foundation that future pages will consume.

I would make one small routing adjustment.

Instead of having a placeholder Home page, remove it completely for now.

So your routes become:

/login
/register
/inventory
/vehicles/:id
/admin
*

and

/

simply redirects to:

/login

Once a user successfully logs in, then navigate them based on their role:

USER → /inventory
ADMIN → /admin

This mirrors how a real inventory management system behaves and avoids introducing a page that serves no purpose in the current application flow. It also means you won't waste time building or maintaining a landing/home page that isn't required by the assessment. I think that's the cleanest user flow for your project.

**Constraints**:
--------------------------------------------------

Do not

- implement Login UI
- implement Register UI
- create forms
- connect pages to backend
- implement refresh tokens
- introduce new dependencies
- modify the project architecture

The goal of this commit is to establish the authentication foundation that future pages will consume.

I would make one small routing adjustment.

Instead of having a placeholder Home page, remove it completely for now.

So your routes become:

/login
/register
/inventory
/vehicles/:id
/admin
*

and

/

simply redirects to:

/login

Once a user successfully logs in, then navigate them based on their role:

USER → /inventory
ADMIN → /admin

This mirrors how a real inventory management system behaves and avoids introducing a page that serves no purpose in the current application flow. It also means you won't waste time building or maintaining a landing/home page that isn't required by the assessment. I think that's the cleanest user flow for your project.

---

# 30. The Complete Authentication Feature

**Task**:
Implement the complete authentication feature.

Context

The authentication infrastructure has already been implemented.

The backend must NOT be modified.

The backend login response is:

{
    "message": "Login successful",
    "token": "<jwt>"
}

The JWT payload currently contains only:

{
    "id": "...",
    "role": "USER | ADMIN"
}

Do not expect name or email inside the JWT.

The frontend should work with the existing backend implementation.

--------------------------------------------------
Architecture
--------------------------------------------------

Follow this architecture strictly.

Pages

↓

useAuth()

↓

AuthContext

↓

auth_service

↓

Backend API

Pages must never communicate directly with auth_service.

All authentication state must be managed inside AuthContext.

--------------------------------------------------
Authentication Components
--------------------------------------------------

Create

components/auth/

Implement

- AuthForm
- AuthHeader
- PasswordInput

AuthForm

Reusable layout used by both Login and Register.

AuthHeader

Reusable title and subtitle section.

PasswordInput

Reuse the existing Input component.

Support

- show password
- hide password
- error state
- helper text

Do not duplicate Input logic.

--------------------------------------------------
Login Page
--------------------------------------------------

Implement

pages/Login.jsx

Use

- React Hook Form
- Zod
- existing reusable UI components

Fields

- email
- password

Validation

- required email
- valid email
- required password

UX

- loading state
- disable submit while loading
- inline validation errors
- toast notifications
- link to Register page

On submit

Call

useAuth().login()

Never call auth_service directly.

--------------------------------------------------
Register Page
--------------------------------------------------

Implement

pages/Register.jsx

Fields

- name
- email
- password

Validation

- required name
- required email
- valid email
- minimum password length

UX

- loading state
- disable submit
- validation errors
- success toast
- error toast
- link to Login page

On successful registration

Navigate to

/login

--------------------------------------------------
Authentication Context
--------------------------------------------------

Update AuthContext.

After successful login

Store the JWT using auth_token_service.

Decode the JWT using jwt-decode.

Extract

- id
- role

Store

- token
- user
- isAuthenticated

Example

user = {
    id,
    role
}

Do not fabricate name or email.

Do not modify the backend.

--------------------------------------------------
Authentication Service
--------------------------------------------------

Update auth_service.

Implement

- login
- register
- logout

Responsibilities

- backend communication only

Do not

- navigate
- update React state
- decode JWT

--------------------------------------------------
ProtectedRoute
--------------------------------------------------

Use AuthContext.

If authenticated

Render

<Outlet />

Otherwise

Navigate to

/login

--------------------------------------------------
AdminRoute
--------------------------------------------------

Use AuthContext.

Allow only users whose role is ADMIN.

Otherwise

Navigate to

/login

--------------------------------------------------
Navigation
--------------------------------------------------

After successful login

If role === "ADMIN"

Navigate

/admin

Otherwise

Navigate

/inventory

--------------------------------------------------
Reusable UI
--------------------------------------------------

Use the existing

- Button
- Input
- Label
- Alert
- Spinner

Do not duplicate components.

--------------------------------------------------
Validation
--------------------------------------------------

Use

- React Hook Form
- Zod

Validation belongs inside the page layer.

Do not move validation into reusable UI components.

--------------------------------------------------
Accessibility
--------------------------------------------------

Support

- keyboard navigation
- proper labels
- visible focus states
- password visibility toggle
- appropriate ARIA attributes

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Separation of responsibilities
- No duplicated logic
- Consistent naming

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- modify backend APIs
- modify JWT payload
- add new dependencies
- move business logic into pages
- bypass AuthContext
- call auth_service directly from pages
- implement a profile page
- assume the existence of name or email after login

The goal of this commit is to implement a complete authentication feature using the existing backend contract while keeping the frontend architecture clean and maintainable.

**Context**:
/
    │   └── AuthContext.jsx
    │
    │   └── useAuth.js
    │
    │   ├── auth_service.js
    │   └── auth_token_service.js
    │
        ├── ProtectedRoute.jsx
        └── AdminRoute.jsx

Task

Implement the complete authentication feature.

Context

The authentication infrastructure has already been implemented.

The backend must NOT be modified.

The backend login response is:

{
    "message": "Login successful",
    "token": "<jwt>"
}

The JWT payload currently contains only:

{
    "id": "...",
    "role": "USER | ADMIN"
}

Do not expect name or email inside the JWT.

The frontend should work with the existing backend implementation.

--------------------------------------------------
Architecture
--------------------------------------------------

Follow this architecture strictly.

Pages

↓

useAuth()

↓

AuthContext

↓

auth_service

↓

Backend API

Pages must never communicate directly with auth_service.

All authentication state must be managed inside AuthContext.

--------------------------------------------------
Authentication Components
--------------------------------------------------

Create

components/auth/

Implement

- AuthForm
- AuthHeader
- PasswordInput

AuthForm

Reusable layout used by both Login and Register.

AuthHeader

Reusable title and subtitle section.

PasswordInput

Reuse the existing Input component.

Support

- show password
- hide password
- error state
- helper text

Do not duplicate Input logic.

--------------------------------------------------
Login Page
--------------------------------------------------

Implement

pages/Login.jsx

Use

- React Hook Form
- Zod
- existing reusable UI components

Fields

- email
- password

Validation

- required email
- valid email
- required password

UX

- loading state
- disable submit while loading
- inline validation errors
- toast notifications
- link to Register page

On submit

Call

useAuth().login()

Never call auth_service directly.

--------------------------------------------------
Register Page
--------------------------------------------------

Implement

pages/Register.jsx

Fields

- name
- email
- password

Validation

- required name
- required email
- valid email
- minimum password length

UX

- loading state
- disable submit
- validation errors
- success toast
- error toast
- link to Login page

On successful registration

Navigate to

/login

--------------------------------------------------
Authentication Context
--------------------------------------------------

Update AuthContext.

After successful login

Store the JWT using auth_token_service.

Decode the JWT using jwt-decode.

Extract

- id
- role

Store

- token
- user
- isAuthenticated

Example

user = {
    id,
    role
}

Do not fabricate name or email.

Do not modify the backend.

--------------------------------------------------
Authentication Service
--------------------------------------------------

Update auth_service.

Implement

- login
- register
- logout

Responsibilities

- backend communication only

Do not

- navigate
- update React state
- decode JWT

--------------------------------------------------
ProtectedRoute
--------------------------------------------------

Use AuthContext.

If authenticated

Render

<Outlet />

Otherwise

Navigate to

/login

--------------------------------------------------
AdminRoute
--------------------------------------------------

Use AuthContext.

Allow only users whose role is ADMIN.

Otherwise

Navigate to

/login

--------------------------------------------------
Navigation
--------------------------------------------------

After successful login

If role === "ADMIN"

Navigate

/admin

Otherwise

Navigate

/inventory

--------------------------------------------------
Reusable UI
--------------------------------------------------

Use the existing

- Button
- Input
- Label
- Alert
- Spinner

Do not duplicate components.

--------------------------------------------------
Validation
--------------------------------------------------

Use

- React Hook Form
- Zod

Validation belongs inside the page layer.

Do not move validation into reusable UI components.

--------------------------------------------------
Accessibility
--------------------------------------------------

Support

- keyboard navigation
- proper labels
- visible focus states
- password visibility toggle
- appropriate ARIA attributes

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Separation of responsibilities
- No duplicated logic
- Consistent naming

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- modify backend APIs
- modify JWT payload
- add new dependencies
- move business logic into pages
- bypass AuthContext
- call auth_service directly from pages
- implement a profile page
- assume the existence of name or email after login

The goal of this commit is to implement a complete authentication feature using the existing backend contract while keeping the frontend architecture clean and maintainable.

**Constraints**:
--------------------------------------------------

Do not

- modify backend APIs
- modify JWT payload
- add new dependencies
- move business logic into pages
- bypass AuthContext
- call auth_service directly from pages
- implement a profile page
- assume the existence of name or email after login

The goal of this commit is to implement a complete authentication feature using the existing backend contract while keeping the frontend architecture clean and maintainable.

---

# 31. Complete The Authentication Module By Implementing

**Task**:
Complete the authentication module by implementing logout functionality and verifying the complete authentication flow.

Do not modify the project architecture.

--------------------------------------------------
Logout
--------------------------------------------------

Implement logout through AuthContext.

Responsibilities

- remove the JWT using auth_token_service
- clear the authenticated user
- reset authentication state
- redirect to /login

The logout flow should be handled by AuthContext.

Pages and components should simply call:

useAuth().logout()

--------------------------------------------------
Authentication Service
--------------------------------------------------

Review auth_service.js.

If a backend logout endpoint exists, use it.

If no logout endpoint exists, logout should simply clear the client-side authentication state.

Do not modify the backend.

--------------------------------------------------
Navbar
--------------------------------------------------

Update the Navbar.

Requirements

When authenticated

Display

- Logout button

When unauthenticated

Display

- Login button

The Logout button should call

useAuth().logout()

Do not duplicate logout logic inside Navbar.

--------------------------------------------------
Authentication Verification
--------------------------------------------------

Review and verify the complete authentication flow.

Ensure:

✓ Login stores the JWT correctly.

✓ JWT is decoded correctly.

✓ AuthContext initializes correctly after page refresh.

✓ Authentication persists across refreshes.

✓ ProtectedRoute blocks unauthenticated users.

✓ AdminRoute blocks non-admin users.

✓ Logout clears all authentication state.

✓ Logout redirects to /login.

✓ Visiting protected routes after logout redirects correctly.

✓ No authentication state remains after logout.

--------------------------------------------------
Code Review
--------------------------------------------------

Review the authentication module.

Remove

- duplicated logic
- unused imports
- unnecessary state
- dead code

Simplify implementations where appropriate.

Keep the architecture unchanged.

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- modify backend APIs
- introduce new dependencies
- change folder structure
- move business logic into components
- duplicate authentication logic

The goal of this commit is to complete and stabilize the authentication feature before starting the inventory module.

**Context**:
/
    │   └── AuthContext.jsx
    │
    │   └── useAuth.js
    │
    │   ├── auth_service.js
    │   └── auth_token_service.js
    │
    │   └── layout/
    │       └── Navbar.jsx
    │
    │   ├── ProtectedRoute.jsx
    │   └── AdminRoute.jsx
    │
        └── AppProvider.jsx

Task

Complete the authentication module by implementing logout functionality and verifying the complete authentication flow.

Do not modify the project architecture.

--------------------------------------------------
Logout
--------------------------------------------------

Implement logout through AuthContext.

Responsibilities

- remove the JWT using auth_token_service
- clear the authenticated user
- reset authentication state
- redirect to /login

The logout flow should be handled by AuthContext.

Pages and components should simply call:

useAuth().logout()

--------------------------------------------------
Authentication Service
--------------------------------------------------

Review auth_service.js.

If a backend logout endpoint exists, use it.

If no logout endpoint exists, logout should simply clear the client-side authentication state.

Do not modify the backend.

--------------------------------------------------
Navbar
--------------------------------------------------

Update the Navbar.

Requirements

When authenticated

Display

- Logout button

When unauthenticated

Display

- Login button

The Logout button should call

useAuth().logout()

Do not duplicate logout logic inside Navbar.

--------------------------------------------------
Authentication Verification
--------------------------------------------------

Review and verify the complete authentication flow.

Ensure:

✓ Login stores the JWT correctly.

✓ JWT is decoded correctly.

✓ AuthContext initializes correctly after page refresh.

✓ Authentication persists across refreshes.

✓ ProtectedRoute blocks unauthenticated users.

✓ AdminRoute blocks non-admin users.

✓ Logout clears all authentication state.

✓ Logout redirects to /login.

✓ Visiting protected routes after logout redirects correctly.

✓ No authentication state remains after logout.

--------------------------------------------------
Code Review
--------------------------------------------------

Review the authentication module.

Remove

- duplicated logic
- unused imports
- unnecessary state
- dead code

Simplify implementations where appropriate.

Keep the architecture unchanged.

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- modify backend APIs
- introduce new dependencies
- change folder structure
- move business logic into components
- duplicate authentication logic

The goal of this commit is to complete and stabilize the authentication feature before starting the inventory module.

**Requirements**:
When authenticated

Display

- Logout button

When unauthenticated

Display

- Login button

The Logout button should call

useAuth().logout()

Do not duplicate logout logic inside Navbar.

--------------------------------------------------
Authentication Verification
--------------------------------------------------

Review and verify the complete authentication flow.

Ensure:

✓ Login stores the JWT correctly.

✓ JWT is decoded correctly.

✓ AuthContext initializes correctly after page refresh.

✓ Authentication persists across refreshes.

✓ ProtectedRoute blocks unauthenticated users.

✓ AdminRoute blocks non-admin users.

✓ Logout clears all authentication state.

✓ Logout redirects to /login.

✓ Visiting protected routes after logout redirects correctly.

✓ No authentication state remains after logout.

--------------------------------------------------
Code Review
--------------------------------------------------

Review the authentication module.

Remove

- duplicated logic
- unused imports
- unnecessary state
- dead code

Simplify implementations where appropriate.

Keep the architecture unchanged.

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- modify backend APIs
- introduce new dependencies
- change folder structure
- move business logic into components
- duplicate authentication logic

The goal of this commit is to complete and stabilize the authentication feature before starting the inventory module.

**Constraints**:
--------------------------------------------------

Do not

- modify backend APIs
- introduce new dependencies
- change folder structure
- move business logic into components
- duplicate authentication logic

The goal of this commit is to complete and stabilize the authentication feature before starting the inventory module.

---

# 32. The Initial Vehicle Inventory Listing Feature

**Task**:
Implement the initial vehicle inventory listing feature.

Context

The authentication module is complete.

The backend endpoint GET /vehicles already exists.

The backend returns every vehicle in the database.

Vehicle schema:

{
    make,
    model,
    year,
    price,
    mileage,
    fuelType,
    transmission,
    color,
    stock
}

The frontend must follow the backend contract exactly.

Do not invent additional fields.

Do not modify the backend.

--------------------------------------------------
Vehicle Service
--------------------------------------------------

Update

services/vehicle_service.js

Implement

getAllVehicles()

Responsibilities

- communicate with the backend
- return backend responses only

Do not

- transform responses
- filter data
- modify returned objects
- manage React state

--------------------------------------------------
Vehicle Hook
--------------------------------------------------

Create

hooks/useVehicles.js

Responsibilities

- fetch vehicles
- loading state
- error state
- expose vehicles
- expose fetchVehicles()

Keep the hook focused.

Do not perform filtering or sorting.

--------------------------------------------------
Inventory Page
--------------------------------------------------

Implement

pages/Inventory.jsx

Responsibilities

- fetch vehicles on mount
- display loading state
- display error state
- display empty state
- render VehicleGrid

Use the existing MainLayout.

Do not implement

- search
- filters
- sorting
- pagination

Display the complete inventory returned by the backend.

--------------------------------------------------
VehicleGrid
--------------------------------------------------

Create

components/vehicle/VehicleGrid.jsx

Responsibilities

- receive vehicles
- render a responsive grid
- render VehicleCard for every vehicle

Keep the component presentational.

--------------------------------------------------
VehicleCard
--------------------------------------------------

Create

components/vehicle/VehicleCard.jsx

Display only the fields available in the backend schema.

Display

- make
- model
- year
- price
- mileage
- fuelType
- transmission
- color
- stock

Do not display

- image
- description
- VIN
- status
- reservation
- location
- owner

Use the existing reusable UI components where appropriate.

Keep the component presentational.

--------------------------------------------------
Stock Display
--------------------------------------------------

Do not create a separate VehicleStatusBadge component.

Instead, derive the display from the stock value.

Examples

If stock > 0

Display

"In Stock (5)"

If stock === 0

Display

"Out of Stock"

Do not invent additional states such as

- Reserved
- Available
- Sold

The backend only exposes the stock field.

The frontend should derive display text only from that value.

--------------------------------------------------
Application Behaviour
--------------------------------------------------

Display every vehicle returned by the backend.

Do not perform client-side filtering.

Do not remove vehicles whose stock is zero.

The UI should faithfully represent the backend response.

--------------------------------------------------
Reusable Components
--------------------------------------------------

Reuse the existing

- Card
- Badge (only if appropriate)
- Button (only if appropriate)
- Spinner
- Alert
- EmptyState

Do not create unnecessary abstractions.

Follow the Rule of Three.

Only extract reusable components when they clearly provide value.

--------------------------------------------------
Architecture Rules
--------------------------------------------------

Maintain separation of responsibilities.

services/

- backend communication

hooks/

- frontend state

components/

- presentation only

pages/

- compose feature components

Do not mix responsibilities.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Consistent naming
- No duplicated logic
- No hardcoded mock data
- No unnecessary abstractions

Use the backend field names exactly as defined.

Use

- make
- model
- fuelType
- transmission
- stock

Do not rename them to

- brand
- type
- gearbox
- availability

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- search
- filtering
- sorting
- pagination
- purchase flow
- vehicle details page
- admin actions
- editing
- deleting
- optimistic updates
- client-side filtering
- placeholder images
- additional backend fields
- new dependencies

The goal of this commit is to build a clean, reusable, maintainable inventory listing that accurately reflects the backend API and establishes the foundation for future inventory features.

Since there are no vehicle images, make the card look premium by emphasizing typography rather than trying to fill space. For example:

Make + Model as the primary heading.
Price as the visual focal point.
Present the remaining fields (Year, Mileage, Fuel Type, Transmission, Color, Stock) in a clean two-column definition list or key-value layout.

This creates an elegant inventory card without inventing data or relying on placeholder images, and it aligns well with the premium design system you've already established.

**Context**:
The authentication module is complete.

The backend endpoint GET /vehicles already exists.

The backend returns every vehicle in the database.

Vehicle schema:

{
    make,
    model,
    year,
    price,
    mileage,
    fuelType,
    transmission,
    color,
    stock
}

The frontend must follow the backend contract exactly.

Do not invent additional fields.

Do not modify the backend.

--------------------------------------------------
Vehicle Service
--------------------------------------------------

Update

services/vehicle_service.js

Implement

getAllVehicles()

Responsibilities

- communicate with the backend
- return backend responses only

Do not

- transform responses
- filter data
- modify returned objects
- manage React state

--------------------------------------------------
Vehicle Hook
--------------------------------------------------

Create

hooks/useVehicles.js

Responsibilities

- fetch vehicles
- loading state
- error state
- expose vehicles
- expose fetchVehicles()

Keep the hook focused.

Do not perform filtering or sorting.

--------------------------------------------------
Inventory Page
--------------------------------------------------

Implement

pages/Inventory.jsx

Responsibilities

- fetch vehicles on mount
- display loading state
- display error state
- display empty state
- render VehicleGrid

Use the existing MainLayout.

Do not implement

- search
- filters
- sorting
- pagination

Display the complete inventory returned by the backend.

--------------------------------------------------
VehicleGrid
--------------------------------------------------

Create

components/vehicle/VehicleGrid.jsx

Responsibilities

- receive vehicles
- render a responsive grid
- render VehicleCard for every vehicle

Keep the component presentational.

--------------------------------------------------
VehicleCard
--------------------------------------------------

Create

components/vehicle/VehicleCard.jsx

Display only the fields available in the backend schema.

Display

- make
- model
- year
- price
- mileage
- fuelType
- transmission
- color
- stock

Do not display

- image
- description
- VIN
- status
- reservation
- location
- owner

Use the existing reusable UI components where appropriate.

Keep the component presentational.

--------------------------------------------------
Stock Display
--------------------------------------------------

Do not create a separate VehicleStatusBadge component.

Instead, derive the display from the stock value.

Examples

If stock > 0

Display

"In Stock (5)"

If stock === 0

Display

"Out of Stock"

Do not invent additional states such as

- Reserved
- Available
- Sold

The backend only exposes the stock field.

The frontend should derive display text only from that value.

--------------------------------------------------
Application Behaviour
--------------------------------------------------

Display every vehicle returned by the backend.

Do not perform client-side filtering.

Do not remove vehicles whose stock is zero.

The UI should faithfully represent the backend response.

--------------------------------------------------
Reusable Components
--------------------------------------------------

Reuse the existing

- Card
- Badge (only if appropriate)
- Button (only if appropriate)
- Spinner
- Alert
- EmptyState

Do not create unnecessary abstractions.

Follow the Rule of Three.

Only extract reusable components when they clearly provide value.

--------------------------------------------------
Architecture Rules
--------------------------------------------------

Maintain separation of responsibilities.

services/

- backend communication

hooks/

- frontend state

components/

- presentation only

pages/

- compose feature components

Do not mix responsibilities.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Consistent naming
- No duplicated logic
- No hardcoded mock data
- No unnecessary abstractions

Use the backend field names exactly as defined.

Use

- make
- model
- fuelType
- transmission
- stock

Do not rename them to

- brand
- type
- gearbox
- availability

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- search
- filtering
- sorting
- pagination
- purchase flow
- vehicle details page
- admin actions
- editing
- deleting
- optimistic updates
- client-side filtering
- placeholder images
- additional backend fields
- new dependencies

The goal of this commit is to build a clean, reusable, maintainable inventory listing that accurately reflects the backend API and establishes the foundation for future inventory features.

Since there are no vehicle images, make the card look premium by emphasizing typography rather than trying to fill space. For example:

Make + Model as the primary heading.
Price as the visual focal point.
Present the remaining fields (Year, Mileage, Fuel Type, Transmission, Color, Stock) in a clean two-column definition list or key-value layout.

This creates an elegant inventory card without inventing data or relying on placeholder images, and it aligns well with the premium design system you've already established.

**Constraints**:
--------------------------------------------------

Do not implement

- search
- filtering
- sorting
- pagination
- purchase flow
- vehicle details page
- admin actions
- editing
- deleting
- optimistic updates
- client-side filtering
- placeholder images
- additional backend fields
- new dependencies

The goal of this commit is to build a clean, reusable, maintainable inventory listing that accurately reflects the backend API and establishes the foundation for future inventory features.

Since there are no vehicle images, make the card look premium by emphasizing typography rather than trying to fill space. For example:

Make + Model as the primary heading.
Price as the visual focal point.
Present the remaining fields (Year, Mileage, Fuel Type, Transmission, Color, Stock) in a clean two-column definition list or key-value layout.

This creates an elegant inventory card without inventing data or relying on placeholder images, and it aligns well with the premium design system you've already established.

---

# 33. Vehicle Search And Filtering For The Inventory Pag

**Task**:
Implement vehicle search and filtering for the inventory page.

Context

The vehicle inventory listing has already been completed.

The backend already returns the complete vehicle inventory.

Searching and filtering should happen entirely on the frontend using the fetched vehicle data.

Do not modify backend APIs.

Do not introduce new dependencies.

--------------------------------------------------
Architecture
--------------------------------------------------

Follow this architecture.

Inventory.jsx

↓

useVehicles()

↓

useVehicleFilters()

↓

InventoryToolbar

↓

VehicleSearch
VehicleFilters

↓

VehicleGrid

Responsibilities

useVehicles

- fetch data only

useVehicleFilters

- search
- filtering
- derived data only

InventoryToolbar

- compose search and filters
- no filtering logic

VehicleSearch

- search input only

VehicleFilters

- filter controls only

Do not mix responsibilities.

--------------------------------------------------
Inventory Toolbar
--------------------------------------------------

Create

components/vehicle/InventoryToolbar.jsx

Responsibilities

- compose VehicleSearch
- compose VehicleFilters
- receive state and callbacks through props
- contain no business logic
- remain reusable within the vehicle feature

--------------------------------------------------
Vehicle Search
--------------------------------------------------

Create

components/vehicle/VehicleSearch.jsx

Responsibilities

- controlled search input
- reusable within the vehicle feature

Search should match

- make
- model

Requirements

- case-insensitive
- trim leading and trailing whitespace
- update search query through callback props

Do not perform filtering inside this component.

--------------------------------------------------
Vehicle Filters
--------------------------------------------------

Create

components/vehicle/VehicleFilters.jsx

Implement the following filters.

Stock

- All
- In Stock
- Out of Stock

Stock should be derived from

stock > 0

Fuel Type

Generate options dynamically from the fetched vehicles.

Do not hardcode values.

Transmission

Generate options dynamically from the fetched vehicles.

Do not hardcode values.

The component should only render controls.

Filtering logic belongs inside the hook.

--------------------------------------------------
Vehicle Filter Hook
--------------------------------------------------

Create

hooks/useVehicleFilters.js

Input

vehicles

Responsibilities

- manage search query
- manage filter state
- derive filteredVehicles

Filtering

Search

Search by

- make
- model

Filters

- stock
- fuelType
- transmission

Search should be case-insensitive.

Do not fetch data.

Do not perform API requests.

Expose

- filteredVehicles
- searchQuery
- selectedStock
- selectedFuelType
- selectedTransmission
- updateSearchQuery()
- updateStockFilter()
- updateFuelTypeFilter()
- updateTransmissionFilter()

Keep the hook focused and reusable.

--------------------------------------------------
Inventory Page
--------------------------------------------------

Update

pages/Inventory.jsx

Responsibilities

- fetch vehicles using useVehicles()
- manage loading state
- manage error state
- manage empty state
- use useVehicleFilters()
- render InventoryToolbar
- render VehicleGrid using filteredVehicles

The page should compose feature components.

Avoid implementing business logic directly inside the page.

--------------------------------------------------
Reusable Components
--------------------------------------------------

Reuse existing components wherever appropriate.

Examples

- Input
- Select
- Card
- Button
- EmptyState
- Spinner
- Alert

Do not duplicate existing UI.

--------------------------------------------------
Application Behaviour
--------------------------------------------------

Display all vehicles returned by the backend.

Filtering happens entirely on the client.

Searching and filtering should work together.

Changing one filter should preserve the others.

Clearing filters should restore the complete inventory.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Consistent naming
- Separation of responsibilities
- No duplicated logic
- No unnecessary abstractions

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- sorting
- pagination
- vehicle details page
- purchase flow
- admin actions
- backend filtering
- new backend endpoints
- new dependencies

Do not convert feature components into generic UI components.

VehicleSearch, VehicleFilters, and InventoryToolbar should remain specific to the vehicle feature.

The goal of this commit is to improve inventory browsing by implementing reusable vehicle search and filtering while keeping the architecture clean, modular, and aligned with the existing frontend structure.

**Context**:
The vehicle inventory listing has already been completed.

The backend already returns the complete vehicle inventory.

Searching and filtering should happen entirely on the frontend using the fetched vehicle data.

Do not modify backend APIs.

Do not introduce new dependencies.

--------------------------------------------------
Architecture
--------------------------------------------------

Follow this architecture.

Inventory.jsx

↓

useVehicles()

↓

useVehicleFilters()

↓

InventoryToolbar

↓

VehicleSearch
VehicleFilters

↓

VehicleGrid

Responsibilities

useVehicles

- fetch data only

useVehicleFilters

- search
- filtering
- derived data only

InventoryToolbar

- compose search and filters
- no filtering logic

VehicleSearch

- search input only

VehicleFilters

- filter controls only

Do not mix responsibilities.

--------------------------------------------------
Inventory Toolbar
--------------------------------------------------

Create

components/vehicle/InventoryToolbar.jsx

Responsibilities

- compose VehicleSearch
- compose VehicleFilters
- receive state and callbacks through props
- contain no business logic
- remain reusable within the vehicle feature

--------------------------------------------------
Vehicle Search
--------------------------------------------------

Create

components/vehicle/VehicleSearch.jsx

Responsibilities

- controlled search input
- reusable within the vehicle feature

Search should match

- make
- model

Requirements

- case-insensitive
- trim leading and trailing whitespace
- update search query through callback props

Do not perform filtering inside this component.

--------------------------------------------------
Vehicle Filters
--------------------------------------------------

Create

components/vehicle/VehicleFilters.jsx

Implement the following filters.

Stock

- All
- In Stock
- Out of Stock

Stock should be derived from

stock > 0

Fuel Type

Generate options dynamically from the fetched vehicles.

Do not hardcode values.

Transmission

Generate options dynamically from the fetched vehicles.

Do not hardcode values.

The component should only render controls.

Filtering logic belongs inside the hook.

--------------------------------------------------
Vehicle Filter Hook
--------------------------------------------------

Create

hooks/useVehicleFilters.js

Input

vehicles

Responsibilities

- manage search query
- manage filter state
- derive filteredVehicles

Filtering

Search

Search by

- make
- model

Filters

- stock
- fuelType
- transmission

Search should be case-insensitive.

Do not fetch data.

Do not perform API requests.

Expose

- filteredVehicles
- searchQuery
- selectedStock
- selectedFuelType
- selectedTransmission
- updateSearchQuery()
- updateStockFilter()
- updateFuelTypeFilter()
- updateTransmissionFilter()

Keep the hook focused and reusable.

--------------------------------------------------
Inventory Page
--------------------------------------------------

Update

pages/Inventory.jsx

Responsibilities

- fetch vehicles using useVehicles()
- manage loading state
- manage error state
- manage empty state
- use useVehicleFilters()
- render InventoryToolbar
- render VehicleGrid using filteredVehicles

The page should compose feature components.

Avoid implementing business logic directly inside the page.

--------------------------------------------------
Reusable Components
--------------------------------------------------

Reuse existing components wherever appropriate.

Examples

- Input
- Select
- Card
- Button
- EmptyState
- Spinner
- Alert

Do not duplicate existing UI.

--------------------------------------------------
Application Behaviour
--------------------------------------------------

Display all vehicles returned by the backend.

Filtering happens entirely on the client.

Searching and filtering should work together.

Changing one filter should preserve the others.

Clearing filters should restore the complete inventory.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Consistent naming
- Separation of responsibilities
- No duplicated logic
- No unnecessary abstractions

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- sorting
- pagination
- vehicle details page
- purchase flow
- admin actions
- backend filtering
- new backend endpoints
- new dependencies

Do not convert feature components into generic UI components.

VehicleSearch, VehicleFilters, and InventoryToolbar should remain specific to the vehicle feature.

The goal of this commit is to improve inventory browsing by implementing reusable vehicle search and filtering while keeping the architecture clean, modular, and aligned with the existing frontend structure.

**Requirements**:
- case-insensitive
- trim leading and trailing whitespace
- update search query through callback props

Do not perform filtering inside this component.

--------------------------------------------------
Vehicle Filters
--------------------------------------------------

Create

components/vehicle/VehicleFilters.jsx

Implement the following filters.

Stock

- All
- In Stock
- Out of Stock

Stock should be derived from

stock > 0

Fuel Type

Generate options dynamically from the fetched vehicles.

Do not hardcode values.

Transmission

Generate options dynamically from the fetched vehicles.

Do not hardcode values.

The component should only render controls.

Filtering logic belongs inside the hook.

--------------------------------------------------
Vehicle Filter Hook
--------------------------------------------------

Create

hooks/useVehicleFilters.js

Input

vehicles

Responsibilities

- manage search query
- manage filter state
- derive filteredVehicles

Filtering

Search

Search by

- make
- model

Filters

- stock
- fuelType
- transmission

Search should be case-insensitive.

Do not fetch data.

Do not perform API requests.

Expose

- filteredVehicles
- searchQuery
- selectedStock
- selectedFuelType
- selectedTransmission
- updateSearchQuery()
- updateStockFilter()
- updateFuelTypeFilter()
- updateTransmissionFilter()

Keep the hook focused and reusable.

--------------------------------------------------
Inventory Page
--------------------------------------------------

Update

pages/Inventory.jsx

Responsibilities

- fetch vehicles using useVehicles()
- manage loading state
- manage error state
- manage empty state
- use useVehicleFilters()
- render InventoryToolbar
- render VehicleGrid using filteredVehicles

The page should compose feature components.

Avoid implementing business logic directly inside the page.

--------------------------------------------------
Reusable Components
--------------------------------------------------

Reuse existing components wherever appropriate.

Examples

- Input
- Select
- Card
- Button
- EmptyState
- Spinner
- Alert

Do not duplicate existing UI.

--------------------------------------------------
Application Behaviour
--------------------------------------------------

Display all vehicles returned by the backend.

Filtering happens entirely on the client.

Searching and filtering should work together.

Changing one filter should preserve the others.

Clearing filters should restore the complete inventory.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Consistent naming
- Separation of responsibilities
- No duplicated logic
- No unnecessary abstractions

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- sorting
- pagination
- vehicle details page
- purchase flow
- admin actions
- backend filtering
- new backend endpoints
- new dependencies

Do not convert feature components into generic UI components.

VehicleSearch, VehicleFilters, and InventoryToolbar should remain specific to the vehicle feature.

The goal of this commit is to improve inventory browsing by implementing reusable vehicle search and filtering while keeping the architecture clean, modular, and aligned with the existing frontend structure.

**Constraints**:
--------------------------------------------------

Do not implement

- sorting
- pagination
- vehicle details page
- purchase flow
- admin actions
- backend filtering
- new backend endpoints
- new dependencies

Do not convert feature components into generic UI components.

VehicleSearch, VehicleFilters, and InventoryToolbar should remain specific to the vehicle feature.

The goal of this commit is to improve inventory browsing by implementing reusable vehicle search and filtering while keeping the architecture clean, modular, and aligned with the existing frontend structure.

---

# 34. The Admin Vehicle Management Feature

**Task**:
Implement the admin vehicle management feature.

Context

Authentication, inventory listing, search, and filtering are complete.

The backend already supports vehicle CRUD operations.

Implement the admin interface for managing vehicles.

--------------------------------------------------
Vehicle Service
--------------------------------------------------

Update

vehicle_service.js

Implement

- createVehicle()
- updateVehicle()
- deleteVehicle()

Keep this layer responsible only for backend communication.

--------------------------------------------------
Admin Hook
--------------------------------------------------

Create

useAdminVehicles.js

Responsibilities

- create vehicle
- update vehicle
- delete vehicle
- refresh inventory
- loading state
- error state

Do not implement UI logic.

--------------------------------------------------
Admin Dashboard
--------------------------------------------------

Update

AdminDashboard.jsx

Responsibilities

- fetch vehicles
- display VehicleTable
- open create modal
- open edit modal
- open delete confirmation
- refresh data after successful operations

--------------------------------------------------
Vehicle Table
--------------------------------------------------

Create

VehicleTable.jsx

Display

- make
- model
- year
- price
- stock

Actions

- Edit
- Delete

Use reusable UI components.

--------------------------------------------------
Vehicle Form
--------------------------------------------------

Create

VehicleForm.jsx

Use the same form for

- creating vehicles
- editing vehicles

Use

- React Hook Form
- Zod

Fields

- make
- model
- year
- price
- mileage
- fuelType
- transmission
- color
- stock

Reuse existing Input components.

--------------------------------------------------
Vehicle Modal
--------------------------------------------------

Create

VehicleModal.jsx

Reuse the existing modal/dialog component if available.

If none exists, create a lightweight feature-specific modal for the admin feature.

The modal should render VehicleForm.

--------------------------------------------------
Delete Confirmation
--------------------------------------------------

Create

DeleteVehicleDialog.jsx

Show confirmation before deletion.

Do not use window.confirm().

--------------------------------------------------
General Requirements
--------------------------------------------------

- Reuse existing UI components.
- Keep business logic inside hooks.
- Keep pages responsible for composition.
- Refresh inventory after successful CRUD operations.
- Display loading and error states.
- Show success and error toast notifications where appropriate.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- No duplicated logic
- Separation of responsibilities
- Reusable feature components

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- bulk actions
- pagination
- inline editing
- image upload
- optimistic updates
- drag and drop
- additional backend endpoints
- new dependencies

The goal of this commit is to implement a clean, maintainable admin vehicle management interface using the existing backend APIs.

I would not create a separate StockBadge.jsx.

Your inventory already displays stock as a numeric value, and you've intentionally avoided introducing unnecessary abstractions. A dedicated stock badge would add complexity without much benefit.

Instead, keep the table simple:

Show the numeric stock value.
Optionally style low stock (0 or low numbers) using existing utility classes or the generic Badge component if it improves readability.

This stays consistent with the "build only what's needed" approach you've followed throughout the project.

**Context**:
Authentication, inventory listing, search, and filtering are complete.

The backend already supports vehicle CRUD operations.

Implement the admin interface for managing vehicles.

--------------------------------------------------
Vehicle Service
--------------------------------------------------

Update

vehicle_service.js

Implement

- createVehicle()
- updateVehicle()
- deleteVehicle()

Keep this layer responsible only for backend communication.

--------------------------------------------------
Admin Hook
--------------------------------------------------

Create

useAdminVehicles.js

Responsibilities

- create vehicle
- update vehicle
- delete vehicle
- refresh inventory
- loading state
- error state

Do not implement UI logic.

--------------------------------------------------
Admin Dashboard
--------------------------------------------------

Update

AdminDashboard.jsx

Responsibilities

- fetch vehicles
- display VehicleTable
- open create modal
- open edit modal
- open delete confirmation
- refresh data after successful operations

--------------------------------------------------
Vehicle Table
--------------------------------------------------

Create

VehicleTable.jsx

Display

- make
- model
- year
- price
- stock

Actions

- Edit
- Delete

Use reusable UI components.

--------------------------------------------------
Vehicle Form
--------------------------------------------------

Create

VehicleForm.jsx

Use the same form for

- creating vehicles
- editing vehicles

Use

- React Hook Form
- Zod

Fields

- make
- model
- year
- price
- mileage
- fuelType
- transmission
- color
- stock

Reuse existing Input components.

--------------------------------------------------
Vehicle Modal
--------------------------------------------------

Create

VehicleModal.jsx

Reuse the existing modal/dialog component if available.

If none exists, create a lightweight feature-specific modal for the admin feature.

The modal should render VehicleForm.

--------------------------------------------------
Delete Confirmation
--------------------------------------------------

Create

DeleteVehicleDialog.jsx

Show confirmation before deletion.

Do not use window.confirm().

--------------------------------------------------
General Requirements
--------------------------------------------------

- Reuse existing UI components.
- Keep business logic inside hooks.
- Keep pages responsible for composition.
- Refresh inventory after successful CRUD operations.
- Display loading and error states.
- Show success and error toast notifications where appropriate.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- No duplicated logic
- Separation of responsibilities
- Reusable feature components

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- bulk actions
- pagination
- inline editing
- image upload
- optimistic updates
- drag and drop
- additional backend endpoints
- new dependencies

The goal of this commit is to implement a clean, maintainable admin vehicle management interface using the existing backend APIs.

I would not create a separate StockBadge.jsx.

Your inventory already displays stock as a numeric value, and you've intentionally avoided introducing unnecessary abstractions. A dedicated stock badge would add complexity without much benefit.

Instead, keep the table simple:

Show the numeric stock value.
Optionally style low stock (0 or low numbers) using existing utility classes or the generic Badge component if it improves readability.

This stays consistent with the "build only what's needed" approach you've followed throughout the project.

**Requirements**:
--------------------------------------------------

- Reuse existing UI components.
- Keep business logic inside hooks.
- Keep pages responsible for composition.
- Refresh inventory after successful CRUD operations.
- Display loading and error states.
- Show success and error toast notifications where appropriate.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- No duplicated logic
- Separation of responsibilities
- Reusable feature components

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- bulk actions
- pagination
- inline editing
- image upload
- optimistic updates
- drag and drop
- additional backend endpoints
- new dependencies

The goal of this commit is to implement a clean, maintainable admin vehicle management interface using the existing backend APIs.

I would not create a separate StockBadge.jsx.

Your inventory already displays stock as a numeric value, and you've intentionally avoided introducing unnecessary abstractions. A dedicated stock badge would add complexity without much benefit.

Instead, keep the table simple:

Show the numeric stock value.
Optionally style low stock (0 or low numbers) using existing utility classes or the generic Badge component if it improves readability.

This stays consistent with the "build only what's needed" approach you've followed throughout the project.

**Constraints**:
--------------------------------------------------

Do not implement

- bulk actions
- pagination
- inline editing
- image upload
- optimistic updates
- drag and drop
- additional backend endpoints
- new dependencies

The goal of this commit is to implement a clean, maintainable admin vehicle management interface using the existing backend APIs.

I would not create a separate StockBadge.jsx.

Your inventory already displays stock as a numeric value, and you've intentionally avoided introducing unnecessary abstractions. A dedicated stock badge would add complexity without much benefit.

Instead, keep the table simple:

Show the numeric stock value.
Optionally style low stock (0 or low numbers) using existing utility classes or the generic Badge component if it improves readability.

This stays consistent with the "build only what's needed" approach you've followed throughout the project.

---

# 35. The Complete Vehicle Purchase Workflow

**Task**:
Implement the complete vehicle purchase workflow.

Context

The inventory listing, search, filtering, and admin management features are complete.

The backend already exposes:

POST /vehicles/:id/purchase

Do not modify the backend.

The purchase workflow should use the existing API.

--------------------------------------------------
Architecture
--------------------------------------------------

Follow this architecture.

VehicleCard

↓

PurchaseDialog

↓

usePurchaseVehicle()

↓

vehicle_service.purchaseVehicle()

↓

Backend

↓

Refresh Inventory

VehicleCard should remain presentational.

Business logic belongs inside the custom hook.

API communication belongs inside the service layer.

--------------------------------------------------
Vehicle Service
--------------------------------------------------

Update

services/vehicle_service.js

Implement

purchaseVehicle(vehicleId)

Responsibilities

- communicate with the backend
- return backend response only

Do not

- update React state
- perform navigation
- show notifications

--------------------------------------------------
Purchase Hook
--------------------------------------------------

Create

hooks/usePurchaseVehicle.js

Responsibilities

- execute purchase
- loading state
- error state
- success state
- expose purchaseVehicle()

The hook should not render UI.

Keep it focused.

--------------------------------------------------
Purchase Dialog
--------------------------------------------------

Create

components/vehicle/PurchaseDialog.jsx

Purpose

Ask the user to confirm before purchasing.

Display

- vehicle make
- vehicle model
- current stock

Actions

- Confirm Purchase
- Cancel

Requirements

- reusable within the vehicle feature
- accessible
- loading state while purchasing
- disable actions during request

--------------------------------------------------
Vehicle Card
--------------------------------------------------

Update

components/vehicle/VehicleCard.jsx

Requirements

Display a Purchase button.

If

stock > 0

Enable the button.

If

stock === 0

Disable the button.

Clicking Purchase should open PurchaseDialog.

Do not place purchase logic inside VehicleCard.

--------------------------------------------------
Inventory Page
--------------------------------------------------

Update

pages/Inventory.jsx

Responsibilities

- manage dialog visibility
- pass selected vehicle
- trigger purchase through usePurchaseVehicle()
- refresh inventory after successful purchase

Do not duplicate business logic.

--------------------------------------------------
Purchase Behaviour
--------------------------------------------------

Successful purchase

- close dialog
- refresh inventory
- display success toast

Failed purchase

- keep dialog open
- display error message
- preserve current inventory state

Do not perform optimistic updates.

Always refresh using the backend response.

--------------------------------------------------
User Experience
--------------------------------------------------

- prevent duplicate purchases while loading
- disable confirm button during request
- maintain accessibility
- use existing reusable UI components
- use existing design system

--------------------------------------------------
Reusable Components
--------------------------------------------------

Reuse existing

- Button
- Modal/Dialog (if available)
- Alert
- Spinner

If a reusable modal/dialog component does not exist, implement a lightweight feature-specific dialog only for the purchase flow.

Do not introduce a generic modal component in this commit.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Separation of responsibilities
- No duplicated logic
- No unnecessary abstractions

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- vehicle details page
- payment flow
- order history
- purchase quantity
- optimistic updates
- additional backend endpoints
- new dependencies

Do not create

- PurchaseButton.jsx

The existing VehicleCard should render the purchase button.

The goal of this commit is to complete the primary user workflow by implementing a clean and maintainable vehicle purchase feature using the existing backend API.

In your backend, the purchase endpoint decreases the stock. On the frontend, don't manually decrement the stock in state after a successful purchase. Instead, call your existing fetchVehicles() again and let the backend remain the source of truth.

**Context**:
The inventory listing, search, filtering, and admin management features are complete.

The backend already exposes:

POST /vehicles/:id/purchase

Do not modify the backend.

The purchase workflow should use the existing API.

--------------------------------------------------
Architecture
--------------------------------------------------

Follow this architecture.

VehicleCard

↓

PurchaseDialog

↓

usePurchaseVehicle()

↓

vehicle_service.purchaseVehicle()

↓

Backend

↓

Refresh Inventory

VehicleCard should remain presentational.

Business logic belongs inside the custom hook.

API communication belongs inside the service layer.

--------------------------------------------------
Vehicle Service
--------------------------------------------------

Update

services/vehicle_service.js

Implement

purchaseVehicle(vehicleId)

Responsibilities

- communicate with the backend
- return backend response only

Do not

- update React state
- perform navigation
- show notifications

--------------------------------------------------
Purchase Hook
--------------------------------------------------

Create

hooks/usePurchaseVehicle.js

Responsibilities

- execute purchase
- loading state
- error state
- success state
- expose purchaseVehicle()

The hook should not render UI.

Keep it focused.

--------------------------------------------------
Purchase Dialog
--------------------------------------------------

Create

components/vehicle/PurchaseDialog.jsx

Purpose

Ask the user to confirm before purchasing.

Display

- vehicle make
- vehicle model
- current stock

Actions

- Confirm Purchase
- Cancel

Requirements

- reusable within the vehicle feature
- accessible
- loading state while purchasing
- disable actions during request

--------------------------------------------------
Vehicle Card
--------------------------------------------------

Update

components/vehicle/VehicleCard.jsx

Requirements

Display a Purchase button.

If

stock > 0

Enable the button.

If

stock === 0

Disable the button.

Clicking Purchase should open PurchaseDialog.

Do not place purchase logic inside VehicleCard.

--------------------------------------------------
Inventory Page
--------------------------------------------------

Update

pages/Inventory.jsx

Responsibilities

- manage dialog visibility
- pass selected vehicle
- trigger purchase through usePurchaseVehicle()
- refresh inventory after successful purchase

Do not duplicate business logic.

--------------------------------------------------
Purchase Behaviour
--------------------------------------------------

Successful purchase

- close dialog
- refresh inventory
- display success toast

Failed purchase

- keep dialog open
- display error message
- preserve current inventory state

Do not perform optimistic updates.

Always refresh using the backend response.

--------------------------------------------------
User Experience
--------------------------------------------------

- prevent duplicate purchases while loading
- disable confirm button during request
- maintain accessibility
- use existing reusable UI components
- use existing design system

--------------------------------------------------
Reusable Components
--------------------------------------------------

Reuse existing

- Button
- Modal/Dialog (if available)
- Alert
- Spinner

If a reusable modal/dialog component does not exist, implement a lightweight feature-specific dialog only for the purchase flow.

Do not introduce a generic modal component in this commit.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Separation of responsibilities
- No duplicated logic
- No unnecessary abstractions

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- vehicle details page
- payment flow
- order history
- purchase quantity
- optimistic updates
- additional backend endpoints
- new dependencies

Do not create

- PurchaseButton.jsx

The existing VehicleCard should render the purchase button.

The goal of this commit is to complete the primary user workflow by implementing a clean and maintainable vehicle purchase feature using the existing backend API.

In your backend, the purchase endpoint decreases the stock. On the frontend, don't manually decrement the stock in state after a successful purchase. Instead, call your existing fetchVehicles() again and let the backend remain the source of truth.

**Requirements**:
- reusable within the vehicle feature
- accessible
- loading state while purchasing
- disable actions during request

--------------------------------------------------
Vehicle Card
--------------------------------------------------

Update

components/vehicle/VehicleCard.jsx

Requirements

Display a Purchase button.

If

stock > 0

Enable the button.

If

stock === 0

Disable the button.

Clicking Purchase should open PurchaseDialog.

Do not place purchase logic inside VehicleCard.

--------------------------------------------------
Inventory Page
--------------------------------------------------

Update

pages/Inventory.jsx

Responsibilities

- manage dialog visibility
- pass selected vehicle
- trigger purchase through usePurchaseVehicle()
- refresh inventory after successful purchase

Do not duplicate business logic.

--------------------------------------------------
Purchase Behaviour
--------------------------------------------------

Successful purchase

- close dialog
- refresh inventory
- display success toast

Failed purchase

- keep dialog open
- display error message
- preserve current inventory state

Do not perform optimistic updates.

Always refresh using the backend response.

--------------------------------------------------
User Experience
--------------------------------------------------

- prevent duplicate purchases while loading
- disable confirm button during request
- maintain accessibility
- use existing reusable UI components
- use existing design system

--------------------------------------------------
Reusable Components
--------------------------------------------------

Reuse existing

- Button
- Modal/Dialog (if available)
- Alert
- Spinner

If a reusable modal/dialog component does not exist, implement a lightweight feature-specific dialog only for the purchase flow.

Do not introduce a generic modal component in this commit.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Small focused components
- Separation of responsibilities
- No duplicated logic
- No unnecessary abstractions

--------------------------------------------------
Constraints
--------------------------------------------------

Do not implement

- vehicle details page
- payment flow
- order history
- purchase quantity
- optimistic updates
- additional backend endpoints
- new dependencies

Do not create

- PurchaseButton.jsx

The existing VehicleCard should render the purchase button.

The goal of this commit is to complete the primary user workflow by implementing a clean and maintainable vehicle purchase feature using the existing backend API.

In your backend, the purchase endpoint decreases the stock. On the frontend, don't manually decrement the stock in state after a successful purchase. Instead, call your existing fetchVehicles() again and let the backend remain the source of truth.

**Constraints**:
--------------------------------------------------

Do not implement

- vehicle details page
- payment flow
- order history
- purchase quantity
- optimistic updates
- additional backend endpoints
- new dependencies

Do not create

- PurchaseButton.jsx

The existing VehicleCard should render the purchase button.

The goal of this commit is to complete the primary user workflow by implementing a clean and maintainable vehicle purchase feature using the existing backend API.

In your backend, the purchase endpoint decreases the stock. On the frontend, don't manually decrement the stock in state after a successful purchase. Instead, call your existing fetchVehicles() again and let the backend remain the source of truth.

---

# 36. Full Support For The Vehicle Category Field Across

**Task**:
Implement full support for the vehicle category field across the backend and frontend.

Context

The project currently supports:

- make
- model
- year
- price
- mileage
- fuelType
- transmission
- color
- stock

The assessment specification also requires every vehicle to include a category.

The goal of this commit is to integrate category consistently throughout the application.

Do not change the existing architecture.

--------------------------------------------------
Backend
--------------------------------------------------

Update the Vehicle schema.

Add

category

Requirements

- String
- Required
- Validate appropriately

--------------------------------------------------
Validation
--------------------------------------------------

Update all validation related to vehicle creation and updating.

Ensure category is validated consistently.

Do not duplicate validation logic.

--------------------------------------------------
Vehicle CRUD
--------------------------------------------------

Update

- create vehicle
- update vehicle

Ensure category is accepted, validated, stored, and returned.

Do not modify unrelated logic.

--------------------------------------------------
Tests
--------------------------------------------------

Update existing backend tests.

Ensure all vehicle creation and update tests include category.

Keep test coverage consistent.

--------------------------------------------------
Frontend Vehicle Form
--------------------------------------------------

Update

VehicleForm.jsx

Add a Category field.

Reuse the existing Input or Select component as appropriate.

Do not hardcode business logic inside the form.

Maintain existing validation patterns.

--------------------------------------------------
Vehicle Card
--------------------------------------------------

Update

VehicleCard.jsx

Display

Category

Keep the layout clean.

Do not redesign the card.

--------------------------------------------------
Inventory Filters
--------------------------------------------------

Update

VehicleFilters.jsx

Add a Category filter.

Generate available categories dynamically from the fetched vehicle data.

Do not hardcode categories.

--------------------------------------------------
Vehicle Filter Hook
--------------------------------------------------

Update

useVehicleFilters.js

Support filtering by

- category

Keep filtering client-side.

Maintain the existing filtering architecture.

--------------------------------------------------
Inventory Toolbar
--------------------------------------------------

Update

InventoryToolbar.jsx

Include the new Category filter while preserving the existing layout and responsiveness.

--------------------------------------------------
General Requirements
--------------------------------------------------

Maintain consistency between backend and frontend.

Reuse existing components.

Reuse existing hooks.

Reuse existing services.

Avoid duplicated logic.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Consistent naming
- Small focused changes
- No unnecessary abstractions

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- redesign the UI
- modify authentication
- change routing
- introduce new dependencies
- replace the existing filtering architecture
- implement backend search integration

The goal of this commit is to fully support the required category field throughout the application while preserving the existing architecture.

**Context**:
The project currently supports:

- make
- model
- year
- price
- mileage
- fuelType
- transmission
- color
- stock

The assessment specification also requires every vehicle to include a category.

The goal of this commit is to integrate category consistently throughout the application.

Do not change the existing architecture.

--------------------------------------------------
Backend
--------------------------------------------------

Update the Vehicle schema.

Add

category

Requirements

- String
- Required
- Validate appropriately

--------------------------------------------------
Validation
--------------------------------------------------

Update all validation related to vehicle creation and updating.

Ensure category is validated consistently.

Do not duplicate validation logic.

--------------------------------------------------
Vehicle CRUD
--------------------------------------------------

Update

- create vehicle
- update vehicle

Ensure category is accepted, validated, stored, and returned.

Do not modify unrelated logic.

--------------------------------------------------
Tests
--------------------------------------------------

Update existing backend tests.

Ensure all vehicle creation and update tests include category.

Keep test coverage consistent.

--------------------------------------------------
Frontend Vehicle Form
--------------------------------------------------

Update

VehicleForm.jsx

Add a Category field.

Reuse the existing Input or Select component as appropriate.

Do not hardcode business logic inside the form.

Maintain existing validation patterns.

--------------------------------------------------
Vehicle Card
--------------------------------------------------

Update

VehicleCard.jsx

Display

Category

Keep the layout clean.

Do not redesign the card.

--------------------------------------------------
Inventory Filters
--------------------------------------------------

Update

VehicleFilters.jsx

Add a Category filter.

Generate available categories dynamically from the fetched vehicle data.

Do not hardcode categories.

--------------------------------------------------
Vehicle Filter Hook
--------------------------------------------------

Update

useVehicleFilters.js

Support filtering by

- category

Keep filtering client-side.

Maintain the existing filtering architecture.

--------------------------------------------------
Inventory Toolbar
--------------------------------------------------

Update

InventoryToolbar.jsx

Include the new Category filter while preserving the existing layout and responsiveness.

--------------------------------------------------
General Requirements
--------------------------------------------------

Maintain consistency between backend and frontend.

Reuse existing components.

Reuse existing hooks.

Reuse existing services.

Avoid duplicated logic.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Consistent naming
- Small focused changes
- No unnecessary abstractions

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- redesign the UI
- modify authentication
- change routing
- introduce new dependencies
- replace the existing filtering architecture
- implement backend search integration

The goal of this commit is to fully support the required category field throughout the application while preserving the existing architecture.

**Requirements**:
- String
- Required
- Validate appropriately

--------------------------------------------------
Validation
--------------------------------------------------

Update all validation related to vehicle creation and updating.

Ensure category is validated consistently.

Do not duplicate validation logic.

--------------------------------------------------
Vehicle CRUD
--------------------------------------------------

Update

- create vehicle
- update vehicle

Ensure category is accepted, validated, stored, and returned.

Do not modify unrelated logic.

--------------------------------------------------
Tests
--------------------------------------------------

Update existing backend tests.

Ensure all vehicle creation and update tests include category.

Keep test coverage consistent.

--------------------------------------------------
Frontend Vehicle Form
--------------------------------------------------

Update

VehicleForm.jsx

Add a Category field.

Reuse the existing Input or Select component as appropriate.

Do not hardcode business logic inside the form.

Maintain existing validation patterns.

--------------------------------------------------
Vehicle Card
--------------------------------------------------

Update

VehicleCard.jsx

Display

Category

Keep the layout clean.

Do not redesign the card.

--------------------------------------------------
Inventory Filters
--------------------------------------------------

Update

VehicleFilters.jsx

Add a Category filter.

Generate available categories dynamically from the fetched vehicle data.

Do not hardcode categories.

--------------------------------------------------
Vehicle Filter Hook
--------------------------------------------------

Update

useVehicleFilters.js

Support filtering by

- category

Keep filtering client-side.

Maintain the existing filtering architecture.

--------------------------------------------------
Inventory Toolbar
--------------------------------------------------

Update

InventoryToolbar.jsx

Include the new Category filter while preserving the existing layout and responsiveness.

--------------------------------------------------
General Requirements
--------------------------------------------------

Maintain consistency between backend and frontend.

Reuse existing components.

Reuse existing hooks.

Reuse existing services.

Avoid duplicated logic.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Consistent naming
- Small focused changes
- No unnecessary abstractions

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- redesign the UI
- modify authentication
- change routing
- introduce new dependencies
- replace the existing filtering architecture
- implement backend search integration

The goal of this commit is to fully support the required category field throughout the application while preserving the existing architecture.

**Constraints**:
--------------------------------------------------

Do not

- redesign the UI
- modify authentication
- change routing
- introduce new dependencies
- replace the existing filtering architecture
- implement backend search integration

The goal of this commit is to fully support the required category field throughout the application while preserving the existing architecture.

---

# 37. The Vehicle Restocking Feature For Administrators

**Task**:
Implement the vehicle restocking feature for administrators.

Context

The backend already exposes:

POST /vehicles/:id/restock

Authentication and admin vehicle management are already implemented.

Integrate the existing backend endpoint into the frontend.

Do not modify the backend.

--------------------------------------------------
Architecture
--------------------------------------------------

Follow this architecture.

VehicleTable

↓

RestockDialog

↓

useAdminVehicles()

↓

vehicle_service.restockVehicle()

↓

Backend

↓

Refresh Inventory

Keep business logic inside useAdminVehicles.

Keep API communication inside vehicle_service.

--------------------------------------------------
Vehicle Service
--------------------------------------------------

Update

services/vehicle_service.js

Implement

restockVehicle(vehicleId, quantity)

Responsibilities

- communicate with the backend
- return backend responses only

Do not

- update React state
- navigate
- display notifications

--------------------------------------------------
Admin Hook
--------------------------------------------------

Update

hooks/useAdminVehicles.js

Implement

restockVehicle()

Responsibilities

- execute the restock request
- expose loading and error state
- refresh inventory after a successful restock

Do not duplicate existing CRUD logic.

--------------------------------------------------
Vehicle Table
--------------------------------------------------

Update

components/admin/VehicleTable.jsx

Add a Restock action for each vehicle.

Keep the existing table layout.

Do not remove existing Edit or Delete actions.

--------------------------------------------------
Restock Dialog
--------------------------------------------------

Create

components/admin/RestockDialog.jsx

Purpose

Allow an administrator to increase the quantity in stock.

Display

- vehicle make
- vehicle model
- current quantity in stock

Input

- quantity to add

Validation

- required
- positive integer
- greater than zero

Actions

- Restock
- Cancel

Requirements

- accessible
- loading state
- disable actions while request is in progress
- close automatically after successful restock

Use

- React Hook Form
- Zod
- existing reusable UI components

--------------------------------------------------
Admin Dashboard
--------------------------------------------------

Update

pages/AdminDashboard.jsx

Responsibilities

- manage RestockDialog visibility
- pass selected vehicle
- call useAdminVehicles().restockVehicle()
- refresh inventory after success

--------------------------------------------------
Application Behaviour
--------------------------------------------------

Successful restock

- close dialog
- refresh inventory
- display success toast

Failed restock

- keep dialog open
- display validation or server error
- preserve current inventory state

Do not perform optimistic updates.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Reuse existing admin components where appropriate
- No duplicated logic
- Follow the existing frontend architecture

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- modify backend APIs
- create a new custom hook for restocking
- introduce new dependencies
- redesign the admin dashboard

The goal of this commit is to expose the existing backend restock capability through a clean, maintainable administrator workflow.

**Context**:
The backend already exposes:

POST /vehicles/:id/restock

Authentication and admin vehicle management are already implemented.

Integrate the existing backend endpoint into the frontend.

Do not modify the backend.

--------------------------------------------------
Architecture
--------------------------------------------------

Follow this architecture.

VehicleTable

↓

RestockDialog

↓

useAdminVehicles()

↓

vehicle_service.restockVehicle()

↓

Backend

↓

Refresh Inventory

Keep business logic inside useAdminVehicles.

Keep API communication inside vehicle_service.

--------------------------------------------------
Vehicle Service
--------------------------------------------------

Update

services/vehicle_service.js

Implement

restockVehicle(vehicleId, quantity)

Responsibilities

- communicate with the backend
- return backend responses only

Do not

- update React state
- navigate
- display notifications

--------------------------------------------------
Admin Hook
--------------------------------------------------

Update

hooks/useAdminVehicles.js

Implement

restockVehicle()

Responsibilities

- execute the restock request
- expose loading and error state
- refresh inventory after a successful restock

Do not duplicate existing CRUD logic.

--------------------------------------------------
Vehicle Table
--------------------------------------------------

Update

components/admin/VehicleTable.jsx

Add a Restock action for each vehicle.

Keep the existing table layout.

Do not remove existing Edit or Delete actions.

--------------------------------------------------
Restock Dialog
--------------------------------------------------

Create

components/admin/RestockDialog.jsx

Purpose

Allow an administrator to increase the quantity in stock.

Display

- vehicle make
- vehicle model
- current quantity in stock

Input

- quantity to add

Validation

- required
- positive integer
- greater than zero

Actions

- Restock
- Cancel

Requirements

- accessible
- loading state
- disable actions while request is in progress
- close automatically after successful restock

Use

- React Hook Form
- Zod
- existing reusable UI components

--------------------------------------------------
Admin Dashboard
--------------------------------------------------

Update

pages/AdminDashboard.jsx

Responsibilities

- manage RestockDialog visibility
- pass selected vehicle
- call useAdminVehicles().restockVehicle()
- refresh inventory after success

--------------------------------------------------
Application Behaviour
--------------------------------------------------

Successful restock

- close dialog
- refresh inventory
- display success toast

Failed restock

- keep dialog open
- display validation or server error
- preserve current inventory state

Do not perform optimistic updates.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Reuse existing admin components where appropriate
- No duplicated logic
- Follow the existing frontend architecture

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- modify backend APIs
- create a new custom hook for restocking
- introduce new dependencies
- redesign the admin dashboard

The goal of this commit is to expose the existing backend restock capability through a clean, maintainable administrator workflow.

**Requirements**:
- accessible
- loading state
- disable actions while request is in progress
- close automatically after successful restock

Use

- React Hook Form
- Zod
- existing reusable UI components

--------------------------------------------------
Admin Dashboard
--------------------------------------------------

Update

pages/AdminDashboard.jsx

Responsibilities

- manage RestockDialog visibility
- pass selected vehicle
- call useAdminVehicles().restockVehicle()
- refresh inventory after success

--------------------------------------------------
Application Behaviour
--------------------------------------------------

Successful restock

- close dialog
- refresh inventory
- display success toast

Failed restock

- keep dialog open
- display validation or server error
- preserve current inventory state

Do not perform optimistic updates.

--------------------------------------------------
Code Quality
--------------------------------------------------

- Production-ready
- Readable
- Maintainable
- Reuse existing admin components where appropriate
- No duplicated logic
- Follow the existing frontend architecture

--------------------------------------------------
Constraints
--------------------------------------------------

Do not

- modify backend APIs
- create a new custom hook for restocking
- introduce new dependencies
- redesign the admin dashboard

The goal of this commit is to expose the existing backend restock capability through a clean, maintainable administrator workflow.

**Constraints**:
--------------------------------------------------

Do not

- modify backend APIs
- create a new custom hook for restocking
- introduce new dependencies
- redesign the admin dashboard

The goal of this commit is to expose the existing backend restock capability through a clean, maintainable administrator workflow.

---

# 38. Redesign The Complete Authentication Experience

**Task**:
Redesign the complete authentication experience.

This is a UI/UX improvement only.

Do not modify any business logic, validation, routing, authentication flow, or API integration.

Preserve the existing architecture and reusable component structure.

The goal is to create a premium, modern, and responsive authentication experience suitable for an inventory management system.

--------------------------------------------------
Design Philosophy
--------------------------------------------------

The design should feel like a modern SaaS application.

Keywords

- Premium
- Clean
- Elegant
- Professional
- Minimal
- Spacious
- Responsive

Avoid flashy designs.

Avoid unnecessary visual effects.

The interface should impress through typography, spacing, hierarchy, and subtle motion rather than excessive decoration.

--------------------------------------------------
Overall Layout
--------------------------------------------------

Keep the authentication form centered both vertically and horizontally.

The layout should immediately focus the user's attention on the authentication card.

Maintain generous whitespace around the card.

Ensure the layout adapts beautifully from mobile to large desktop screens.

--------------------------------------------------
Background Design
--------------------------------------------------

Replace the plain background with a subtle premium background using only CSS.

Possible elements include

- soft radial gradients
- subtle grid pattern
- blurred accent circles
- faint geometric shapes
- minimal abstract texture

The background should add personality without distracting from the form.

Do NOT use

- animated backgrounds
- illustrations
- photos
- cars
- excessive gradients
- neon effects
- heavy glassmorphism

--------------------------------------------------
Authentication Card
--------------------------------------------------

Redesign the authentication card.

Requirements

- clean border
- soft shadow
- premium spacing
- elegant border radius
- balanced proportions
- strong visual hierarchy

The card should become the visual focal point.

--------------------------------------------------
Branding
--------------------------------------------------

Display the application name above the authentication heading.

The branding should be subtle and premium.

Do not dominate the page.

It should create product identity rather than marketing.

--------------------------------------------------
Typography
--------------------------------------------------

Use

Fraunces

for headings.

Use

General Sans

for every other piece of text.

Improve hierarchy using

- font size
- font weight
- spacing
- alignment

--------------------------------------------------
Authentication Header
--------------------------------------------------

Improve the authentication header.

Login

Heading

Welcome Back

Supporting text

Sign in to manage your dealership inventory.

Register

Heading

Create Account

Supporting text

Create your account to access the dealership inventory management system.

--------------------------------------------------
Forms
--------------------------------------------------

Improve

- spacing
- alignment
- label hierarchy
- helper text
- validation message presentation

Keep all existing functionality unchanged.

--------------------------------------------------
Inputs
--------------------------------------------------

Improve

- focus states
- placeholder appearance
- error presentation
- disabled styling
- transitions

Reuse the existing Input component.

--------------------------------------------------
Password Field
--------------------------------------------------

Improve the existing PasswordInput component.

Maintain

- show password
- hide password

Improve icon placement, spacing, and interactions.

--------------------------------------------------
Buttons
--------------------------------------------------

Improve

- hover state
- active state
- loading state
- disabled state

Keep animations subtle.

Reuse the existing Button component.

--------------------------------------------------
Links
--------------------------------------------------

Improve

- Login/Register navigation links
- hover feedback
- focus state

Maintain accessibility.

--------------------------------------------------
Theme Support
--------------------------------------------------

Ensure the design looks polished in both

- Light Theme
- Dark Theme

Use only the existing design tokens.

Do not introduce new colors.

--------------------------------------------------
Motion
--------------------------------------------------

Use subtle animations with Framer Motion.

Examples

- page fade
- card fade + slight upward movement
- button hover
- input focus transitions

Animations should feel smooth and professional.

Do not animate the background.

--------------------------------------------------
Responsiveness
--------------------------------------------------

Ensure an excellent experience on

- mobile
- tablet
- laptop
- desktop

The layout should remain centered and balanced across every screen size.

--------------------------------------------------
Accessibility
--------------------------------------------------

Maintain

- keyboard navigation
- visible focus states
- semantic HTML
- ARIA attributes
- sufficient contrast
- screen-reader compatibility

--------------------------------------------------
Code Quality
--------------------------------------------------

Do not modify

- authentication logic
- validation
- routing
- business logic
- API integration

Only improve presentation and user experience.

Reuse existing components.

Do not create unnecessary components.

Do not duplicate code.

Maintain the existing architecture.

The final result should resemble a premium SaaS authentication experience with a strong focus on usability, visual hierarchy, responsiveness, and subtle elegance rather than decorative effects.

**Requirements**:
- clean border
- soft shadow
- premium spacing
- elegant border radius
- balanced proportions
- strong visual hierarchy

The card should become the visual focal point.

--------------------------------------------------
Branding
--------------------------------------------------

Display the application name above the authentication heading.

The branding should be subtle and premium.

Do not dominate the page.

It should create product identity rather than marketing.

--------------------------------------------------
Typography
--------------------------------------------------

Use

Fraunces

for headings.

Use

General Sans

for every other piece of text.

Improve hierarchy using

- font size
- font weight
- spacing
- alignment

--------------------------------------------------
Authentication Header
--------------------------------------------------

Improve the authentication header.

Login

Heading

Welcome Back

Supporting text

Sign in to manage your dealership inventory.

Register

Heading

Create Account

Supporting text

Create your account to access the dealership inventory management system.

--------------------------------------------------
Forms
--------------------------------------------------

Improve

- spacing
- alignment
- label hierarchy
- helper text
- validation message presentation

Keep all existing functionality unchanged.

--------------------------------------------------
Inputs
--------------------------------------------------

Improve

- focus states
- placeholder appearance
- error presentation
- disabled styling
- transitions

Reuse the existing Input component.

--------------------------------------------------
Password Field
--------------------------------------------------

Improve the existing PasswordInput component.

Maintain

- show password
- hide password

Improve icon placement, spacing, and interactions.

--------------------------------------------------
Buttons
--------------------------------------------------

Improve

- hover state
- active state
- loading state
- disabled state

Keep animations subtle.

Reuse the existing Button component.

--------------------------------------------------
Links
--------------------------------------------------

Improve

- Login/Register navigation links
- hover feedback
- focus state

Maintain accessibility.

--------------------------------------------------
Theme Support
--------------------------------------------------

Ensure the design looks polished in both

- Light Theme
- Dark Theme

Use only the existing design tokens.

Do not introduce new colors.

--------------------------------------------------
Motion
--------------------------------------------------

Use subtle animations with Framer Motion.

Examples

- page fade
- card fade + slight upward movement
- button hover
- input focus transitions

Animations should feel smooth and professional.

Do not animate the background.

--------------------------------------------------
Responsiveness
--------------------------------------------------

Ensure an excellent experience on

- mobile
- tablet
- laptop
- desktop

The layout should remain centered and balanced across every screen size.

--------------------------------------------------
Accessibility
--------------------------------------------------

Maintain

- keyboard navigation
- visible focus states
- semantic HTML
- ARIA attributes
- sufficient contrast
- screen-reader compatibility

--------------------------------------------------
Code Quality
--------------------------------------------------

Do not modify

- authentication logic
- validation
- routing
- business logic
- API integration

Only improve presentation and user experience.

Reuse existing components.

Do not create unnecessary components.

Do not duplicate code.

Maintain the existing architecture.

The final result should resemble a premium SaaS authentication experience with a strong focus on usability, visual hierarchy, responsiveness, and subtle elegance rather than decorative effects.

---

# 39. Inventory Page UI Improvement

**Task**:
Redesign the Inventory page to use a modern, premium UI/UX.

**Context**:
The backend and core UI components are ready. The inventory page currently lacks a polished design.

**Requirements**:
- Implement a Sidebar for filters (Make, Model, Price Range, Fuel Type, Transmission) and a Main Content area for vehicle cards.
- Use a CSS Grid for the vehicle cards (responsive: 1 column on mobile, up to 3 or 4 on large screens).
- Enhance the vehicle cards with badges, polished typography, and a modern layout.
- Ensure the page feels premium and spacious using `theme.css` tokens.

**Constraints**:
- Do not change existing backend API routes.
- Reuse the existing UI components (Input, Button, Select, Badge, Skeleton).

---

# 40. Admin Dashboard UI Improvement

**Task**:
Redesign the Admin Dashboard for better inventory management capabilities.

**Context**:
The current Admin Dashboard is functional but lacks a professional interface for managing operations like create, update, restock, and delete.

**Requirements**:
- Implement a clean, table-based or grid-based layout to view all vehicles.
- Add accessible modals (Dialogs) for Creating, Updating, and Restocking vehicles.
- Implement clear action buttons (Edit, Restock, Delete) for each vehicle.
- Provide a skeleton loading state and error states.

**Constraints**:
- Ensure all forms use React Hook Form and Zod for validation.
- Do not break existing API integration for admin routes.

---

# 41. Vehicle Restocking & Search Refactoring

**Task**:
Implement the vehicle restocking workflow, fix price filter layouts, and refactor search to use the backend API efficiently.

**Context**:
Restocking functionality is missing on the frontend, the min/max price inputs are misaligned, and the inventory page needs to use the backend search endpoint (`/api/vehicles/search`) when filters are active.

**Requirements**:
- Implement the "Restock" dialog in the Admin Dashboard, integrating with `POST /api/vehicles/:id/restock`.
- Fix the CSS/layout of the Min Price and Max Price inputs to stack vertically instead of side-by-side.
- Refactor `useVehicles.js` and the Inventory page to hit `GET /api/vehicles` for initial load, and `GET /api/vehicles/search` when filters are active, debouncing the search by 300-400ms.

**Constraints**:
- Preserve the existing architecture.
- Only call the search API when one or more filters are actively set.

---

# 42. Frontend Production Readiness Refactor

**Task**:
Perform a comprehensive frontend code quality audit and refactor before documentation.

**Context**:
The application is functionally complete. The goal is to improve readability, maintainability, consistency, and overall professionalism.

**Requirements**:
- Audit folders, components, hooks, contexts, pages, and services.
- Replace vague variable names (e.g., `data`, `err`, `res`, `val`) with descriptive domain terms (e.g., `vehicleData`, `apiError`, `apiResponse`).
- Extract magic numbers (like debouncing delays) into constants.
- Organize imports systematically.
- Remove redundant "WHAT" comments, keeping only "WHY" comments.

**Constraints**:
- Do NOT redesign the UI.
- Do NOT modify business logic.
- Do NOT change application behavior.

---

# 43. Deployment Readiness Audit

**Task**:
Prepare the complete project for production deployment without changing existing behavior.

**Context**:
This is the final step before deployment. Both frontend and backend need configuration audits to ensure they can be hosted securely and reliably.

**Requirements**:
- **Backend**: Configure `cors` to use `CORS_ORIGIN`, add a global error handler to mask internal errors in production, and update `.gitignore`. Create a `.env.example`.
- **Frontend**: Update `api.js` to strictly use `import.meta.env.VITE_API_BASE_URL` with a fallback. Add `.env` to `.gitignore` and create a `.env.example`.
- Verify the frontend builds successfully (`npm run build`).

**Constraints**:
- Do not introduce unnecessary security libraries.
- Do not redesign architecture, UI, or modify business logic.
- Do not solve something that is not broken.

---
