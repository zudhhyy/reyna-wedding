# useScrollToNext Hook

A reusable React hook that automatically navigates to the next page when the user scrolls to the bottom of the current page.

## Usage

```tsx
import { useScrollToNext } from '@/hooks/useScrollToNext';

export default function MyPage() {
  useScrollToNext({ nextPage: '/next-page' });
  
  return (
    <div>
      {/* Your page content */}
    </div>
  );
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `nextPage` | `string` | **Required** | The path to navigate to when user reaches bottom |
| `threshold` | `number` | `10` | Distance from bottom (in pixels) to trigger navigation |
| `requireScroll` | `boolean` | `true` | Whether user must scroll before navigation triggers |

## Examples

### Basic Usage
```tsx
useScrollToNext({ nextPage: '/about' });
```

### Custom Threshold
```tsx
useScrollToNext({ 
  nextPage: '/gallery', 
  threshold: 50 
});
```

### No Scroll Requirement (immediate navigation at bottom)
```tsx
useScrollToNext({ 
  nextPage: '/rsvp', 
  requireScroll: false 
});
```

## How it Works

1. The hook listens for scroll events on the window
2. When the user scrolls down, it tracks that they've interacted with the page
3. When the user reaches the bottom (within the threshold), it automatically navigates to the specified page
4. The event listener is properly cleaned up when the component unmounts

## Notes

- Make sure to add `'use client'` directive to pages using this hook
- The hook requires Next.js app router (`next/navigation`)
- Works best with pages that have enough content to scroll 