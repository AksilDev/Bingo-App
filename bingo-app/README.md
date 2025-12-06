# BINGO Card App

A React-based BINGO card application with support for multiple simultaneous cards, featuring a honey yellow and lime green color theme.

## Features

- **Game Code Entry**: Players must enter a valid game code to join a game
- **Multiple Cards**: Add and manage multiple BINGO cards simultaneously
- **Interactive Marking**: Click cells to mark them on your cards
- **Win Checking**: Check if your card is a winner with the API
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Honey yellow and lime green color palette with black accents

## API Integration

The app integrates with the following REST endpoints:

- **Get Card**: `http://www.hyeumine.com/getcard.php?bcode={gameCode}`
- **Check Win**: `http://www.hyeumine.com/checkwin.php?playcard_token={token}`

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Enter Game Code**: When you launch the app, enter a valid game code (e.g., `HEelhJos`)
2. **Mark Your Cards**: Click on numbers as they're called to mark them on your cards
3. **Add More Cards**: Click the "Add Card" button to play with multiple cards
4. **Check for Win**: Click "Check Win" on any card to verify if it's a winning card
5. **Leave Game**: Click "Leave Game" to exit and return to the game code entry

## Project Structure

```
bingo-app/
├── src/
│   ├── components/
│   │   ├── GameCodeEntry.jsx    # Entry screen for game code
│   │   ├── GameCodeEntry.css
│   │   ├── BingoCard.jsx        # Individual BINGO card component
│   │   ├── BingoCard.css
│   │   ├── GameBoard.jsx        # Main game board with multiple cards
│   │   └── GameBoard.css
│   ├── services/
│   │   └── bingoApi.js          # API integration
│   ├── App.jsx                  # Main app component
│   ├── App.css
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── package.json
└── README.md
```

## Technologies Used

- **React 18**: Frontend framework
- **Vite**: Build tool and dev server
- **CSS3**: Styling with custom properties and animations

## Color Palette

- Primary: Honey Yellow (#FFD700)
- Secondary: Lime Green (#9ACD32)
- Accent: Black (#000000)
- Background: White (#FFFFFF)

## License

This project is created for educational purposes.
