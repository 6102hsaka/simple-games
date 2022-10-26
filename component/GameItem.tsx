import Image from "next/image";
import Link from "next/link";

import type { IGame } from "../model/IGame";
import styles from "../styles/GameItem.module.scss";

interface Props {
    game: IGame;
}

const GameItem = ({ game }: Props) => {
    return (
        <Link href={game.path}>
            <a className={styles.container}>
                <div className={styles.imageContainer}>
                    <Image src={game.imageUrl} layout="fill" />
                </div>
                <div className={styles.description}>{game.name}</div>
            </a>
        </Link>
    );
};

export default GameItem;
