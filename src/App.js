import React, { useState } from 'react';
import './App.css';
import { SageMakerRuntimeClient, InvokeEndpointCommand } from '@aws-sdk/client-sagemaker-runtime';

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Amharic');
  const [translationModel, setTranslationModel] = useState('Basic Model');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const accessKey = 'YOUR_ACCESS_KEY';
  const secretKey = 'YOUR_SECRET_KEY';
  const region = 'us-west-2';
 
  const client = new SageMakerRuntimeClient({
    region: region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });


  const sendRequestToSageMaker = async (endpointName, inputText) => {
    const params = {
      EndpointName: endpointName,
      ContentType: 'application/json',
      Accept: 'application/json',
      Body: JSON.stringify({ input: inputText }),
    };

    try {
      const command = new InvokeEndpointCommand(params);
      const response = await client.send(command);
      const responseBody = JSON.parse(new TextDecoder('utf-8').decode(response.Body));
      if (responseBody.translations && responseBody.translations.length > 0) {
        return responseBody.translations[0];
      } else {
        throw new Error('No translations found in response');
      }
    } catch (error) {
      console.error('Error sending request to SageMaker:', error);
      return `Error: ${error.message}`;
    }    
  };

  const handleTranslation = async () => {
    const englishAmharicBaseModelEndpoint = 'english-amharic-base-model';
    const amharicEnglishBaseModelEndpoint = 'amharic-english-base-model';
    const englishAmharicBertModelEndpoint = 'english-amharic-bert-fused-model';
    const amharicEnglishBertModelEndpoint = 'amharic-english-bert-fused-model';
    const englishAmharicCtnmtModelEndpoint = 'english-amharic-ctnmt-model';

    let endpointName = '';
    let simulatedResponse = '';
    let actualResponse = '';

    if (translationModel === 'Basic Model') {
      endpointName = sourceLanguage === 'English' && targetLanguage === 'Amharic' ? englishAmharicBaseModelEndpoint : amharicEnglishBaseModelEndpoint;
    } else if (translationModel === 'BERT Model') {
      endpointName = sourceLanguage === 'English' && targetLanguage === 'Amharic' ? englishAmharicBertModelEndpoint : amharicEnglishBertModelEndpoint;
    } else if (translationModel === 'CTNMT Model') {
      endpointName = sourceLanguage === 'English' && targetLanguage === 'Amharic' ? englishAmharicCtnmtModelEndpoint : null;
    }

    if (endpointName) {
      actualResponse = await sendRequestToSageMaker(endpointName, inputText);
      simulatedResponse = `Translated (${translationModel}): ${actualResponse}`;
    } else {
      simulatedResponse = `Translation model or language pair not supported.`;
    }

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