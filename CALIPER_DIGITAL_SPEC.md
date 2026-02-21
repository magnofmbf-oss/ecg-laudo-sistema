# Especificação Técnica: Caliper Digital (Régua de ECG)

Este documento detalha a arquitetura, o fluxo de usuário e as etapas de implementação para a funcionalidade de "Caliper Digital" (Régua de ECG) no sistema de laudos.

## 1. Visão Geral da Funcionalidade

O objetivo é permitir que o médico faça o upload de um exame de ECG (Imagem ou PDF), visualize-o em um modal interativo e utilize ferramentas de medição digital (réguas/compassos) para calcular automaticamente os intervalos (PR, QRS, QT) e a frequência cardíaca, preenchendo os campos do laudo.

## 2. Requisitos do Sistema

### 2.1. Suporte a Arquivos

- **Imagens:** `.jpg`, `.jpeg`, `.png`, `.webp`
- **Documentos:** `.pdf` (necessário renderizar a primeira página ou permitir seleção de página).
- **Atalhos:** Suporte a `Ctrl+V` (Colar) para colar imagens diretamente da área de transferência para a área de upload.

### 2.2. Ferramentas de Medição (UX/UI)

- **Modal de Tela Cheia:** A imagem deve abrir em um modal amplo para facilitar a visualização.
- **Zoom e Pan (Arrastar):** O usuário deve poder dar zoom (scroll do mouse) e arrastar a imagem para focar em um complexo específico.
- **Ferramenta de Calibração:**
  - O usuário define a escala da imagem.
  - Exemplo: Clica e arrasta para definir a distância de 1 segundo (25mm) ou 0.2 segundos (1 quadradão).
- **Ferramenta de Medição (Caliper):**
  - Linhas verticais arrastáveis (Pins) representando: Início P, Fim P, Início QRS, Fim QRS, Fim T.
  - Cálculo em tempo real da distância entre os pins, convertida para milissegundos (ms) com base na calibração.
- **Integração com o Formulário:** Botão "Aplicar Medidas" que preenche automaticamente os campos do componente `MedidasECG.jsx`.

## 3. Arquitetura e Bibliotecas Recomendadas

Para implementar essa funcionalidade no ecossistema React atual, recomendamos as seguintes bibliotecas:

1.  **`react-dropzone`:** Para gerenciar o upload de arquivos e o evento de `Ctrl+V` (paste).
2.  **`pdfjs-dist` (ou `react-pdf`):** Para converter arquivos PDF em imagens (Canvas) renderizáveis no navegador.
3.  **`konva` e `react-konva`:** Essencial para a manipulação do Canvas. Permite criar a imagem de fundo, gerenciar zoom/pan e criar as linhas arrastáveis (réguas) de forma performática e declarativa no React.

## 4. Fluxo de Interação do Usuário

1.  **Upload:** O usuário arrasta um arquivo, clica para selecionar ou usa `Ctrl+V` na área de upload.
2.  **Processamento:**
    - Se Imagem: Carrega diretamente.
    - Se PDF: Converte a página 1 para imagem via `pdfjs`.
3.  **Abertura do Modal:** A imagem é exibida no modal do Caliper.
4.  **Passo 1: Calibração (Obrigatório):**
    - O sistema pede: "Marque uma distância de 1 segundo (5 quadradões grandes)".
    - O usuário posiciona duas linhas verticais.
    - O sistema calcula o fator de conversão: `Fator = 1000ms / Distância_em_Pixels`.
5.  **Passo 2: Medição:**
    - O usuário seleciona qual intervalo quer medir (ex: "Intervalo PR").
    - Posiciona a linha inicial (Início da onda P) e a linha final (Início do QRS).
    - O sistema exibe o valor em `ms` em tempo real.
6.  **Conclusão:** O usuário clica em "Salvar Medidas" e o modal fecha, preenchendo os inputs do laudo.

## 5. Etapas de Implementação (Roadmap)

A implementação deve ser dividida em fases para garantir estabilidade:

### Fase 1: Melhoria do Upload (Suporte a PDF e Ctrl+V)

- [ ] Substituir o input de arquivo atual por uma área de dropzone avançada.
- [ ] Implementar listener para o evento `paste` (Ctrl+V) no `window` ou na área de dropzone.
- [ ] Integrar `pdfjs-dist` para ler PDFs e extrair a primeira página como um DataURL (base64) ou Canvas.

### Fase 2: Estrutura do Modal e Visualizador (Konva)

- [ ] Criar o componente `CaliperModal.jsx`.
- [ ] Configurar o `Stage` e `Layer` do `react-konva`.
- [ ] Renderizar a imagem carregada no Canvas.
- [ ] Implementar a lógica de Zoom (escala do Stage) e Pan (arrastar o Stage).

### Fase 3: Lógica de Calibração

- [ ] Criar estado para armazenar o `fatorDeCalibracao` (ms por pixel).
- [ ] Criar UI para o modo "Calibrar".
- [ ] Adicionar duas linhas verticais arrastáveis (`Line` ou `Rect` no Konva).
- [ ] Calcular a distância em pixels entre elas e definir o fator.

### Fase 4: Ferramentas de Medição

- [ ] Criar o modo "Medir".
- [ ] Permitir a adição de pares de linhas para medir PR, QRS e QT.
- [ ] Exibir um tooltip ou painel flutuante com os valores calculados em tempo real `(distancia_pixels * fatorDeCalibracao)`.

### Fase 5: Integração e Refinamento

- [ ] Conectar o botão "Aplicar" para atualizar o estado do componente pai (`MedidasECG.jsx`).
- [ ] Refinar a UI/UX (cores das linhas, cursores do mouse, responsividade do modal).
- [ ] Testes com diferentes resoluções de imagens e PDFs.

## 6. Desafios Técnicos Previstos

- **Resolução do PDF:** PDFs podem ser renderizados com baixa qualidade. Será necessário ajustar a escala de renderização do `pdfjs` para garantir nitidez ao dar zoom.
- **Performance do Canvas:** Imagens muito grandes podem deixar o drag-and-drop lento. O uso correto do `react-konva` (separando a imagem de fundo das linhas em `Layers` diferentes) é crucial.
- **Responsividade:** O Canvas precisa se adaptar ao tamanho da tela do usuário sem distorcer a imagem ou perder as coordenadas das linhas.

---

_Documento gerado para planejamento da feature de Caliper Digital._
