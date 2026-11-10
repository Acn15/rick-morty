# Rick and Morty Web

Frontend Next.js (App Router) para listar e buscar episódios e personagens, com detalhe e navegação cruzada entre os dois. Os dados vêm exclusivamente da API Nest do projeto `api-zrp` — o frontend **não** chama a Rick and Morty API diretamente.

## Pré-requisitos

- Node.js 20+ (recomendado) e npm
- API Nest (`api-zrp`) em execução e acessível na URL configurada em `API_BASE_URL`

## Instalação

```bash
npm install
```

## Configuração de ambiente

1. Copie o exemplo de ambiente:

```bash
cp .env.example .env
```

2. Ajuste `API_BASE_URL` se necessário. Variável usada pelos helpers server-side (`src/app/**/api/*`):

| Variável       | Obrigatória | Descrição                                                                 |
| -------------- | ----------- | ------------------------------------------------------------------------- |
| `API_BASE_URL` | Sim         | URL base da API Nest, sem barra no final (ex.: `http://localhost:3000`) |

O Next carrega `.env` automaticamente. Não commite `.env` com valores locais.

### Acesso local vs. container

`API_BASE_URL` é resolvida **no processo do Next** (Server Components / `fetch` no servidor), não no browser.

- **Next rodando no host** (fluxo documentado aqui: `npm run dev` / `npm start`): use um host alcançável a partir da sua máquina. Se a API Nest estiver publicada em `localhost:3000` (por exemplo via Docker Compose do `api-zrp` com mapeamento `3000:3000`), o valor adequado é `http://localhost:3000`.
- **Next rodando dentro de um container**: `localhost` aponta para o próprio container, não para o host nem para o serviço Nest. Nesse caso use o hostname da rede Docker do serviço da API (ou o gateway do host), não `http://localhost:3000`, a menos que a API esteja no mesmo container.

Este repositório não inclui Docker do frontend; a nota acima evita configurar `localhost` incorretamente se você empacotar o Next depois.

## Scripts (`package.json`)

| Comando           | Descrição                                      |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento Next na porta 3001 |
| `npm run build`   | Build de produção                              |
| `npm start`       | Serve o build na porta 3001                    |
| `npm run lint`    | ESLint                                         |
| `npm test`        | Vitest em modo watch                           |
| `npm run test:run`| Vitest em execução única (CI)                  |

## Como rodar

Com a API Nest disponível e `.env` configurado:

```bash
npm run dev
```

Abra [http://localhost:3001](http://localhost:3001).

Produção local:

```bash
npm run build
npm start
```

O app também fica em [http://localhost:3001](http://localhost:3001).

## Como o frontend alcança o Nest

1. Server Components / helpers em `src/app/episodes/api` e `src/app/characters/api` leem `process.env.API_BASE_URL`.
2. Fazem `fetch` para rotas Nest, por exemplo:
   - `GET {API_BASE_URL}/episodes`
   - `GET {API_BASE_URL}/episodes/:id/characters`
   - `GET {API_BASE_URL}/characters`
   - `GET {API_BASE_URL}/characters/:id`
3. O browser só conversa com o Next; a chamada à Nest acontece no servidor do Next.

Rotas principais do app: `/` (episódios), `/episodes/[id]`, `/characters`, `/characters/[id]`.
# rick-morty
