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

  //Check snake
  const checkSnake = (i: number) => {
    const snake = snakes.slice();
    let found = snake.find((k, j) => {
      if (k.head === i) {
        return k;
      }
      return undefined;
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
      return undefined;
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
      return undefined;
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
    } else if (player[whosTurn].status > 94) {
      const sum = player[whosTurn].status + rand;
      if (sum > 100) {
        setDiceNumber(rand);
        setPlayers(player);
        return;
      } else if (sum === 100) {
        player[whosTurn].status = sum;
        setDiceNumber(rand);
        setPlayers(player);
        setGameOver(true);
        // toast.success("Game Over " + player[turn].name + " Won", {
        //   position: toast.POSITION.BOTTOM_CENTER,
        // });
        return;
      }
    } else {
      player[whosTurn].status += rand;
      let status = player[whosTurn].status;
      // Snake bite
      const snakeFound = checkSnake(status);
      if (snakeFound !== undefined) {
        player[whosTurn].status = snakeFound.tail;
      }
      // Ladder Check
      const ladderFound = checkLadder(status);
      if (ladderFound !== undefined) {
        player[whosTurn].status = ladderFound.to;
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
        <Dice
          size={150}
          rollingTime={1000}
          onRoll={(value) => onRollDiceClick(value)}
          disabled={false}
          defaultValue={1}
          cheatValue={Math.floor(1 + Math.random() * (7 - 1)) as any}
        />
      </div>
      <ul>
        <li>Get 6 to start</li>
      </ul>
    </div>
  );
};

export default Board;
