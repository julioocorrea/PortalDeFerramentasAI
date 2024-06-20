import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Sidebar from '../../Components/Cabecalho/index';
import './ImageGenerator.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isPromptFilled, setIsPromptFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const promptValue = event.target.value;
    setPrompt(promptValue);
    setIsPromptFilled(promptValue.trim().length > 0);
  };

  const handleClick = () => {
    if (isPromptFilled) {
      setIsLoading(true);
      axios.post(`${import.meta.env.VITE_AZURE_OPENAI_ENDPOINT}openai/deployments/Dalle3/images/generations?api-version=2024-02-01`, {
        'prompt': prompt,
        'n': 1,
        'size': '1024x1024'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': `${import.meta.env.VITE_AZURE_OPENAI_API_KEY}`
        }
      })
      .then(response => {
        setImageUrl(response.data.data[0].url);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <div className="card position-relative">
          <button className="btn btn-secondary btn-lg rounded-circle position-absolute top-0 start-0 m-3" onClick={handleBack}>
            <div className="arrow-icon-container">
              <BiArrowBack />
            </div>
          </button>
          <div className="card-body text-center">
            <h1 className="card-title mb-4">Gerador de Imagens</h1>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Digite o prompt" value={prompt} onChange={handleChange} />
            </div>
            <div className="mb-4">
              {isLoading ? (
                <button className="btn btn-lg btn-secondary" disabled>
                  <AiOutlineLoading3Quarters className="spinner-animation" />
                </button>
              ) : (
                <button className={`btn ${isPromptFilled ? 'btn-success' : 'btn-secondary'} btn-lg image-generator-button`} onClick={handleClick} disabled={!isPromptFilled}>
                  {isPromptFilled ? 'Gerar Imagem' : 'Preencha o Prompt'}
                </button>
              )}
            </div>
            {imageUrl && <img className="img-fluid generated-image" src={imageUrl} alt="Imagem Gerada" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
