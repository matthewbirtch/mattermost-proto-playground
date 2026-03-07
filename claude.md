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
