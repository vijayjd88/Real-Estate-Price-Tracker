(function () {
  'use strict';

  const TOTAL_STEPS = 7;   // 0 landing, 1-5 questions, 6 result
  const NUM_QUESTIONS = 5;

  const drinks = {
    latte: { name: 'Latte', description: 'Smooth, creamy, and comforting. Espresso with steamed milk and a thin layer of foam. Your chill, treat-yourself pick.' },
    cappuccino: { name: 'Cappuccino', description: 'Equal parts espresso, steamed milk, and foam. Bold enough to wake you up, smooth enough to savor. Perfect for morning focus.' },
    mocha: { name: 'Mocha', description: 'Chocolate and espresso with steamed milk. Sweet, indulgent, and a little adventurous. Your treat-yourself drink.' },
    americano: { name: 'Americano', description: 'Espresso diluted with hot water. Clean, bold, no frills. Ideal when you need focus and no milk.' },
    coldBrew: { name: 'Cold Brew', description: 'Smooth, low-acid, and refreshing. Great for afternoon or evening when you want something cool and easy.' },
    espresso: { name: 'Espresso', description: 'Short, intense, no milk. For when you want bold and direct. The adventurous choice.' },
    flatWhite: { name: 'Flat White', description: 'Ristretto and velvety microfoam. Balanced, creamy but coffee-forward. Your balanced, a-little-milk pick.' },
    cortado: { name: 'Cortado', description: 'Espresso cut with a small amount of warm milk. Bold meets smooth. Perfect when you want a little milk and lots of flavor.' },
  };

  const iceCream = {
    vanilla: { name: 'Classic Vanilla', description: 'Creamy, simple, and timeless. The chill choice that goes with everything. Sometimes the best treat is the one you know by heart.' },
    chocolate: { name: 'Decadent Chocolate', description: 'Rich and indulgent. For when you need a real treat. Bold cocoa, smooth finish.' },
    strawberry: { name: 'Strawberry', description: 'Sweet, fresh, and a little playful. Perfect for afternoon vibes or when you want something bright.' },
    mintChip: { name: 'Mint Chocolate Chip', description: 'Cool, refreshing, with a bit of crunch. The adventurous pick that still feels like a treat.' },
    coffee: { name: 'Coffee Ice Cream', description: 'Your two favorites in one. Bold and creamy. For the coffee lover who wants dessert.' },
    saltedCaramel: { name: 'Salted Caramel', description: 'Sweet, salty, and smooth. Balanced and a little fancy. Treat yourself.' },
    cookieDough: { name: 'Cookie Dough', description: 'Sweet, fun, and loaded with chunks. The ultimate treat-yourself scoop.' },
    sorbet: { name: 'Fruit Sorbet', description: 'Light, refreshing, no dairy. Clean and simple for when you want something easy.' },
  };

  const desserts = {
    brownie: { name: 'Brownie', description: 'Dense, chocolatey, and comforting. The classic treat-yourself pick. Best warm with a cold glass of milk.' },
    cheesecake: { name: 'Cheesecake', description: 'Creamy, rich, and a little fancy. Balanced sweetness and bold flavor. Your treat-yourself moment.' },
    tiramisu: { name: 'Tiramisu', description: 'Coffee and cream in dessert form. Bold and indulgent. For the adventurous coffee-and-dessert lover.' },
    fruitTart: { name: 'Fruit Tart', description: 'Light, fresh, and balanced. Sweet fruit on a buttery crust. Perfect for afternoon or when you want something bright.' },
    chocolateCake: { name: 'Chocolate Cake', description: 'Rich, decadent, and unapologetically sweet. The ultimate treat. Share or don\'t—we won\'t judge.' },
    croissant: { name: 'Butter Croissant', description: 'Simple, buttery, and elegant. Bold flavor without too much sweet. Your chill, balanced pick.' },
    iceCreamSundae: { name: 'Ice Cream Sundae', description: 'Why choose? Creamy, sweet, and loaded with toppings. The adventurous treat.' },
    lemonBar: { name: 'Lemon Bar', description: 'Tangy, sweet, and refreshing. Light but satisfying. Perfect for a chill afternoon.' },
  };

  const state = {
    currentStep: 0,
    answers: [],
  };

  function getSteps() {
    return document.querySelectorAll('.step');
  }

  function setProgressBar(stepIndex) {
    var percent = 0;
    if (stepIndex >= 1 && stepIndex <= 5) {
      percent = (stepIndex / 5) * 100;
    }
    document.querySelectorAll('.progress-bar').forEach(function (bar) {
      bar.setAttribute('aria-valuenow', Math.round(percent));
      var fill = bar.querySelector('.progress-fill');
      if (fill) fill.style.width = percent + '%';
    });
  }

  function showStep(stepIndex) {
    var steps = getSteps();
    steps.forEach(function (el, i) {
      el.classList.toggle('active', i === stepIndex);
    });
    state.currentStep = stepIndex;
    setProgressBar(stepIndex);

    // Update Q4 title by category
    var titleEl = document.getElementById('question-4-title');
    if (titleEl && state.answers[0]) {
      if (state.answers[0] === 'coffee') titleEl.textContent = 'Milk or no milk?';
      else if (state.answers[0] === 'icecream') titleEl.textContent = 'How do you like it?';
      else titleEl.textContent = 'How do you like it?';
    }
  }

  function getCoffeeRecommendation(a) {
    var mood = a[1], taste = a[2], time = a[3], milk = a[4];
    if (mood === 'chill' && (milk === 'creamy' || milk === 'alittle')) return 'latte';
    if (mood === 'chill' && milk === 'nomilk') return 'coldBrew';
    if (mood === 'focus' && milk === 'nomilk') return 'americano';
    if (mood === 'focus' && (milk === 'creamy' || milk === 'alittle')) return 'cappuccino';
    if (mood === 'treat' && (taste === 'sweet' || taste === 'unsure')) return 'mocha';
    if (mood === 'treat' && taste === 'balanced') return 'latte';
    if (mood === 'adventurous' && milk === 'nomilk') return 'espresso';
    if (mood === 'adventurous' && milk !== 'nomilk') return 'cortado';
    if (taste === 'bold' && milk === 'nomilk') return 'espresso';
    if (taste === 'bold' && milk === 'alittle') return 'cortado';
    if (taste === 'bold' && milk === 'creamy') return 'cappuccino';
    if (taste === 'sweet' && milk !== 'nomilk') return 'mocha';
    if (taste === 'balanced' && milk === 'alittle') return 'flatWhite';
    if (taste === 'balanced' && milk === 'creamy') return 'latte';
    if (time === 'evening') return 'coldBrew';
    if (time === 'afternoon' && milk === 'creamy') return 'latte';
    if (time === 'morning' && milk === 'nomilk') return 'americano';
    if (milk === 'nomilk') return 'americano';
    if (milk === 'creamy') return 'latte';
    if (milk === 'alittle') return 'flatWhite';
    return 'latte';
  }

  function getIceCreamRecommendation(a) {
    var mood = a[1], taste = a[2], time = a[3], style = a[4];
    if (mood === 'chill' && (style === 'creamy' || style === 'dontcare')) return 'vanilla';
    if (mood === 'chill' && style === 'nomilk') return 'sorbet';
    if (mood === 'treat' && (taste === 'sweet' || taste === 'unsure')) return 'cookieDough';
    if (mood === 'treat' && taste === 'balanced') return 'saltedCaramel';
    if (mood === 'adventurous') return 'mintChip';
    if (mood === 'focus' && taste === 'bold') return 'coffee';
    if (taste === 'bold') return 'chocolate';
    if (taste === 'sweet') return 'strawberry';
    if (taste === 'balanced' && style === 'alittle') return 'saltedCaramel';
    if (time === 'evening') return 'sorbet';
    if (style === 'nomilk') return 'sorbet';
    if (style === 'creamy') return 'vanilla';
    return 'vanilla';
  }

  function getDessertRecommendation(a) {
    var mood = a[1], taste = a[2], time = a[3], style = a[4];
    if (mood === 'chill' && (taste === 'balanced' || taste === 'unsure')) return 'lemonBar';
    if (mood === 'chill' && taste === 'sweet') return 'fruitTart';
    if (mood === 'treat' && (taste === 'sweet' || taste === 'unsure')) return 'chocolateCake';
    if (mood === 'treat' && taste === 'balanced') return 'cheesecake';
    if (mood === 'adventurous') return 'tiramisu';
    if (mood === 'focus' && taste === 'bold') return 'brownie';
    if (taste === 'bold' && style !== 'nomilk') return 'brownie';
    if (taste === 'sweet') return 'chocolateCake';
    if (taste === 'balanced') return 'cheesecake';
    if (time === 'afternoon') return 'fruitTart';
    if (time === 'evening') return 'croissant';
    if (style === 'nomilk') return 'croissant';
    return 'brownie';
  }

  function getRecommendation() {
    var cat = state.answers[0];
    var a = state.answers;
    if (cat === 'icecream') {
      return { category: 'icecream', id: getIceCreamRecommendation(a) };
    }
    if (cat === 'dessert') {
      return { category: 'dessert', id: getDessertRecommendation(a) };
    }
    return { category: 'coffee', id: getCoffeeRecommendation(a) };
  }

  function playCelebrate() {
    var el = document.getElementById('result-celebrate');
    if (!el) return;
    el.classList.remove('celebrate-on');
    el.offsetHeight;
    el.classList.add('celebrate-on');
    setTimeout(function () { el.classList.remove('celebrate-on'); }, 1200);
  }

  function renderResult() {
    var rec = getRecommendation();
    var categoryLabels = { coffee: 'Your perfect drink', icecream: 'Your perfect scoop', dessert: 'Your perfect dessert' };
    var categoryLabel = categoryLabels[rec.category] || 'Your perfect pick';
    var item;
    if (rec.category === 'coffee') item = drinks[rec.id];
    else if (rec.category === 'icecream') item = iceCream[rec.id];
    else item = desserts[rec.id];

    var content = document.getElementById('result-content');
    if (content) content.classList.remove('result-visible');

    document.getElementById('result-category').textContent = categoryLabel;
    document.getElementById('result-title').textContent = item.name;
    document.getElementById('result-description').textContent = item.description;

    requestAnimationFrame(function () {
      content.classList.add('result-visible');
      playCelebrate();
    });
  }

  function goNext() {
    if (state.currentStep === 0) {
      showStep(1);
      return;
    }
    if (state.currentStep >= 1 && state.currentStep <= 4) {
      showStep(state.currentStep + 1);
      return;
    }
    if (state.currentStep === 5) {
      renderResult();
      showStep(6);
    }
  }

  function goBack() {
    if (state.currentStep <= 1) return;
    showStep(state.currentStep - 1);
  }

  function selectOption(questionIndex, value, button) {
    state.answers[questionIndex] = value;
    updateOptionStyles(questionIndex);
    updateNextButton(questionIndex);
    if (button) {
      button.classList.add('just-selected');
      setTimeout(function () { button.classList.remove('just-selected'); }, 300);
    }
  }

  function updateOptionStyles(questionIndex) {
    var step = document.querySelector('.step[data-step="' + (questionIndex + 1) + '"]');
    if (!step) return;
    step.querySelectorAll('.option').forEach(function (btn) {
      btn.classList.toggle('selected', btn.getAttribute('data-value') === state.answers[questionIndex]);
    });
  }

  function updateNextButton(questionIndex) {
    var nextId = 'next-' + (questionIndex + 1);
    var nextBtn = document.getElementById(nextId);
    if (nextBtn) nextBtn.disabled = state.answers[questionIndex] === undefined;
  }

  function initOptionButtons() {
    document.querySelectorAll('.option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var q = parseInt(btn.getAttribute('data-question'), 10);
        var val = btn.getAttribute('data-value');
        selectOption(q, val, btn);
      });
    });
  }

  function initNavButtons() {
    document.getElementById('start-quiz').addEventListener('click', goNext);

    document.querySelectorAll('[id^="back-"]').forEach(function (btn) {
      btn.addEventListener('click', goBack);
    });

    document.querySelectorAll('[id^="next-"]').forEach(function (btn) {
      btn.addEventListener('click', goNext);
    });

    document.getElementById('retake').addEventListener('click', function () {
      state.answers = [];
      state.currentStep = 0;
      showStep(0);
      setProgressBar(0);
      document.querySelectorAll('.option').forEach(function (b) {
        b.classList.remove('selected', 'just-selected');
      });
      document.querySelectorAll('[id^="next-"]').forEach(function (b) {
        b.disabled = true;
      });
    });
  }

  function init() {
    initOptionButtons();
    initNavButtons();
    showStep(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
