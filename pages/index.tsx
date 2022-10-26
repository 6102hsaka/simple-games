import type { NextPage } from "next";

import type { IGame } from "../model/IGame";
import GameItem from "../component/GameItem";
import styles from "../styles/Home.module.scss";

const games: IGame[] = [
    {
        name: "Tik Tac Toe",
        imageUrl: "/images/tic-tac-toe.png",
        path: "/tic-tac-toe",
    },
    {
        name: "Memory Game",
        imageUrl: "/images/memory-game.png",
        path: "/memory-game",
    },
];

const Home: NextPage = () => {
    return (
        <main className={styles.main}>
            {games.map((game) => (
                <GameItem key={game.name} game={game} />
            ))}
        </main>
    );
};

export default Home;
