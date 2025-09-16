# Bug Report: "You are not allowed to comment on this post" Error

## Issue Summary
Users encounter the error message "You are not allowed to comment on this post" when attempting to comment on posts, even when they should have permission to comment.

## Root Cause Analysis
The issue is located in `/src/app/[locale]/p/[postid]/page.tsx` where the `useComments` hook is not receiving the required `postOperations` parameter to perform proper permission validation.

### Current Code (Line 37-40):
```typescript
const {
  comments,
  loading: commentsLoading,
  error: commentsError,
  addComment,
  refetch: refetchComments
} = useComments({
  postId,
  autoFetch: isInlineMode
  // ❌ Missing postOperations parameter
});
```

### Permission Check Logic:
In `src/hooks/use-comments.ts:55-79`, the `canUserComment()` function checks:
```typescript
const canUserComment = (): boolean => {
  if (!postOperations?.canComment) {
    return false; // ❌ Returns false when postOperations is undefined
  }
  // ... rest of validation logic
};
```

### Error Trigger:
When `postOperations` is undefined, the permission check fails and triggers the error at `use-comments.ts:163`:
```typescript
if (!canUserComment()) {
  toast.error('You are not allowed to comment on this post');
  return;
}
```

## Technical Details

### Data Flow Issue:
1. ✅ `usePost` hook correctly fetches `post.operations` data via `fetchPost(sessionClient)`
2. ✅ `post.operations` contains the correct permission validation data
3. ❌ `useComments` hook doesn't receive this data, causing permission checks to fail
4. ❌ Default behavior is to deny commenting when no permission data is available

### Expected Data Structure:
The `postOperations` should contain:
```typescript
{
  canComment: {
    __typename: 'PostOperationValidationPassed' | 'PostOperationValidationFailed' | 'PostOperationValidationUnknown';
    reason?: string;
    unsatisfiedRules?: any[];
    extraChecksRequired?: any[];
  }
}
```

## Proposed Solution

### Fix 1: Pass postOperations to useComments
Modify `/src/app/[locale]/p/[postid]/page.tsx:37-40`:

```typescript
const {
  comments,
  loading: commentsLoading,
  error: commentsError,
  addComment,
  refetch: refetchComments
} = useComments({
  postId,
  autoFetch: isInlineMode,
  postOperations: post?.operations // ✅ Add this line
});
```

### Fix 2: Add Null Safety
Ensure the component waits for post data before initializing comments:

```typescript
const {
  comments,
  loading: commentsLoading,
  error: commentsError,
  addComment,
  refetch: refetchComments
} = useComments({
  postId,
  autoFetch: isInlineMode && !!post, // Only fetch when post is available
  postOperations: post?.operations
});
```

## Impact
- **Severity**: High - Blocks core commenting functionality
- **Scope**: Affects all users trying to comment on posts
- **User Experience**: Users see misleading permission error instead of being able to comment

## Files Affected
- `/src/app/[locale]/p/[postid]/page.tsx` (main fix location)
- `/src/hooks/use-comments.ts` (permission validation logic)
- `/src/hooks/use-post.ts` (post data fetching)

## Testing Recommendations
1. Verify comment permission validation works correctly after fix
2. Test with different user types (logged in/out, followers/non-followers)
3. Check console logs for permission validation details
4. Ensure error handling for actual permission failures still works

## Related Code Patterns
This same pattern should be checked in other components that use `useComments`:
- Search for other usages of `useComments` hook
- Ensure all instances pass the required `postOperations` parameter

---

**Priority**: P0 - Critical Bug
**Labels**: `bug`, `comments`, `permissions`, `user-experience`