import Cell from "../Cell/Cell";
import { useEffect, useState } from "react";
import { getLadder, getPlayer, getSnakes } from "../../utils/utils";
import Dice from "react-dice-roll";

const Board = () => {
  const fixedCol = 10;

  const [diceNumber, setDiceNumber] = useState<any>(1);
  const [players, setPlayers] = useState<any[]>(getPlayer());
  const [snakes, setSnakes] = useState<any[]>(getSnakes());
  const [ladders, setLadders] = useState<any[]>(getLadder());
  const [turn, setTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [start, setStart] = useState(false);
  const [boardHtml, setBoardHtml] = useState<any>([]);
  const [logs, setLogs] = useState<string[]>([]);

  //Check snake
  const checkSnake = (i: number) => {
    const snake = snakes.slice();
    let found = snake.find((k, j) => {
      if (k.head === i) {
        return k;
      }
    });
    return found;
  };
  // Ladder check
  const checkLadder = (i: number) => {
    const ladder = ladders.slice();
    let found = ladder.find((k, j) => {
      if (k.from === i) {
        return k;
      }
    });
    return found;
  };
  // Player check
  const checkPlayer = (i: number) => {
    const player = players.slice();
    let found = player.find((k, j) => {
      if (k.status === i) {
        return k;
      }
    });
    return found;
  };

  const createBoard = (init: number, cellnos: number) => {
    const row = [];

    for (let i = init; i <= cellnos; i++) {
      let playerFound = checkPlayer(i);
      let snakeFound = checkSnake(i);
      let ladderFound = checkLadder(i);

      row.push(
        <Cell
          key={`cell-${i}`}
          type={
            snakeFound?.imgClass ||
            ladderFound?.imgClass ||
            playerFound?.imgClass
          }
          number={i}
          player={players[turn]}
        ></Cell>
      );
    }
    return row;
  };
  const getTurn = () => {
    const PLen = players.length;
    let next = 0;
    // if (PLen === 1 || turn === 0) next= 0;
    if (turn > 0 && turn < PLen - 1) {
      next = turn + 1;
    }
    setTurn((prev) => next);
    return next;
  };

  const onRollDiceClick = (rand: number) => {
    setStart(true);

    if (gameOver) {
      return;
    }
    let player = players.slice();
    const whosTurn = getTurn();
    if (!player[whosTurn].start) {
      if (rand === 6) {
        player[whosTurn].start = true;
        player[whosTurn].status = 1;
      }
      setDiceNumber((prev: any) => rand);
      setPlayers((prev) => player);
      return;
    } else if (player[whosTurn].status >= 94) {
      const sum = player[whosTurn].status + rand;
      const remainingBlocks = 100 - player[whosTurn].status;
      if (remainingBlocks === 1) {
        setGameOver((prev) => !prev);
        return;
      }
      if (rand <= remainingBlocks) {
        player[whosTurn].status = sum;
        setDiceNumber(rand);
        setPlayers(player);
        if (sum === 100) {
          player[whosTurn].status = 100;
          setPlayers(player);
          setGameOver((prev) => !prev);
          return;
        }
      }
    } else {
      player[whosTurn].status += rand;
      let status = player[whosTurn].status;
      // Snake bite
      const snakeFound = checkSnake(status);
      if (snakeFound !== undefined) {
        player[whosTurn].status = snakeFound.tail;
        setLogs((prev: any) => [
          ...prev,
          `Got a snake and demoted to ${snakeFound.tail} from ${snakeFound.head} 🥲`,
        ]);
      }
      // Ladder Check
      const ladderFound = checkLadder(status);
      if (ladderFound !== undefined) {
        player[whosTurn].status = ladderFound.to;
        setLogs((prev: any) => [
          ...prev,
          `Wow got a ladder and promoted from ${snakeFound.tail} to ${snakeFound.head} 😃`,
        ]);
      }
      setPlayers((prev: any) => player);
    }
    setDiceNumber(rand);
  };

  useEffect(() => {
    setBoardHtml([]);
    for (let i = 0; i < 10; i++) {
      const eachRow = createBoard(i * fixedCol + 1, fixedCol * (i + 1));
      setBoardHtml((prev: any) => [
        ...prev,
        <div key={i * fixedCol + 1 + "main"} className="row">
          {eachRow}
        </div>,
      ]);
    }
  }, [players[turn].status]);

  return (
    <div className="h-screen grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-5 flex items-center justify-center">
        <div className="flex flex-col-reverse w-auto [&>*:nth-child(odd)]:flex flex-row [&>*:nth-child(even)]:flex [&>*:nth-child(even)]:flex-row-reverse m-3">
          {boardHtml}
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div className="flex justify-center space-x-4">
          <Dice
            size={150}
            rollingTime={1000}
            onRoll={(value) => onRollDiceClick(value)}
            disabled={gameOver}
            defaultValue={1}
            cheatValue={(Math.floor(1 + (Math.random() * 6) / 2) * 2) as any}
          />
          <ul className="list-disc list-inside">
            <li>Crooked Dice - A dice that only throws Even numbers.</li>
            <li>Get 6 to start</li>
            <li>
              <b>Hover</b> on different <b className="text-green-500">green</b>
              &nbsp;&&nbsp;
              <b className="text-rose-500">red</b> color box 😍
            </li>
            <li className="flex items-center">
              Player {turn} has &nbsp;
              <div
                className={`h-4 w-4 rounded-full ${players[turn].colorName}`}
              ></div>
              &nbsp; color
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <ul className="list-disc">
          <li>Current value of dice - {diceNumber} </li>
          <li>
            Players
            <ul className="list-disc list-inside">
              {players.map((player) => (
                <li>
                  {player.name} is at {player.status}
                </li>
              ))}
            </ul>
          </li>
          <li>GameOver - {gameOver ? "Yes" : "Not yet"}</li>
          <li>
            Logs -
            <ul className="list-disc list-inside">
              {logs.map((log) => (
                <li>{log}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {gameOver && (
        <div className="dv-gameover flex">
          <h1 className="animate-text bg-gradient-to-r from-teal-500 via-pink-500 to-rose-500 bg-clip-text text-transparent text-5xl font-black">
            {players[turn].status === 99
              ? "Draw, refresh to start again"
              : "Winner winner chicken dinner🎉🎉"}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Board;
