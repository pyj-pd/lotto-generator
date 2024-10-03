const LOTTO_MAX_NUMBER = 45,
  LOTTO_NUMBER_PICK = 6

/**
 * Picks random numbers multiple times.
 * @returns {number[]} A sorted array that contains random numbers
 */
function pickRandomLottoNumber() {
  /** @type {number[]} */
  const candidates = [...new Array(LOTTO_MAX_NUMBER)].map((_, index) => index + 1),
    /** @type {number[]} */
    result = []

  for (let i = 0; i < LOTTO_NUMBER_PICK; i++) {
    const pickedIndex = Math.floor(Math.random() * candidates.length),
      pickedNumber = candidates[pickedIndex]

    result.push(pickedNumber)
    candidates.splice(pickedIndex, 1) // Remove picked number from candidates
  }

  return result.sort((a, b) => a - b)
}

/**
 * Gets corresponding color from lotto number.
 * @param {number} number Lotto number
 * @returns {string} Name of the variable of the color
 * @example
 * ```js
 * getLottoColor(3) // '--yellow'
 * getLottoColor(41) // '--green'
 * ```
 * @see https://dhlottery.co.kr/gameResult.do?method=statByColor
 */
function getLottoColor(number) {
  /** @type {string} */
  let colorName

  if (number <= 10) colorName = 'yellow'
  else if (number <= 20) colorName = 'blue'
  else if (number <= 30) colorName = 'red'
  else if (number <= 40) colorName = 'gray'
  else if (number <= 45) colorName = 'green'
  else throw new Error('The number should be between 1 and 45.')

  return `--${colorName}`
}

const resultContainerElement = document.getElementById('result-container')

/**
 * Adds an element that contains lotto number to result container.
 * @param {number[]} numbers Lotto numbers
 */
function addLottoNumber(numbers) {
  const resultElement = document.createElement('div')
  resultElement.className = 'pick-result'

  // Add lotto number elements
  for (const lottoNumber of numbers) {
    const numberElement = document.createElement('span')
    numberElement.style.setProperty('--color', `var(${getLottoColor(lottoNumber)})`)
    numberElement.style.setProperty('--text-color', `var(${getLottoColor(lottoNumber)}-text)`)
    numberElement.textContent = lottoNumber.toString()

    resultElement.appendChild(numberElement)
  }

  resultContainerElement.appendChild(resultElement)
}

/**
 * Picks random lotto number and adds the result to DOM.
 * @param {number} loopTimes How many numbers it should generate. Default to `1`.
 */
function generateLottoNumber(loopTimes = 1) {
  for (let i = 0; i < loopTimes; i++) {
    const pickedNumber = pickRandomLottoNumber()
    addLottoNumber(pickedNumber)
  }
}

/**
 * Clears all the results picked.
 */
function clearPickResult() {
  resultContainerElement.innerHTML = ''
}
