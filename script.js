(function () {
  'use strict';

  const API_BASE = '';
  const PAGE_SIZE = 20;

  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const bestCardsEl = document.getElementById('best-cards');
  const areasTbody = document.getElementById('areas-tbody');
  const paginationEl = document.getElementById('pagination');

  function showLoading(show) {
    loadingEl.hidden = !show;
    if (show) errorEl.hidden = true;
  }

  function showError(msg) {
    errorEl.textContent = msg || 'Something went wrong.';
    errorEl.hidden = !msg;
  }

  function getBudget() {
    const min = parseInt(document.getElementById('budget-min').value, 10);
    const max = parseInt(document.getElementById('budget-max').value, 10);
    return {
      min: isNaN(min) ? null : min,
      max: isNaN(max) ? null : max
    };
  }

  function getCity() {
    const tab = document.querySelector('.city-tabs .tab.active');
    return tab ? (tab.getAttribute('data-city') || '') : '';
  }

  function fitsBudget(area, budget) {
    if (budget.min != null && area.totalPriceMax != null && area.totalPriceMax < budget.min) return false;
    if (budget.max != null && area.totalPriceMin != null && area.totalPriceMin > budget.max) return false;
    return true;
  }

  function fetchAreas() {
    const city = getCity();
    const q = city ? '?city=' + encodeURIComponent(city) + '&_=' + Date.now() : '?_=' + Date.now();
    return fetch(API_BASE + '/api/areas' + q, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load areas');
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) throw new Error('Invalid response. Open the app from your deployed URL.');
        return res.json();
      });
  }

  function renderBestCards(areas) {
    const budget = getBudget();
    let list = areas.filter(function (a) { return a.belowCityAvg && fitsBudget(a, budget); });
    list = list.slice(0, 12);
    bestCardsEl.innerHTML = list.length
      ? list.map(function (a, i) {
          const range = (a.totalPriceMin != null && a.totalPriceMax != null)
            ? a.totalPriceMin + ' – ' + a.totalPriceMax + ' L'
            : '—';
          return (
            '<article class="card" role="listitem">' +
              '<span class="card-rank">' + (i + 1) + '</span>' +
              '<h3 class="card-locality">' + escapeHtml(a.locality) + '</h3>' +
              '<p class="card-city">' + escapeHtml(a.city) + '</p>' +
              '<p class="card-price">₹' + (a.pricePerSqFt != null ? a.pricePerSqFt.toLocaleString() : '—') + ' / sq ft</p>' +
              '<p class="card-range">' + range + '</p>' +
            '</article>'
          );
        }).join('')
      : '<p class="no-data">No areas match your filters.</p>';
  }

  function renderTable(areas, page) {
    const budget = getBudget();
    let list = areas.filter(function (a) { return fitsBudget(a, budget); });
    const total = list.length;
    const start = (page - 1) * PAGE_SIZE;
    const pageList = list.slice(start, start + PAGE_SIZE);

    areasTbody.innerHTML = pageList.map(function (a) {
      const range = (a.totalPriceMin != null && a.totalPriceMax != null)
        ? a.totalPriceMin + ' – ' + a.totalPriceMax + ' L'
        : '—';
      const value = a.belowCityAvg ? '<span class="badge good">Below avg</span>' : '—';
      return (
        '<tr>' +
          '<td>' + escapeHtml(a.locality) + '</td>' +
          '<td>' + escapeHtml(a.city) + '</td>' +
          '<td>' + (a.pricePerSqFt != null ? a.pricePerSqFt.toLocaleString() : '—') + '</td>' +
          '<td>' + range + '</td>' +
          '<td>' + value + '</td>' +
        '</tr>'
      );
    }).join('');

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    let paginationHtml = '';
    if (totalPages > 1) {
      if (page > 1) paginationHtml += '<button type="button" class="page-btn" data-page="' + (page - 1) + '">Previous</button>';
      paginationHtml += '<span class="page-info">Page ' + page + ' of ' + totalPages + '</span>';
      if (page < totalPages) paginationHtml += '<button type="button" class="page-btn" data-page="' + (page + 1) + '">Next</button>';
    }
    paginationEl.innerHTML = paginationHtml;

    paginationEl.querySelectorAll('.page-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        loadAndRender(parseInt(btn.getAttribute('data-page'), 10));
      });
    });
  }

  function escapeHtml(s) {
    if (s == null) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  var currentPage = 1;
  var cachedAreas = [];

  function loadAndRender(page) {
    if (page != null) currentPage = page;
    showLoading(true);
    showError('');
    fetchAreas()
      .then(function (data) {
        cachedAreas = Array.isArray(data) ? data : [];
        renderBestCards(cachedAreas);
        renderTable(cachedAreas, currentPage);
      })
      .catch(function (err) {
        showError(err.message || 'Failed to load areas');
        bestCardsEl.innerHTML = '';
        areasTbody.innerHTML = '';
        paginationEl.innerHTML = '';
      })
      .finally(function () {
        showLoading(false);
      });
  }

  document.querySelectorAll('.city-tabs .tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.city-tabs .tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      currentPage = 1;
      loadAndRender();
    });
  });

  document.getElementById('budget-min').addEventListener('input', function () { currentPage = 1; renderBestCards(cachedAreas); renderTable(cachedAreas, currentPage); });
  document.getElementById('budget-max').addEventListener('input', function () { currentPage = 1; renderBestCards(cachedAreas); renderTable(cachedAreas, currentPage); });

  loadAndRender();
})();
