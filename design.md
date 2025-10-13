# Rock Band World Tour - Design Style Guide

## Design Philosophy

### Visual Language
**Professional Rock Aesthetic**: Sophisticated yet rebellious, combining the raw energy of rock music with polished, modern web design. The aesthetic draws inspiration from premium music publications like Rolling Stone and high-end concert venue branding.

### Color Palette
**Primary Colors**:
- **Charcoal Black** (#1a1a1a) - Primary background, professional depth
- **Pure White** (#ffffff) - Text and contrast elements
- **Electric Crimson** (#dc2626) - Accent color for CTAs and highlights
- **Warm Gold** (#f59e0b) - Secondary accent for premium elements

**Supporting Colors**:
- **Steel Gray** (#6b7280) - Secondary text and borders
- **Deep Slate** (#374151) - Card backgrounds and sections

### Typography
**Primary Font**: "Playfair Display" - Bold serif for headlines and band name
**Secondary Font**: "Inter" - Clean sans-serif for body text and UI elements
**Accent Font**: "Bebas Neue" - Condensed sans-serif for tour dates and numbers

## Visual Effects & Styling

### Core Libraries Implementation
**Anime.js**: Smooth page transitions, element reveals, and interactive hover effects
**Pixi.js**: Particle systems for concert atmosphere (stage lights, crowd energy)
**ECharts.js**: Tour date visualization and ticket sales data
**Splide.js**: Image carousels for band photos and merchandise
**Typed.js**: Dynamic text effects for tour announcements
**Splitting.js**: Letter-by-letter animations for headlines

### Header & Hero Effects
**Concert Atmosphere Background**: Animated particle system simulating stage lights and crowd energy using Pixi.js
**Gradient Text Animation**: Band name with electric crimson to gold gradient cycling
**Parallax Scrolling**: Layered movement of background elements
**Typewriter Reveals**: Tour dates and announcements appearing with typing effect

### Interactive Elements
**3D Tilt Cards**: Band member and merchandise cards with subtle perspective shifts
**Glow Transitions**: Buttons and links with electric crimson glow on hover
**Wave Motion**: Audio player with visual waveform animations
**Lightning Effects**: Quick flash transitions between sections

### Animation Principles
**Smooth Transitions**: 300ms ease-out for most interactions
**Staggered Reveals**: Content appears in sequence with 100ms delays
**Elastic Hover**: Subtle bounce effects on interactive elements
**Particle Systems**: Ambient background effects for atmosphere

### Layout & Composition
**Grid System**: 12-column responsive grid with consistent spacing
**Asymmetric Balance**: Dynamic layouts with intentional imbalance
**Depth Layering**: Multiple z-index levels for visual hierarchy
**Breathing Room**: Generous whitespace for premium feel

### Image Treatment
**High Contrast**: Bold, dramatic lighting on band photography
**Desaturated Edges**: Subtle vignetting for focus
**Sharp Details**: Crisp, professional image quality
**Consistent Aspect Ratios**: 16:9 for heroes, 4:3 for cards

### Responsive Design
**Mobile-First**: Touch-friendly interactions and sizing
**Breakpoint Strategy**: 320px, 768px, 1024px, 1440px
**Flexible Typography**: Fluid scaling based on viewport
**Optimized Images**: Multiple sizes for different devices

### Accessibility
**High Contrast**: 4.5:1 minimum ratio for all text
**Focus Indicators**: Clear keyboard navigation states
**Screen Reader Support**: Proper ARIA labels and descriptions
**Reduced Motion**: Respect user preferences for animations

## Brand Personality
**Professional**: Polished, high-quality execution
**Energetic**: Dynamic animations and bold colors
**Authentic**: Genuine rock culture references
**Accessible**: Inclusive design for all users
**Modern**: Contemporary web design standards