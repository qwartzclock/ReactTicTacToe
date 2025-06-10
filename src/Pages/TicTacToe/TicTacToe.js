import React, {useState} from "react"
import './TicTacToe.css'

function TicTacToe(props){
    let gameWidth = 3;
    let gameHeight = 3;
    let winLength = 3;

    let [cellStates, setCellStates] = useState(Array(gameWidth*gameHeight).fill(0));
    let [redTurn, setRedTurn] = useState(true);
    let [winner, setWinner] = useState(0);
    let tableRows = [];

    function updateBoard(cellId){
        setCellStates((cellStates)=>{
            let states2 = [...cellStates]
            states2[cellId] = redTurn ? 1 : 2;
            setWinner(checkWinCondition(states2));
            return states2;
        });
        
        setRedTurn((redTurn) => !redTurn)
    }

    function checkWinCondition(boardState){
        
        for (let cellId = 0; cellId < boardState.length; cellId++) {
            let cellOwner = boardState[cellId];
            if (cellOwner !== 0) {
                if (cellId%gameWidth+winLength >= gameWidth){
                    // check horizontal from cell
                    let hasHorizontalWin = true;
                    for (let i = 1; i < winLength; i++) {
                        hasHorizontalWin = hasHorizontalWin && boardState[cellId+i]===cellOwner;
                    }
                    if (hasHorizontalWin) return cellOwner;
                }
                
                if (cellId/gameWidth+winLength >= gameHeight){
                    //check vertical from cell
                    let hasVerticalWin = true;
                    for (let i = 0; i < winLength; i++) {
                        hasVerticalWin = hasVerticalWin && boardState[cellId+gameWidth*i]===cellOwner;
                    }
                    if (hasVerticalWin) return cellOwner;
                }
                
                if (cellId/gameWidth+winLength >= gameHeight && cellId%gameWidth+winLength >= gameWidth){
                    //check diagonal-right from cell
                    let hasDiagonalWin = true;
                    for (let i = 0; i < winLength; i++) {
                        hasDiagonalWin = hasDiagonalWin && boardState[cellId+gameWidth*i+i]===cellOwner;
                    }
                    if (hasDiagonalWin) return cellOwner;
                }
                
                if (cellId/gameWidth+winLength >= gameHeight && cellId%gameWidth-winLength >= -1){
                    //check diagonal-left from cell
                    let hasDiagonalWin = true;
                    for (let i = 0; i < winLength; i++) {
                        hasDiagonalWin = hasDiagonalWin && boardState[cellId+gameWidth*i-i]===cellOwner;
                    }
                    if (hasDiagonalWin) return cellOwner;
                }
            }
        }
        return 0;
    }

    let onClickCell = (event) => {
        let cellId = event.currentTarget.id;
        if (cellStates[cellId] === 0 && winner === 0){
            updateBoard(cellId)
        }
    }
    let resetBoard = () =>{
        setCellStates(cellStates.map(cell=>cell=0));
        setRedTurn(true);
        setWinner(0);
    }

    let cellId = 0;    
    let rowCells = [];
    cellStates.forEach(cell => {

        rowCells.push(<td id={cellId} class={"state"+cell} onClick={(e)=>onClickCell(e)} />)

        cellId++;
        if (rowCells.length === gameWidth){
            tableRows.push(<tr>{rowCells}</tr>);
            rowCells = [];
        }
    });


    let gameText = <h3>It is {redTurn ? "Red's" : "Blue's"} turn to go!</h3>
    if (winner !== 0) {
        gameText = <h3>The winner is {winner===1? "Red!":"Blue!"}</h3>
    }


    return (
        <>
        <h1>Tic Tac Toe!</h1>
        {gameText}
        <table><tbody>{tableRows}</tbody></table>

        <button onClick={resetBoard}>Reset game!</button>

        </>
    )
}


export default TicTacToe