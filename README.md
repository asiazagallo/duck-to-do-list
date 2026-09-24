# Duck Themed To Do List

A desktop companion app built with **Electron** and **Vite**, based on [this tutorial](https://www.youtube.com/watch?v=GQvDNRBe4IU&t=330s), and extended with custom motivational features.

## Features

- Lightweight desktop pet that lives on your screen
- Looping motivational messages
- Idle animations (GIFs) while the pet is at rest
- A unique GIF + motivational message triggered every time a task is completed

## Built With

- [Electron](https://www.electronjs.org/) — desktop app framework
- [Electron Forge](https://www.electronforge.io/) — build & packaging tooling
- [Vite](https://vitejs.dev/) — frontend build tool

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# Install dependencies
npm install
```

### Running in development

```bash
npm start
```

### Building the app

```bash
npm run make
```

The packaged app will be available in the `out/` folder.

## Project Structure

```
.
├── src/                     # Application source code
├── forge.config.js          # Electron Forge configuration
├── vite.main.config.mjs     # Vite config for the main process
├── vite.preload.config.mjs  # Vite config for the preload script
├── vite.renderer.config.mjs # Vite config for the renderer process
├── icon.ico                 # App icon
└── index.html                # Entry HTML file
```

## Credits

This project started from the [tutorial](https://www.youtube.com/watch?v=GQvDNRBe4IU&t=330s) and was customized with additional graphics and motivational features.

## License
This project is licensed under the MIT License.
