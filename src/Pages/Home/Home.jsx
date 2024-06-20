import React from 'react'; // Importação do React
import Sidebar from '../../Components/Cabecalho/index'; // Importação do componente Sidebar
import { FaImage, FaLanguage, FaTools } from 'react-icons/fa'; // Importação de ícones do React Icons
import './Home.css'; // Importação do arquivo CSS para estilização

function Home() { // Definição do componente Home
  return ( // Retorno do componente
    <div className="home-container"> {/* Container principal da página */}
      <Sidebar /> {/* Inclusão do componente Sidebar */}
      <div className="content-container"> {/* Container para o conteúdo principal */}
        <h1 className="title">Bem-vindo ao Portal de Ferramentas</h1> {/* Título da página */}
        <p className="subtitle">Explore nossas ferramentas incríveis para ajudar em suas tarefas diárias!</p> {/* Subtítulo da página */}
        <div className="tool-container"> {/* Container para os ícones das ferramentas */}
          <div className="tool-item"> 
            <FaImage className="tool-icon" /> {/* Ícone de Gerador de Imagens */}
            <p>Gerador de Imagens</p> 
          </div>
          <div className="tool-item"> 
            <FaLanguage className="tool-icon" /> {/* Ícone de Tradutor */}
            <p>Tradutor</p> 
          </div>
          <div className="tool-item"> 
            <FaTools className="tool-icon" /> {/* Ícone de Otimizador de Código */}
            <p>Otimizador de Código</p> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; // Exportação do componente Home
