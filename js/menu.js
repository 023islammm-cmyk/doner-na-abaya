(function () {
  var S = window.SITE;
  var M = S.menu;

  // Мәзір тек филиал таңдалғаннан кейін ашылады
  var savedBranch = null;
  try { savedBranch = localStorage.getItem('branch'); } catch (e) {}
  var branch = S.branches.filter(function (b) { return b.id === savedBranch; })[0];
  if (!branch) {
    location.replace('branch.html');
    return;
  }

  var list = document.querySelector('.list');
  var tabs = document.querySelector('.tabs');
  var counter = document.querySelector('.cart-count');
  var cartBtn = document.querySelector('.cart');
  var active = M[0].id;

  function lang() { return document.documentElement.lang; }

  function money(n) {
    return String(n).replace(/\B(?=(\d{3})+$)/g, ' ') + ' ' + S.currency;
  }

  // Себет: { "позиция|нұсқа": саны }
  function readCart() {
    try { return JSON.parse(localStorage.getItem('cart')) || {}; } catch (e) { return {}; }
  }

  function saveCart(c) {
    try { localStorage.setItem('cart', JSON.stringify(c)); } catch (e) {}
  }

  function showCount() {
    var c = readCart();
    var n = Object.keys(c).reduce(function (s, k) { return s + c[k]; }, 0);
    counter.textContent = n;
    counter.hidden = n === 0;
  }

  // Мәзірден алынған позициялар себетте қалмайды
  function cleanCart() {
    var c = readCart();
    Object.keys(c).forEach(function (key) {
      var e = findEntry(key);
      if (!e || (e.item.green && !branch.green)) delete c[key];
    });
    saveCart(c);
  }

  function add(key, btn) {
    var c = readCart();
    c[key] = (c[key] || 0) + 1;
    saveCart(c);
    showCount();
    [btn, cartBtn].forEach(function (el) {
      el.classList.remove('bump');
      void el.offsetWidth;
      el.classList.add('bump');
    });
  }

  function plus(key, label) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'plus glass';
    b.dataset.key = key;
    b.setAttribute('aria-label', label);
    b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/></svg>';
    return b;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function bigCard(item, i) {
    var l = lang();
    var card = el('article', 'item' + (item.tall ? ' tall' : '') + (item.isNew ? ' fresh' : '') + (item.tall || item.isNew || item.green ? ' stack' : '') + (item.green ? ' green ' + item.id : '') + (item.variants.length === 1 ? ' one' : ''));
    card.style.animationDelay = i * 60 + 'ms';

    var img = el('img', 'item-img');
    img.src = item.img;
    img.alt = '';
    card.appendChild(img);
    if (item.isNew) card.appendChild(el('span', 'item-new', 'NEW'));
    if (item.green) card.appendChild(el('span', 'item-green', 'GREEN'));

    var head = el('div', 'item-head');
    head.appendChild(el('h2', 'item-name', item.name[l]));
    if (item.desc) head.appendChild(el('p', 'item-desc', item.desc[l]));
    card.appendChild(head);

    var row = el('div', 'item-prices');
    item.variants.forEach(function (v) {
      var label = v.label ? v.label[l] : '';
      var box = el('div', 'buy');
      var pill = el('div', 'pill glass');
      if (label) pill.appendChild(el('span', 'pill-label', label));
      pill.appendChild(el('span', 'pill-price', money(v.price)));
      box.appendChild(pill);
      box.appendChild(plus(item.id + '|' + v.id, item.name[l] + (label ? ', ' + label : '')));
      row.appendChild(box);
    });
    card.appendChild(row);
    return card;
  }

  function render() {
    var l = lang();
    tabs.innerHTML = '';
    M.forEach(function (c) {
      var b = el('button', 'tab' + (c.id === active ? ' on' : ''), c.name[l]);
      b.type = 'button';
      b.dataset.id = c.id;
      b.setAttribute('aria-pressed', c.id === active);
      tabs.appendChild(b);
    });

    var cat = M.filter(function (c) { return c.id === active; })[0];
    list.innerHTML = '';
    list.className = 'list ' + cat.layout;
    cat.items.filter(function (it) { return !it.green || branch.green; }).forEach(function (it, i) {
      list.appendChild(bigCard(it, i));
    });
  }

  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('.tab');
    if (!b || b.dataset.id === active) return;
    active = b.dataset.id;
    render();
    window.scrollTo(0, 0);
  });

  list.addEventListener('click', function (e) {
    var b = e.target.closest('.plus');
    if (b) add(b.dataset.key, b);
  });

  // Себет терезесі
  var sheet = document.querySelector('.sheet');
  var winList = document.querySelector('.win-list');
  var winEmpty = document.querySelector('.win-empty');
  var winSum = document.querySelector('.win-sum');
  var winTotal = document.querySelector('.win-total');
  var orderBtn = document.querySelector('.order-btn');
  var winCart = document.querySelector('.win');
  var winAddr = document.querySelector('.win.addr');
  var sendBtn = document.querySelector('.send');
  var addrError = document.querySelector('.addr-error');
  var fName = document.getElementById('f-name');
  var fStreet = document.getElementById('f-street');
  var fHouse = document.getElementById('f-house');
  var fFlat = document.getElementById('f-flat');
  var fEntrance = document.getElementById('f-entrance');

  function findEntry(key) {
    var p = key.split('|');
    var found = null;
    M.forEach(function (c) {
      c.items.forEach(function (it) {
        if (it.id !== p[0]) return;
        it.variants.forEach(function (v) {
          if (v.id === p[1]) found = { item: it, variant: v };
        });
      });
    });
    return found;
  }

  function step(n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'step glass';
    b.dataset.step = n;
    b.textContent = n > 0 ? '+' : '−';
    return b;
  }

  function renderCart() {
    var l = lang();
    var c = readCart();
    var sum = 0;
    winList.innerHTML = '';
    Object.keys(c).forEach(function (key) {
      var e = findEntry(key);
      if (!e) return;
      sum += e.variant.price * c[key];

      var row = el('article', 'mini');
      row.dataset.key = key;
      var img = el('img', 'mini-img');
      img.src = e.item.img;
      img.alt = '';
      row.appendChild(img);

      var body = el('div', 'mini-body');
      body.appendChild(el('p', 'mini-name', e.item.name[l]));
      var line = el('div', 'mini-line');
      var label = e.variant.label ? e.variant.label[l] + ' · ' : '';
      line.appendChild(el('span', 'mini-price glass', label + money(e.variant.price)));
      var qty = el('div', 'qty');
      qty.appendChild(step(-1));
      qty.appendChild(el('span', 'qty-n', c[key]));
      qty.appendChild(step(1));
      line.appendChild(qty);
      body.appendChild(line);
      row.appendChild(body);

      var x = document.createElement('button');
      x.type = 'button';
      x.className = 'mini-x glass';
      x.setAttribute('aria-label', S.text.remove[l]);
      x.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>';
      row.appendChild(x);
      winList.appendChild(row);
    });
    var empty = !winList.children.length;
    winEmpty.hidden = !empty;
    winTotal.hidden = empty;
    orderBtn.hidden = empty;
    winSum.textContent = money(sum);
  }

  function showWin(addr) {
    winCart.hidden = addr;
    winAddr.hidden = !addr;
  }

  // Кассирге дайын хабарлама
  function buildMessage() {
    var l = lang();
    var T = S.text;
    var c = readCart();
    var sum = 0;
    var lines = [T.waName[l] + ': ' + fName.value.trim(), ''];
    Object.keys(c).forEach(function (key) {
      var e = findEntry(key);
      if (!e) return;
      var cost = e.variant.price * c[key];
      sum += cost;
      var name = e.item.name[l] + (e.variant.label ? ', ' + e.variant.label[l] : '');
      lines.push(name + (c[key] > 1 ? ' × ' + c[key] : '') + ': ' + money(cost));
    });
    var addr = fStreet.value.trim() + ' ' + fHouse.value.trim();
    if (fFlat.value.trim()) addr += ', ' + T.waFlat[l].replace('{n}', fFlat.value.trim());
    if (fEntrance.value.trim()) addr += ', ' + T.waEntrance[l].replace('{n}', fEntrance.value.trim());
    lines.push('', T.total[l] + ': ' + money(sum), '', T.addrTitle[l] + ': ' + addr, T.branch[l] + ': ' + branch.name[l]);
    return lines.join('\n');
  }

  function checkField(input) {
    var ok = input.value.trim() !== '';
    input.parentNode.classList.toggle('bad', !ok);
    return ok;
  }

  sendBtn.addEventListener('click', function (e) {
    var ok = checkField(fName);
    ok = checkField(fStreet) && ok;
    ok = checkField(fHouse) && ok;
    addrError.hidden = ok;
    if (!ok) {
      e.preventDefault();
      return;
    }
    sendBtn.href = 'https://wa.me/' + branch.phone + '?text=' + encodeURIComponent(buildMessage());
  });

  [fName, fStreet, fHouse].forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.value.trim()) input.parentNode.classList.remove('bad');
      if (fName.value.trim() && fStreet.value.trim() && fHouse.value.trim()) addrError.hidden = true;
    });
  });

  var branchName = document.querySelector('.addr-branch-name');

  function showBranch() {
    if (branch) branchName.textContent = S.text.branch[lang()] + ': ' + branch.name[lang()];
  }

  orderBtn.addEventListener('click', function () {
    showBranch();
    showWin(true);
  });
  document.querySelector('.addr-branch-change').addEventListener('click', function () {
    location.href = 'branch.html';
  });

  function openCart() {
    renderCart();
    showWin(false);
    sheet.hidden = false;
    document.body.classList.add('lock');
  }

  function closeCart() {
    sheet.hidden = true;
    document.body.classList.remove('lock');
    cartBtn.focus();
  }

  cartBtn.addEventListener('click', openCart);

  sheet.addEventListener('click', function (e) {
    if (e.target === sheet || e.target.closest('.win-close')) return closeCart();
    if (e.target.closest('.win-back')) return showWin(false);
    var row = e.target.closest('.mini');
    if (!row) return;
    var c = readCart();
    var key = row.dataset.key;
    var st = e.target.closest('.step');
    if (e.target.closest('.mini-x')) {
      delete c[key];
    } else if (st) {
      c[key] += Number(st.dataset.step);
      if (c[key] < 1) delete c[key];
    } else {
      return;
    }
    saveCart(c);
    showCount();
    renderCart();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !sheet.hidden) closeCart();
  });

  document.addEventListener('langchange', function () {
    render();
    renderCart();
    showBranch();
  });
  render();
  cleanCart();
  showCount();
})();
