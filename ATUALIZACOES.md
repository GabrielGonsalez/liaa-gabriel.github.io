# Alterações feitas a partir do feedback do professor

## 1. Notas individuais dos três artigos

Foi adicionada uma tabela com as notas de Gemini, ChatGPT e DeepSeek para Calamo et al., Wan et al. (StructGen) e Li et al. (RealBench), além da média e do percentual normalizado. Barras visuais ajudam a comparar a variação entre as avaliações.

## 2. Pesos e cálculo

A Atividade 11 documenta a média aritmética das três avaliações, mas não apresenta subnotas ou pesos numéricos por critério. O site explica que cada modelo avaliador recebeu peso de 1/3 na média e declara que o peso interno dos critérios não foi informado. Uma rubrica com seis dimensões e pesos iguais aparece somente como proposta para uma futura reavaliação, sem alterar as notas já registradas.

## 3. Fluxograma do StructGen

Foi adicionado um fluxograma vetorial com entrada de requisito, Designer, diagrama UML de atividades, Coder, execução de testes e ciclos de feedback para reparo do código ou revisão do diagrama. O desenho é uma síntese didática do artigo e dos artefatos públicos, não uma transcrição de todos os detalhes internos.

## 4. Editor interativo

A seção “Demonstração interativa” permite editar requisitos e comparar geração direta com o fluxo Designer → UML → Coder. A funcionalidade é uma simulação local por regras JavaScript, sem chamada a uma LLM, sem API e sem execução do framework original. Essa limitação está destacada na própria página.

## 5. Desafios e adaptações da replicação

A página separa os artefatos encontrados (código, configuração, dependências e dois templates de prompt) das pendências (localização/versionamento dos benchmarks, disponibilidade de resultados brutos, correspondência entre prompts e experimentos publicados, identificação imutável dos modelos e divergência de versão Python). Também registra a adaptação planejada: reduzir o número de modelos, priorizar opções recentes, selecionar um recorte de benchmarks e documentar todas as diferenças.
