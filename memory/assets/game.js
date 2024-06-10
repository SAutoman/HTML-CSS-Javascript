const selectors = {
  boardContainer: document.querySelector('.board-container'),
  board: document.querySelector('.board'),
  moves: document.querySelector('.moves'),
  timer: document.querySelector('.timer'),
  start: document.querySelector('button'),
  win: document.querySelector('.win')
}

const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null
}

const shuffle =
    array => {
      const clonedArray = [...array]

          for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
      }

      return clonedArray
    }

const pickRandom =
    (array, items) => {
      const clonedArray = [...array];
      const randomPicks = []

          for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)

        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
      }

      return randomPicks
    }

function memory_game_restart() {
  cards = document.querySelectorAll('.card');

  cards.forEach(card => {card.classList.remove('matched')});

  flipBackCards();

  state.totalFlips = 0;

  /* ig it should regenerate the board but it doesn't :c */
  generateGame();
}

const generateGame =
    () => {
      let dimensions = selectors.board.getAttribute('data-dimension')

      if (dimensions % 2 !== 0) {
        throw new Error('The dimension of the board must be an even number.')
      }

      const images = [
        'img/bear.jpg',
        'img/dino.png',
        'img/cat.png',
        'img/wrong.png',
        'img/placeholder.png',
        'img/correct.png',
        'img/bg.jpg',
        'img/cactus-2.png',
      ];
      let picks = pickRandom(images, (dimensions * dimensions) / 2)
      let items = shuffle([...picks, ...picks])
      let cards = `
        <div class="board" style="grid-template-columns: repeat(${
          dimensions}, auto)">
            ${
          items
              .map(
                  item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back"><img class="card_img" src="${
                      item}"></div>
                </div>
            `).join('')}
       </div>
    `

      let parser = new DOMParser().parseFromString(cards, 'text/html')

      selectors.board.replaceWith(parser.querySelector('.board'))
    }

function startMeeeeemGame() {
  state.gameStarted = true
  selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

    selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
}

const flipBackCards =
    () => {
      document.querySelectorAll('.card:not(.matched)')
          .forEach(card => {card.classList.remove('flipped')})

      state.flippedCards = 0
    }

const flipCard =
    card => {
      state.flippedCards++
      state.totalFlips++

          if (!state.gameStarted) {
        startMeeeeemGame()
      }

      if (state.flippedCards <= 2) {
        card.classList.add('flipped')
      }

      if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        if (flippedCards[0].getElementsByTagName('img')[0].getAttribute(
                'src') ===
            flippedCards[1].getElementsByTagName('img')[0].getAttribute(
                'src')) {
          flippedCards[0].classList.add('matched')
          flippedCards[1].classList.add('matched')
        }

        setTimeout(() => {flipBackCards()}, 1000)
      }

      // If there are no more cards that we can flip, we won the game
      if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
        selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${
            state.totalFlips}</span> moves<br />
                    under <span class="highlight">${
            state.totalTime}</span> seconds
                </span>
            `

            clearInterval(state.loop)
        }, 1000)
            return;
      }

      /* reset game if flips are higher than 40 */
      if (state.totalFlips > 40) {
        memory_game_restart();
        return;
      }
    }

const attachEventListeners =
    () => {
      document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') &&
            !eventParent.className.includes('flipped')) {
          flipCard(eventParent)
        }
        else if (
            eventTarget.nodeName === 'BUTTON' &&
            !eventTarget.className.includes('disabled')) {
          startMeeeeemGame()
        }
      })
    }


generateGame()
attachEventListeners()
