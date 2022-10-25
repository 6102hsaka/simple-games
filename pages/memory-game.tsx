import type { NextPage } from "next";
import type { RefObject } from "react";
import { useState, useRef, useEffect } from "react";

import { shuffleArray } from "../utils";
import styles from "../styles/MemoryGame.module.scss";

const ar = [
    "&#8986;",
    "&#8986;",
    "&#8987;",
    "&#8987;",
    "&#9748;",
    "&#9748;",
    "&#9749;",
    "&#9749;",
    "&#9924;",
    "&#9924;",
    "&#127748;",
    "&#127748;",
];

const MemoryGame: NextPage = () => {
    let steps: number = 0;
    let cardMatched: number = 0;
    const cardLookup: RefObject<HTMLDivElement>[] = [];

    const [statusMessage, setStatusMessage] = useState<string>("");
    const cardRefs: RefObject<HTMLDivElement>[] = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
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
        shuffle();
    }, []);

    const shuffle = () => {
        shuffleArray(ar);
        cardRefs.forEach((cardRef, index) => {
            if (cardRef.current && cardRef.current.lastElementChild) {
                cardRef.current.lastElementChild.innerHTML = ar[index];
            }
        });
    };

    const showCard = (cardRef: RefObject<HTMLDivElement>) => {
        cardRef.current?.classList.add(styles.flip);
    };

    const hideCard = (cardRef: RefObject<HTMLDivElement> | undefined) => {
        cardRef?.current?.classList.remove(styles.flip);
    };

    const selectCard = (cardRef: RefObject<HTMLDivElement>) => {
        if (cardRef.current?.classList.contains(styles.flip)) return;
        steps++;
        showCard(cardRef);
        if (cardLookup.length === 0) {
            cardLookup.push(cardRef);
        } else {
            const previousCardRef = cardLookup.pop();
            if (
                previousCardRef?.current?.innerHTML !==
                cardRef.current?.innerHTML
            ) {
                setTimeout(() => {
                    hideCard(previousCardRef);
                    hideCard(cardRef);
                }, 600);
            } else {
                cardMatched += 2;
                if (cardMatched === 12) {
                    setStatusMessage(`You finished in ${steps} steps`);
                }
            }
        }
    };

    const resetGame = () => {
        steps = 0;
        cardMatched = 0;
        if (cardLookup.length === 1) {
            cardLookup.pop();
        }
        setStatusMessage("");
        cardRefs.forEach(hideCard);
        setTimeout(shuffle, 500);
    };

    return (
        <div className={styles.container}>
            <h1>MEMORY GAME</h1>
            <div className={styles.cardContainer}>
                {cardRefs.map((cardRef, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        ref={cardRef}
                        onClick={() => selectCard(cardRef)}
                    >
                        <div className={styles.cardFront}></div>
                        <div className={styles.cardBack}></div>
                    </div>
                ))}
            </div>
            <div className={styles.status}>{statusMessage}</div>
            <button className={styles.reset} onClick={resetGame}>
                Reset
            </button>
        </div>
    );
};

export default MemoryGame;
