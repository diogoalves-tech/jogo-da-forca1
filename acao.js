
// Lista de palavras com categorias e dicas
const palavras = [
    { palavra: "javascript", categoria: "Tecnologia", dica: "Linguagem usada para criar interatividade em páginas web." },
    { palavra: "internet", categoria: "Tecnologia", dica: "Rede mundial que conecta computadores." },
    { palavra: "navegador", categoria: "Tecnologia", dica: "Programa usado para acessar sites." },
    { palavra: "computador", categoria: "Tecnologia", dica: "Máquina que processa informações." },
    { palavra: "teclado", categoria: "Tecnologia", dica: "Periférico usado para digitar." },
    { palavra: "girafa", categoria: "Animais", dica: "Animal conhecido pelo pescoço comprido." },
    { palavra: "tartaruga", categoria: "Animais", dica: "Réptil que possui casco." },
    { palavra: "golfinho", categoria: "Animais", dica: "Mamífero marinho inteligente." },
    { palavra: "borboleta", categoria: "Animais", dica: "Inseto que passa por metamorfose." },
    { palavra: "elefante", categoria: "Animais", dica: "Grande mamífero que possui tromba." },
    { palavra: "abacaxi", categoria: "Alimentos", dica: "Fruta tropical com coroa de folhas." },
    { palavra: "morango", categoria: "Alimentos", dica: "Fruta vermelha muito usada em sobremesas." },
    { palavra: "chocolate", categoria: "Alimentos", dica: "Doce feito a partir do cacau." },
    { palavra: "brasilia", categoria: "Cidades", dica: "Capital do Brasil." },
    { palavra: "recife", categoria: "Cidades", dica: "Capital de Pernambuco." },
    { palavra: "campina", categoria: "Cidades", dica: "Palavra que inicia o nome de uma cidade paraibana." }
  ];
  
  // Elementos do HTML
  const elementoPalavra = document.getElementById("palavra");
  const elementoTentativas = document.getElementById("tentativas");
  const inputLetra = document.getElementById("letra");
  const mensagem = document.getElementById("mensagem");
  const elementoLetrasUsadas = document.getElementById("letras-usadas");
  const elementoCategoria = document.getElementById("categoria");
  const elementoDica = document.getElementById("dica");
  const elementoVidas = document.getElementById("vidas");
  
  const botaoTentar = document.getElementById("btn-tentar");
  const botaoReiniciar = document.getElementById("btn-reiniciar");
  const seletorDificuldade = document.getElementById("dificuldade");
  
  // Variáveis do jogo
  let palavraSecreta;
  let letrasCorretas = [];
  let letrasUsadas = [];
  let tentativas = 6;
  let partidaFinalizada = false;
  
  let partidas = 0;
  let vitorias = 0;
  let derrotas = 0;
  
  // Tentativas de acordo com a dificuldade
  const tentativasPorNivel = {
    facil: 8,
    medio: 6,
    dificil: 4
  };
  
  // Remove acentos
  function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  // Inicia uma nova partida
  function iniciarJogo() {
    const indice = Math.floor(
      Math.random() * palavras.length
    );
  
    const escolhida = palavras[indice];
  
    palavraSecreta = normalizar(
      escolhida.palavra
    ).toLowerCase();
  
    tentativas = tentativasPorNivel[
      seletorDificuldade.value
    ];
  
    letrasCorretas = [];
    letrasUsadas = [];
    partidaFinalizada = false;
  
    elementoCategoria.textContent = escolhida.categoria;
    elementoDica.textContent = escolhida.dica;
  
    mensagem.textContent =
      "Boa sorte! Escolha uma letra para começar.";
  
    mensagem.className = "mensagem";
  
    elementoTentativas.textContent = tentativas;
  
    elementoLetrasUsadas.textContent =
      "Nenhuma letra ainda";
  
    inputLetra.disabled = false;
    botaoTentar.disabled = false;
  
    inputLetra.value = "";
  
    atualizarPalavra();
    atualizarVidas();
  
    inputLetra.focus();
  }
  
  // Mostra as letras descobertas
  function atualizarPalavra() {
    let exibicao = "";
  
    for (
      let i = 0;
      i < palavraSecreta.length;
      i++
    ) {
      const letra = palavraSecreta[i];
  
      if (letrasCorretas.includes(letra)) {
        exibicao += letra.toUpperCase() + " ";
      } else {
        exibicao += "_ ";
      }
    }
  
    elementoPalavra.textContent = exibicao.trim();
  }
  
  // Atualiza os símbolos das tentativas
  function atualizarVidas() {
    let exibicao = "";
  
    for (let i = 0; i < tentativas; i++) {
      exibicao += "● ";
    }
  
    for (
      let i = tentativas;
      i < tentativasPorNivel[seletorDificuldade.value];
      i++
    ) {
      exibicao += '<span class="perdida">●</span> ';
    }
  
    elementoVidas.innerHTML = exibicao.trim();
  
    elementoVidas.setAttribute(
      "aria-label",
      tentativas + " tentativas restantes"
    );
  }
  
  // Mostra as letras utilizadas
  function atualizarLetrasUsadas() {
    if (letrasUsadas.length === 0) {
      elementoLetrasUsadas.textContent =
        "Nenhuma letra ainda";
      return;
    }
  
    elementoLetrasUsadas.innerHTML =
      letrasUsadas.map(letra => {
        const classe = palavraSecreta.includes(letra)
          ? "letra-certa"
          : "letra-errada";
  
        return `<span class="${classe}">${letra.toUpperCase()}</span>`;
      }).join(" · ");
  }
  
  // Verifica se todas as letras foram descobertas
  function venceu() {
    for (
      let i = 0;
      i < palavraSecreta.length;
      i++
    ) {
      const letra = palavraSecreta[i];
  
      if (!letrasCorretas.includes(letra)) {
        return false;
      }
    }
  
    return true;
  }
  
  // Finaliza a partida
  function finalizarJogo(ganhou) {
    partidaFinalizada = true;
  
    partidas++;
  
    if (ganhou) {
      vitorias++;
  
      mensagem.textContent =
        "Parabéns! Você venceu!";
  
      mensagem.className = "mensagem sucesso";
  
    } else {
      derrotas++;
  
      mensagem.textContent =
        "Fim de jogo! A palavra era: " +
        palavraSecreta.toUpperCase() + ".";
  
      mensagem.className = "mensagem erro";
  
      letrasCorretas = [...new Set(palavraSecreta)];
  
      atualizarPalavra();
    }
  
    document.getElementById("partidas").textContent =
      partidas;
  
    document.getElementById("vitorias").textContent =
      vitorias;
  
    document.getElementById("derrotas").textContent =
      derrotas;
  
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
  }
  
  // Verifica a letra digitada
  function verificarLetra() {
    if (partidaFinalizada) {
      return;
    }
  
    const digitada = normalizar(
      inputLetra.value.trim()
    ).toLowerCase();
  
    // Verifica se o campo está vazio
    if (digitada === "") {
      mensagem.textContent = "Digite uma letra.";
      mensagem.className = "mensagem erro";
      inputLetra.focus();
      return;
    }
  
    // Aceita somente uma letra
    if (!/^[a-z]$/.test(digitada)) {
      mensagem.textContent =
        "Digite apenas uma letra de A a Z.";
  
      mensagem.className = "mensagem erro";
      inputLetra.value = "";
      inputLetra.focus();
      return;
    }
  
    // Impede letras repetidas
    if (letrasUsadas.includes(digitada)) {
      mensagem.textContent =
        "Você já utilizou essa letra. Tente outra!";
  
      mensagem.className = "mensagem erro";
      inputLetra.value = "";
      inputLetra.focus();
      return;
    }
  
    // Armazena a letra utilizada
    letrasUsadas.push(digitada);
  
    // Verifica se a letra existe na palavra
    if (palavraSecreta.includes(digitada)) {
      letrasCorretas.push(digitada);
  
      mensagem.textContent =
        "Muito bem! Você acertou!";
  
      mensagem.className = "mensagem sucesso";
  
    } else {
      tentativas--;
  
      mensagem.textContent =
        "Essa letra não aparece na palavra.";
  
      mensagem.className = "mensagem erro";
    }
  
    // Atualiza as informações na tela
    atualizarPalavra();
    atualizarLetrasUsadas();
  
    elementoTentativas.textContent = tentativas;
  
    atualizarVidas();
  
    inputLetra.value = "";
  
    // Verifica vitória ou derrota
    if (venceu()) {
      finalizarJogo(true);
  
    } else if (tentativas === 0) {
      finalizarJogo(false);
  
    } else {
      inputLetra.focus();
    }
  }
  
  // Evento do botão Tentar
  botaoTentar.addEventListener(
    "click",
    verificarLetra
  );
  
  // Evento do botão Nova partida
  botaoReiniciar.addEventListener(
    "click",
    iniciarJogo
  );
  
  // Permite jogar pressionando Enter
  inputLetra.addEventListener(
    "keydown",
    function(evento) {
      if (evento.key === "Enter") {
        verificarLetra();
      }
    }
  );
  
  // Reinicia quando a dificuldade muda
  seletorDificuldade.addEventListener(
    "change",
    iniciarJogo
  );
  
  // Inicia o jogo automaticamente
  iniciarJogo();
  