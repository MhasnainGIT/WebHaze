---
name: WebHaze Liquid
colors:
  background: '#050505'
  surface: '#0F0F0F'
  surface-variant: '#1A1A1A'
  primary: '#00C2FF'
  on-primary: '#000000'
  primary-container: 'rgba(0, 194, 255, 0.1)'
  secondary: '#FF00E5'
  on-secondary: '#FFFFFF'
  tertiary: '#7000FF'
  outline: '#2A2A2A'
  on-surface: '#FFFFFF'
  on-surface-variant: '#A1A1A1'
typography:
  display:
    fontFamily: Outfit
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  h1:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  h2:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
rounded:
  lg: 24px
  md: 16px
  sm: 8px
---

## Vision
A premium, immersive experience that feels "liquid" and high-tech. Inspired by Framer, it uses deep blacks to make vibrant gradients pop. Every component should feel like it's floating in a glass container with high-end backdrop blurs.

## Design Tokens
- **Glassmorphism**: Use `backdrop-filter: blur(20px)` with `background: rgba(255, 255, 255, 0.03)`.
- **Bento Grid**: Layouts should follow a modular, rounded-corner grid system.
- **Micro-interactions**: Subtle scale-up on hover, glowing borders, and smooth transitions.
- **3D Elements**: Integrate Spline or CSS-based 3D rotations for product previews.
