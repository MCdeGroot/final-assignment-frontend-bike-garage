export function generateColorScale(minValue, maxValue) {
    const colorScale = [];
    const colorSteps = 10; // Aantal kleurstappen tussen rood en groen

    const red = 255;
    const green = 0;
    const blue = 0;

    for (let i = 0; i <= colorSteps; i++) {
        const value = minValue + ((maxValue - minValue) / colorSteps) * i;
        const redValue = Math.round(red - (red / colorSteps) * i);
        const greenValue = Math.round(green + (255 / colorSteps) * i);
        const color = `rgb(${redValue}, ${greenValue}, ${blue})`;
        colorScale.push({ value, color });
    }

    return colorScale;
}