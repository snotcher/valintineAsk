import React, { useState } from 'react';
import Confetti from 'react-confetti';
import Typewriter from 'typewriter-effect';
import './App.css';
import FallingHearts from './FallingHearts';

function App() {
  const [yesSize, setYesSize] = useState(1);
  const [noCount, setNoCount] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingText, setLoadingText] = useState("Processing answer...");
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // When "No" is clicked, make "Yes" bigger and change text!
  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setYesSize(yesSize * 1.5);
  };

  const handleYes = () => {
    setCurrentStep(7); // Go to loading screen

    // Simulate loading
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setProgress(p);

      if (p === 30) setLoadingText("Checking compatibility...");
      if (p === 70) setLoadingText("Soulmate match detected: 100%");

      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep(8); // Go to success screen
        }, 1000);
      }
    }, 40); // 4 seconds total
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Steps content
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="story-step" key={0}>
            <h1 className="story-text">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Hey...')
                    .pauseFor(1000)
                    .callFunction(() => {
                      // Show button after typing
                      document.getElementById('next-btn').style.opacity = 1;
                    })
                    .start();
                }}
                options={{
                  cursor: '',
                  delay: 75,
                }}
              />
            </h1>
            <button id="next-btn" className="next-button hidden-btn" onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 1:
        return (
          <div className="story-step" key={1}>
            <h1 className="story-text">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('I have something to ask you.')
                    .pauseFor(1000)
                    .callFunction(() => {
                      document.getElementById('next-btn').style.opacity = 1;
                    })
                    .start();
                }}
                options={{
                  cursor: '',
                  delay: 50,
                }}
              />
            </h1>
            <button id="next-btn" className="next-button hidden-btn" onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 2:
        return (
          <div className="story-step" key={2}>
            <h1 className="story-text">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('But before I ask...')
                    .pauseFor(1000)
                    .callFunction(() => {
                      document.getElementById('next-btn').style.opacity = 1;
                    })
                    .start();
                }}
                options={{
                  cursor: '',
                  delay: 50,
                }}
              />
            </h1>
            <button id="next-btn" className="next-button hidden-btn" onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 3:
        return (
          <div className="story-step emotional-build">
            <p className="fade-in-line" style={{ animationDelay: '0s' }}>You make my days better.</p>
            <button className="next-button fade-in-btn" style={{ animationDelay: '1.5s' }} onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 4:
        return (
          <div className="story-step emotional-build">
            <p className="fade-in-line" style={{ animationDelay: '0s' }}>You’re my favorite notification.</p>
            <button className="next-button fade-in-btn" style={{ animationDelay: '1.5s' }} onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 5:
        return (
          <div className="story-step emotional-build">
            <p className="fade-in-line" style={{ animationDelay: '0s' }}>You’re the best thing that happened to me.</p>
            <button className="next-button fade-in-btn" style={{ animationDelay: '1.5s' }} onClick={handleNextStep}>Continue</button>
          </div>
        );
      case 6:
        return (
          <div className="question-container fade-in-final">
            <img
              src={process.env.PUBLIC_URL + '/a21ab405465b371794a8aebd6c121a2d-removebg-preview.png'}
              alt="Cute bear"
              className="valentine-image"
            />
            <h1 className="main-question">Will you be my Valentine?</h1>
            <div className="buttons-container">
              <button
                className="yes-button"
                style={{ fontSize: `${yesSize}rem` }}
                onClick={handleYes}
              >
                Yes
              </button>
              <button className="no-button" onClick={handleNoClick}>
                {getNoButtonText()}
              </button>
            </div>
          </div>
        );
      case 7: // Fake Loading Screen
        return (
          <div className="loading-container">
            <h2 className="loading-text">{loadingText}</h2>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-percent">{progress}%</p>
          </div>
        );
      case 8: // Success Screen
        return (
          <div className="success-container fade-in-final">
            {/* Confetti Explosion */}
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
            <h1 className="success-message">YEEY 💘 You’re officially stuck with me.</h1>
            <div className="gif-container">
              <iframe src="https://giphy.com/embed/MDJ9IbxxvDUQM" width="480" height="351" frameBorder="0" className="giphy-embed" allowFullScreen title="love-gif"></iframe>
            </div>

            <div className="personalized-area">
              <p className="instruction">Write something sweet here:</p>
              <textarea
                className="love-note"
                placeholder="I love you because..."
              ></textarea>
            </div>

            <button className="screenshot-btn" onClick={() => alert("Take a screenshot now! 📸")}>
              Screenshot this & send to me 📸
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {!started ? (
        <button className="start-button" onClick={() => setStarted(true)}>
          Tap to Open 💌
        </button>
      ) : (
        <>
          {/* Background Music - Hidden/Autoplay */}
          <iframe
            src="https://www.youtube.com/embed/SOJpE1KMUbo?autoplay=1&loop=1&playlist=SOJpE1KMUbo&enablejsapi=1&playsinline=1"
            title="background-music"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              opacity: 0.01,
              pointerEvents: 'none'
            }}
          />

          {/* Falling Hearts Animation Background */}
          <FallingHearts />

          {renderStep()}
        </>
      )}
    </div>
  );
}

export default App;
