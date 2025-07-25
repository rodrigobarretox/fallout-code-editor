# 🖥️ Fallout Code Editor

Um editor de código com temática pós-apocalíptica inspirado no universo Fallout, com visual de monitor CRT retrô e funcionalidades modernas de desenvolvimento.

![Fallout Code Editor](https://img.shields.io/badge/Fallout-Code%20Editor-00ff41?style=for-the-badge&logo=terminal)

![Fallout Code Editor](https://i.imgur.com/cTsrnFy.jpeg)

## 🌟 Características

### 🎨 Visual Único
- **Monitor CRT Retrô**: Interface que simula um monitor CRT dos anos 80/90
- **Tema Fallout**: Cores verdes fosforescentes características do universo Fallout
- **Efeitos Visuais**: Scanlines, flickering e brilho para autenticidade
- **Fonte Monoespaçada**: VT323 para o visual terminal clássico

### ⚡ Funcionalidades Avançadas
- **Editor Monaco**: Mesmo engine do VS Code com syntax highlighting
- **Multi-arquivos**: Sistema de abas para trabalhar com múltiplos arquivos
- **Auto-save**: Salvamento automático local a cada 2 segundos
- **Persistência**: Arquivos salvos localmente, mantidos entre sessões
- **Responsivo**: Interface adaptada para desktop e dispositivos móveis

### 🛠️ Ferramentas de Desenvolvimento
- **Syntax Highlighting**: Suporte para 20+ linguagens de programação
- **Busca e Substituição**: Ferramentas avançadas de pesquisa
- **Formatação de Código**: Auto-formatação e indentação
- **Atalhos de Teclado**: Shortcuts familiares do VS Code
- **Zoom Dinâmico**: Ajuste de tamanho da fonte em tempo real

## 🚀 Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Monaco Editor** - Editor de código avançado
- **Tailwind CSS** - Estilização responsiva
- **Vite** - Build tool e dev server
- **Lucide React** - Ícones modernos

## 📱 Responsividade

O editor foi otimizado para diferentes dispositivos:

### 🖥️ Desktop (1024px+)
- Interface completa com todos os controles
- Múltiplas colunas de botões
- Painel de configurações expandido

### 📱 Tablet (768px - 1023px)
- Layout reorganizado em colunas
- Botões otimizados para touch
- Controles essenciais mantidos

### 📱 Mobile (até 767px)
- Interface compacta e funcional
- Botões maiores para facilitar o toque
- Título abreviado para economizar espaço
- Scroll horizontal nas abas de arquivos

## 🎮 Como Usar

### Controles Principais
- **Novo Arquivo**: Cria um novo arquivo em branco
- **Abrir Arquivo**: Carrega arquivo do sistema
- **Salvar**: Download do arquivo atual
- **Desfazer/Refazer**: Ctrl+Z / Ctrl+Y
- **Buscar**: Ctrl+F para pesquisa
- **Substituir**: Ctrl+H para substituição

### Atalhos de Teclado
```
Ctrl + S     - Salvar arquivo
Ctrl + Z     - Desfazer
Ctrl + Y     - Refazer
Ctrl + F     - Buscar
Ctrl + H     - Substituir
Ctrl + A     - Selecionar tudo
Ctrl + C     - Copiar
Ctrl + V     - Colar
Ctrl + X     - Recortar
Ctrl + /     - Comentar/Descomentar
```

### Linguagens Suportadas
- JavaScript (.js, .jsx)
- TypeScript (.ts, .tsx)
- Python (.py)
- Java (.java)
- C/C++ (.c, .cpp)
- C# (.cs)
- PHP (.php)
- Ruby (.rb)
- Go (.go)
- Rust (.rs)
- HTML (.html)
- CSS (.css, .scss)
- JSON (.json)
- XML (.xml)
- Markdown (.md)
- SQL (.sql)
- Shell (.sh)
- YAML (.yml, .yaml)

## 🔧 Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/rodrigobarretox/fallout-code-editor.git

# Entre no diretório
cd fallout-code-editor

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificação de código
```

## 💾 Persistência de Dados

O editor utiliza o **localStorage** do navegador para:
- Salvar conteúdo dos arquivos automaticamente
- Manter abas abertas entre sessões
- Lembrar arquivo ativo
- Preservar configurações do usuário

### Auto-save
- Salvamento automático após 2 segundos de inatividade
- Indicador visual quando o salvamento ocorre
- Debounce para otimizar performance
- Tratamento de erros para localStorage indisponível

## 🎨 Customização

### Temas
Atualmente suporta o tema **Fallout Dark** com:
- Fundo verde escuro (#000800)
- Texto verde fosforescente (#00ff41)
- Comentários em verde médio (#00aa2a)
- Seleção com transparência verde

### Configurações
- **Word Wrap**: Quebra de linha automática
- **Minimap**: Mapa de código lateral
- **Font Size**: Tamanho da fonte (10-24px)
- **Line Numbers**: Numeração de linhas
- **Bracket Matching**: Destaque de brackets

## 🌐 Deploy

O projeto está configurado para deploy automático no **Netlify**:

```bash
npm run build    # Gera build otimizado
```

A pasta `dist/` contém os arquivos estáticos prontos para deploy.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

### Próximas Funcionalidades
- [ ] Múltiplos temas (Cyberpunk, Matrix, etc.)
- [ ] Sistema de plugins
- [ ] Integração com Git
- [ ] Terminal integrado
- [ ] Colaboração em tempo real
- [ ] Suporte a extensões
- [ ] Modo offline completo
- [ ] Exportação para diferentes formatos

### Melhorias Planejadas
- [ ] Performance otimizada para arquivos grandes
- [ ] Mais atalhos de teclado
- [ ] Sistema de snippets
- [ ] Auto-complete inteligente
- [ ] Debugging integrado

## 🐛 Problemas Conhecidos

- Monaco Editor pode ter performance reduzida em dispositivos muito antigos
- Alguns recursos avançados podem não funcionar em navegadores muito antigos
- O localStorage tem limite de ~5-10MB dependendo do navegador

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **Microsoft Monaco Editor** - Engine do editor
- **Fallout Universe** - Inspiração visual e temática
- **Google Fonts** - Fonte VT323
- **Lucide** - Ícones modernos e limpos
- **Tailwind CSS** - Framework de estilização

## 📞 Contato

- **Projeto**: [Fallout Code Editor](https://falloutcodeeditor.web.app/)
- **Repositório**: [GitHub](https://github.com/rodrigobarretox/fallout-code-editor)

---

**Desenvolvido com 💚 para a comunidade de desenvolvedores que amam o universo pós-apocalíptico!**

*"War... war never changes. But code editors do."* 🚀