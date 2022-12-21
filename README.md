
# Snakes & Ladders

Create a snake and ladder application as descrbed in multiple stories below. Please check-in you code regularity and make sure that the stories are completed in order.

User Story #1:
Create basic board and game play skelton for a Single Player.

1. The board will have 100 cells.
2. The game will have a 6 sided dice numbered from 1 to 6 and will always give a random number on rolling it.
3. The player initially starts from outside the board. Move the player to position 1 when the dice value is 6 only.
4. For a dice throw, a player should move from the initial position by the number on dice throw. If the dice value is 2 and the piece is at position 2, the player will put their piece at position 4 now (2+2).
5. A player wins if it exactly reaches the position 100 and the game ends there.
6. Log each step of the game play: such as the current value on the dice, and the players position, status of the game when it ends etc.


User Story #2:
Add snakes on the board

1. Add some snakes on the board. You are free to choose the postions and the number of snakes.
2. A snake moves a player from its start position to end position. where start position > end position. Eg. A snake starting at 14 and ensing at 7, moves the player from position 14 to position 7.


User Story #3:
Make A Crooked Dice.

1. A Crooked dice is a dice that only throws Even numbers.
2. The game can be started with a normal dice or a crooked dice.

Please make sure that:
1. You add steps to build and run the app.
2. The functionality is well unit tested.
3. Please follow the clean code principles.

## Live Demo

- https://rohit-snakes-ladder.netlify.app/


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

