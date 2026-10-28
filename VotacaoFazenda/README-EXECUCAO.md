# Votação A Fazenda 2026

Projeto React + Vite com três páginas: início, votação e resultado. Os votos são armazenados no `localStorage` do navegador.

## Requisitos
- Node.js 18 ou superior
- npm

## Como executar
Abra o terminal nesta pasta e rode:

```bash
npm install
npm run dev
```

Acesse o endereço mostrado pelo Vite (normalmente `http://localhost:5173/`).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

A chave de armazenamento dos votos é `fazenda2026:votos`. A opção **Zerar votação** remove os votos guardados neste navegador.
