document.addEventListener('DOMContentLoaded', () =>  {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    let squares = []
    const width = 4
    let score = 0
  
    //create the playing board for 2048
    function createBoard() {
      for (let i=0; i < width*width; i++) {
        square = document.createElement('div')
        square.innerHTML = 0
        gridDisplay.appendChild(square)
        squares.push(square)
      }
      generate()
      generate()
    }
    createBoard()
  
    //generates a random number
    function generate() {
      randomNumber = Math.floor(Math.random() * squares.length)
      if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2 //generates the number 2 at a random position in the board
        checkForGameOver()//checks for game over
      } else generate() // if the random position is occupied by a number, the function is called for another position
    }
  
    // to move all numbers other than zeros to the right
    function moveRight() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML
          let totalTwo = squares[i+1].innerHTML
          let totalThree = squares[i+2].innerHTML
          let totalFour = squares[i+3].innerHTML
          let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
          let filteredRow = row.filter(num => num) //filters any number other than zeros
          let missing = 4 - filteredRow.length // to know how many empty elements are there
          let zeros = Array(missing).fill(0)  //to fill the remaining positions with zeros
          let newRow = zeros.concat(filteredRow)//concars the number with zeros first
  
          squares[i].innerHTML = newRow[0]
          squares[i +1].innerHTML = newRow[1]
          squares[i +2].innerHTML = newRow[2]
          squares[i +3].innerHTML = newRow[3]//assignes different positions with corresponding elements in the row
        }
      }
    }
  
    // to move all numbers other than zeros to the left
    function moveLeft() {
      for (let i=0; i < 16; i++) {
        if (i % 4 === 0) {
          let totalOne = squares[i].innerHTML
          let totalTwo = squares[i+1].innerHTML
          let totalThree = squares[i+2].innerHTML
          let totalFour = squares[i+3].innerHTML
          let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
          let filteredRow = row.filter(num => num)
          let missing = 4 - filteredRow.length
          let zeros = Array(missing).fill(0)
          let newRow = filteredRow.concat(zeros)//the numbers are concated with the zeros
  
          squares[i].innerHTML = newRow[0]
          squares[i +1].innerHTML = newRow[1]
          squares[i +2].innerHTML = newRow[2]
          squares[i +3].innerHTML = newRow[3]
        }
      }
    }
  
    //to move all numbers up other than zeros
    function moveUp() {
      for (let i=0; i < 4; i++) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+width].innerHTML
        let totalThree = squares[i+(width*2)].innerHTML
        let totalFour = squares[i+(width*3)].innerHTML
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
        let filteredColumn = column.filter(num => num)
        let missing = 4 - filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = filteredColumn.concat(zeros)
  
        squares[i].innerHTML = newColumn[0]
        squares[i +width].innerHTML = newColumn[1]
        squares[i+(width*2)].innerHTML = newColumn[2]
        squares[i+(width*3)].innerHTML = newColumn[3]
      }
    }
  
    //to move all the numbers down other than zeros
    function moveDown() {
      for (let i=0; i < 4; i++) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+width].innerHTML // for checking the coloumns we use width*i
        let totalThree = squares[i+(width*2)].innerHTML
        let totalFour = squares[i+(width*3)].innerHTML
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
  
        let filteredColumn = column.filter(num => num)
        let missing = 4 - filteredColumn.length
        let zeros = Array(missing).fill(0)
        let newColumn = zeros.concat(filteredColumn)
  
        squares[i].innerHTML = newColumn[0]
        squares[i +width].innerHTML = newColumn[1]
        squares[i+(width*2)].innerHTML = newColumn[2]
        squares[i+(width*3)].innerHTML = newColumn[3]
      }
    }
  
    //to add the numbers row wise
    function combineRow() {
      for (let i =0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i +1].innerHTML) {//check for same number in the adjecent blocks
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +1].innerHTML)//addition of adjecent numbers
          squares[i].innerHTML = combinedTotal//assigning the total 
          squares[i +1].innerHTML = 0
          score += combinedTotal// for score addition
          scoreDisplay.innerHTML = score
        }
      }
      checkForWin()//checks if won
    }
  
    //to add the numbers coloumn wise
    function combineColumn() {
      for (let i =0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i +width].innerHTML) {//check for columns
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
          squares[i].innerHTML = combinedTotal
          squares[i +width].innerHTML = 0
          score += combinedTotal//for score addition
          scoreDisplay.innerHTML = score
        }
      }
      checkForWin()//checks if won
    }
  
    //assign functions to keyCodes
    function control(e) {
      if(e.keyCode === 37) {// 37 is the code for left arrow
        keyLeft()
      } else if (e.keyCode === 38) {// 38 is the key for up arrow
        keyUp()
      } else if (e.keyCode === 39) {//39 is the code for right arrow in keyboard
        keyRight()
      } else if (e.keyCode === 40) {//40 is the key for the down arrow
        keyDown()
      }
    }
    document.addEventListener('keyup', control)// invokes a control function
  
    function keyRight() {//function for pressing right arrow
      moveRight()
      combineRow()
      moveRight()
      generate()
    }
  
    function keyLeft() {// function for pressing left aroow
      moveLeft()
      combineRow()
      moveLeft()
      generate()
    }
  
    function keyUp() {//function for pressing the up arrow
      moveUp()
      combineColumn()
      moveUp()
      generate()
    }
  
    function keyDown() {//function for pressing the down arrow
      moveDown()
      combineColumn()
      moveDown()
      generate()
    }
  
    //check for the number 2048 in the squares to win
    function checkForWin() {
      for (let i=0; i < squares.length; i++) {
        if (squares[i].innerHTML == 2048) {
          resultDisplay.innerHTML = 'Yeah!!! Congratulations You WIN'
          document.removeEventListener('keyup', control)//disable key functions
          setTimeout(() => clear(), 3000)
        }
      }
    }
  
    //check if there are no zeros on the board to lose
    function checkForGameOver() {
      let zeros = 0
      for (let i=0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
          zeros++//increment of variable for number of zeros
        }
      }
      if (zeros === 0) {//condition check for zeros
        resultDisplay.innerHTML = 'Sorry You LOSE, Better Luck Next Time....'
        document.removeEventListener('keyup', control)//disable event listener
        setTimeout(() => clear(), 3000)
      }
    }
  
    //clear timer
    function clear() {
      clearInterval(myTimer)
    }
  
  
    //add colours
    function addColours() {
      for (let i=0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#06bb7f'
        else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#0adaf5'
        else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#06b2f7' 
        else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#0683f7da' 
        else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#0646f7da' 
        else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#060af7' 
        else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#2106bb' 
        else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#4506bb' 
        else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#6906bb' 
        else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '##8806bb' 
        else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#ac06bb' 
        else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0' 
      }
  }
  addColours()
  
  var myTimer = setInterval(addColours, 50)
  
  })
  