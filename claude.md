# Project instructions for AI

## SCSS component styles: BEM + nesting

When writing or editing `*.module.scss` component styles, use a **single block as the root** and nest elements and modifiers under it. This keeps each component’s styles in one hierarchy and matches BEM.

### Structure

1. **One root block** — e.g. `.button`, `.avatar`. No other top-level selectors for that component.
2. **Elements** — Nest with `&__element` under the block (e.g. `&__label`, `&__icon-slot`).
3. **Modifiers** — Nest with `&--modifier` under the block (e.g. `&--size-small`, `&--emphasis-primary`).
4. **Modifier-specific element overrides** — Inside a modifier, target the element with the full class (e.g. `.button__label`) so the selector stays correct: modifier on block, styling the element.

### Compound modifiers (two classes on the same element)

Sass only allows `&` at the **start** of a compound selector. For combinations like `.button--destructive.button--emphasis-primary`, use **interpolation**:

```scss
#{&}--destructive#{&}--emphasis-primary {
  // ...
}
```

Do **not** write `&--destructive&--emphasis-primary` — it will trigger a Sass error.

### Example (excerpt)

```scss
.button {
  display: inline-flex;
  // ...

  &__label { line-height: 1; }
  &__icon-slot { display: inline-flex; /* ... */ }

  &--size-small {
    padding: var(--spacing-xxs) var(--spacing-l);
    .button__label {
      font-size: var(--font-size-75);
    }
  }

  &--emphasis-primary { /* ... */ }
  #{&}--destructive#{&}--emphasis-primary { /* ... */ }
}
```

Keyframes and other global at-rules can stay at the top of the file; the rest of the component lives under the single block.

## Button emphasis: use Primary sparingly

`emphasis="Primary"` should appear **at most once per view** — it draws the eye and loses meaning if overused. Use `Secondary`, `Tertiary`, or `Link` for supporting actions. Only reach for `Primary` when one action clearly outranks all others on screen.

## EmptyState: default button size is Medium

When adding an `action` to `EmptyState`, omit the `size` prop unless a Figma spec requires a different size. `Button` defaults to `Medium`, which is the correct size for empty state actions.

## Routing new additions: Patterns page vs Components page

When adding a new component to the playground, check the Figma file name:
- File name contains **"Patterns"** → add to `src/pages/Patterns/Patterns.tsx`
- File name contains **"Component"** → add to `src/pages/Components/Components.tsx`

## Building new components: reuse existing components first

When building a new component, audit the elements it needs before writing any new code. If an existing component in `src/components/` already covers an element — especially when its name matches what Figma uses — use it directly rather than reimplementing it. Only build a new sub-component when nothing suitable exists.

## Animation: easing and duration

Always use the animation tokens from `tokens.scss` — never hard-code durations or easing keywords directly.

| Scenario | Easing token | Duration token |
|---|---|---|
| Element already on screen, small movement | `--ease-transition` | `--duration-quick` |
| Element already on screen, large movement | `--ease-transition` | `--duration-moderate` |
| Entrance (element entering the screen) | `--ease-entrance` | `--duration-quick` |
| Exit (element leaving the screen) | `--ease-exit` | `--duration-quick` |

**"Large movement"** means the element travels a significant distance across the viewport — e.g. a panel sliding in from off-screen. A button hover shift or a toolbar expanding a fixed height are small movements.

```scss
// Small on-screen transition (e.g. hover state, short expand)
transition: opacity var(--duration-quick) var(--ease-transition);

// Large on-screen transition (e.g. panel sliding across the view)
transition: transform var(--duration-moderate) var(--ease-transition);

// Entrance
transition: opacity var(--duration-quick) var(--ease-entrance);

// Exit
transition: opacity var(--duration-quick) var(--ease-exit);
```

## Semantic color tokens

For info/success/warning/danger states, always use the semantic tokens from `tokens.scss` — never raw palette tokens (e.g. `--color-blue-400`) or Mattermost theme vars (e.g. `--error-text`, `--away-indicator`).

| Semantic token | RGB counterpart | Value |
|---|---|---|
| `--color-info` | `--color-info-rgb` | `--color-blue-400` |
| `--color-success` | `--color-success-rgb` | `--color-green-500` |
| `--color-warning` | `--color-warning-rgb` | `--color-yellow-600` |
| `--color-danger` | `--color-danger-rgb` | `--color-red-500` |

Use the `-rgb` counterpart when you need `rgba()`:

```scss
color: var(--color-danger);
background-color: rgba(var(--color-warning-rgb), 0.04);
border-color: rgba(var(--color-warning-rgb), 0.16);
```

## Figma color variables with opacity suffix

When a Figma color variable has a suffix (e.g. `center-channel-color-8`, `sidebar-text-24`, `button-bg-16`, `color-danger-12`), the suffix encodes an opacity percentage. Do **not** look for a suffixed CSS token — it doesn't exist. Instead, use the root token's `-rgb` counterpart inside `rgba()`, with the suffix converted to a decimal alpha (divide by 100).

| Figma variable | CSS |
|---|---|
| `center-channel-color/8` | `rgba(var(--center-channel-color-rgb), 0.08)` |
| `sidebar-text/24` | `rgba(var(--sidebar-text-rgb), 0.24)` |
| `button-bg/16` | `rgba(var(--button-bg-rgb), 0.16)` |
| `color-danger/12` | `rgba(var(--color-danger-rgb), 0.12)` |

## Iconography: phone icon is always filled

For any phone/call action, use the filled compass icon `@mattermost/compass-icons/components/phone`. Never use `phone-outline`, even when another design system reference shows the outline variant.

## Typography: prefer semibold over bold

Use `var(--font-weight-semibold)` (600) wherever bold emphasis is needed. Do **not** use `var(--font-weight-bold)` (700) or `font-weight: bold` / `font-weight: 700` unless explicitly required by a Figma spec that specifies 700.
