import { expect, it } from "vitest"
import { randomIntFromInterval  } from "./randomIntFromInterval"

it('returns a random integer, within a range', () => {
    const [min, max] = [1, 10]

    expect(randomIntFromInterval(min, max)).toBeGreaterThanOrEqual(min)
    expect(randomIntFromInterval(min, max)).toBeLessThanOrEqual(max)
})