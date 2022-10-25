export const shuffleArray = (ar: any[]) => {
    const n = ar.length;
    for (let i = 0; i < n; i++) {
        let x = Math.floor(Math.random() * i + n) % (i + 1);
        [ar[i], ar[x]] = [ar[x], ar[i]];
    }
};
