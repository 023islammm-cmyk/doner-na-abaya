(function () {
  var S = window.SITE;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = S.langs.indexOf(saved) > -1 ? saved : S.defaultLang;

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) {
      el.textContent = S.text[el.dataset.t][lang];
    });
    document.querySelectorAll('[data-t-label]').forEach(function (el) {
      el.setAttribute('aria-label', S.text[el.dataset.tLabel][lang]);
    });
    document.querySelectorAll('[data-ph]').forEach(function (el) {
      var t = S.text[el.dataset.ph][lang];
      el.placeholder = el.required ? t + ' *' : t;
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      var on = b.dataset.lang === lang;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on);
    });
  }

  var box = document.querySelector('.lang');
  if (box) {
    S.langs.forEach(function (l) {
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.lang = l;
      b.textContent = S.labels[l];
      b.addEventListener('click', function () {
        lang = l;
        try { localStorage.setItem('lang', l); } catch (e) {}
        render();
        document.dispatchEvent(new Event('langchange'));
      });
      box.appendChild(b);
    });
  }

  var fig = document.querySelector('.figure');
  if (fig) {
    var comboPrice = function (id) {
      var found = null;
      S.menu.forEach(function (g) {
        g.items.forEach(function (it) { if (it.id === id) found = it.variants[0].price; });
      });
      return String(found).replace(/\B(?=(\d{3})+$)/g, ' ') + ' ' + S.currency;
    };
    S.featured.forEach(function (f, i) {
      var c = document.createElement('div');
      c.className = 'combo c' + (i + 1);
      c.innerHTML =
        '<img src="' + f.img + '" alt="">' +
        '<div class="fc-label">' +
          '<svg class="fc-crown" viewBox="0 0 24 18" aria-hidden="true"><path fill="#ffd34d" stroke="#8a5a14" stroke-width="1" d="M2 6l5 4 5-8 5 8 5-4-2 11H4z"/></svg>' +
          '<div class="fc-name"><b data-t="' + f.t + '"></b><i data-t="fcCombo"></i></div>' +
          '<div class="fc-price">' + comboPrice(f.id) + '</div>' +
        '</div>';
      fig.appendChild(c);
    });
  }

  // ☰ бүйір мәзірі: index.html мен menu.html екеуінде де бірдей
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.3" fill="currentColor"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>'
  };
  var SOC_NAMES = { instagram: 'Instagram', whatsapp: 'WhatsApp', tiktok: 'TikTok' };

  function buildDrawer() {
    var burger = document.querySelector('.burger');
    if (!burger) return;

    var soc = ['instagram', 'whatsapp', 'tiktok'].map(function (k) {
      var url = S.social[k];
      return url
        ? '<a class="drawer-soc glass" href="' + url + '" target="_blank" rel="noopener" aria-label="' + SOC_NAMES[k] + '">' + ICONS[k] + '</a>'
        : '<button class="drawer-soc glass" type="button" data-soon aria-label="' + SOC_NAMES[k] + '">' + ICONS[k] + '</button>';
    }).join('');

    var d = document.createElement('div');
    d.className = 'drawer';
    d.innerHTML =
      '<button class="drawer-shade" type="button" data-t-label="close"></button>' +
      '<aside class="drawer-panel" role="dialog" aria-modal="true" tabindex="-1" data-t-label="menu">' +
        '<a class="drawer-brand" href="index.html" aria-label="' + S.name + '"><img src="images/logo-round.webp" alt=""><span class="wordmark"></span></a>' +
        '<nav class="drawer-nav">' +
          '<a class="drawer-btn glass" href="branch.html" data-t="allBranches"></a>' +
          '<a class="drawer-btn glass" href="apps.html" data-t="orderApps"></a>' +
          '<button class="drawer-btn glass" type="button" data-deals data-t="deals"></button>' +
          '<button class="drawer-btn glass" type="button" data-care data-t="care"></button>' +
        '</nav>' +
        '<p class="drawer-note" role="status" data-t="comingSoon" hidden></p>' +
        '<div class="drawer-foot">' +
          '<div class="drawer-social">' + soc + '</div>' +
          '<p class="drawer-copy">© 2026 ' + S.name + ' · <span data-t="city"></span></p>' +
        '</div>' +
      '</aside>';
    document.body.appendChild(d);

    // Себет сияқты терезе: Қамқорлық бөлімі мен Акция бөлімі ортақ қолданады
    var wins = [];
    function makeWin(id, titleKey, body, onOpen) {
      var s = document.createElement('div');
      s.className = 'sheet care';
      s.hidden = true;
      s.innerHTML =
        '<section class="win care-win" role="dialog" aria-modal="true" aria-labelledby="' + id + '" tabindex="-1">' +
          '<button class="win-close glass" type="button" data-t-label="close"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg></button>' +
          '<h2 class="win-title" id="' + id + '" data-t="' + titleKey + '"></h2>' + body +
        '</section>';
      document.body.appendChild(s);
      var w = {
        el: s,
        open: function () {
          close();
          if (onOpen) onOpen(s);
          s.hidden = false;
          document.body.classList.add('lock');
          s.querySelector('.care-win').focus({ preventScroll: true });
        },
        close: function () {
          if (s.hidden) return;
          s.hidden = true;
          document.body.classList.remove('lock');
          burger.focus({ preventScroll: true });
        }
      };
      s.querySelector('.win-close').addEventListener('click', w.close);
      s.addEventListener('click', function (e) {
        if (e.target === s) w.close();
      });
      wins.push(w);
      return w;
    }

    var careWin = makeWin('care-title', 'care',
      '<p class="care-lead" data-t="careLead"></p>' +
      '<p class="care-text" data-t="careText"></p>' +
      '<a class="order-btn care-send glass" target="_blank" rel="noopener">' + ICONS.whatsapp + '<span data-t="careBtn"></span></a>',
      function (s) {
        s.querySelector('.care-send').href = 'https://wa.me/' + S.carePhone + '?text=' + encodeURIComponent(S.text.careMsg[lang]);
      });
    d.querySelector('[data-care]').addEventListener('click', careWin.open);

    // Сілтемесі бос желі батырмасы «жақында» деп жазады
    var dealSoc = ['instagram', 'tiktok'].map(function (k) {
      var inner = ICONS[k] + '<span>' + SOC_NAMES[k] + '</span>';
      return S.social[k]
        ? '<a class="order-btn deal-soc glass" href="' + S.social[k] + '" target="_blank" rel="noopener">' + inner + '</a>'
        : '<button class="order-btn deal-soc glass" type="button" data-deal-soon>' + inner + '</button>';
    }).join('');
    var dealsWin = makeWin('deals-title', 'deals',
      '<p class="care-lead" data-t="dealsLead"></p>' +
      '<p class="care-text" data-t="dealsText"></p>' +
      '<p class="care-text deal-follow" data-t="dealsFollow"></p>' +
      dealSoc +
      '<p class="drawer-note deal-note" role="status" data-t="comingSoon" hidden></p>',
      function (s) { s.querySelector('.deal-note').hidden = true; });
    d.querySelector('[data-deals]').addEventListener('click', dealsWin.open);
    dealsWin.el.querySelectorAll('[data-deal-soon]').forEach(function (b) {
      b.addEventListener('click', function () { dealsWin.el.querySelector('.deal-note').hidden = false; });
    });

    var note = d.querySelector('.drawer-note');
    var panel = d.querySelector('.drawer-panel');

    function open() {
      note.hidden = true;
      d.classList.add('open');
      document.body.classList.add('lock');
      burger.setAttribute('aria-expanded', 'true');
      panel.focus({ preventScroll: true });
    }
    function close() {
      if (!d.classList.contains('open')) return;
      d.classList.remove('open');
      document.body.classList.remove('lock');
      burger.setAttribute('aria-expanded', 'false');
      burger.focus({ preventScroll: true });
    }

    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', open);
    d.querySelector('.drawer-shade').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); wins.forEach(function (w) { w.close(); }); }
    });
    d.querySelectorAll('[data-soon]').forEach(function (b) {
      b.addEventListener('click', function () { note.hidden = false; });
    });
  }

  document.querySelectorAll('[data-yandex]').forEach(function (a) { a.href = S.yandexUrl; });

  buildDrawer();
  render();
})();
