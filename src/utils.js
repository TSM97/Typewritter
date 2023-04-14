export function getRandomMedianCloseTo2000() {
    const median = 1000;
    const range = 900; // Adjust the range to control how close the random numbers will be to the median

    // Generate a random number between -0.5 and 0.5
    const randomFactor = Math.random() - 0.5;

    // Calculate the random number close to the median
    const randomNumber = median + (randomFactor * range);

    return randomNumber;
}