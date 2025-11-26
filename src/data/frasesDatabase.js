// ============================================================================
// BANCO DE FRASES PARA LAUDOS DE ECG
// Baseado na Diretriz SBC 2022 sobre Análise e Emissão de Laudos Eletrocardiográficos
// Arq Bras Cardiol. 2022;119(4):638-680
// ============================================================================

export const frasesDatabase = {
  // ==========================================================================
  // RITMO CARDÍACO
  // ==========================================================================
  ritmo: {
    titulo: "Ritmo",
    frases: [
      // Ritmo Sinusal e Variantes
      "Ritmo sinusal",
      "Ritmo sinusal regular",
      "Ritmo sinusal com frequência cardíaca normal",
      "Ritmo sinusal com arritmia sinusal respiratória",
      "Ritmo sinusal com arritmia sinusal não respiratória",
      "Taquicardia sinusal",
      "Bradicardia sinusal",
      "Ritmo sinusal com pausas sinusais",
      "Ritmo sinusal com parada sinusal",
      "Ritmo sinusal com bloqueio sinoatrial de 2º grau tipo I",
      "Ritmo sinusal com bloqueio sinoatrial de 2º grau tipo II",
      "Doença do nó sinusal",
      "Síndrome bradi-taqui",

      // Fibrilação Atrial
      "Ritmo de fibrilação atrial",
      "Ritmo de fibrilação atrial com alta resposta ventricular",
      "Ritmo de fibrilação atrial com moderada resposta ventricular",
      "Ritmo de fibrilação atrial com baixa resposta ventricular",
      "Ritmo de fibrilação atrial com resposta ventricular controlada",
      "Fibrilação atrial paroxística",
      "Fibrilação atrial persistente",
      "Fibrilação atrial permanente",
      "Fibrilação atrial com condução aberrante",
      "Fibrilação atrial com pré-excitação ventricular",

      // Flutter Atrial
      "Ritmo de flutter atrial",
      "Ritmo de flutter atrial típico (anti-horário)",
      "Ritmo de flutter atrial típico reverso (horário)",
      "Ritmo de flutter atrial atípico",
      "Flutter atrial com condução AV 2:1",
      "Flutter atrial com condução AV 3:1",
      "Flutter atrial com condução AV 4:1",
      "Flutter atrial com condução AV variável",

      // Taquicardias Atriais
      "Taquicardia atrial",
      "Taquicardia atrial focal",
      "Taquicardia atrial multifocal",
      "Taquicardia atrial com bloqueio AV",
      "Taquicardia atrial paroxística",

      // Taquicardias Supraventriculares
      "Taquicardia supraventricular",
      "Taquicardia supraventricular paroxística",
      "Taquicardia por reentrada nodal (TRN)",
      "Taquicardia por reentrada atrioventricular (TRAV)",
      "Taquicardia juncional",
      "Taquicardia juncional não paroxística",
      "Taquicardia juncional automática",

      // Taquicardias Ventriculares
      "Taquicardia ventricular",
      "Taquicardia ventricular monomórfica",
      "Taquicardia ventricular monomórfica sustentada",
      "Taquicardia ventricular monomórfica não sustentada",
      "Taquicardia ventricular polimórfica",
      "Taquicardia ventricular bidirecional",
      "Taquicardia ventricular fascicular",
      "Taquicardia ventricular tipo Torsades de Pointes",
      "Ritmo idioventricular acelerado (RIVA)",
      "Flutter ventricular",
      "Fibrilação ventricular",

      // Ritmos de Escape
      "Ritmo de escape atrial",
      "Ritmo de escape juncional",
      "Ritmo juncional",
      "Ritmo idioventricular",
      "Ritmo de escape ventricular",

      // Ritmos de Marca-passo
      "Ritmo de marca-passo atrial (AAI)",
      "Ritmo de marca-passo ventricular (VVI)",
      "Ritmo de marca-passo atrioventricular (DDD)",
      "Ritmo de marca-passo com modo VDD",
      "Ritmo de marca-passo biventricular (ressincronizador)",
      "Ritmo de marca-passo com captura atrial e ventricular",
      "Ritmo de marca-passo com captura atrial e condução AV própria",
      "Ritmo de marca-passo com sensibilidade atrial e estimulação ventricular",
      "Ritmo próprio com inibição do marca-passo",
      "Ritmo de marca-passo com falha de captura",
      "Ritmo de marca-passo com falha de sensibilidade",
      "Ritmo de marca-passo com histerese",

      // Outros Ritmos
      "Ritmo atrial ectópico",
      "Ritmo atrial baixo",
      "Ritmo do seio coronário",
      "Wandering atrial pacemaker (marca-passo atrial migratório)",
      "Dissociação atrioventricular",
      "Dissociação atrioventricular isorrítmica",
      "Dissociação atrioventricular por interferência",
      "Assistolia",
    ],
  },

  // ==========================================================================
  // ONDA P E ATIVAÇÃO ATRIAL
  // ==========================================================================
  ondaP: {
    titulo: "Onda P / Ativação Atrial",
    frases: [
      // Morfologia Normal
      "Onda P sinusal",
      "Onda P de morfologia e duração normais",

      // Sobrecarga Atrial Esquerda
      "Sobrecarga atrial esquerda",
      "Onda P mitrale (entalhada em DII)",
      "Componente negativo da onda P em V1 prolongado (≥40ms)",
      "Componente negativo da onda P em V1 com área aumentada (≥1mm²)",
      "Índice de Morris positivo",
      "Aumento da duração da onda P (>120ms)",

      // Sobrecarga Atrial Direita
      "Sobrecarga atrial direita",
      "Onda P pulmonale (amplitude >2,5mm em DII)",
      "Onda P pontiaguda em derivações inferiores",
      "Componente positivo inicial da onda P em V1 aumentado",
      "Onda P com amplitude aumentada em V1-V2",
      "Desvio do eixo da onda P para a direita",

      // Sobrecarga Biatrial
      "Sobrecarga biatrial",
      "Onda P com características de sobrecarga biatrial",

      // Alterações Inespecíficas
      "Onda P de baixa voltagem",
      "Onda P ausente",
      "Onda P retrógrada",
      "Onda P invertida em derivações inferiores",
      "Onda P não sinusal",
      "Ondas F de flutter atrial",
      "Ondas f de fibrilação atrial",
      "Onda P' ectópica",
    ],
  },

  // ==========================================================================
  // INTERVALO PR E CONDUÇÃO ATRIOVENTRICULAR
  // ==========================================================================
  conducaoAV: {
    titulo: "Condução AV",
    frases: [
      // Condução Normal
      "Condução atrioventricular normal",
      "Intervalo PR normal",
      "Intervalo PR no limite superior da normalidade",
      "Intervalo PR no limite inferior da normalidade",

      // PR Curto
      "Intervalo PR curto",
      "Intervalo PR curto sem padrão de pré-excitação",
      "Condução atrioventricular acelerada",

      // Bloqueios AV de 1º Grau
      "Bloqueio atrioventricular de 1º grau",
      "Bloqueio AV de 1º grau (PR >200ms)",
      "Bloqueio AV de 1º grau acentuado (PR >300ms)",
      "Bloqueio AV de 1º grau intermitente",

      // Bloqueios AV de 2º Grau
      "Bloqueio atrioventricular de 2º grau",
      "Bloqueio atrioventricular de 2º grau tipo I (Mobitz I / Wenckebach)",
      "Bloqueio atrioventricular de 2º grau tipo II (Mobitz II)",
      "Bloqueio atrioventricular de 2º grau 2:1",
      "Bloqueio atrioventricular de 2º grau 3:1",
      "Bloqueio atrioventricular de 2º grau com condução variável",
      "Bloqueio atrioventricular de 2º grau avançado",
      "Bloqueio atrioventricular de alto grau",

      // Bloqueio AV Total
      "Bloqueio atrioventricular total (BAVT)",
      "Bloqueio atrioventricular de 3º grau",
      "Bloqueio AV total com escape juncional",
      "Bloqueio AV total com escape ventricular",
      "Bloqueio AV total congênito",
      "Bloqueio AV total adquirido",

      // Pré-excitação Ventricular
      "Padrão de pré-excitação ventricular",
      "Síndrome de Wolff-Parkinson-White",
      "Padrão de Wolff-Parkinson-White tipo A",
      "Padrão de Wolff-Parkinson-White tipo B",
      "Presença de onda delta",
      "Pré-excitação ventricular intermitente",
      "Padrão de Lown-Ganong-Levine (PR curto sem onda delta)",

      // Dissociação AV
      "Dissociação atrioventricular",
      "Dissociação AV completa",
      "Dissociação AV incompleta",
      "Batimentos de captura",
      "Batimentos de fusão",
    ],
  },

  // ==========================================================================
  // COMPLEXO QRS E CONDUÇÃO INTRAVENTRICULAR
  // ==========================================================================
  conducaoIV: {
    titulo: "Condução IV",
    frases: [
      // Condução Normal
      "Condução intraventricular normal",
      "Duração do QRS normal",
      "QRS de duração e morfologia normais",

      // Bloqueio de Ramo Direito
      "Bloqueio de ramo direito",
      "Bloqueio de ramo direito completo (QRS ≥120ms)",
      "Bloqueio de ramo direito incompleto (QRS 110-119ms)",
      "Bloqueio de ramo direito grau III",
      "Bloqueio de ramo direito grau II",
      "Bloqueio de ramo direito grau I",
      "Bloqueio de ramo direito intermitente",
      "Bloqueio de ramo direito frequência-dependente",

      // Bloqueio de Ramo Esquerdo
      "Bloqueio de ramo esquerdo",
      "Bloqueio de ramo esquerdo completo (QRS ≥120ms)",
      "Bloqueio de ramo esquerdo incompleto (QRS 110-119ms)",
      "Bloqueio de ramo esquerdo grau III",
      "Bloqueio de ramo esquerdo grau II",
      "Bloqueio de ramo esquerdo grau I",
      "Bloqueio de ramo esquerdo intermitente",
      "Bloqueio de ramo esquerdo frequência-dependente",
      "Bloqueio de ramo esquerdo com critérios de Strauss",

      // Bloqueios Divisionais
      "Bloqueio divisional anterossuperior esquerdo (BDAS)",
      "Bloqueio divisional posteroinferior esquerdo (BDPI)",
      "Bloqueio divisional anteromedial esquerdo (BDAM)",
      "Bloqueio da divisão anterossuperior do ramo esquerdo",
      "Bloqueio da divisão posteroinferior do ramo esquerdo",

      // Bloqueios Combinados (Bifasciculares)
      "Bloqueio bifascicular",
      "Bloqueio de ramo direito + BDAS",
      "Bloqueio de ramo direito + BDPI",
      "Bloqueio de ramo direito com desvio do eixo para a esquerda",
      "Bloqueio de ramo direito com desvio do eixo para a direita",

      // Bloqueio Trifascicular
      "Bloqueio trifascicular",
      "Bloqueio bifascicular + BAV de 1º grau",
      "Bloqueio de ramo direito + BDAS + BAV de 1º grau",
      "Bloqueio de ramo direito + BDPI + BAV de 1º grau",
      "Bloqueio trifascicular com BAV de 2º grau",

      // Distúrbios Inespecíficos
      "Distúrbio de condução intraventricular",
      "Distúrbio de condução intraventricular inespecífico",
      "Atraso final de condução",
      "Atraso de condução pelo ramo direito",
      "Atraso de condução pelo ramo esquerdo",
      "QRS alargado inespecífico",
      "Padrão de condução pelo septo interventricular alterado",

      // QRS Fragmentado
      "QRS fragmentado (fQRS)",
      "QRS fragmentado em derivações anteriores",
      "QRS fragmentado em derivações inferiores",
      "QRS fragmentado em derivações laterais",
      "Fragmentação do QRS sugestiva de fibrose miocárdica",

      // Outros
      "Padrão de bloqueio de ramo esquerdo atípico",
      "Padrão de bloqueio de ramo direito atípico",
      "Condução intraventricular com padrão de pré-excitação",
      "QRS com entalhe (notch) em derivações laterais",
    ],
  },

  // ==========================================================================
  // EIXO ELÉTRICO
  // ==========================================================================
  eixo: {
    titulo: "Eixo Elétrico",
    frases: [
      // Eixo Normal
      "Eixo elétrico do QRS normal",
      "Eixo elétrico do QRS entre -30° e +90°",
      "Eixo elétrico do QRS ao redor de 0°",
      "Eixo elétrico do QRS ao redor de +60°",
      "Eixo elétrico do QRS horizontalizado",
      "Eixo elétrico do QRS verticalizado",

      // Desvio para Esquerda
      "Desvio do eixo elétrico para a esquerda",
      "Desvio do eixo elétrico para a esquerda (entre -30° e -90°)",
      "Eixo elétrico desviado para a esquerda",
      "Eixo elétrico entre -30° e -45°",
      "Eixo elétrico entre -45° e -90°",

      // Desvio para Direita
      "Desvio do eixo elétrico para a direita",
      "Desvio do eixo elétrico para a direita (entre +90° e +180°)",
      "Eixo elétrico desviado para a direita",
      "Eixo elétrico entre +90° e +120°",
      "Eixo elétrico entre +120° e +180°",

      // Eixo Indeterminado/Extremo
      "Eixo elétrico indeterminado",
      "Eixo elétrico extremo (terra de ninguém)",
      "Eixo elétrico no quadrante superior direito",
      "Eixo elétrico entre -90° e -180°",

      // Outros
      "Eixo elétrico no limite superior da normalidade",
      "Eixo elétrico no limite inferior da normalidade",
      "Rotação horária do coração",
      "Rotação anti-horária do coração",
      "Eixo da onda P normal",
      "Eixo da onda T normal",
      "Ângulo QRS-T alargado",
    ],
  },

  // ==========================================================================
  // SOBRECARGA DE CÂMARAS
  // ==========================================================================
  sobrecargas: {
    titulo: "Sobrecargas",
    frases: [
      // Sobrecarga Atrial (referência cruzada com ondaP)
      "Sobrecarga atrial esquerda",
      "Sobrecarga atrial direita",
      "Sobrecarga biatrial",

      // Sobrecarga Ventricular Esquerda - Critérios de Voltagem
      "Sobrecarga ventricular esquerda",
      "Hipertrofia ventricular esquerda",
      "Sobrecarga ventricular esquerda por critérios de voltagem",
      "Critérios de voltagem para hipertrofia ventricular esquerda",
      "Critério de Sokolow-Lyon positivo (S V1 + R V5/V6 ≥35mm)",
      "Critério de Cornell positivo (R aVL + S V3 >28mm em homens, >20mm em mulheres)",
      "Critério de Cornell modificado positivo",
      "Produto de Cornell-voltagem positivo",
      "Índice de Lewis positivo",
      "Escore de Romhilt-Estes positivo",
      "Escore de Romhilt-Estes provável",
      "Critério de Gubner-Ungerleider positivo",
      "Onda R em aVL ≥11mm",
      "Onda R em V5 ou V6 ≥26mm",
      "Onda R em DI + onda S em DIII ≥25mm",

      // Sobrecarga Ventricular Esquerda - Padrões
      "Sobrecarga ventricular esquerda com padrão de strain",
      "Sobrecarga ventricular esquerda sem padrão de strain",
      "Sobrecarga ventricular esquerda tipo sistólica",
      "Sobrecarga ventricular esquerda tipo diastólica",
      "Padrão de strain em derivações laterais",
      "Alterações secundárias da repolarização por SVE",
      "SVE com alteração da repolarização ventricular",

      // Sobrecarga Ventricular Direita
      "Sobrecarga ventricular direita",
      "Hipertrofia ventricular direita",
      "Sobrecarga ventricular direita tipo A (R>S em V1)",
      "Sobrecarga ventricular direita tipo B (padrão rSR')",
      "Sobrecarga ventricular direita tipo C (predominância de S em V5-V6)",
      "Padrão de strain em derivações direitas",
      "Onda R em V1 ≥7mm",
      "Relação R/S em V1 ≥1",
      "Onda S persistente em V5-V6",
      "Desvio do eixo para a direita com SVD",
      "Padrão qR em V1",

      // Sobrecarga Biventricular
      "Sobrecarga biventricular",
      "Critérios de voltagem para ambos os ventrículos",
      "Padrão de Katz-Wachtel (complexos QRS isodifásicos amplos em precordiais médias)",

      // Dilatação de Câmaras
      "Sinais de dilatação atrial esquerda",
      "Sinais de dilatação atrial direita",
      "Sinais de dilatação ventricular esquerda",
      "Sinais de dilatação ventricular direita",
    ],
  },

  // ==========================================================================
  // SEGMENTO ST
  // ==========================================================================
  segmentoST: {
    titulo: "Segmento ST",
    frases: [
      // ST Normal
      "Segmento ST isoelétrico",
      "Segmento ST sem alterações",
      "Segmento ST normal",

      // Supradesnivelamento de ST
      "Supradesnivelamento do segmento ST",
      "Supradesnivelamento de ST em parede anterior",
      "Supradesnivelamento de ST em parede anterosseptal",
      "Supradesnivelamento de ST em parede anterolateral",
      "Supradesnivelamento de ST em parede lateral",
      "Supradesnivelamento de ST em parede lateral alta",
      "Supradesnivelamento de ST em parede inferior",
      "Supradesnivelamento de ST em parede inferolateral",
      "Supradesnivelamento de ST em parede dorsal/posterior",
      "Supradesnivelamento de ST em ventrículo direito",
      "Supradesnivelamento de ST difuso",
      "Supradesnivelamento de ST com morfologia côncava",
      "Supradesnivelamento de ST com morfologia convexa",
      "Corrente de lesão subepicárdica",
      "Padrão de lesão transmural",

      // Infradesnivelamento de ST
      "Infradesnivelamento do segmento ST",
      "Infradesnivelamento de ST em parede anterior",
      "Infradesnivelamento de ST em parede lateral",
      "Infradesnivelamento de ST em parede inferior",
      "Infradesnivelamento de ST difuso",
      "Infradesnivelamento de ST descendente",
      "Infradesnivelamento de ST horizontal",
      "Infradesnivelamento de ST ascendente",
      "Infradesnivelamento de ST em derivações precordiais",
      "Corrente de lesão subendocárdica",
      "Infradesnivelamento de ST recíproco",
      "Depressão de ST em aVR (equivalente de supra)",

      // Padrões Específicos de Isquemia
      "Padrão de de Winter (infradesnivelamento de ST ascendente em precordiais com T hiperaguda)",
      "Padrão de Wellens tipo 1 (ondas T bifásicas em V2-V3)",
      "Padrão de Wellens tipo 2 (ondas T invertidas profundas e simétricas em V2-V3)",
      "Padrão de Aslanger",
      "Padrão de oclusão da artéria circunflexa",
      "Padrão STEMI posterior (infradesnível V1-V3 com supra em derivações posteriores)",

      // Alterações Não-Isquêmicas do ST
      "Elevação de ST por repolarização precoce",
      "Elevação de ST por pericardite",
      "Elevação de ST por miocardite",
      "Elevação de ST por síndrome de Takotsubo",
      "Elevação de ST por hipercalemia",
      "Elevação de ST por hipotermia (onda de Osborn)",
      "Alteração do ST secundária a bloqueio de ramo",
      "Alteração do ST secundária a hipertrofia ventricular",
      "Alteração do ST por digital",
      "Depressão de ST por digital (cubeta digitálica)",
      "Alteração do ST por hipocalemia",
    ],
  },

  // ==========================================================================
  // ONDA T
  // ==========================================================================
  ondaT: {
    titulo: "Onda T",
    frases: [
      // Onda T Normal
      "Ondas T normais",
      "Ondas T de morfologia e amplitude normais",
      "Ondas T positivas em derivações esperadas",

      // Inversão de Onda T
      "Inversão de onda T",
      "Onda T invertida simétrica",
      "Onda T invertida assimétrica",
      "Onda T invertida em parede anterior",
      "Onda T invertida em parede anterosseptal",
      "Onda T invertida em parede lateral",
      "Onda T invertida em parede inferior",
      "Onda T invertida difusa",
      "Onda T invertida profunda (>5mm)",
      "Onda T invertida gigante",
      "Ondas T negativas em V1-V3 (variante normal em mulheres)",
      "Ondas T negativas juvenis persistentes",

      // Ondas T Hiperagudas
      "Ondas T hiperagudas",
      "Ondas T hiperagudas em parede anterior",
      "Ondas T hiperagudas em parede inferior",
      "Ondas T amplas e pontiagudas",
      "Ondas T hiperagudas sugestivas de isquemia aguda",
      "Ondas T hiperagudas por hipercalemia",

      // Ondas T Bifásicas
      "Ondas T bifásicas",
      "Ondas T bifásicas tipo plus-minus",
      "Ondas T bifásicas tipo minus-plus",
      "Padrão de Wellens (ondas T bifásicas ou invertidas em V2-V3)",

      // Ondas T Apiculadas/Achatadas
      "Ondas T apiculadas",
      "Ondas T em tenda (tent-shaped)",
      "Ondas T achatadas",
      "Ondas T de baixa amplitude",
      "Ondas T isoelétrica",

      // Alterações Secundárias
      "Alterações secundárias da repolarização ventricular",
      "Alterações de ST-T secundárias a bloqueio de ramo",
      "Alterações de ST-T secundárias a sobrecarga ventricular",
      "Alterações de ST-T secundárias a pré-excitação",

      // Alterações Primárias
      "Alterações primárias da repolarização ventricular",
      "Alterações primárias da repolarização em parede anterior",
      "Alterações primárias da repolarização em parede lateral",
      "Alterações primárias da repolarização em parede inferior",
      "Alterações da repolarização ventricular de etiologia a esclarecer",
      "Alterações da repolarização ventricular difusas",
      "Alterações inespecíficas de ST-T",
    ],
  },

  // ==========================================================================
  // ISQUEMIA E INFARTO
  // ==========================================================================
  isquemia: {
    titulo: "Isquemia / Infarto",
    frases: [
      // Isquemia Aguda
      "Alterações sugestivas de isquemia aguda",
      "Padrão eletrocardiográfico de síndrome coronariana aguda",
      "Alterações dinâmicas de ST-T sugestivas de isquemia",
      "Padrão de isquemia subepicárdica",
      "Padrão de isquemia subendocárdica",
      "Padrão de lesão subepicárdica",
      "Padrão de lesão subendocárdica",

      // STEMI por Localização
      "Infarto agudo do miocárdio com supra de ST (IAMCSST)",
      "IAMCSST anterior extenso",
      "IAMCSST anterior",
      "IAMCSST anterosseptal",
      "IAMCSST anterolateral",
      "IAMCSST lateral",
      "IAMCSST lateral alto",
      "IAMCSST inferior",
      "IAMCSST inferolateral",
      "IAMCSST inferoposterior",
      "IAMCSST de ventrículo direito",
      "IAMCSST posterior (dorsal)",
      "IAMCSST circunferencial",

      // Equivalentes de STEMI
      "Padrão de de Winter",
      "Padrão de Wellens tipo 1",
      "Padrão de Wellens tipo 2",
      "Síndrome de Wellens",
      "Padrão de Aslanger",
      "Bloqueio de ramo esquerdo novo (considerar equivalente de STEMI)",
      "Ondas T hiperagudas isoladas",
      "Infradesnivelamento de ST em aVR com supra difuso (oclusão de tronco)",
      "Supra de ST em aVR com infradesnivelamento difuso",

      // Infarto Sem Supra de ST
      "Infarto agudo do miocárdio sem supra de ST (IAMSSST)",
      "Alterações isquêmicas sem supradesnivelamento de ST",

      // Infarto Antigo / Sequela
      "Sequela de infarto do miocárdio",
      "Área eletricamente inativa",
      "Área eletricamente inativa na parede anterior",
      "Área eletricamente inativa na parede anterosseptal",
      "Área eletricamente inativa na parede septal",
      "Área eletricamente inativa na parede lateral",
      "Área eletricamente inativa na parede inferior",
      "Área eletricamente inativa na parede dorsal/posterior",
      "Área eletricamente inativa na parede inferolateral",
      "Área eletricamente inativa extensa",

      // Ondas Q Patológicas
      "Ondas Q patológicas",
      "Onda Q patológica em parede anterior",
      "Onda Q patológica em parede septal",
      "Onda Q patológica em parede lateral",
      "Onda Q patológica em parede inferior",
      "Onda Q de necrose",
      "Complexo QS em derivações precordiais anteriores",
      "Complexo QS em derivações inferiores",
      "Perda de onda R em precordiais",
      "Regressão de onda R em precordiais",

      // Fases do Infarto
      "Padrão de infarto em fase hiperaguda",
      "Padrão de infarto em fase aguda",
      "Padrão de infarto em fase subaguda",
      "Padrão de infarto em fase crônica",
      "Evolução eletrocardiográfica de infarto do miocárdio",
    ],
  },

  // ==========================================================================
  // EXTRASSÍSTOLES E ECTOPIAS
  // ==========================================================================
  extrassistoles: {
    titulo: "Extrassístoles",
    frases: [
      // Extrassístoles Supraventriculares
      "Extrassístoles supraventriculares",
      "Extrassístoles supraventriculares isoladas",
      "Extrassístoles supraventriculares raras",
      "Extrassístoles supraventriculares ocasionais",
      "Extrassístoles supraventriculares frequentes",
      "Extrassístoles atriais",
      "Extrassístoles atriais com condução aberrante",
      "Extrassístoles atriais bloqueadas",
      "Extrassístoles juncionais",
      "Salva de extrassístoles supraventriculares",
      "Taquicardia atrial não sustentada",

      // Extrassístoles Ventriculares - Frequência
      "Extrassístoles ventriculares",
      "Extrassístoles ventriculares isoladas",
      "Extrassístoles ventriculares raras",
      "Extrassístoles ventriculares ocasionais",
      "Extrassístoles ventriculares frequentes",
      "Extrassístoles ventriculares muito frequentes",

      // Extrassístoles Ventriculares - Morfologia
      "Extrassístoles ventriculares monomórficas",
      "Extrassístoles ventriculares polimórficas",
      "Extrassístoles ventriculares multifocais",
      "Extrassístoles ventriculares com morfologia de BRD",
      "Extrassístoles ventriculares com morfologia de BRE",
      "Extrassístoles ventriculares de via de saída do VD",
      "Extrassístoles ventriculares de via de saída do VE",
      "Extrassístoles ventriculares fasciculares",

      // Padrões de Extrassístoles
      "Extrassístoles ventriculares pareadas (duplas)",
      "Extrassístoles ventriculares em salva",
      "Bigeminismo ventricular",
      "Trigeminismo ventricular",
      "Quadrigeminismo ventricular",
      "Bigeminismo atrial",
      "Trigeminismo atrial",

      // Outros Padrões
      "Taquicardia ventricular não sustentada (TVNS)",
      "Salva de TV (3 ou mais batimentos)",
      "Batimentos de fusão",
      "Batimentos de captura",
      "Pausa compensatória completa",
      "Pausa compensatória incompleta",
      "Extrassístoles interpoladas",
      "Fenômeno R sobre T",
    ],
  },

  // ==========================================================================
  // INTERVALO QT
  // ==========================================================================
  qt: {
    titulo: "Intervalo QT",
    frases: [
      // QT Normal
      "Intervalo QT normal",
      "Intervalo QTc normal",
      "Intervalo QTc dentro dos limites da normalidade",
      "QTc no limite superior da normalidade",

      // QT Prolongado
      "Intervalo QTc prolongado",
      "Intervalo QTc prolongado (>450ms em homens, >460ms em mulheres)",
      "Intervalo QTc acentuadamente prolongado (>500ms)",
      "Prolongamento do intervalo QT",
      "QT longo adquirido",
      "Padrão sugestivo de síndrome do QT longo",
      "Síndrome do QT longo tipo 1 (ondas T de base larga)",
      "Síndrome do QT longo tipo 2 (ondas T de baixa amplitude, entalhadas)",
      "Síndrome do QT longo tipo 3 (ondas T tardias, ST prolongado)",
      "QT prolongado por medicamentos",
      "QT prolongado por distúrbio eletrolítico",

      // QT Curto
      "Intervalo QTc encurtado",
      "Intervalo QTc encurtado (<340ms)",
      "Síndrome do QT curto",

      // Dispersão do QT
      "Dispersão do QT aumentada",
      "Dispersão do intervalo QT",

      // Outros
      "Alternância de onda T",
      "Macroalternância de onda T",
      "Microalternância de onda T",
    ],
  },

  // ==========================================================================
  // ONDA U
  // ==========================================================================
  ondaU: {
    titulo: "Onda U",
    frases: [
      "Onda U visível",
      "Onda U normal",
      "Onda U proeminente",
      "Onda U aumentada (sugestiva de hipocalemia)",
      "Onda U invertida",
      "Onda U invertida em precordiais (sugestiva de isquemia)",
      "Pseudo-prolongamento do QT por onda U proeminente",
    ],
  },

  // ==========================================================================
  // ALTERAÇÕES DE VOLTAGEM
  // ==========================================================================
  voltagem: {
    titulo: "Voltagem",
    frases: [
      // Baixa Voltagem
      "Baixa voltagem do QRS",
      "Baixa voltagem do QRS no plano frontal",
      "Baixa voltagem do QRS no plano horizontal",
      "Baixa voltagem do QRS difusa",
      "Baixa voltagem generalizada (QRS <5mm em derivações periféricas e <10mm em precordiais)",
      "Microvoltagem",
      "Baixa voltagem sugestiva de derrame pericárdico",
      "Baixa voltagem sugestiva de obesidade",
      "Baixa voltagem sugestiva de DPOC/enfisema",
      "Baixa voltagem sugestiva de amiloidose cardíaca",
      "Baixa voltagem sugestiva de hipotireoidismo",
      "Baixa voltagem sugestiva de mixedema",

      // Alta Voltagem
      "Alta voltagem do QRS",
      "Alta voltagem em derivações precordiais",
      "Alta voltagem sem critérios para hipertrofia",
      "Alta voltagem por biotipo longilíneo",
      "Alta voltagem por parede torácica delgada",
    ],
  },

  // ==========================================================================
  // PROGRESSÃO DE ONDA R
  // ==========================================================================
  progressaoR: {
    titulo: "Progressão de R",
    frases: [
      "Progressão normal de onda R em precordiais",
      "Progressão lenta de onda R em precordiais",
      "Progressão lenta de R (zona de transição deslocada para a esquerda)",
      "Má progressão de onda R em precordiais",
      "Ausência de progressão de onda R",
      "Zona de transição em V3-V4 (normal)",
      "Zona de transição precoce (V1-V2)",
      "Zona de transição tardia (V5-V6)",
      "Transição abrupta",
      "Onda R dominante precoce em V1",
      "Relação R/S >1 em V1",
      "Perda de onda R em precordiais anteriores",
    ],
  },

  // ==========================================================================
  // PADRÕES ESPECÍFICOS E SÍNDROMES
  // ==========================================================================
  padroes: {
    titulo: "Padrões Específicos",
    frases: [
      // Síndrome de Brugada
      "Padrão de Brugada",
      "Padrão de Brugada tipo 1 (padrão coved - supra de ST ≥2mm em V1-V2 com T negativa)",
      "Padrão de Brugada tipo 2 (padrão saddleback - supra de ST ≥2mm em V1-V2)",
      "Padrão de Brugada tipo 3 (padrão saddleback <1mm)",
      "Padrão de Brugada induzido por febre",
      "Padrão de Brugada induzido por drogas",

      // Cardiomiopatia Hipertrófica
      "Padrão sugestivo de cardiomiopatia hipertrófica",
      "Ondas Q septais profundas (pseudoinfarto)",
      "Hipertrofia ventricular esquerda com ondas T invertidas gigantes",
      "Padrão de cardiomiopatia hipertrófica apical (ondas T negativas gigantes em precordiais)",

      // Cardiomiopatia/Displasia Arritmogênica do VD
      "Padrão sugestivo de displasia arritmogênica do VD",
      "Onda epsilon em V1-V2",
      "Ondas T negativas em V1-V3 (além da idade juvenil)",
      "QRS prolongado em V1-V3 (>110ms)",

      // Síndrome de Takotsubo
      "Padrão sugestivo de síndrome de Takotsubo",
      "Supradesnível de ST com ondas T negativas difusas",
      "QTc prolongado com alterações de ST-T difusas",

      // Outros Padrões
      "Repolarização precoce",
      "Repolarização precoce benigna",
      "Padrão de repolarização precoce em derivações inferiores",
      "Padrão de repolarização precoce em derivações laterais",
      "Elevação do ponto J",
      "Onda J (onda de Osborn)",
      "Padrão de hipotermia (onda de Osborn)",
      "Padrão S1Q3T3 (sugestivo de embolia pulmonar/sobrecarga aguda de VD)",
      "Padrão S1S2S3",
      "Padrão de pericardite (supra de ST difuso côncavo com infra de PR)",
      "Infradesnível de PR",
      "Padrão de miopericardite",
      "Alternância elétrica",
      "Alternância elétrica (sugestiva de derrame pericárdico volumoso)",
      "Pseudoinfarto",
      "Padrão pseudoinfarto por BRE",
      "Padrão pseudoinfarto por CMH",
      "Padrão de cor pulmonale agudo",
      "Padrão de cor pulmonale crônico",
      "Padrão de DPOC/enfisema pulmonar",

      // Canalopatias
      "Padrão sugestivo de QT longo congênito",
      "Padrão sugestivo de QT curto congênito",
      "Padrão sugestivo de taquicardia ventricular polimórfica catecolaminérgica",

      // Doenças Infiltrativas
      "Padrão sugestivo de amiloidose cardíaca (baixa voltagem + pseudoinfarto)",
      "Padrão sugestivo de sarcoidose cardíaca",
    ],
  },

  // ==========================================================================
  // ALTERAÇÕES METABÓLICAS E ELETROLÍTICAS
  // ==========================================================================
  metabolico: {
    titulo: "Alterações Metabólicas",
    frases: [
      // Potássio
      "Padrão sugestivo de hipercalemia",
      "Hipercalemia leve (ondas T apiculadas)",
      "Hipercalemia moderada (alargamento do QRS, achatamento de P)",
      "Hipercalemia grave (padrão sinusoidal)",
      "Ondas T em tenda por hipercalemia",
      "Padrão sugestivo de hipocalemia",
      "Hipocalemia (achatamento de T, onda U proeminente, infradesnível de ST)",
      "Onda U proeminente por hipocalemia",
      "Pseudoprolongamento do QT por onda U (hipocalemia)",

      // Cálcio
      "Padrão sugestivo de hipercalcemia",
      "QT curto por hipercalcemia",
      "Padrão sugestivo de hipocalcemia",
      "QT prolongado por hipocalcemia",

      // Magnésio
      "Alterações sugestivas de hipomagnesemia",
      "QT prolongado por hipomagnesemia",

      // Outros
      "Alterações sugestivas de distúrbio eletrolítico",
      "Padrão sugestivo de hipotermia",
      "Onda de Osborn (onda J) por hipotermia",
      "Bradicardia por hipotermia",
      "Padrão sugestivo de hipotireoidismo",
      "Bradicardia sinusal + baixa voltagem + QT prolongado (hipotireoidismo)",
      "Padrão sugestivo de hipertireoidismo",
      "Taquicardia sinusal + FA (hipertireoidismo)",
    ],
  },

  // ==========================================================================
  // EFEITOS DE MEDICAMENTOS
  // ==========================================================================
  medicamentos: {
    titulo: "Efeitos de Medicamentos",
    frases: [
      // Digital
      "Alterações sugestivas de uso de digital",
      "Impregnação digitálica",
      "Cubeta digitálica (infradesnível de ST com concavidade superior)",
      "Intoxicação digitálica (arritmias + cubeta)",

      // Antiarrítmicos
      "Alterações por antiarrítmicos classe Ia (alargamento de QRS e QT)",
      "Alterações por antiarrítmicos classe Ic (alargamento de QRS)",
      "Alterações por antiarrítmicos classe III (prolongamento de QT)",
      "Alterações por amiodarona",
      "Bradicardia sinusal por betabloqueador",
      "Bradicardia por bloqueador de canal de cálcio",

      // Psicotrópicos
      "Prolongamento de QT por antipsicótico",
      "Prolongamento de QT por antidepressivo tricíclico",
      "Alterações de ST-T por antidepressivo tricíclico",

      // Outros
      "Prolongamento de QT medicamentoso",
      "Bradicardia medicamentosa",
      "Alterações de ST-T por medicamentos",
    ],
  },

  // ==========================================================================
  // DISPOSITIVOS CARDÍACOS (DCEI)
  // ==========================================================================
  dispositivos: {
    titulo: "Dispositivos Cardíacos",
    frases: [
      // Marca-passo
      "Presença de marca-passo cardíaco",
      "Espículas de marca-passo",
      "Ritmo de marca-passo adequado",
      "Captura atrial adequada",
      "Captura ventricular adequada",
      "Sensibilidade atrial adequada",
      "Sensibilidade ventricular adequada",
      "Marca-passo com funcionamento normal",

      // Disfunções
      "Falha de captura atrial",
      "Falha de captura ventricular",
      "Falha de sensibilidade (undersensing)",
      "Hipersensibilidade (oversensing)",
      "Espículas sem captura",
      "Inibição inapropriada do marca-passo",
      "Taquicardia mediada por marca-passo",

      // CDI/Ressincronizador
      "Presença de cardiodesfibrilador implantável (CDI)",
      "Presença de ressincronizador cardíaco (TRC)",
      "Ritmo de estimulação biventricular",
      "Padrão de estimulação biventricular adequado",
      "Perda de ressincronização",

      // Alterações por Estimulação
      "Alterações de repolarização por estimulação ventricular",
      "Memória elétrica por estimulação ventricular prévia",
      "Pseudo-STEMI por estimulação ventricular direita",
    ],
  },

  // ==========================================================================
  // ECG PEDIÁTRICO E VARIANTES POR IDADE
  // ==========================================================================
  pediatrico: {
    titulo: "Pediátrico / Idade",
    frases: [
      // Neonatos e Lactentes
      "ECG compatível com padrão neonatal",
      "Predomínio de forças direitas (normal para idade)",
      "Onda T positiva em V1 (normal até 7 dias de vida)",
      "Onda T negativa em V1 (normal após 7 dias de vida)",
      "Eixo desviado para a direita (normal para idade)",
      "FC elevada compatível com idade",

      // Crianças
      "ECG compatível com a faixa etária pediátrica",
      "Variação respiratória normal",
      "Arritmia sinusal respiratória (normal para idade)",
      "Ondas T negativas em V1-V3 (padrão juvenil)",
      "Progressão de onda R compatível com idade",

      // Adolescentes e Adultos Jovens
      "Padrão juvenil persistente",
      "Ondas T negativas juvenis em V1-V3",
      "Repolarização precoce (variante normal)",

      // Atletas
      "ECG de atleta",
      "Alterações adaptativas por treinamento",
      "Bradicardia sinusal de atleta",
      "Hipertrofia ventricular esquerda de atleta",
      "Repolarização precoce de atleta",
      "Ondas T negativas em atleta (avaliar conforme derivações)",
      "Critérios internacionais para interpretação de ECG em atletas",

      // Idosos
      "Alterações compatíveis com idade avançada",
      "Eixo desviado para a esquerda (comum em idosos)",
      "Distúrbio de condução inespecífico (idade)",
      "Alterações inespecíficas de ST-T (idade)",
    ],
  },

  // ==========================================================================
  // ARTEFATOS E QUALIDADE TÉCNICA
  // ==========================================================================
  artefatos: {
    titulo: "Artefatos / Técnica",
    frases: [
      // Artefatos
      "Presença de artefatos de registro",
      "Artefato de tremor muscular",
      "Artefato de movimento",
      "Artefato de linha de base instável",
      "Artefato de interferência elétrica (60Hz)",
      "Ruído elétrico excessivo",

      // Problemas Técnicos
      "Troca de eletrodos (provável troca de membros superiores)",
      "Troca de eletrodos (provável inversão de precordiais)",
      "Eletrodos mal posicionados",
      "Mau contato de eletrodo",
      "Calibração inadequada",
      "Velocidade de registro não padrão",
      "Derivação com registro ausente",
      "Derivação com baixa qualidade",

      // Recomendações
      "Traçado de qualidade técnica prejudicada",
      "Sugere-se repetir o exame com melhor técnica",
      "Laudo limitado por qualidade técnica",
      "Correlacionar com dados clínicos",
      "Comparar com ECG prévio",
    ],
  },

  // ==========================================================================
  // CONCLUSÕES NORMAIS E LIMÍTROFES
  // ==========================================================================
  normalidade: {
    titulo: "Normal / Limítrofe",
    frases: [
      // Normal
      "Eletrocardiograma normal",
      "Eletrocardiograma dentro dos limites da normalidade",
      "ECG normal",
      "ECG sem alterações significativas",
      "ECG sem anormalidades",
      "Traçado eletrocardiográfico normal",
      "Ritmo sinusal, ECG dentro da normalidade",
      "ECG normal para a idade",
      "ECG normal para sexo e idade",

      // Variantes do Normal
      "Variante do normal",
      "Achado sem significado patológico",
      "Alteração sem repercussão clínica",
      "Padrão variante da normalidade",

      // Limítrofes
      "Alterações limítrofes",
      "Alterações inespecíficas",
      "Achados inespecíficos",
      "Alterações mínimas sem significado clínico aparente",
      "Alterações de significado indeterminado",
      "ECG com alterações discretas",

      // Comparativos
      "ECG sem alterações em relação ao exame anterior",
      "ECG estável em comparação ao prévio",
      "Alterações semelhantes ao ECG anterior",
      "Melhora das alterações em relação ao ECG prévio",
      "Piora das alterações em relação ao ECG prévio",
      "Novas alterações em relação ao ECG anterior",
    ],
  },

  // ==========================================================================
  // RECOMENDAÇÕES E OBSERVAÇÕES
  // ==========================================================================
  recomendacoes: {
    titulo: "Recomendações",
    frases: [
      // Correlação Clínica
      "Correlacionar com quadro clínico",
      "Correlacionar com dados clínicos e laboratoriais",
      "Correlacionar com marcadores de necrose miocárdica",
      "Correlacionar com ecocardiograma",
      "Sugere-se avaliação cardiológica",
      "Sugere-se investigação complementar",

      // Comparação com ECG Prévio
      "Comparar com ECG prévio",
      "Comparar com eletrocardiogramas anteriores",
      "Sugere-se comparação com exames prévios",
      "Considerar ECG seriado",

      // Urgência
      "Alterações que requerem avaliação imediata",
      "Achados que requerem correlação clínica urgente",
      "Considerar síndrome coronariana aguda",
      "Considerar internação para monitorização",

      // Seguimento
      "Sugere-se acompanhamento cardiológico",
      "Sugere-se Holter de 24 horas",
      "Sugere-se teste ergométrico",
      "Sugere-se ecocardiograma",
      "Sugere-se estudo eletrofisiológico",
      "Repetir ECG após correção de distúrbios eletrolíticos",
      "Repetir ECG após suspensão de medicamento suspeito",
    ],
  },
};

