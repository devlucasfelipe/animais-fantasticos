/* eslint-disable comma-dangle */
import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  // Cria a div contendo informacoes com o total de animais
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  // Preenche cada animal no DOM
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  // Anima os numeros de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  }

  // Puxa os animais atravez de um arquivo json
  // e cria cada animal utilizando createAnimais
  async function criarAnimais() {
    try {
      // fetch e espera resposta
      // e trasforma a resposta em json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      // Apos a transformacao de json, ativa as funcoes
      // Para preencher e animar os numeros
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
