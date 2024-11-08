import React, { useState } from 'react';
import './App.css';

function App() {
    const [secretNumber, setSecretNumber] = useState(Math.trunc(Math.random() * 20) + 1);
    const [score, setScore] = useState(10 );
    const [highscore, setHighscore] = useState(0);
    const [message, setMessage] = useState('Start guessing...');
    const [guess, setGuess] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#333');

    const displayMessage = (message) => {
        setMessage(message);
    };

    const handleCheck = () => {
        const guessedNumber = Number(guess);
        if (!guessedNumber) {
            displayMessage('⛔️ No number!');
        } else if (guessedNumber === secretNumber) {
            displayMessage('🎉 Correct Number!');
            setBackgroundColor('#60b347'); // Change background to green
            if (score > highscore) {
                setHighscore(score);
            }
        } else if (guessedNumber !== secretNumber) {
            if (score > 1) {
                displayMessage(guessedNumber > secretNumber ? '📈 Too high!' : '📉 Too low!');
                setScore(score - 1);
            } else {
                displayMessage('💥 You lost the game!');
                setScore(0);
            }
        }
    };

    const handleAgain = () => {
        setScore(20);
        setSecretNumber(Math.trunc(Math.random() * 20) + 1);
        setGuess('');
        displayMessage('Start guessing...');
        setBackgroundColor('#333');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCheck();
        }
    };

    return (
        <div className="App" style={{ backgroundColor: backgroundColor }}>
            <header>
                <h1>Guess My Number!</h1>
                <p className="between">(Between 1 and 20)</p>
                <button className="btn again" onClick={handleAgain}>Again!</button>
                <div className="number">{score > 0 && message === '🎉 Correct Number!' ? secretNumber : '?'}</div>
            </header>
            <main>
                <section className="left">
                    <input
                        type="number"
                        className="guess"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        onKeyDown={handleKeyPress}  
                    />
                    <button className="btn check" onClick={handleCheck}>Check!</button>
                </section>
                <section className="right">
                    <p className="message">{message}</p>
                    <p className="label-score">💯 Score: <span className="score">{score}</span></p>
                    <p className="label-highscore">🥇 Highscore: <span className="highscore">{highscore}</span></p>
                </section>
            </main>
        </div>
    );
}

export default App;
