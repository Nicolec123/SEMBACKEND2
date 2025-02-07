


//Função para validar CPF
function validarCpf(cpf) {
    cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  }
  
  // Função para validar CNPJ
  function validarCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
    if (cnpj.length !== 14) return false;
  
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
  
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;
  
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
  
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  
  
    
  }
async function realizarLogin() {
    const loginUrl = "https://cors-anywhere.herokuapp.com/https://api.jae.com.br/autenticacao";
    //const loginUrl = "https://api.jae.com.br/autenticacao"; // Caso queira testar sem proxy

    const credenciais = {
        usuario: "08655788000186",
        senha: "#Trocar123",
    };

    console.log("🚀 Iniciando login...");
    console.log("🔗 URL da requisição:", loginUrl);
    console.log("📩 Corpo da requisição:", credenciais);

    // Validação de CNPJ antes de prosseguir
    if (!validarCnpj(credenciais.usuario)) {
        console.error("❌ CNPJ inválido!");
        alert("CNPJ inválido. Verifique os dados, retire(.,/, -) e tente novamente.");
        return;
    }

    try {
        const response = await fetch(loginUrl, {
            method: "POST",
            mode: "cors",  // Garante que o navegador aceite CORS
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", 
            },
            body: JSON.stringify(credenciais),
        });

        console.log("📡 Resposta recebida:");
        console.log("📌 Status HTTP:", response.status);
        console.log("📌 Headers:", [...response.headers]);

        if (!response.ok) {
            console.error(`⚠️ Erro na autenticação. Status: ${response.status}`);
            throw new Error(`Erro ao autenticar: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("📨 Resposta JSON recebida:", data);

        if (data.token) {
            console.log("✅ Token obtido com sucesso:", data.token);
            return data.token;
        } else {
            console.warn("⚠️ Token não encontrado na resposta.");
            throw new Error("Token não encontrado na resposta.");
        }
    } catch (error) {
        console.error("🚨 Erro ao autenticar:", error);
        alert(`Erro ao autenticar: ${error.message}`);
        throw error;
    }
}
  
  // Chave privada em formato PEM
  const privateKeyPem = `
  -----BEGIN PRIVATE KEY-----
  MIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDpLtqxS7OrlD/d
  T2tuz4+QNUh2OCa2Bat4bmpY+wL3FdkqIxXUCJX0tfKpCwBikKoQMzddt+ZmoZvj
  zIuFv9eploqBJhoL+HYOMzuWCshACn33TZGvx9SYs3aK+vm2cvFRQ6cw5zZJC2v1
  2DNM41hblm7c/DK8BaTkPq54hSEu1jOlwH562g10vcivbvjoojL9VSwPAAzt2Gup
  IrxTbEUIaVq7iKQ5O2/MOjCcAwcyt8TurUHpZlAMBCUGbFFCzIqWfkMiwq/rFq42
  wdGAEApy1TFkbwzhAkjHdLoC6CF3dFkLgJrkB7193wvyaU1gEKtCE5nt1LR/hq3h
  quUtxqO3AgMBAAECggEBANX6C+7EA/TADrbcCT7fMuNnMb5iGovPuiDCWc6bUIZC
  Q0yac45l7o1nZWzfzpOkIprJFNZoSgIF7NJmQeYTPCjAHwsSVraDYnn3Y4d1D3tM
  5XjJcpX2bs1NactxMTLOWUl0JnkGwtbWp1Qq+DBnMw6ghc09lKTbHQvhxSKNL/0U
  C+YmCYT5ODmxzLBwkzN5RhxQZNqol/4LYVdji9bS7N/UITw5E6LGDOo/hZHWqJsE
  fgrJTPsuCyrYlwrNkgmV2KpRrGz5MpcRM7XHgnqVym+HyD/r9E7MEFdTLEaiiHcm
  Ish1usJDEJMFIWkF+rnEoJkQHbqiKlQBcoqSbCmoMWECgYEA/4379mMPF0JJ/EER
  4VH7/ZYxjdyphenx2VYCWY/uzT0KbCWQF8KXckuoFrHAIP3EuFn6JNoIbja0NbhI
  HGrU29BZkATG8h/xjFy/zPBauxTQmM+yS2T37XtMoXNZNS/ubz2lJXMOapQQiXVR
  l/tzzpyWaCe9j0NT7DAU0ZFmDbECgYEA6ZbjkcOs2jwHsOwwfamFm4VpUFxYtED7
  9vKzq5d7+Ii1kPKHj5fDnYkZd+mNwNZ02O6OGxh40EDML+i6nOABPg/FmXeVCya9
  Vump2Yqr2fAK3xm6QY5KxAjWWq2kVqmdRmICSL2Z9rBzpXmD5o06y9viOwd2bhBo
  0wB02416GecCgYEA+S/ZoEa3UFazDeXlKXBn5r2tVEb2hj24NdRINkzC7h23K/z0
  pDZ6tlhPbtGkJodMavZRk92GmvF8h2VJ62vAYxamPmhqFW5Qei12WL+FuSZywI7F
  q/6oQkkYT9XKBrLWLGJPxlSKmiIGfgKHrUrjgXPutWEK1ccw7f10T2UXvgECgYEA
  nXqLa58G7o4gBUgGnQFnwOSdjn7jkoppFCClvp4/BtxrxA+uEsGXMKLYV75OQd6T
  IhkaFuxVrtiwj/APt2lRjRym9ALpqX3xkiGvz6ismR46xhQbPM0IXMc0dCeyrnZl
  QKkcrxucK/Lj1IBqy0kVhZB1IaSzVBqeAPrCza3AzqsCgYEAvSiEjDvGLIlqoSvK
  MHEVe8PBGOZYLcAdq4YiOIBgddoYyRsq5bzHtTQFgYQVK99Cnxo+PQAvzGb+dpjN
  /LIEAS2LuuWHGtOrZlwef8ZpCQgrtmp/phXfVi6llcZx4mMm7zYmGhh2AsA9yEQc
  acgc4kgDThAjD7VlXad9UHpNMO8=
  -----END PRIVATE KEY-----
  `.trim();
  
  // Cabeçalho do JWT
  const header = {
    alg: "RS256",
    typ: "JWT"
  };
  
  // Função para converter uma string em ArrayBuffer
  function stringToArrayBuffer(str) {
    return new TextEncoder().encode(str);
  }
  
  // Função para importar chave privada
  async function importPrivateKey(pemKey) {
    try {
      const key = pemKey
        .replace(/-----BEGIN PRIVATE KEY-----/, "")
        .replace(/-----END PRIVATE KEY-----/, "")
        .replace(/\n/g, "");
  
      const binaryDer = Uint8Array.from(atob(key), char => char.charCodeAt(0));
  
      return crypto.subtle.importKey(
        "pkcs8",
        binaryDer.buffer,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["sign"]
      );
    } catch (error) {
      console.error("Erro ao importar a chave privada:", error);
      throw new Error("Erro ao configurar a chave de autenticação.");
    }
  }
  
  // Função para criar JWT assinado
  async function createJwt(cnpj, cpfs) {
    try {
      const privateKey = await importPrivateKey(privateKeyPem);
  
      const base64UrlEncode = str =>
        btoa(String.fromCharCode(...new Uint8Array(str)))
          .replace(/=/g, "")
          .replace(/\+/g, "-")
          .replace(/\//g, "_");
  
          const encodedHeader = base64UrlEncode(stringToArrayBuffer(JSON.stringify(header)));
          console.log("Cabeçalho codificado:", encodedHeader);
      
          // Construção do payload
          const payload = {
            documentoComprador: cnpj, 
            cpfs: cpfs 
          };
      
          console.log("Payload a ser codificado:", payload);
          const encodedPayload = base64UrlEncode(stringToArrayBuffer(JSON.stringify(payload)));
          console.log("Payload codificado:", encodedPayload);
      
          const toSign = stringToArrayBuffer(`${encodedHeader}.${encodedPayload}`);
          console.log("String a ser assinada:", `${encodedHeader}.${encodedPayload}`);
      
          const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, toSign);
          console.log("Assinatura gerada:", signature);
      
          const encodedSignature = base64UrlEncode(signature);
          console.log("Assinatura codificada:", encodedSignature);
      
          return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
        } catch (error) {
          console.error("Erro ao criar JWT:", error);
          throw new Error("Erro ao gerar o token de autenticação.");
        }
      }
        // Função para consultar CPFs vinculados ao CNPJ
  async function consultarCpfs(cnpj, cpfs, authToken) {
    // Validação de CNPJ antes de prosseguir
    if (!validarCnpj(cnpj)) {
      console.error("CNPJ inválido!");
      alert("CNPJ inválido. Verifique os dados e tente novamente.");
      return;
    }
  
    // Remover caracteres especiais do CNPJ antes de enviar
    cnpj = cnpj.replace(/[^\d]/g, "");
  
    // Validação de cada CPF antes de prosseguir
    if (Array.isArray(cpfs)) {
      for (let i = 0; i < cpfs.length; i++) {
        // Remove caracteres especiais de cada CPF
        cpfs[i] = cpfs[i].replace(/[^\d]/g, "");
        if (!validarCpf(cpfs[i])) {
          console.error(`CPF inválido: ${cpfs[i]}`);
          alert(`CPF inválido: ${cpfs[i]}. Verifique e tente novamente.`);
          return;
        }
      }
    } else {
      // Remover caracteres especiais e validar o único CPF
      cpfs = cpfs.replace(/[^\d]/g, "");
      if (!validarCpf(cpfs)) {
        console.error(`CPF inválido: ${cpfs}`);
        alert(`CPF inválido: ${cpfs}. Verifique e tente novamente.`);
        return;
      }
    }
  
    // Criação do corpo da requisição com um único campo 'cpfs' 
    const requestBody = {
      documentoComprador: cnpj,
      cpfs: Array.isArray(cpfs) ? cpfs : [cpfs]  // 'cpfs' seja um array
    };
  
    // Depuração (remover depois)
    console.log("Iniciando consulta de CPFs...");
    console.log("CNPJ recebido:", cnpj);
    console.log("Token de autenticação:", authToken);
    console.log("CPFs recebidos:", cpfs);
    console.log("Enviando requisição...");
  
    try {
      const consultaUrl = "https://cors-anywhere.herokuapp.com/https://api.jae.com.br/vt-gateway/cadastro/consulta";
      console.log("URL de consulta:", consultaUrl);
  
      // Gera o JWT assinado
      console.log("Gerando JWT com o corpo da requisição:", requestBody);
      const jwt = await createJwt(requestBody.documentoComprador, requestBody.cpfs); // jwt assinado
      console.log("JWT gerado:", jwt);
      console.log("Corpo da requisição:", JSON.stringify(requestBody, null, 2));
      console.log("Payload do JWT:", JSON.parse(atob(jwt.split('.')[1])));
  
      // Envia a requisição diretamente para a API externa
      const response = await fetch(consultaUrl, {
        method: "POST",
        mode: "cors",  // Garantir que o navegador tente aceitar CORS
        headers: {
          "Access-Control-Allow-Origin": "*",  // Permite qualquer origem para essa requisição
          "Content-Type": "text/plain", // Tipo de conteúdo (importante para a API externa)
          Authorization: authToken, // Inclui o token de autenticação
        },
        body: jwt, // Envia o JWT assinado
      });
  
      // Verifica se a resposta foi bem-sucedida
      console.log("Requisição enviada. Status do servidor:", response.status);
      if (!response.ok) {
        console.error("Erro na resposta da API. Status:", response.status, "-", response.statusText);
        if (response.status === 400) {
          throw new Error("Requisição inválida. Verifique os dados informados.");
        } else if (response.status === 401) {
          throw new Error("Não autorizado. Verifique suas credenciais.");
        } else if (response.status === 404) {
          throw new Error("API não encontrada. Entre em contato com o suporte.");
        } else if (response.status === 500) {
          throw new Error("Erro interno no servidor. Tente novamente mais tarde.");
        } else {
          throw new Error(`Erro inesperado: ${response.status} - ${response.statusText}`);
        }
      }
  
      // Verifica os dados recebidos da API
      const data = await response.json(); // Dados recebidos da API
      console.log("Dados recebidos da API:", data);
  
      // Verifica se a API retornou CPFs válidos
      if (data && Array.isArray(data.cpfs)) {  // Verificando o campo 'cpfs' dentro do objeto
        console.log("CPFs consultados até agora:", data.cpfs);
        return data.cpfs;  // Retorna apenas o array de CPFs
      } else {
        console.error("Nenhum CPF retornado ou formato inválido.");
        return [];
      }
  
    } catch (error) {
      console.error("Erro ao realizar consulta de CPFs:", error.message);
      alert("Erro ao consultar CPFs: " + error.message);
      return [];
    }
  }
  
  
  // PARTE QUE APARECE PARA O USUÁRIO
  
  // Captura de dados dos inputs HTML e chamada de funções
  // Definição da variável global para armazenar os resultados e o índice da página atual
  let currentPage = 1;
  const resultsPerPage = 3;
  let cpfsData = []; // Array para armazenar os dados da consulta
  
  // Esconde o campo de busca por CPF ao carregar a página
  document.getElementById("buscar-results").style.display = "none";
  
  document.getElementById('cnpjForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const cnpj = document.getElementById('cnpj').value;
      const cpfInput = document.getElementById('cpf').value;
      const cpfList = cpfInput.split(",").map(cpf => cpf.trim()).filter(cpf => cpf !== "");
  
      const resultDiv = document.getElementById('result'); 
      resultDiv.innerHTML = "<p>Carregando...</p>";
  
      try {
          const authToken = await realizarLogin();
          const response = await consultarCpfs(cnpj, cpfList, authToken);
  
          if (response && response.length > 0) {  
              cpfsData = response; // Armazena os resultados globais
              currentPage = 1; // Reseta para a primeira página
              renderResults(); // Chama a função para renderizar a primeira página
  
              // Exibe o campo de busca por CPF
              document.getElementById("buscar-results").style.display = "block";
          } else {
              resultDiv.innerHTML = `<p style="color: red;">Nenhum CPF vinculado encontrado.</p>`;
              document.getElementById('pagination').innerHTML = ""; // Remove a paginação caso não tenha resultados
              document.getElementById("buscar-results").style.display = "none"; // Esconde a busca
          }
  
          document.getElementById('cnpj').value = "";
          document.getElementById('cpf').value = "";
          document.getElementById('searchCpf').value = "";
  
      } catch (error) {
          console.error(error);
          resultDiv.innerHTML = `<p style="color: red;">Erro ao consultar CPFs: ${error.message}</p>`;
      }
  });
  
  // Função para renderizar os resultados com paginação
  function renderResults() {
    const resultDiv = document.getElementById('result');
    const paginationDiv = document.getElementById('pagination');
    
    let errosGerais = [];  // Para armazenar erros gerais que serão exibidos ao final
    
    // Calcula o início e o fim da página atual
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const currentResults = cpfsData.slice(startIndex, endIndex); // Pega apenas os itens da página atual
  
    if (currentResults.length === 0) {
        resultDiv.innerHTML = "<p>Nenhum CPF encontrado.</p>";
        return;
    }
  
    // Renderiza os resultados da página atual
    let htmlContent = `
        <p style="color: green;">Consulta realizada com sucesso!</p>
        <ul id="cpf-list">
    `;
  
    currentResults.forEach(cpfData => {
        // Se houver erro, armazene-o para exibição no final
        if (cpfData.erro && cpfData.erro.length > 0) {
            errosGerais = errosGerais.concat(cpfData.erro);
        }
  
        htmlContent += `
            <li>
                <p><strong>CPF:</strong> ${cpfData.cpf}</p>
                <p><strong>Erro:</strong> ${cpfData.erro?.join(", ") || "Nenhum"}</p>
                <p><strong>Status:</strong> ${cpfData.status}</p>
                <p><strong>Status Mídia:</strong> ${cpfData.statusMidia}</p>
            </li>
        `;
    });
  
    htmlContent += `</ul>`;
  
    // Exibe os erros gerais, se houver
    if (errosGerais.length > 0) {
        htmlContent += `
            <p style="color: red;"><strong>Erros Gerais:</strong> ${errosGerais.join(", ")}</p>
        `;
    }
  
    // Atualiza o conteúdo do resultDiv
    resultDiv.innerHTML = htmlContent;
  
    // Criação dos botões de paginação
    const totalPages = Math.ceil(cpfsData.length / resultsPerPage);
    paginationDiv.innerHTML = "";
  
    // Botão "Anterior"
    const prevButton = document.createElement("button");
    prevButton.innerText = "Anterior";
    prevButton.id = "button-pagin-anterior";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderResults();
        }
    });
    paginationDiv.appendChild(prevButton);
  
    // Botões de números da página
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.className = i === currentPage ? "active" : "";
        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderResults();
        });
        paginationDiv.appendChild(pageButton);
    }
  
    // Botão "Próximo"
    const nextButton = document.createElement("button");
    nextButton.innerText = "Próximo";
    nextButton.id = "button-pagin-proximo";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderResults();
        }
    });
    paginationDiv.appendChild(nextButton);
  }
  
  // Adiciona evento ao campo de busca para filtrar múltiplos CPFs
  document.getElementById("searchCpf").addEventListener("input", function () {
      const searchValue = this.value.trim();
      if (searchValue === "") {
          renderResults();
          return;
      }
  
      const searchList = searchValue.split(",").map(cpf => cpf.trim());
      const filteredResults = cpfsData.filter(cpfData => searchList.includes(cpfData.cpf));
      displayFilteredResults(filteredResults);
  });
  
  // Função para exibir os resultados filtrados pelo campo de busca
  function displayFilteredResults(filteredResults) {
      const resultDiv = document.getElementById('result');
  
      if (filteredResults.length === 0) {
          resultDiv.innerHTML = "<p>Nenhum CPF encontrado, verifique o cpf digitado.</p>";
          return;
      }
  
      resultDiv.innerHTML = `
          <p style="color: green;">Resultados filtrados:</p>
          
          <ul>
              ${filteredResults.map(cpfData => `
                  <li>
                      <p><strong>CPF:</strong> ${cpfData.cpf}</p>
                      <p><strong>Erro:</strong> ${cpfData.erro?.join(", ") || "Nenhum"}</p>
                      <p><strong>Status:</strong> ${cpfData.status}</p>
                      <p><strong>Status Mídia:</strong> ${cpfData.statusMidia}</p>
                      <p><strong>Erros:</strong> ${cpfData.erros?.join(", ") || "Nenhum"}</p>
                  </li>
              `).join("")}
          </ul>
      `;
      /*document.getElementById('searchCpf').value = "";*/
  
  }
  
  
  
