# MyBibleIQ - Frontend Web Application

This is a [Next.js](https://nextjs.org) project for MyBibleIQ, a Bible learning and engagement platform.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app directory (routes, layouts)
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── form-controllers/ # Reusable form input controllers
│   ├── shared/           # Shared components across the app
│   └── ui/               # Base UI components (shadcn/ui)
├── screens/               # Page components (organized by feature)
│   ├── admin/           # Admin screens
│   ├── auth/            # Authentication screens
│   └── main/            # Main application screens
├── resources/            # API resources and data management
│   ├── admin-*/         # Admin resource modules
│   └── auth/            # Authentication resources
├── services/            # Application services
├── utils/               # Utility functions
├── constants/           # Application constants
└── types/               # TypeScript type definitions
```

## Coding Standards & Rules

### 1. **TypeScript Standards**

#### Use `type` instead of `interface`

- ✅ **DO**: Use `type` for all type definitions
- ❌ **DON'T**: Use `interface` declarations

```typescript
// ✅ Correct
export type UserProfile = {
  id: string;
  name: string;
};

// ❌ Incorrect
export interface UserProfile {
  id: string;
  name: string;
}
```

#### Type-only imports

- Use `import type` for type-only imports to improve build performance

```typescript
// ✅ Correct
import type { UserProfile } from "@/types/user";

// ❌ Incorrect (if only using the type)
import { UserProfile } from "@/types/user";
```

### 2. **Component Architecture**

Every component should follow this structure:

```
ComponentName/
├── ComponentName.tsx        # UI component (presentation only)
├── ComponentName.types.ts   # Type definitions
├── ComponentName.hooks.ts   # Business logic, hooks, mutations
└── ComponentName.utils.ts   # Helper functions (optional)
```

#### Component File (`ComponentName.tsx`)

- **Purpose**: Presentation and UI only
- **Contains**: JSX, styling, event handlers that call hook functions
- **Imports**: Types from `.types.ts`, hooks from `.hooks.ts`

```tsx
// ✅ Correct structure
import { ComponentProps } from "./Component.types";
import { useComponent } from "./Component.hooks";

export function Component(props: ComponentProps) {
  const { data, handleClick } = useComponent(props);

  return (
    <div onClick={handleClick}>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

#### Types File (`ComponentName.types.ts`)

- **Purpose**: All type definitions for the component
- **Contains**: Props types, internal state types, utility types

```typescript
// ✅ Correct
import type { User } from "@/resources/user";

export type ComponentProps = {
  userId: string;
  onSuccess?: () => void;
};

export type UseComponentProps = ComponentProps;
```

#### Hooks File (`ComponentName.hooks.ts`)

- **Purpose**: Business logic, data fetching, state management
- **Contains**: Custom hooks, API calls, mutations, side effects

```typescript
// ✅ Correct
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UseComponentProps } from "./Component.types";

export const useComponent = (props: UseComponentProps) => {
  const [state, setState] = useState();
  const { data } = useQuery(/* ... */);

  const handleClick = () => {
    // Business logic here
  };

  return { data, handleClick };
};
```

### 3. **Naming Conventions**

#### Components

- Use PascalCase for component names
- Be descriptive and specific

```typescript
// ✅ Correct
MediaForm;
TagCategoryFormModal;
FlashcardDataTable;

// ❌ Incorrect
mediaForm;
Form;
Table;
```

#### Hooks

- Prefix with `use`
- Match the component name

```typescript
// ✅ Correct
useMediaForm;
useTagCategoryFormModal;

// ❌ Incorrect
mediaFormHook;
getMediaForm;
```

#### Types

- Use PascalCase
- Suffix with descriptive name (Props, Input, Response, etc.)

```typescript
// ✅ Correct
export type MediaFormProps = {
  /* ... */
};
export type CreateMediaInput = {
  /* ... */
};
export type MediaListResponse = {
  /* ... */
};

// ❌ Incorrect
export type mediaFormProps = {
  /* ... */
};
export type Props = {
  /* ... */
};
```

### 4. **Import Organization**

Organize imports in this order:

1. React and external libraries
2. Internal components and utilities
3. Types (using `import type`)
4. Styles (if any)

```typescript
// ✅ Correct order
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMediaForm } from "./MediaForm.hooks";
import type { MediaFormProps } from "./MediaForm.types";
```

### 5. **Image Optimization**

#### Use Next.js Image component

- ✅ **DO**: Use `next/image` for all images
- ❌ **DON'T**: Use standard `<img>` tags

```tsx
// ✅ Correct
import Image from "next/image";

<Image
  src={imageUrl}
  alt="Description"
  width={100}
  height={100}
/>

// For fill images, wrap in a positioned container
<div className="relative w-full h-full">
  <Image
    src={imageUrl}
    alt="Description"
    fill
    className="object-contain"
  />
</div>

// ❌ Incorrect
<img src={imageUrl} alt="Description" />
```

### 6. **Form Handling**

- Use `react-hook-form` for all forms
- Use `zod` for validation schemas
- Separate form logic into hooks

```typescript
// In Component.hooks.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useComponentForm = () => {
  const form = useForm({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      /* ... */
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    // Handle submission
  });

  return { form, onSubmit };
};
```

### 7. **API & Data Management**

#### Resource Structure

Each resource (e.g., `admin-media`) should have:

```
resource-name/
├── resource-name.api.ts        # API calls
├── resource-name.hooks.ts      # React Query hooks
├── resource-name.types.ts      # Type definitions
├── resource-name.schemas.ts    # Zod schemas
├── resource-name.constants.ts  # Constants
└── index.ts                    # Exports
```

#### API Functions

- Keep API logic separate from components
- Use consistent naming: `getResource`, `createResource`, `updateResource`, `deleteResource`

```typescript
// In resource.api.ts
export const getAdminMedia = async (id: string): Promise<MediaDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<MediaDetail>>(endpoints.media.getById(id));
  return response.data;
};
```

#### React Query Hooks

- Use `useQuery` for fetching
- Use `useMutation` for create/update/delete
- Include proper error handling and loading states

```typescript
// In resource.hooks.ts
export const useAdminMedia = (id: string) => {
  return useQuery({
    queryKey: ["admin-media", id],
    queryFn: () => getAdminMedia(id),
  });
};

export const useCreateAdminMedia = () => {
  return useMutation({
    mutationFn: createAdminMedia,
    onSuccess: () => {
      // Handle success
    },
  });
};
```

### 8. **Code Quality**

#### Run checks before committing

```bash
npm run check  # Runs lint, typecheck, and format
```

#### Linting Rules

- No unused variables or imports
- No `any` types (use proper typing)
- Consistent code formatting (Prettier)

#### Type Safety

- Always provide explicit types for function parameters
- Avoid type assertions (`as`) unless absolutely necessary
- Use discriminated unions for complex state

### 9. **Best Practices**

#### Component Props

- Keep props minimal and focused
- Use optional chaining for optional callbacks

```typescript
export type ComponentProps = {
  id: string; // Required
  onSuccess?: () => void; // Optional callback
  className?: string; // Optional styling
};
```

#### State Management

- Use React hooks for local state
- Use React Query for server state
- Keep state as close to where it's used as possible

#### Error Handling

- Handle errors gracefully
- Provide user-friendly error messages
- Log errors for debugging

```typescript
try {
  await mutation.mutateAsync(data);
  onSuccess?.();
} catch (error) {
  // Error is handled by mutation
  console.error("Operation failed:", error);
}
```

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript compiler check
npm run format     # Format code with Prettier
npm run check      # Run all checks (lint + typecheck + format)
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: react-hook-form + zod
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Contributing

1. Follow the coding standards outlined above
2. Run `npm run check` before committing
3. Ensure all TypeScript errors are resolved
4. Write meaningful commit messages
5. Keep components small and focused

## License

Private - All rights reserved
