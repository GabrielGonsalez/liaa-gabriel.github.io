(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('is-open', !expanded);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        nav.classList.remove('is-open');
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          if (active) link.classList.add('active');
          else link.classList.remove('active');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ---------------------------------------------------------------
  // Simulador didático: exemplos locais, sem chamada a uma LLM real.
  // ---------------------------------------------------------------
  const input = document.querySelector('#requirement-input');
  const compareButton = document.querySelector('#compare-button');
  const characterCount = document.querySelector('#requirement-count');
  const directOutput = document.querySelector('#direct-output');
  const guidedOutput = document.querySelector('#guided-output');
  const designerFlow = document.querySelector('#designer-flow');
  const explanation = document.querySelector('#demo-explanation');

  const normalizeText = (value) => value
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  function classifyRequirement(requirement) {
    const text = normalizeText(requirement);
    if ((text.includes('maior') || text.includes('maximo') || text.includes('maxima')) && text.includes('par')) {
      return 'largest-even';
    }
    if (text.includes('orden') || text.includes('classific')) {
      return text.includes('decresc') || text.includes('maior para menor')
        ? 'sort-desc' : 'sort-asc';
    }
    if (text.includes('duplic') || text.includes('repetid')) {
      return 'unique';
    }
    return 'generic';
  }

  function getExample(requirement, type) {
    const clean = requirement.trim().replace(/\s+/g, ' ');
    const short = clean.length > 112 ? `${clean.slice(0, 109)}...` : clean;

    if (type === 'largest-even') {
      return {
        steps: [
          ['start', 'Início'],
          ['normal', 'Receber a lista de inteiros'],
          ['normal', 'Percorrer cada elemento'],
          ['decision', 'O elemento é par?'],
          ['normal', 'Adicionar os pares aos candidatos'],
          ['decision', 'Existe algum candidato?'],
          ['normal', 'Retornar o maior par; senão, retornar None'],
          ['end', 'Fim']
        ],
        direct: `def maior_par(numeros):\n    pares = [n for n in numeros if n % 2 == 0]\n    return max(pares) if pares else None`,
        guided: `def maior_par(numeros):\n    # Fluxo explícito pelo Designer:\n    # 1. percorrer os elementos\n    # 2. selecionar apenas os pares\n    # 3. tratar a lista vazia\n    # 4. retornar o maior candidato\n    pares = [n for n in numeros if n % 2 == 0]\n    if not pares:\n        return None\n    return max(pares)`,
        note: 'Neste exemplo, a UML torna visíveis duas decisões importantes: o filtro de números pares e o tratamento do caso em que nenhum candidato foi encontrado. As implementações ilustrativas chegam à mesma regra, mas a segunda apresenta a sequência e os desvios antes do código.'
      };
    }

    if (type === 'sort-asc' || type === 'sort-desc') {
      const descending = type === 'sort-desc';
      const order = descending ? 'decrescente' : 'crescente';
      return {
        steps: [
          ['start', 'Início'],
          ['normal', 'Receber a lista'],
          ['normal', 'Validar a entrada'],
          ['decision', 'Qual é a ordem solicitada?'],
          ['normal', `Ordenar em ordem ${order}`],
          ['normal', 'Retornar a lista ordenada'],
          ['end', 'Fim']
        ],
        direct: `def ordenar(valores):\n    return sorted(valores${descending ? ', reverse=True' : ''})`,
        guided: `def ordenar(valores):\n    # Fluxo do Designer:\n    # 1. receber e validar a lista\n    # 2. aplicar a ordem definida no requisito\n    # 3. retornar o resultado\n    resultado = sorted(valores, reverse=${descending ? 'True' : 'False'})\n    return resultado`,
        note: `O diagrama explicita a validação da entrada e a decisão sobre a direção da ordenação. Neste exemplo didático, a regra identificada no requisito é a ordem ${order}.` 
      };
    }

    if (type === 'unique') {
      return {
        steps: [
          ['start', 'Início'],
          ['normal', 'Receber a sequência'],
          ['normal', 'Percorrer os elementos na ordem original'],
          ['decision', 'O elemento já foi encontrado?'],
          ['normal', 'Se for novo, adicionar ao resultado'],
          ['normal', 'Retornar a sequência sem repetições'],
          ['end', 'Fim']
        ],
        direct: `def remover_duplicados(itens):\n    return list(dict.fromkeys(itens))`,
        guided: `def remover_duplicados(itens):\n    # Fluxo do Designer:\n    # 1. percorrer na ordem de entrada\n    # 2. verificar se o elemento já apareceu\n    # 3. adicionar apenas elementos novos\n    resultado = []\n    vistos = set()\n    for item in itens:\n        if item not in vistos:\n            vistos.add(item)\n            resultado.append(item)\n    return resultado`,
        note: 'O diagrama destaca o laço de iteração e a decisão que evita inserir novamente um elemento já encontrado. A ordem original é preservada nesta implementação ilustrativa.'
      };
    }

    const sentences = clean
      .split(/[.;!?]+/)
      .map((part) => part.trim())
      .filter(Boolean);
    const action = sentences[0] || short;
    const edgeCase = sentences.length > 1 ? sentences[sentences.length - 1] : 'Tratar entradas inválidas e casos de borda';
    return {
      steps: [
        ['start', 'Início'],
        ['normal', 'Receber os dados de entrada'],
        ['normal', `Interpretar: ${action}`],
        ['decision', 'A entrada atende às condições?'],
        ['normal', 'Executar a transformação solicitada'],
        ['normal', `Verificar: ${edgeCase}`],
        ['normal', 'Retornar o resultado'],
        ['end', 'Fim']
      ],
      direct: `def resolver(entrada):\n    # Requisito recebido diretamente:\n    # ${short}\n    # Implementar a regra funcional e seus casos de borda.\n    raise NotImplementedError("Exemplo didático: complete a lógica")`,
      guided: `def resolver(entrada):\n    # Designer: decompor o requisito em etapas e decisões.\n    # Coder: implementar cada etapa do diagrama e validar\n    # os casos de borda antes de retornar o resultado.\n    # Requisito: ${short}\n    raise NotImplementedError("Exemplo didático: complete a lógica")`,
      note: 'O requisito não corresponde a um dos exemplos reconhecidos pelo simulador. Por isso, o editor exibe um esqueleto genérico e transforma o texto em etapas conceituais. Em um StructGen real, a LLM produziria e revisaria o diagrama e o código.'
    };
  }

  function renderDesignerFlow(steps) {
    if (!designerFlow) return;
    designerFlow.replaceChildren();
    steps.forEach(([kind, label], index) => {
      const node = document.createElement('div');
      node.className = `designer-node${kind === 'decision' ? ' is-decision' : ''}`;
      node.textContent = label;
      designerFlow.appendChild(node);
      if (index < steps.length - 1) {
        const arrow = document.createElement('div');
        arrow.className = 'designer-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = kind === 'decision' ? '↙   ↓   ↘' : '↓';
        designerFlow.appendChild(arrow);
      }
    });
  }

  function runComparison() {
    if (!input || !directOutput || !guidedOutput || !designerFlow) return;
    const requirement = input.value.trim();
    if (!requirement) {
      input.focus();
      explanation.textContent = 'Escreva um requisito funcional para executar a demonstração.';
      directOutput.textContent = 'Aguardando requisito...';
      guidedOutput.textContent = 'Aguardando requisito...';
      designerFlow.replaceChildren();
      return;
    }

    const type = classifyRequirement(requirement);
    const demo = getExample(requirement, type);
    directOutput.textContent = demo.direct;
    guidedOutput.textContent = demo.guided;
    renderDesignerFlow(demo.steps);
    explanation.textContent = demo.note;
  }

  if (input && compareButton) {
    const updateCount = () => {
      if (characterCount) characterCount.textContent = `${input.value.length} / 800 caracteres`;
    };
    input.addEventListener('input', updateCount);
    compareButton.addEventListener('click', runComparison);
    updateCount();
    runComparison();
  }

  document.querySelectorAll('.copy-output').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copy);
      if (!target) return;
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(target.textContent);
      } catch (error) {
        const temporary = document.createElement('textarea');
        temporary.value = target.textContent;
        document.body.appendChild(temporary);
        temporary.select();
        try { document.execCommand('copy'); } catch (_) { /* Clipboard unavailable. */ }
        temporary.remove();
      }
      button.textContent = 'Copiado';
      window.setTimeout(() => { button.textContent = original; }, 1400);
    });
  });
})();
