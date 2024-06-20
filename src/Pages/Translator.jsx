import React, { useState } from 'react'; // Importando React e o hook useState para gerenciar estados
import axios from 'axios'; // Importando axios para fazer requisições HTTP
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação entre páginas
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o CSS do Bootstrap
import Sidebar from '../Components/Cabecalho/index'; // Importando o componente Sidebar

function Translator() {
  const [inputText, setInputText] = useState(''); // Estado para armazenar o texto de entrada
  const [translatedText, setTranslatedText] = useState(''); // Estado para armazenar o texto traduzido
  const [targetLanguage, setTargetLanguage] = useState('en'); // Estado para armazenar o idioma alvo, padrão 'en' (inglês)
  const navigate = useNavigate(); // Função para navegar entre páginas

  const handleChange = (event) => { // Função para atualizar o estado inputText quando o texto de entrada é alterado
    setInputText(event.target.value); // Atualizando inputText com o valor do campo de texto
  };

  const handleTranslate = () => { // Função para traduzir o texto de entrada
    const systemMessage = // Mensagem do sistema baseada no idioma alvo usando operador ternário
      targetLanguage === 'en'
        ? 'você é um tradutor de português para inglês ou ao contrario, seja o mais prestativo e eficiente possível. É importante que me devolva apenas a tradução, nada mais que isso.'
        : 'you are a translator from English to Portuguese or vice versa, be as helpful and efficient as possible. It is important that you only give me back the translation, nothing more than that.';

    axios // Enviando uma requisição POST para a API da OpenAI usando axios
      .post(`${import.meta.env.VITE_AZURE_OPENAI_ENDPOINT}openai/deployments/TesteCopilot/chat/completions?api-version=2024-02-15-preview`, {
        'model': 'gpt-3.5-turbo',
        'messages': [
          {
            'role': 'system',
            'content': systemMessage, // Mensagem do sistema definida acima
          },
          {
            'role': 'user',
            'content': inputText, // Texto de entrada do usuário
          },
        ],
        'max_tokens': 800, // Número máximo de tokens na resposta
        'temperature': 0.7, // Temperatura para controle de criatividade
        'frequency_penalty': 0, // Penalidade de frequência para repetição de tokens
        'presence_penalty': 0, // Penalidade de presença para novos tópicos
        'top_p': 0.95, // Parâmetro de amostragem top-p
        'stop': null, // Sequência de parada, se houver
      }, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': `${import.meta.env.VITE_AZURE_OPENAI_API_KEY}` // Utilizando a chave de API definida no ambiente
        }
      })
      .then((response) => { // Tratando a resposta da requisição
        setTranslatedText(response.data.choices[0].message.content.trim()); // Atualizando translatedText com a tradução obtida da API
      })
      .catch((error) => { // Tratando erros caso ocorra algum problema na requisição
        console.error('Error:', error); // Registrando o erro no console
      });
    };

  const handleGoBack = () => { // Função para voltar para a página anterior
    navigate(-1); // Navegando para a página anterior
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex' }}> {/* Estrutura principal do componente */}
      <Sidebar /> {/* Renderizando o componente Sidebar */}
      <div className="container" style={{ marginLeft: '200px', padding: '20px' }}> {/* Div principal que centraliza o conteúdo */}
        <div className="row"> {/* Linha do Bootstrap para layout responsivo */}
          <div className="col-6"> {/* Coluna de 6 unidades no grid do Bootstrap */}
            <h1 className="d-inline-block mb-4">Tradutor</h1> {/* Título da aplicação */}
          </div>
          <div className="col-6 text-end"> {/* Coluna de 6 unidades alinhada à direita */}
            <button className="btn btn-secondary btn-md mt-2" onClick={handleGoBack}>Voltar</button> {/* Botão para voltar */}
          </div>
        </div>
        <div className="row"> {/* Outra linha do Bootstrap para layout responsivo */}
          <div className="col-md-6"> {/* Coluna de 6 unidades no grid do Bootstrap */}
            <div className="card shadow-sm mb-4"> {/* Cartão com sombra e margem inferior */}
              <div className="card-body text-center py-5"> {/* Corpo do cartão centralizado com padding vertical */}
                <h5 className="card-title">Selecione o idioma alvo:</h5> {/* Título do cartão */}
                <div className="mb-4"> {/* Div com margem inferior */}
                  <select
                    className="form-select"
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                  >
                    <option value="en">Inglês</option> {/* Opção para selecionar inglês */}
                    <option value="pt">Português</option> {/* Opção para selecionar português */}
                  </select>
                </div>
                <h5 className="card-title">Texto</h5> {/* Subtítulo para o campo de texto */}
                <textarea
                  className="form-control mb-3"
                  rows="6"
                  placeholder="Insira o texto"
                  value={inputText}
                  onChange={handleChange}
                ></textarea>
                <button className="btn btn-primary btn-lg btn-block" onClick={handleTranslate}>Traduzir</button> {/* Botão para traduzir */}
              </div>
            </div>
          </div>
          <div className="col-md-6"> {/* Segunda coluna de 6 unidades no grid do Bootstrap */}
            <div className="card shadow-sm mb-4"> {/* Cartão com sombra e margem inferior */}
              <div className="card-body py-5"> {/* Corpo do cartão com padding vertical */}
                <h5 className="card-title">Tradução</h5> {/* Subtítulo para a área de tradução */}
                <div className="translated-text p-5" style={{ backgroundColor: '#e9ecef', borderRadius: '0.25rem' }}> {/* Div para exibir a tradução com padding e borda arredondada */}
                  {translatedText ? <p>{translatedText}</p> : <p className="text-muted">A tradução aparecerá aqui</p>} {/* Exibição da tradução ou texto de placeholder */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translator; // Exportando o componente Translator
