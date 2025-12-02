# Shared Actions - API Utilities

## API Function

The `api()` function is a reusable wrapper around the native `fetch` API with TypeScript support and improved error handling.

### Basic Usage

```typescript
import { api, apiClient } from "@/features/shared/actions/api";

// Using the main api function
const response = await api<User>("/api/users/123");

if (response.ok) {
  console.log(response.data); // Typed as User
} else {
  console.error(response.error);
}
```

### Convenience Methods

```typescript
// GET request
const users = await apiClient.get<User[]>("/api/users");

// POST request
const newUser = await apiClient.post<User>("/api/users", {
  name: "John Doe",
  email: "john@example.com",
});

// PUT request
const updated = await apiClient.put<User>("/api/users/123", {
  name: "Jane Doe",
});

// DELETE request
const deleted = await apiClient.delete("/api/users/123");

// PATCH request
const patched = await apiClient.patch<User>("/api/users/123", {
  email: "newemail@example.com",
});
```

### Options

```typescript
// Custom headers
await api("/api/data", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Next.js cache options
await api("/api/data", {
  cache: "no-store", // or "force-cache", "no-cache"
});

// Next.js revalidation
await api("/api/data", {
  next: {
    revalidate: 60, // Revalidate every 60 seconds
  },
});
```

### Response Structure

```typescript
interface ApiResponse<T> {
  data?: T; // Response data (typed)
  error?: string; // Error message if request failed
  status: number; // HTTP status code
  ok: boolean; // true if status is 2xx
}
```

### Error Handling

```typescript
const response = await api<User>("/api/users/123");

if (!response.ok) {
  // Handle HTTP errors (4xx, 5xx)
  console.error("Error:", response.error);
  console.error("Status:", response.status);
} else {
  // Success
  console.log(response.data);
}
```

### Integration with Server Actions

```typescript
// In your server action
"use server";

import { api } from "@/features/shared/actions/api";

export async function sendContactEmail(data: ContactFormData) {
  const response = await api("/api/email/contact", {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    return {
      success: false,
      message: response.error || "Failed to send email",
    };
  }

  return {
    success: true,
    message: "Email sent successfully!",
  };
}
```

## Features

✅ **TypeScript Support**: Fully typed with generics  
✅ **Error Handling**: Catches network and HTTP errors  
✅ **JSON Auto-Parse**: Automatically parses JSON responses  
✅ **Convenience Methods**: GET, POST, PUT, DELETE, PATCH shortcuts  
✅ **Next.js Compatible**: Supports cache and revalidation options  
✅ **Clean API**: Simple, intuitive interface
