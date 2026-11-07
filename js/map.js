// Филиал таңдау беті. Таңдалған филиал сақталады да, мәзір ашылады.
(function () {
  var S = window.SITE;
  var card = document.querySelector('.map-card');
  var box = document.getElementById('map');
  var list = document.querySelector('.map-list');
  var map = null;
  var pins = [];

  function lang() { return document.documentElement.lang; }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // Себетте Green тағамы бар ма
  function hasGreen() {
    var c = {};
    try { c = JSON.parse(localStorage.getItem('cart')) || {}; } catch (e) {}
    return Object.keys(c).some(function (k) { return k.indexOf('green-') === 0; });
  }

  function choose(b) {
    try { localStorage.setItem('branch', b.id); } catch (e) {}
    location.href = 'menu.html';
  }

  // Таңдауды алып, барлық филиалдарды қайта көрсетеді
  function clearChoice() {
    card.hidden = true;
    pins.forEach(function (p) { p.el.classList.remove('on'); });
    if (map) fitAll(600);
  }

  function showCard(b) {
    var l = lang();
    var T = S.text;
    pins.forEach(function (p) { p.el.classList.toggle('on', p.branch === b); });
    card.innerHTML = '';
    var x = el('button', 'map-card-x glass');
    x.type = 'button';
    x.setAttribute('aria-label', T.close[l]);
    x.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>';
    x.addEventListener('click', clearChoice);
    card.appendChild(x);
    card.appendChild(el('h3', 'map-card-name', b.name[l]));
    card.appendChild(el('p', 'map-card-addr', b.address[l]));
    card.appendChild(el('p', 'map-card-hours', b.hours[l]));
    card.appendChild(el('p', 'map-card-break', b.fridayBreak ? T.breakLabel[l] + ': ' + b.fridayBreak : T.noBreak[l]));
    var conflict = hasGreen() && !b.green;
    if (conflict) card.appendChild(el('p', 'map-card-warn', T.greenWarn[l]));
    var btn = el('button', 'order-btn glass map-pick', conflict ? T.pickNoGreen[l] : T.pickBranch[l]);
    btn.type = 'button';
    btn.addEventListener('click', function () { choose(b); });
    card.appendChild(btn);
    card.hidden = false;
  }

  function addPins() {
    S.branches.forEach(function (b) {
      var pin = el('button', 'pin');
      pin.type = 'button';
      pin.setAttribute('aria-label', b.name[lang()]);
      pin.innerHTML = '<img src="images/logo-round.webp" alt="">';
      pin.addEventListener('click', function (e) {
        e.stopPropagation();
        showCard(b);
        map.easeTo({ center: [b.lng, b.lat], zoom: Math.max(map.getZoom(), 14), pitch: 55, duration: 700 });
      });
      new window.maplibregl.Marker({ element: pin, anchor: 'bottom' }).setLngLat([b.lng, b.lat]).addTo(map);
      pins.push({ el: pin, branch: b });
    });
  }

  function fitAll(duration) {
    var bounds = new window.maplibregl.LngLatBounds();
    // Қаладан алыс филиал алғашқы көріністі кішірейтпейді
    S.branches.filter(function (b) { return !b.far; }).forEach(function (b) { bounds.extend([b.lng, b.lat]); });
    map.fitBounds(bounds, { padding: { top: 90, bottom: 80, left: 14, right: 40 }, maxZoom: 14, pitch: 50, bearing: -18, duration: duration || 0 });
  }

  function showList() {
    var l = lang();
    box.hidden = true;
    list.hidden = false;
    list.innerHTML = '';
    list.appendChild(el('p', 'map-fail', S.text.mapFail[l]));
    S.branches.forEach(function (b) {
      var row = el('button', 'map-row glass');
      row.type = 'button';
      row.appendChild(el('b', '', b.name[l]));
      row.appendChild(el('span', '', b.address[l]));
      row.addEventListener('click', function () { showCard(b); });
      list.appendChild(row);
    });
  }

  function start() {
    if (!window.maplibregl) return showList();
    try {
      map = new window.maplibregl.Map({
        container: box,
        style: S.mapStyle,
        center: [S.branches[0].lng, S.branches[0].lat],
        zoom: 12,
        pitch: 50,
        bearing: -18,
        maxPitch: 70,
        attributionControl: { compact: true }
      });
    } catch (e) {
      map = null;
      return showList();
    }
    map.addControl(new window.maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    addPins();
    fitAll();
    map.on('click', function () {
      card.hidden = true;
      pins.forEach(function (p) { p.el.classList.remove('on'); });
    });
  }

  start();
})();
