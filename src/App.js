import React, { useState } from "react";
import { useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect( () => {
    api.get('repositories')
      .then ( response => {
        setRepositories(response.data);
      })
      .catch( error => {
        if (error.response.status === 404)
          alert('Erro ao LISTAR os repositórios!');
      });
  }, [] );

  async function handleAddRepository() {
    const repo = {
      title: "Desafio ReactJS",
      url: "https://github.com/users/leonardosposina",
      techs: ["JavaScript", "TypeScript", "ReactJS", "React Native", "Node.js"]
    };

    try {
      const response = await api.post('repositories', repo);
      setRepositories([ ...repositories, response.data]);
    } catch (error) {
      if (error.response.status === 404)
        alert('Erro ao CRIAR o repositório!');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const updatedRepositories = repositories.filter( repo => repo.id !== id );
      setRepositories(updatedRepositories);
    } catch (error) {
      if (error.response.status === 400)
        alert('Erro ao DELETAR o repositório!');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { 
          repositories.map( (repo) => {
            return (
              <li key={ repo.id }>
                { repo.title }
                <button onClick={ () => handleRemoveRepository(repo.id) }>
                Remover
                </button>
              </li>
            );
          })
        }
      </ul>
      <button onClick={ handleAddRepository }>Adicionar</button>
    </div>
  );
}

export default App;
