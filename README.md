# Shoot The Ducks - Modern React Duck Hunt Game 🎯🦆

## Try live demo - [Demo]()

A modern, dark-themed remake of the classic Duck Hunt game, built with React and Vite, optimized for both desktop (mouse) and mobile/tablet (touch) interactions. Developed as part of the **#30DaysOfVibeCoding** challenge.

<!-- ================================================== -->

![Shoot The Ducks - Start Screen](/public/homepage-01.png)
![Shoot The Ducks - Gameplay](/public/homepage-02.png)
![Shoot The Ducks - Game Over Screen](/public/homepage-03.png)

<!-- ================================================== -->

## Overview

This project reimagines the retro fun of Duck Hunt for the modern web. It features a sleek dark interface where players use their mouse or touch input to shoot ducks flying across the screen. Ducks emerge from the bottom, bounce off walls, and attempt to escape at the top. Shooting ducks increases the score, while letting them escape reduces lives. The game progressively increases difficulty by speeding up ducks and spawning more of them as the score climbs.

The goal was to create a visually appealing and engaging web game experience using React, modern CSS, and exploring AI-assisted development ("Vibe Coding").

## Features ✨

*   **Classic Gameplay, Modern Twist:** The core duck shooting mechanic inspired by Duck Hunt.
*   **Responsive Design:** Optimized for gameplay on desktop, tablets, and mobile phones.
*   **Touch & Mouse Controls:** Seamlessly handles both click and tap inputs for shooting.
*   **Dynamic Difficulty:** Duck speed and spawn rate increase based on player score. Multiple ducks appear simultaneously at higher scores.
*   **Visual Feedback:** Custom target cursor, duck hit "explosion" animation, and themed UI elements.
*   **Multiple Screens:** Includes Start, Game, Game Over screens, Pause Menu, and How-to-Play instructions.
*   **Persistent UI Elements:** Features a static header during gameplay/game over and a footer with creator/source links.
*   **Themed UI:** Consistent modern dark theme with green accents.
*   **CSS Animations:** Used for screen transitions, duck explosions, and UI feedback.
*   **Mobile Optimizations:** Includes viewport settings and CSS `touch-action` to prevent unwanted zooming and improve tap responsiveness.
*   **Built with React & Vite:** Leverages modern frontend tools for a fast development experience.

## Tech Stack 🚀

*   **Frontend:** React 18+
*   **Build Tool:** Vite
*   **Styling:** CSS3 (including Flexbox, Custom Properties/Variables, Animations)
*   **Language:** JavaScript (ES6+)
*   **Icons:** `react-icons` (for Footer)
*   **Package Manager:** npm

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended, includes npm) installed on your system. Download from [nodejs.org](https://nodejs.org/).
*   Git (for cloning the repository).

### Installation & Setup

1.  **Clone the repository:**
    *(Make sure to update the URL if your repository name is different)*
    ```bash
    git clone https://github.com/Barrsum/Shoot-The-Ducks-By-Ram-Bapat.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Shoot-The-Ducks-By-Ram-Bapat
    ```

3.  **Install NPM packages:**
    ```bash
    npm install
    ```
    *(This installs React, Vite, react-icons, and other dependencies)*

4.  **Ensure Custom Cursor Exists:**
    Make sure you have the `target.png` file inside the `/public` directory in the project root.

### Running the Project

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This command will start the Vite development server.

2.  **Open the application:**
    Open your web browser and navigate to the local URL provided by Vite (usually `http://localhost:5173/` or a similar port).


## Building for Production

To create an optimized build for deployment:

```bash
npm run build
```
This will create a `dist` folder containing the static assets you can deploy to hosting services like Vercel, Netlify, or GitHub Pages.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Barrsum/Shoot-The-Ducks-By-Ram-Bapat/issues).

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/CoolNewDuck`)
3.  Commit your Changes (`git commit -m 'Add some CoolNewDuck'`)
4.  Push to the Branch (`git push origin feature/CoolNewDuck`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

## Acknowledgements 🙏

*   **Inspiration:** The original Nintendo Duck Hunt game.
*   **Icons:** Provided by [React Icons](https://react-icons.github.io/react-icons/).
*   **React:** [react.dev](https://react.dev/)
*   **Vite:** [vitejs.dev](https://vitejs.dev/)


---

Built by Ram Bapat - Challenge [\#30DaysOfVibeCoding](https://www.linkedin.com/posts/ram-bapat-barrsum-diamos_vibecoding-ai-machinelearning-activity-7312839191153860608-wQ8y?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEokGUcBG1WEFP4A_IMlyO4LNl-eu2MD52w) - [LinkedIn Profile](https://www.linkedin.com/in/ram-bapat-barrsum-diamos)