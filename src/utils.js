
export const getRandomMedianCloseTo2000 = (lvl) => {

    let median = 1300;
    let range = 900;

    if (lvl === 3) {
        median = 1000;
        range = 600;
    } else if (lvl === 4) {
        median = 650;
        range = 500
    }// Adjust the range to control how close the random numbers will be to the median

    // Generate a random number between -0.5 and 0.5
    const randomFactor = Math.random() - 0.5;

    // Calculate the random number close to the median
    const randomNumber = median + (randomFactor * range);

    return randomNumber;
}