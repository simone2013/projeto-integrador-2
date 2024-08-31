
---

### Guia de Início para Projeto Node.js

**1. Configuração Inicial**

**Passo 1:** Inicialize um novo projeto Node.js com o comando:

```bash
npm init
```

Siga as instruções para configurar o `package.json` do seu projeto.

**Passo 2:** Instale as dependências do projeto. No terminal, execute:

```bash
npm i
```

**Passo 3:** Instale o Nodemon para facilitar o desenvolvimento. O Nodemon reinicia automaticamente o servidor sempre que você faz alterações no código. Instale-o com o seguinte comando:

```bash
npm install --save-dev nodemon
```

**Passo 4:** Instale o Express, um framework popular para construir servidores em Node.js:

```bash
npm install express
```

**2. Configuração do Servidor**

**Passo 5:** Crie o arquivo `app.js` na raiz do projeto com a seguinte estrutura padrão:

```javascript
const express = require('express');
const app = express();
const port = 3000;
const api = require('./routes/api');

// Configuração do middleware
app.use('/api', api);

// Inicia o servidor
app.listen(port, () => {
    console.log("Conexão realizada com sucesso!");
});
```

**Explicação:**

- **Importação do Express:** `const express = require('express');` - Importa o framework Express.
- **Criação da Instância do App:** `const app = express();` - Cria uma instância da aplicação Express.
- **Definição da Porta:** `const port = 3000;` - Define a porta em que o servidor irá escutar.
- **Importação das Rotas:** `const api = require('./routes/api');` - Importa o módulo de rotas.
- **Uso das Rotas:** `app.use('/api', api);` - Define o prefixo `/api` para as rotas.
- **Início do Servidor:** `app.listen(port, () => { ... });` - Inicia o servidor na porta especificada e imprime uma mensagem quando a conexão é estabelecida com sucesso.

**3. Configuração das Rotas**

**Passo 6:** Crie o arquivo de rotas, por exemplo, `routes/api.js`, com a seguinte estrutura:

```javascript
const express = require('express');
const router = express.Router();
const HomeController = require('../api/controllers/AuthController');

// Definição da rota para o endpoint raiz
router.get('/', HomeController.home);

module.exports = router;
```

**Explicação:**

- **Importação do Express e do Router:** `const express = require('express');` e `const router = express.Router();` - Importa o Express e cria uma instância do roteador.
- **Importação do Controlador:** `const HomeController = require('../api/controllers/AuthController');` - Importa o controlador que irá lidar com a lógica da rota.
- **Definição da Rota:** `router.get('/', HomeController.home);` - Define a rota para o endpoint raiz (`/`), que será gerenciado pelo método `home` do `HomeController`.
- **Exportação do Router:** `module.exports = router;` - Exporta o roteador para que possa ser utilizado na configuração do servidor (`app.js`).

**4. Criação do Controlador**

**Passo 7:** Crie o arquivo `AuthController.js` na pasta `api/controllers` com a seguinte estrutura:

```javascript
exports.home = (req, res) => {
    res.send('Hello, World from HomeController!');
};
```

**Explicação:**

- **Exportação da Função `home`:** `exports.home = (req, res) => { ... };` - Define e exporta uma função que lida com as requisições para a rota `/`. Esta função envia uma resposta simples com a mensagem `"Hello, World from HomeController!"`.

---
