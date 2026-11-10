# UML + IA — da modelagem à geração de código

Site acadêmico que documenta a evolução de um projeto sobre o papel da UML no desenvolvimento assistido por inteligência artificial. A trajetória apresentada parte de uma proposta de geração de diagramas UML com LLMs, passa pela investigação sobre a relevância da UML e chega ao planejamento de replicação do framework StructGen.

## Arquivos

- `index.html`: conteúdo e estrutura de todas as seções.
- `style.css`: identidade visual, layout responsivo e animações.
- `script.js`: menu para dispositivos móveis, animações de entrada e navegação ativa.
- `assets/favicon.svg`: ícone do site.

Não é necessário instalar dependências ou executar um processo de build.

## Visualizar localmente

Abra `index.html` no navegador. Para uma experiência mais próxima da publicação, também é possível iniciar um servidor local simples na pasta do projeto:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Publicar no GitHub Pages

1. Crie um repositório público no GitHub usando o padrão de nome solicitado pela disciplina: `<disciplina>-<nome>.github.io` (por exemplo, `liaa-gabriel.github.io`, caso `LIAA` seja a sigla correta da disciplina).
2. Envie todos os arquivos desta pasta para a raiz do repositório. O arquivo `index.html` deve ficar na raiz.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, depois salve.
6. Consulte a área **Pages** para obter o endereço publicado.

**Observação sobre o endereço:** no GitHub Pages, um site de usuário/organização usa um repositório com o nome exato `<usuario>.github.io`; um site de projeto publicado a partir de outro repositório normalmente usa o endereço `https://<usuario>.github.io/<repositorio>/`. Como a atividade determina um padrão próprio de nome, vale confirmar com o professor se ele espera o nome do repositório nesse formato ou um domínio de usuário. Consulte a documentação oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site.

## O que atualizar durante o semestre

Na seção **Progresso**, atualize os estados das etapas conforme a execução real. Quando iniciar os experimentos, acrescente datas, ambiente utilizado, versões dos modelos, comandos relevantes, resultados de Pass@1, dificuldades e diferenças em relação ao artigo original. Não marque uma etapa como concluída antes de ter evidências da execução.

Também personalize os metadados e textos que dependem da disciplina, do nome que deseja exibir e das entregas efetivamente realizadas.

## Fontes centrais

- Entrega acadêmica: *Especificação e plano experimental do projeto de IA*.
- Entrega acadêmica: *A UML ainda é necessária?*.
- Entrega acadêmica: *Comparação de replicabilidade dos estudos*.
- Wan et al., *Structure-guided function-level code generation with LLMs via UML activity diagrams* — https://doi.org/10.1016/j.neucom.2025.132502.
- Repositório oficial do StructGen — https://github.com/SEDevSys/StructGen.