// ============================================================================
// EXPORTAÇÃO DE CATEGORIAS ORDENADAS (para navegação no modal)
// ============================================================================
export const categoriasOrdenadas = [
  "ritmo",
  "ondaP",
  "conducaoAV",
  "conducaoIV",
  "eixo",
  "sobrecargas",
  "segmentoST",
  "ondaT",
  "isquemia",
  "extrassistoles",
  "qt",
  "ondaU",
  "voltagem",
  "progressaoR",
  "padroes",
  "metabolico",
  "medicamentos",
  "dispositivos",
  "pediatrico",
  "artefatos",
  "normalidade",
  "recomendacoes",
];

// ============================================================================
// FUNÇÃO AUXILIAR PARA BUSCA DE FRASES
// ============================================================================
export const buscarFrases = (termo) => {
  const resultados = [];
  const termoLower = termo.toLowerCase();

  Object.entries(frasesDatabase).forEach(([categoria, dados]) => {
    dados.frases.forEach((frase) => {
      if (frase.toLowerCase().includes(termoLower)) {
        resultados.push({
          categoria: dados.titulo,
          categoriaKey: categoria,
          frase: frase,
        });
      }
    });
  });

  return resultados;
};

// ============================================================================
// ESTATÍSTICAS DO BANCO
// ============================================================================
export const getEstatisticas = () => {
  let totalFrases = 0;
  const porCategoria = {};

  Object.entries(frasesDatabase).forEach(([key, dados]) => {
    const count = dados.frases.length;
    totalFrases += count;
    porCategoria[dados.titulo] = count;
  });

  return {
    totalFrases,
    totalCategorias: Object.keys(frasesDatabase).length,
    porCategoria,
  };
};
