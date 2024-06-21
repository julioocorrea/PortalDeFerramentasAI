import React, { useState } from 'react';  // Importa o módulo React e o hook useState da biblioteca React.
import axios from 'axios';  // Importa a biblioteca axios para fazer requisições HTTP.
import { useNavigate } from 'react-router-dom';  // Importa o hook useNavigate da biblioteca react-router-dom para navegação programática.
import { BiArrowBack } from 'react-icons/bi';  // Importa o ícone BiArrowBack da biblioteca react-icons.
import { AiOutlineLoading3Quarters } from 'react-icons/ai';  // Importa o ícone AiOutlineLoading3Quarters da biblioteca react-icons.
import Sidebar from '../../Components/Cabecalho/Cabecalho';  // Importa o componente Sidebar de um caminho específico.
import './ImageGenerator.css';  // Importa um arquivo CSS específico para estilização do componente.
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa o arquivo CSS do Bootstrap para estilização global.

function ImageGenerator() {  // Define o componente funcional ImageGenerator.
  const [imageUrl, setImageUrl] = useState(null);  // Declara o estado imageUrl e a função setImageUrl para atualizá-lo.
  const [prompt, setPrompt] = useState('');  // Declara o estado prompt e a função setPrompt para atualizá-lo.
  const [isPromptFilled, setIsPromptFilled] = useState(false);  // Declara o estado isPromptFilled e a função setIsPromptFilled para atualizá-lo.
  const [isLoading, setIsLoading] = useState(false);  // Declara o estado isLoading e a função setIsLoading para atualizá-lo.
  const navigate = useNavigate();  // Obtém a função de navegação do react-router-dom.

  const handleChange = (event) => {  // Define a função handleChange para lidar com a mudança no input.
    const promptValue = event.target.value;  // Obtém o valor do input.
    setPrompt(promptValue);  // Atualiza o estado prompt com o valor do input.
    setIsPromptFilled(promptValue.trim().length > 0);  // Atualiza o estado isPromptFilled baseado se o prompt está preenchido.
  };

  const handleClick = () => {  // Define a função handleClick para lidar com o clique do botão.
    if (isPromptFilled) {  // Verifica se o prompt está preenchido.
      setIsLoading(true);  // Define o estado isLoading como verdadeiro.
      axios.post(`${import.meta.env.VITE_AZURE_OPENAI_ENDPOINT}openai/deployments/Dalle3/images/generations?api-version=2024-02-01`, {  // Faz uma requisição POST para a API do Azure OpenAI.
        'prompt': prompt,  // Envia o prompt na requisição.
        'n': 1,  // Define o número de imagens a serem geradas.
        'size': '1024x1024'  // Define o tamanho da imagem.
      }, {
        headers: {  // Define os cabeçalhos da requisição.
          'Content-Type': 'application/json',  // Define o tipo de conteúdo como JSON.
          'api-key': `${import.meta.env.VITE_AZURE_OPENAI_API_KEY}`  // Define a chave da API.
        }
      })
      .then(response => {  // Define a função a ser executada em caso de sucesso.
        setImageUrl(response.data.data[0].url);  // Atualiza o estado imageUrl com a URL da imagem gerada.
      })
      .catch(error => {  // Define a função a ser executada em caso de erro.
        console.error('Error:', error);  // Loga o erro no console.
      })
      .finally(() => {  // Define a função a ser executada após a conclusão da requisição.
        setIsLoading(false);  // Define o estado isLoading como falso.
      });
    }
  };

  const handleBack = () => {  // Define a função handleBack para lidar com o clique do botão de voltar.
    navigate('/');  // Navega para a página inicial.
  };

  return (  // Retorna o JSX para renderização do componente.
    <div className="app-container">  {/* Define um div com a classe "app-container". */}
      <Sidebar />  {/* Renderiza o componente Sidebar. */}
      <div className="content-container">  {/* Define um div com a classe "content-container". */}
        <div className="card position-relative">  {/* Define um div com as classes "card" e "position-relative". */}
          <button className="btn btn-secondary btn-lg rounded-circle position-absolute top-0 start-0 m-3" onClick={handleBack}>  {/* Define um botão com várias classes e um manipulador de clique. */}
            <div className="arrow-icon-container">  {/* Define um div com a classe "arrow-icon-container". */}
              <BiArrowBack />  {/* Renderiza o ícone BiArrowBack. */}
            </div>
          </button>
          <div className="card-body text-center">  {/* Define um div com as classes "card-body" e "text-center". */}
            <h1 className="card-title mb-4">Gerador de Imagens</h1>  {/* Define um título com as classes "card-title" e "mb-4". */}
            <div className="mb-3">  {/* Define um div com a classe "mb-3". */}
              <input type="text" className="form-control" placeholder="Digite o prompt" value={prompt} onChange={handleChange} />  {/* Define um input de texto com várias propriedades e eventos. */}
            </div>
            <div className="mb-4">  {/* Define um div com a classe "mb-4". */}
              {isLoading ? (  // Verifica se isLoading é verdadeiro.
                <button className="btn btn-lg btn-secondary" disabled>  {/* Renderiza um botão desativado com várias classes. */}
                  <AiOutlineLoading3Quarters className="spinner-animation" />  {/* Renderiza o ícone AiOutlineLoading3Quarters com animação de spinner. */}
                </button>
              ) : (  // Caso contrário, renderiza um botão ativado/desativado baseado em isPromptFilled.
                <button className={`btn ${isPromptFilled ? 'btn-success' : 'btn-secondary'} btn-lg image-generator-button`} onClick={handleClick} disabled={!isPromptFilled}>  {/* Define o botão com várias classes e eventos. */}
                  {isPromptFilled ? 'Gerar Imagem' : 'Preencha o Prompt'}  {/* Define o texto do botão baseado em isPromptFilled. */}
                </button>
              )}
            </div>
            {imageUrl && <img className="img-fluid generated-image" src={imageUrl} alt="Imagem Gerada" />}  {/* Renderiza a imagem gerada se imageUrl não for nulo. */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;  // Exporta o componente ImageGenerator como padrão.
