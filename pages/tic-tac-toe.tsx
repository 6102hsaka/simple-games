import type { NextPage } from "next";
import type { RefObject } from "react";
import { useState, useRef, useEffect } from "react";

import styles from "../styles/TicTacToe.module.scss";

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const TicTacToe: NextPage = () => {
    const [isGameActive, setGameActive] = useState<boolean>(true);
    const [player, setPlayer] = useState<"X" | "O">("X");
    const [statusMessage, setStatusMessage] = useState<string>("");
    const cellRefs: RefObject<HTMLDivElement>[] = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
    ];

    useEffect(() => {
        setStatusMessage(`Player ${player} turn`);
    }, [player]);

    const isGameCompleted = () => {
        const isMatchWon = winConditions.reduce((acc, cur) => {
            if (
                !!cellRefs[cur[0]].current?.innerHTML &&
                cellRefs[cur[0]].current?.innerHTML ===
                    cellRefs[cur[1]].current?.innerHTML &&
                cellRefs[cur[1]].current?.innerHTML ===
                    cellRefs[cur[2]].current?.innerHTML
            ) {
                setGameActive(false);
                cur.forEach((cell) =>
                    cellRefs[cell].current?.classList.add(styles.won)
                );
                setStatusMessage(`${player} won`);
                return true;
            }
            return acc;
        }, false);

        if (!isMatchWon) {
            const isMatchDrawn = cellRefs.reduce(
                (acc, cellRef) => acc && !!cellRef.current?.innerHTML,
                true
            );

            if (isMatchDrawn) {
                setGameActive(false);
                cellRefs.forEach((cellRef) =>
                    cellRef.current?.classList.add(styles.draw)
                );
                setStatusMessage(`Draw!!`);
            }
            return isMatchDrawn;
        }
        return true;
    };

    const updateCell = (ref: RefObject<HTMLDivElement>) => {
        if (isGameActive && ref.current && ref.current.innerHTML === "") {
            ref.current.innerHTML = player;
            if (!isGameCompleted()) {
                setPlayer((_player) => (_player === "X" ? "O" : "X"));
            }
        }
    };

    const resetGame = () => {
        setPlayer("X");
        setGameActive(true);
        cellRefs.forEach((cellRef) => {
            if (cellRef.current) {
                cellRef.current.innerHTML = "";
                cellRef.current.classList.remove(styles.won, styles.draw);
            }
        });
    };

    return (
        <div className={styles.container}>
            <h1>TIK TAC TOE</h1>
            <div className={styles.grid}>
                {cellRefs.map((ref, index) => (
                    <div
                        key={index}
                        className={styles.cell}
                        ref={ref}
                        onClick={() => updateCell(ref)}
                    ></div>
                ))}
            </div>
            <div className={styles.status}>{statusMessage}</div>
            <button className={styles.reset} onClick={resetGame}>
                Reset
            </button>
        </div>
    );
};

export default TicTacToe;
