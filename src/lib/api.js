// src/lib/api.js
// Note: getToken from @clerk/clerk-react needs to be called within a component or custom hook
// that is a child of ClerkProvider. For a generic API helper, you might need to pass
// the getToken function or the token itself as an argument if this helper is used outside
// such a React component context. For simplicity, we'll assume it's called in contexts
// where getToken is accessible (e.g., within TanStack Query's queryFn/mutationFn).

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function apiRequest(endpoint, options = {}, clerkGetToken = null) {
  const { isFormData, ...fetchOptions } = options;
  const headers = isFormData ? {} : { 'Content-Type': 'application/json' };
  
  if (clerkGetToken) {
    try {
      const token = await clerkGetToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn("Clerk token could not be retrieved for API request. Request might be unauthenticated.", e);
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText, status: response.status };
    }
    console.error(`API Error (${response.status}): ${endpoint}`, errorData);
    // Ensure errorData.message is a string
    const errorMessage = typeof errorData.message === 'string' ? errorData.message : `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status; // Attach status to error object
    error.data = errorData; // Attach full error data
    throw error;
  }

  if (response.status === 204) { // No Content
    return null;
  }
  try {
    return response.json();
  } catch (e) {
    // If response is not JSON but still ok (e.g. plain text)
    return response.text();
  }
}

export default apiRequest;