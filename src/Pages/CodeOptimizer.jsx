import React, { useState } from 'react'; // Importando o React e o hook useState para gerenciar estados
import axios from 'axios'; // Importando o axios para fazer requisições HTTP
import { Link } from 'react-router-dom'; // Importando o Link para navegação dentro da aplicação
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o CSS do Bootstrap
import Sidebar from '../Components/Cabecalho/Cabecalho'; // Importação do componente Sidebar

function CodeOptimizer() {
  // Definição de três estados utilizando o useState: instructions, code e optimizedCode
  const [instructions, setInstructions] = useState('');
  const [code, setCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');

  // Função handleOptimize responsável por otimizar o código
  const handleOptimize = () => {
    // Criação de uma string prompt com instruções
    const prompt = 'Você é um otimizador de código em qualquer linguagem de programação, realize as instruções que são passadas a você juntamente com o código.';
    // Criação de uma string metaPrompt que inclui as instruções e o código
    const metaPrompt = `${prompt}\n\nInstruções: ${instructions}\n\nCódigo:\n${code}`;

    // Requisição POST para o endpoint da API da OpenAI usando axios
    axios.post(`${import.meta.env.VITE_AZURE_OPENAI_ENDPOINT}openai/deployments/TesteCopilot/chat/completions?api-version=2024-02-15-preview`, {
        'model': 'gpt-3.5-turbo',
        'messages': [
        {
          'role': 'system',
          'content': prompt
        },
        {
          'role': 'user',
          'content': metaPrompt
        }
      ],
      'max_tokens': 800,
      'temperature': 0.7,
      'frequency_penalty': 0,
      'presence_penalty': 0,
      'top_p': 0.95,
      'stop': null
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': `${import.meta.env.VITE_AZURE_OPENAI_API_KEY}` // Utilização da chave de API definida no ambiente
      }
    })
    .then(response => {
      // Definição do código otimizado com base na resposta da requisição
      setOptimizedCode(response.data.choices[0].message.content.trim());
    })
    .catch(error => {
      // Tratamento de erros caso ocorra algum problema na requisição
      console.error('Error:', error);
    });
  };

  return (
    // Elemento JSX representando a estrutura do componente
    <div className="app-container" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex' }}>
      <Sidebar /> {/* Renderizando o componente Sidebar */}
      <div className="container" style={{ padding: '20px', flex: 1, marginLeft: '200px' }}> {/* Div principal que contém o conteúdo da página */}
        <div className="row align-items-center mb-4"> {/* Linha do Bootstrap para alinhar itens verticalmente */}
          <div className="col-6">
            <h1 className="mt-4">Otimizador De Códigos</h1> {/* Título da página */}
          </div>
          <div className="col-6 text-end">
            <Link to="/" className="btn btn-secondary mt-4">Voltar</Link> {/* Botão para retornar à página anterior */}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label"><strong>Instruções:</strong></label> {/* Rótulo para o campo de instruções */}
          <input
            type="text"
            className="form-control"
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)} // Função de callback para atualizar o estado 'instructions'
            placeholder="Descreva as instruções para otimizar o código" // Placeholder para o campo de instruções
          />
        </div>
        <div className="mb-3">
          <label htmlFor="code" className="form-label"><strong>Código:</strong></label> {/* Rótulo para o campo de código */}
          <textarea
            className="form-control"
            id="code"
            rows="6"
            value={code}
            onChange={(e) => setCode(e.target.value)} // Função de callback para atualizar o estado 'code'
            placeholder="Cole o código que deseja otimizar aqui" // Placeholder para o campo de código
          ></textarea>
        </div>
        <button className="btn btn-dark btn-lg d-block mx-auto" onClick={handleOptimize}>Otimizar Código</button> {/* Botão para chamar a função de otimização */}
        <div className="mt-3">
          <label htmlFor="optimizedCode" className="form-label"><strong>Código Otimizado:</strong></label> {/* Rótulo para o campo de código otimizado */}
          <textarea
            className="form-control"
            id="optimizedCode"
            rows="18"
            value={optimizedCode}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );  
}

export default CodeOptimizer; // Exportação do componente
