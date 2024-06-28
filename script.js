document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]')
    const gameStatus = document.getElementById('gameStatus')
    const restartButton = document.getElementById('restartButton')
    let currentPlayer = 'X'
    let gameActive = true
    const board = Array(9).fill(null)

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function handleCellClick(e) {
        const cell = e.target
        const cellIndex = Array.from(cells).indexOf(cell)

        if (board[cellIndex] !== null || !gameActive) {
            return
        }

        board[cellIndex] = currentPlayer
        cell.textContent = currentPlayer

        if (checkWin(currentPlayer)) {
            gameStatus.textContent = `${currentPlayer} wins!`
            gameActive = false
            return
        }

        if (board.every(cell => cell !== null)) {
            gameStatus.textContent = `It's a draw!`
            gameActive = false
            return
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        gameStatus.textContent = `Player ${currentPlayer}'s turn`
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === player
            })
        })
    }

    function restartGame() {
        board.fill(null)
        cells.forEach(cell => cell.textContent = '')
        currentPlayer = 'X'
        gameStatus.textContent = `Player ${currentPlayer}'s turn`
        gameActive = true
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick))
    restartButton.addEventListener('click', restartGame)

    gameStatus.textContent = `Player ${currentPlayer}'s turn`
})
