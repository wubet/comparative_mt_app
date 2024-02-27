import React, { useState } from 'react';
import './App.css';


function App() {
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Amharic');
  const [translationModel, setTranslationModel] = useState('Basic Model');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

   // Simulated function for sending request to SageMaker endpoint
   const sendRequestToSageMaker = async (url, inputText) => {
    // Simulate sending request to the URL with inputText
    console.log(`Sending request to URL: ${url} with text: ${inputText}`);
    // Simulate API response
    return `Simulated translation of "${inputText}"`;
  };

  // Dummy function for handling translation
  const handleTranslation = async () => {
    let englishAmharicBaseModelUrl = 'https://dummy-sagemaker-endpoint.com/english-amharic-basic';
    let amharicEnglishBaseModelUrl = 'https://dummy-sagemaker-endpoint.com/amharic-english-basic';
    let englishAmharicBertModelUrl = 'https://dummy-sagemaker-endpoint.com/english-amharic-bert';
    let amharicEnglishBertModelUrl = 'https://dummy-sagemaker-endpoint.com/amharic-english-bert';
    let englishAmharicCtnmtModelUrl = 'https://dummy-sagemaker-endpoint.com/english-amharic-ctnmt';
    let amharicEnglishCtnmtModelUrl = 'https://dummy-sagemaker-endpoint.com/amharic-english-ctnmt';

    let url = '';
    let simulatedResponse = '';

    if (translationModel === 'Basic Model') {
      url = sourceLanguage === 'English' && targetLanguage === 'Amharic' ? englishAmharicBaseModelUrl : amharicEnglishBaseModelUrl;
    } else if (translationModel === 'BERT Model') {
      url = sourceLanguage === 'English' && targetLanguage === 'Amharic' ? englishAmharicBertModelUrl : amharicEnglishBertModelUrl;
    } else if (translationModel === 'CTNMT Model') {
      url = sourceLanguage === 'English' && targetLanguage === 'Amharic' ? englishAmharicCtnmtModelUrl : amharicEnglishCtnmtModelUrl;
    }

    // Invoke the simulated request function
    if (url) {
      simulatedResponse = await sendRequestToSageMaker(url, inputText);
      simulatedResponse = `Translated (${translationModel}): ${simulatedResponse}`;
    } else {
      simulatedResponse = `Translation model or language pair not supported.`;
      simulatedResponse = `Translated (${translationModel}): ${simulatedResponse}`;
    }

    // Update the state with the simulated response
    setTranslatedText(simulatedResponse);
    
  };

  return (
    <div className="App">
      <h1>COMPARATIVE MACHINE TRANSLATION APP</h1>
      <div className="translation-section">
        <div className="model-select-container">
          <select value={translationModel} onChange={e => setTranslationModel(e.target.value)} className="model-select">
            <option value="Basic Model">Basic Model</option>
            <option value="BERT Model">BERT Model</option>
            <option value="CTNMT Model">CTNMT Model</option>
          </select>
        </div>
        <div className="input-section">
          <select value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Amharic">Amharic</option>
          </select>
          <textarea value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Enter text to translate"></textarea>
          <button onClick={handleTranslation}>Translate</button>
        </div>
        <div className="output-section">
          <select value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Amharic">Amharic</option>
          </select>
          <textarea value={translatedText} readOnly></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
