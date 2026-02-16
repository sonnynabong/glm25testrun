# Portfolio OS

A web-based operating system simulation that serves as an interactive personal portfolio. Built with Astro, React, and Tailwind CSS.

## Features

### Desktop Experience
- Draggable, resizable windows
- Desktop icons and taskbar
- Start menu with app launcher
- System tray with clock
- Multi-window management

### Built-in Apps
- **About Me** - Personal introduction
- **Calculator** - Functional calculator
- **Calendar** - Interactive calendar
- **File Explorer** - File browser interface
- **Games** - 2048, Memory Match, Minesweeper, Pong, Snake, Tetris
- **Notes** - Note-taking application
- **Portfolio** - Project showcase
- **Projects Gallery** - Visual project gallery
- **Resume** - Resume/CV viewer
- **Settings** - Customization options
- **Skills** - Skills and expertise display
- **Terminal** - Command-line interface
- **Weather** - Weather information

### Visual Effects
- Prismatic burst background animation
- Waves background effect
- Smooth window transitions

## Tech Stack

- **Framework**: Astro 5.x
- **UI**: React 19
- **Styling**: Tailwind CSS 4.x
- **Components**: Radix UI, shadcn/ui
- **Graphics**: OGL (WebGL)
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
portfolio-os/
├── src/
│   ├── components/
│   │   ├── apps/          # Application components
│   │   ├── OS.jsx         # Main OS component
│   │   ├── Window.jsx     # Window management
│   │   └── PrismaticBurst.jsx  # Background effect
│   ├── layouts/           # Astro layouts
│   ├── lib/               # Utilities
│   ├── pages/             # Astro pages
│   └── styles/            # Global styles
├── public/                # Static assets
└── package.json
```

## License

MIT
