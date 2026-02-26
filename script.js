(function () {
  'use strict';

  const TOTAL_STEPS = 7;
  const NUM_QUESTIONS = 5;

  const drinkMeta = {
    tagline: function (id) {
      var t = {
        latte: 'Keeps you cozy without tipping into wired.',
        cappuccino: 'Bold enough to wake you up, smooth enough to savor.',
        mocha: 'Sweet and indulgent—your treat-yourself moment.',
        americano: 'Clean, bold, no frills.',
        coldBrew: 'Smooth and refreshing for slow sips.',
        espresso: 'Short, intense, no compromise.',
        flatWhite: 'Balanced and creamy, coffee-forward.',
        cortado: 'Bold meets smooth in one small cup.',
      };
      return t[id] || 'A cup tuned to your vibe.';
    },
    tags: function (id) {
      var t = {
        latte: [
          { label: 'Caffeine', value: 'Gentle wake-up' },
          { label: 'Sweetness', value: 'Balanced comfort' },
          { label: 'Temperature', value: 'Steaming' },
          { label: 'Vibe', value: 'Soft landing' },
        ],
        cappuccino: [
          { label: 'Caffeine', value: 'Confident wake-up' },
          { label: 'Sweetness', value: 'Balanced' },
          { label: 'Temperature', value: 'Steaming' },
          { label: 'Vibe', value: 'Focused' },
        ],
        mocha: [
          { label: 'Caffeine', value: 'Moderate' },
          { label: 'Sweetness', value: 'Sweet' },
          { label: 'Temperature', value: 'Steaming' },
          { label: 'Vibe', value: 'Treat yourself' },
        ],
        americano: [
          { label: 'Caffeine', value: 'Strong' },
          { label: 'Sweetness', value: 'None' },
          { label: 'Temperature', value: 'Hot' },
          { label: 'Vibe', value: 'No-nonsense' },
        ],
        coldBrew: [
          { label: 'Caffeine', value: 'Smooth' },
          { label: 'Sweetness', value: 'Low' },
          { label: 'Temperature', value: 'Cold' },
          { label: 'Vibe', value: 'Chill' },
        ],
        espresso: [
          { label: 'Caffeine', value: 'Full' },
          { label: 'Sweetness', value: 'Bold only' },
          { label: 'Temperature', value: 'Hot' },
          { label: 'Vibe', value: 'Direct' },
        ],
        flatWhite: [
          { label: 'Caffeine', value: 'Balanced' },
          { label: 'Sweetness', value: 'Balanced' },
          { label: 'Temperature', value: 'Steaming' },
          { label: 'Vibe', value: 'Creamy but sharp' },
        ],
        cortado: [
          { label: 'Caffeine', value: 'Strong' },
          { label: 'Sweetness', value: 'Mild' },
          { label: 'Temperature', value: 'Hot' },
          { label: 'Vibe', value: 'Bold + smooth' },
        ],
      };
      return t[id] || t.latte;
    },
    whyThis: function (id) {
      var t = {
        latte: 'Keeps you cozy without tipping into wired. We aimed for a middle ground between clarity and comfort.',
        cappuccino: 'You get a stronger caffeine backbone to carry you into the day with enough foam to feel like a treat.',
        mocha: 'Chocolate and espresso together—sweet, indulgent, and a little adventurous. Perfect for a treat-yourself moment.',
        americano: 'Clean and direct. Ideal when you need focus and no milk. Full flavor, no frills.',
        coldBrew: 'Smooth, low-acid, and refreshing. Great for slow sips when you want something cool and easy.',
        espresso: 'Short and intense. For when you want bold and direct. The adventurous choice.',
        flatWhite: 'Ristretto and velvety microfoam. Balanced, creamy but coffee-forward.',
        cortado: 'Espresso cut with a little warm milk. Bold meets smooth in one small cup.',
      };
      return t[id] || t.latte;
    },
    quickMake: function (id) {
      var t = {
        latte: 'Steam your milk of choice, pull a shot (or two) of espresso or strong coffee, then add milk and a thin layer of foam.',
        cappuccino: 'Pull a shot of espresso. Steam milk to create foam, then pour equal parts espresso, steamed milk, and foam.',
        mocha: 'Pull espresso, add chocolate sauce or cocoa, steam milk, and top with foam. Sweeten to taste.',
        americano: 'Pull one or two shots of espresso, then add hot water to taste.',
        coldBrew: 'Steep coarsely ground coffee in cold water for 12–24 hours, then strain. Serve over ice or diluted.',
        espresso: 'Pull one or two shots of espresso. Drink as is.',
        flatWhite: 'Pull a double ristretto, steam milk to microfoam, and pour over the shot.',
        cortado: 'Pull one or two shots of espresso, then add an equal amount of steamed milk.',
      };
      return t[id] || t.latte;
    },
  };

  const drinks = {
    latte: { name: 'Latte', description: 'A cup tuned to your current vibe — balanced between comfort and character, built for slow sips and tiny breakthroughs.' },
    cappuccino: { name: 'Cappuccino', description: 'Equal parts espresso, steamed milk, and foam. Bold enough to wake you up, smooth enough to savor. Perfect for morning focus.' },
    mocha: { name: 'Mocha', description: 'Chocolate and espresso with steamed milk. Sweet, indulgent, and a little adventurous. Your treat-yourself drink.' },
    americano: { name: 'Americano', description: 'Espresso diluted with hot water. Clean, bold, no frills. Ideal when you need focus and no milk.' },
    coldBrew: { name: 'Cold Brew', description: 'Smooth, low-acid, and refreshing. Great for afternoon or evening when you want something cool and easy.' },
    espresso: { name: 'Espresso', description: 'Short, intense, no milk. For when you want bold and direct. The adventurous choice.' },
    flatWhite: { name: 'Flat White', description: 'Ristretto and velvety microfoam. Balanced, creamy but coffee-forward.' },
    cortado: { name: 'Cortado', description: 'Espresso cut with a small amount of warm milk. Bold meets smooth.' },
  };

  const iceCream = {
    vanilla: { name: 'Classic Vanilla', description: 'Creamy, simple, and timeless. The chill choice that goes with everything.' },
    chocolate: { name: 'Decadent Chocolate', description: 'Rich and indulgent. For when you need a real treat. Bold cocoa, smooth finish.' },
    strawberry: { name: 'Strawberry', description: 'Sweet, fresh, and a little playful. Perfect for afternoon vibes.' },
    mintChip: { name: 'Mint Chocolate Chip', description: 'Cool, refreshing, with a bit of crunch. The adventurous pick.' },
    coffee: { name: 'Coffee Ice Cream', description: 'Your two favorites in one. Bold and creamy.' },
    saltedCaramel: { name: 'Salted Caramel', description: 'Sweet, salty, and smooth. Balanced and a little fancy.' },
    cookieDough: { name: 'Cookie Dough', description: 'Sweet, fun, and loaded with chunks. The ultimate treat-yourself scoop.' },
    sorbet: { name: 'Fruit Sorbet', description: 'Light, refreshing, no dairy. Clean and simple.' },
  };

  const desserts = {
    brownie: { name: 'Brownie', description: 'Dense, chocolatey, and comforting. The classic treat-yourself pick.' },
    cheesecake: { name: 'Cheesecake', description: 'Creamy, rich, and a little fancy. Your treat-yourself moment.' },
    tiramisu: { name: 'Tiramisu', description: 'Coffee and cream in dessert form. Bold and indulgent.' },
    fruitTart: { name: 'Fruit Tart', description: 'Light, fresh, and balanced. Perfect for afternoon.' },
    chocolateCake: { name: 'Chocolate Cake', description: 'Rich, decadent, and unapologetically sweet.' },
    croissant: { name: 'Butter Croissant', description: 'Simple, buttery, and elegant. Your chill, balanced pick.' },
    iceCreamSundae: { name: 'Ice Cream Sundae', description: 'Why choose? Creamy, sweet, and loaded with toppings.' },
    lemonBar: { name: 'Lemon Bar', description: 'Tangy, sweet, and refreshing. Perfect for a chill afternoon.' },
  };

  const state = {
    currentStep: 0,
    answers: [],
  };

  function getSteps() {
    return document.querySelectorAll('.step');
  }

  function getSweetnessPercent() {
    var taste = state.answers[2];
    if (taste === 'sweet') return 75;
    if (taste === 'bold') return 20;
    if (taste === 'balanced') return 55;
    return 50;
  }

  function getVisualizerPosition() {
    var mood = state.answers[1];
    var taste = state.answers[2];
    var x = 50;
    var y = 50;
    if (mood === 'chill') y = 65;
    else if (mood === 'focus') y = 35;
    else if (mood === 'treat') y = 55;
    else if (mood === 'adventurous') y = 30;
    if (taste === 'sweet') x = 70;
    else if (taste === 'bold') x = 28;
    else if (taste === 'balanced') x = 50;
    else x = 50;
    return { x: x, y: y };
  }

  function updateLiveReading() {
    var cat = state.answers[0];
    var mood = state.answers[1];
    var taste = state.answers[2];
    var time = state.answers[3];
    var style = state.answers[4];
    var categoryLabel = !cat ? '—' : cat === 'coffee' ? 'Coffee' : cat === 'icecream' ? 'Ice cream' : 'Dessert';
    var moodLabel = !mood ? '—' : mood === 'chill' ? 'Chill' : mood === 'focus' ? 'Focused' : mood === 'treat' ? 'Treat' : 'Adventurous';
    var timeLabel = !time ? '—' : time === 'morning' ? 'Morning' : time === 'afternoon' ? 'Afternoon' : 'Evening';
    var sweetnessLabel = state.answers[2] ? getSweetnessPercent() + '%' : '—';
    var tempLabel = !time ? '—' : time === 'evening' ? 'Cold' : 'Hot';
    if (state.answers[0] === 'icecream') tempLabel = 'Cold';
    var milkLabel = !style ? '—' : style === 'creamy' ? 'Creamy' : style === 'alittle' ? 'A little' : style === 'nomilk' ? 'None' : 'Any';
    if (state.answers[0] !== 'coffee') milkLabel = style ? (style === 'nomilk' ? 'Light' : 'Creamy') : '—';

    setPill('pill-category', 'Pick', categoryLabel);
    setPill('pill-mood', 'Mood', moodLabel);
    setPill('pill-time', 'Time', timeLabel);
    setPill('pill-style', 'Sweetness', sweetnessLabel);
    setPill('pill-milk', state.answers[0] === 'coffee' ? 'Milk' : 'Style', milkLabel);
  }

  function setPill(id, prefix, value) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = value === '—' ? prefix + ' —' : prefix + ' ' + value;
    el.classList.toggle('highlight', value !== '—');
  }

  function updateVisualizer() {
    var dot = document.getElementById('visualizer-dot');
    if (!dot) return;
    var pos = getVisualizerPosition();
    dot.style.left = pos.x + '%';
    dot.style.top = pos.y + '%';
    dot.style.marginLeft = '-6px';
    dot.style.marginTop = '-6px';
  }

  function showStep(stepIndex) {
    var steps = getSteps();
    steps.forEach(function (el, i) {
      el.classList.toggle('active', i === stepIndex);
    });
    state.currentStep = stepIndex;

    var titleEl = document.getElementById('question-4-title');
    if (titleEl && state.answers[0]) {
      titleEl.textContent = state.answers[0] === 'coffee' ? 'Milk or no milk?' : 'How do you like it?';
    }

    updateLiveReading();
    updateVisualizer();
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
    if (cat === 'icecream') return { category: 'icecream', id: getIceCreamRecommendation(a) };
    if (cat === 'dessert') return { category: 'dessert', id: getDessertRecommendation(a) };
    return { category: 'coffee', id: getCoffeeRecommendation(a) };
  }

  function renderResult() {
    var rec = getRecommendation();
    var item;
    var badgeLabel = 'Today\'s cup';
    var tagline = '';
    var tags = [];
    var whyText = '';
    var makeText = '';

    if (rec.category === 'coffee') {
      item = drinks[rec.id];
      badgeLabel = 'Today\'s cup';
      tagline = drinkMeta.tagline(rec.id);
      tags = drinkMeta.tags(rec.id);
      whyText = drinkMeta.whyThis(rec.id);
      makeText = drinkMeta.quickMake(rec.id);
    } else if (rec.category === 'icecream') {
      item = iceCream[rec.id];
      badgeLabel = 'Today\'s scoop';
      tagline = 'A scoop tuned to your vibe.';
      tags = [
        { label: 'Sweetness', value: 'Your pick' },
        { label: 'Vibe', value: item.name },
      ];
      whyText = item.description + ' We matched it to your mood and taste.';
      makeText = 'Grab a scoop from your favorite spot, or make it at home with your go-to base and toppings.';
    } else {
      item = desserts[rec.id];
      badgeLabel = 'Today\'s dessert';
      tagline = 'A dessert tuned to your vibe.';
      tags = [
        { label: 'Sweetness', value: 'Your pick' },
        { label: 'Vibe', value: item.name },
      ];
      whyText = item.description + ' We matched it to your mood and taste.';
      makeText = 'Pick it up at a bakery or café, or look up a recipe and make it at home.';
    }

    document.getElementById('result-badge-label').textContent = badgeLabel;
    document.getElementById('result-tagline').textContent = tagline;
    document.getElementById('result-title').textContent = item.name;
    document.getElementById('result-description').textContent = item.description;

    var tagsEl = document.getElementById('result-tags');
    tagsEl.innerHTML = '';
    tags.forEach(function (t) {
      var span = document.createElement('span');
      span.className = 'result-tag';
      span.textContent = t.label + ' ' + t.value;
      tagsEl.appendChild(span);
    });

    document.getElementById('result-why').textContent = whyText;
    document.getElementById('result-make').textContent = makeText;

    var content = document.getElementById('result-content');
    content.classList.remove('result-visible');
    requestAnimationFrame(function () {
      content.classList.add('result-visible');
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
    updateLiveReading();
    updateVisualizer();
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
      document.querySelectorAll('.option').forEach(function (b) {
        b.classList.remove('selected', 'just-selected');
      });
      document.querySelectorAll('[id^="next-"]').forEach(function (b) {
        b.disabled = true;
      });
      updateLiveReading();
      updateVisualizer();
    });

    var tweakBtn = document.getElementById('tweak');
    if (tweakBtn) {
      tweakBtn.addEventListener('click', function () {
        state.answers = [];
        state.currentStep = 0;
        showStep(0);
        document.querySelectorAll('.option').forEach(function (b) {
          b.classList.remove('selected', 'just-selected');
        });
        document.querySelectorAll('[id^="next-"]').forEach(function (b) {
          b.disabled = true;
        });
        updateLiveReading();
        updateVisualizer();
      });
    }
  }

  function init() {
    initOptionButtons();
    initNavButtons();
    showStep(0);
    updateLiveReading();
    updateVisualizer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
