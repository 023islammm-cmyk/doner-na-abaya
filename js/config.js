// Әр бизнеске тек осы файл өзгертіледі.
// Мәзір позицияларын қысқа жазуға арналған көмекшілер
function doner(id, img, name, p1, p2) {
  return {
    id: 'doner-' + id, img: 'images/' + img + '.webp', name: name,
    variants: [
      { id: '1x', price: p1, label: { kk: '1x', ru: '1x', en: '1x' } },
      { id: '1.5x', price: p2, label: { kk: '1,5x', ru: '1,5x', en: '1.5x' } }
    ]
  };
}
function combo(id, img, name, desc, price) {
  return {
    id: 'combo-' + id, img: 'images/' + img + '.webp', isNew: true, name: name, desc: desc,
    variants: [{ id: '1', price: price, label: null }]
  };
}
function green(id, img, name, p1, p2, p3) {
  return {
    id: 'green-' + id, img: 'images/' + img + '.webp', green: true, name: name,
    desc: { kk: 'тек қана Тұран, 55 және Мұхамедханов, 6Б нүктелерінде', ru: 'только в точках Туран, 55 и Мухамедханов, 6Б', en: 'only at Turan 55 and Mukhamedkhanov 6B' },
    variants: [
      { id: 'chicken', price: p1, label: { kk: 'тауық еті', ru: 'курица', en: 'chicken' } },
      { id: 'beef', price: p2, label: { kk: 'сиыр еті', ru: 'говядина', en: 'beef' } },
      { id: 'assorti', price: p3, label: { kk: 'ассорти', ru: 'ассорти', en: 'assorted' } }
    ]
  };
}
function drink(id, img, name, sizes) {
  return {
    id: id, img: 'images/' + img + '.webp', tall: true,
    name: typeof name === 'string' ? { kk: name, ru: name, en: name } : name,
    variants: sizes.map(function (z) {
      return { id: z[0], price: z[1], label: { kk: z[0] + ' л', ru: z[0] + ' л', en: z[0].replace(',', '.') + ' L' } };
    })
  };
}
function extra(id, img, name, desc, price) {
  return {
    id: id, img: 'images/' + img + '.webp', tall: true, name: name, desc: desc,
    variants: [{ id: '1', price: price, label: null }]
  };
}

var CARE_PHONE = '77755403772'; // Қамқорлық бөлімінің WhatsApp нөмірі
var TEST_PHONE = '77079460578'; // сынақ нөмірі, кейін әр филиалға өз нөмірі қойылады
var H24 = { kk: '24/7 жұмыс жасайды', ru: 'Работает 24/7', en: 'Open 24/7' };
var H10 = '10:00 – 23:00';
// Жұма күнгі техникалық үзіліс. Тізімде жоқ филиал үзіліссіз жұмыс жасайды.
var B1 = '12:30 – 14:00';
var FRIDAY_BREAK = {
  'edil-26': B1, 'omarov-2': B1, 'kenesary-47': B1, 'amanzholov-28': '13:00 – 13:45',
  'alfarabi-11': B1, 'akmeshit-13-2': B1, 'mangilik-el-51': B1, 'turan-55': B1,
  'mukhamedkhanov-6b': '13:00 – 14:00', 'saraishyk-5': B1, 'kosshy': B1,
  'kosshygululy-10': '13:00 – 14:00'
};
function branch(id, lat, lng, n, place, hours, green, far) {
  var name = { kk: n[0], ru: n[1], en: n[2] };
  var city = { kk: 'Астана', ru: 'Астана', en: 'Astana' };
  var p = typeof place === 'string' ? { kk: place, ru: place, en: place } : place;
  return {
    id: id, lat: lat, lng: lng, phone: TEST_PHONE, green: !!green, far: !!far, name: name,
    fridayBreak: FRIDAY_BREAK[id] || null,
    address: p || city,
    hours: typeof hours === 'string' ? { kk: hours, ru: hours, en: hours } : hours
  };
}

window.SITE = {
  name: 'Doner na Abaya',
  kaspiUrl: '',    // Kaspi төлем сілтемесі (кейін қойылады)
  yandexUrl: 'https://eda.yandex.kz/ru-kz/astana/r/doner_na_abaya', // Яндекс Go-дағы мәзір
  carePhone: CARE_PHONE,
  // Әлеуметтік желілер. Сілтеме бос болса, батырма «жақында» деп жазады.
  social: {
    instagram: 'https://www.instagram.com/doner_na_abaya_astanaa',
    whatsapp: 'https://wa.me/' + CARE_PHONE,
    tiktok: 'https://www.tiktok.com/@doner_na_abaya_astana'
  },
  currency: '₸',
  langs: ['kk', 'ru', 'en'],
  defaultLang: 'kk',
  labels: { kk: 'ҚАЗ', ru: 'РУС', en: 'ENG' },
  text: {
    order:  { kk: 'Тапсырыс беру', ru: 'Заказать', en: 'Order now' },
    menu:   { kk: 'Мәзір', ru: 'Меню', en: 'Menu' },
    soon:   { kk: 'Мәзір беті келесі қадамда жасалады', ru: 'Страница меню будет на следующем шаге', en: 'The menu page comes in the next step' },
    back:   { kk: 'Артқа', ru: 'Назад', en: 'Back' },
    allBranches: { kk: 'Барлық филиалдар', ru: 'Все филиалы', en: 'All branches' },
    orderApps: { kk: 'Қосымшалармен тапсырыс беру', ru: 'Заказать через приложения', en: 'Order via apps' },
    deals:  { kk: 'Акция және жеңілдік', ru: 'Акции и скидки', en: 'Deals and discounts' },
    care:   { kk: 'Қамқорлық бөлімі', ru: 'Отдел заботы', en: 'Customer care' },
    careLead: { kk: 'Doner na Abaya-ны таңдағаныңызға рақмет!', ru: 'Спасибо, что выбираете Doner na Abaya!', en: 'Thank you for choosing Doner na Abaya!' },
    careText: { kk: 'Сіздің пікіріңіз біз үшін маңызды. Тағамның дәмі, қызмет көрсету, жеткізу немесе тапсырыс туралы ойыңызбен бөлісіңіз. Ұсыныстарыңыз біздің жұмысымызды жақсартуға көмектеседі.', ru: 'Ваше мнение важно для нас. Поделитесь впечатлениями о вкусе блюд, обслуживании, доставке или заказе. Ваши предложения помогают нам работать лучше.', en: 'Your opinion matters to us. Tell us about the taste of our food, the service, delivery or your order. Your suggestions help us do better.' },
    careBtn: { kk: 'Пікір немесе ұсыныс қалдыру', ru: 'Оставить отзыв или предложение', en: 'Leave a review or suggestion' },
    careMsg: { kk: 'Сәлеметсіз бе! Doner na Abaya туралы пікірім бар:', ru: 'Здравствуйте! Хочу оставить отзыв о Doner na Abaya:', en: 'Hello! I would like to leave feedback about Doner na Abaya:' },
    dealsLead: { kk: 'Тиімді ұсыныстардан хабардар болыңыз!', ru: 'Будьте в курсе выгодных предложений!', en: 'Stay up to date with our best offers!' },
    dealsText: { kk: 'Жаңа акциялар мен жеңілдіктер басталған кезде дәл осы бөлімде жарияланады. Сүйікті дәміңізді тиімді бағамен алу мүмкіндігін жіберіп алмас үшін бізді жиі қарап тұрыңыз.', ru: 'Новые акции и скидки будут появляться именно в этом разделе. Заглядывайте к нам почаще, чтобы не упустить возможность попробовать любимые блюда по выгодной цене.', en: 'New deals and discounts will appear right here. Check back often so you never miss a chance to enjoy your favourites at a great price.' },
    dealsFollow: { kk: 'Жаңалықтарымызды әлеуметтік желілерден де көре аласыз:', ru: 'Следить за новостями можно и в наших соцсетях:', en: 'You can also follow our news on social media:' },
    yandexHead1: { kk: 'ДӘЛ ҚАЗІР', ru: 'ЗАКАЖИ', en: 'ORDER' },
    yandexHead2: { kk: 'ТАПСЫРЫС БЕР', ru: 'ПРЯМО СЕЙЧАС', en: 'RIGHT NOW' },
    yandexBtn: { kk: 'Яндекс Go-мен тапсырыс беру', ru: 'Заказать в Яндекс Go', en: 'Order on Yandex Go' },
    yandexPartner: { kk: 'Біздің негізгі серіктесіміз — Яндекс Go', ru: 'Наш основной партнёр — Яндекс Go', en: 'Our main partner is Yandex Go' },
    breakLabel: { kk: 'Жұма күнгі техникалық үзіліс', ru: 'Технический перерыв по пятницам', en: 'Technical break on Fridays' },
    noBreak: { kk: 'Жұма күндері үзіліссіз', ru: 'По пятницам без перерыва', en: 'No break on Fridays' },
    fcChicken: { kk: 'Тауық етімен', ru: 'Куриный', en: 'Chicken' },
    fcAssorti: { kk: 'Ассорти', ru: 'Ассорти', en: 'Assorted' },
    fcBeef: { kk: 'Сиыр етімен', ru: 'Говяжий', en: 'Beef' },
    fcCombo: { kk: 'комбо', ru: 'комбо', en: 'combo' },
    comingSoon: { kk: 'Бұл бөлім жақында ашылады', ru: 'Этот раздел скоро откроется', en: 'This section is coming soon' },
    city:   { kk: 'Астана', ru: 'Астана', en: 'Astana' },
    cart:   { kk: 'Себет', ru: 'Корзина', en: 'Cart' },
    cartTitle: { kk: 'Тапсырыс', ru: 'Заказ', en: 'Your order' },
    cartEmpty: { kk: 'Себет бос', ru: 'Корзина пуста', en: 'Your cart is empty' },
    total:  { kk: 'Барлығы', ru: 'Итого', en: 'Total' },
    close:  { kk: 'Жабу', ru: 'Закрыть', en: 'Close' },
    remove: { kk: 'Өшіру', ru: 'Удалить', en: 'Remove' },
    addrTitle: { kk: 'Мекенжай', ru: 'Адрес', en: 'Address' },
    name:   { kk: 'Тапсырыс берушінің аты', ru: 'Имя заказчика', en: 'Your name' },
    waName: { kk: 'Тапсырыс беруші', ru: 'Заказчик', en: 'Customer' },
    street: { kk: 'Көше', ru: 'Улица', en: 'Street' },
    house:  { kk: 'Үй', ru: 'Дом', en: 'House' },
    flat:   { kk: 'Пәтер', ru: 'Квартира', en: 'Flat' },
    entrance: { kk: 'Подъезд', ru: 'Подъезд', en: 'Entrance' },
    required: { kk: 'Атыңызды, көшені және үй нөмірін толтырыңыз', ru: 'Заполните имя, улицу и номер дома', en: 'Please fill in your name, street and house number' },
    payNote: {
      kk: 'Төлем туралы ақпаратты WhatsApp-тағы оператор тапсырысты алғаннан кейін жібереді. Төлеген соң чекті сол чатқа жібересіз.',
      ru: 'Данные для оплаты оператор отправит в WhatsApp после получения заказа. После оплаты отправьте чек в этот же чат.',
      en: 'The operator will send payment details on WhatsApp after receiving your order. After paying, send the receipt to the same chat.'
    },
    send:   { kk: 'Жіберу', ru: 'Отправить', en: 'Send' },
    mapTitle: { kk: 'Өзіңізге жақын филиалды таңдаңыз', ru: 'Выберите ближайший филиал', en: 'Choose your nearest branch' },
    pickBranch: { kk: 'Осы филиалды таңдау', ru: 'Выбрать этот филиал', en: 'Choose this branch' },
    pickNoGreen: { kk: 'Green-сіз таңдау', ru: 'Выбрать без Green', en: 'Choose without Green' },
    greenWarn: { kk: 'Green тағамдары бұл филиалда жоқ, олар себеттен алынады', ru: 'Блюд Green нет в этом филиале, они будут убраны из корзины', en: 'Green items are not available here and will be removed from the cart' },
    branch: { kk: 'Филиал', ru: 'Филиал', en: 'Branch' },
    change: { kk: 'Өзгерту', ru: 'Изменить', en: 'Change' },
    mapFail: { kk: 'Карта ашылмады. Филиалды тізімнен таңдаңыз:', ru: 'Карта не открылась. Выберите филиал из списка:', en: 'The map could not load. Choose a branch from the list:' },
    waFlat: { kk: '{n} пәтер', ru: 'кв. {n}', en: 'flat {n}' },
    waEntrance: { kk: '{n} подъезд', ru: '{n} подъезд', en: 'entrance {n}' }
  },
  // Карта стилі (MapLibre + OpenFreeMap, кілтсіз)
  mapStyle: 'https://tiles.openfreemap.org/styles/liberty',
  // Филиалдар: қолданушы жіберген «Жұмыс кестесі» суреттерінен.
  // Координата OpenStreetMap-тан алынды. Нөмір әзірге барлығында бір сынақ нөмірі.
  branches: [
    branch('edil-26', 51.14491, 71.52626, ['Еділ, 26', 'Едил, 26', 'Edil 26'], null, H24),
    branch('omarov-2', 51.14054, 71.37315, ['Омаров, 2', 'Омарова, 2', 'Omarov 2'], null, H24),
    branch('kenesary-47', 51.16645, 71.43033, ['Кенесары, 47', 'Кенесары, 47', 'Kenesary 47'], null, H24),
    branch('amanzholov-28', 51.12249, 71.47535, ['Қасым Аманжолов, 28', 'Касыма Аманжолова, 28', 'Kasym Amanzholov 28'], null, H24),
    branch('alfarabi-11', 51.09746, 71.45079, ['Әл-Фараби, 11', 'Аль-Фараби, 11', 'Al-Farabi 11'], null, H24),
    branch('akmeshit-13-2', 51.11114, 71.42152, ['Ақмешіт, 13/2', 'Акмешит, 13/2', 'Akmeshit 13/2'], null, H24),
    branch('mangilik-el-51', 51.09525, 71.42565, ['Мәңгілік Ел, 51', 'Мангилик Ел, 51', 'Mangilik El 51'], null, H24),
    branch('turan-55', 51.11276, 71.39838, ['Тұран, 55', 'Туран, 55', 'Turan 55'], null, H24, true),
    branch('kosshygululy-10', 51.17162, 71.39438, ['Шаймерден Қосшығұлұлы, 10', 'Шаймердена Косшыгулулы, 10', 'Shaimerden Kosshygululy 10'], null, H24),
    branch('mukhamedkhanov-6b', 51.13852, 71.39287, ['Қайым Мұхамедханов, 6Б', 'Кайыма Мухамедханова, 6Б', 'Kaiym Mukhamedkhanov 6B'], null, H24, true),
    branch('saraishyk-5', 51.13596, 71.42273, ['Сарайшық, 5', 'Сарайшык, 5', 'Saraishyk 5'], null, H24),
    branch('mega-silk-way', 51.08909, 71.40729, ['Қабанбай батыр, 62', 'Кабанбай батыра, 62', 'Kabanbai Batyr 62'], 'MEGA Silk Way', H10),
    branch('keruen', 51.12778, 71.42530, ['Достық, 9', 'Достык, 9', 'Dostyk 9'], { kk: 'Керуен СО', ru: 'ТРЦ Керуен', en: 'Keruen mall' }, H10),
    branch('khan-shatyr', 51.13250, 71.40386, ['Тұран, 37', 'Туран, 37', 'Turan 37'], { kk: 'Хан Шатыр СО', ru: 'ТРЦ Хан Шатыр', en: 'Khan Shatyr mall' },
      { kk: '10:00 – 23:00, жұма мен сенбі 24:00 дейін', ru: '10:00 – 23:00, пятница и суббота до 24:00', en: '10:00 – 23:00, Fri and Sat until 24:00' }),
    branch('aruzhan', 51.16025, 71.48289, ['Жансүгіров, 8/1', 'Жансугурова, 8/1', 'Zhansugurov 8/1'], { kk: 'Аружан СО', ru: 'ТРЦ Аружан', en: 'Aruzhan mall' }, H10),
    branch('kosshy', 50.98734, 71.35730, ['Қосшы, Қазыбек би, 2/1', 'Косшы, Казыбек би, 2/1', 'Kosshy, Kazybek Bi 2/1'], { kk: 'Киоск', ru: 'Киоск', en: 'Kiosk' }, '09:00 – 02:00', false, true)
  ],
  // Бастапқы беттегі қалқып тұратын комболар (атауы мен бағасы суреттің өзінде)
  // Бастапқы беттегі комболар. Бағасы мәзірден алынады, сондықтан әрқашан бірдей.
  featured: [
    { id: 'combo-chicken', img: 'images/fc-chicken.webp', t: 'fcChicken' },
    { id: 'combo-assorti', img: 'images/fc-assorti.webp', t: 'fcAssorti' },
    { id: 'combo-beef',    img: 'images/fc-beef.webp',    t: 'fcBeef' }
  ],
  // Мәзір. Бағаны, атауды, фотоны осы жерден өзгертуге болады.
  menu: [
    {
      id: 'doner', layout: 'big',
      name: { kk: 'Донер', ru: 'Донер', en: 'Doner' },
      items: [
        doner('chicken', 'm-doner-chicken', { kk: 'Тауық етімен донер', ru: 'Куриный донер', en: 'Chicken doner' }, 1895, 2195),
        doner('beef', 'm-doner-beef', { kk: 'Сиыр етімен донер', ru: 'Говяжий донер', en: 'Beef doner' }, 2195, 2495),
        doner('assorti', 'm-doner-assorti', { kk: 'Ассорти донер', ru: 'Ассорти донер', en: 'Assorted doner' }, 2095, 2395),
        green('nan', 'm-green-nan', { kk: 'Нан донер', ru: 'Нан донер', en: 'Bread doner' }, 2495, 2795, 2795),
        green('doner', 'm-green-doner', { kk: 'Жасыл донер', ru: 'Зелёный донер', en: 'Green doner' }, 1995, 2395, 2395),
        green('bowl', 'm-green-bowl', { kk: 'Жасыл боул', ru: 'Зелёный боул', en: 'Green bowl' }, 2495, 2895, 2895)
      ]
    },
    {
      id: 'combo', layout: 'big',
      name: { kk: 'Комбо', ru: 'Комбо', en: 'Combo' },
      items: [
        combo('chicken', 'm-combof-chicken', { kk: 'Комбо тауық етінен', ru: 'Комбо с курицей', en: 'Chicken combo' }, {
          kk: 'Стандарт тауық еті донері + фри + таңдауыңыз бойынша сусын мен дипот (кетчуп, сырный, барбекю)',
          ru: 'Стандартный куриный донер + фри + напиток и дип на выбор (кетчуп, сырный, барбекю)',
          en: 'Standard chicken doner + fries + drink and dip of your choice (ketchup, cheese, BBQ)'
        }, 3290),
        combo('assorti', 'm-combof-assorti', { kk: 'Комбо ассорти', ru: 'Комбо ассорти', en: 'Assorted combo' }, {
          kk: 'Стандарт ассорти донері + фри + таңдауыңыз бойынша сусын мен дипот (кетчуп, сырный, барбекю)',
          ru: 'Стандартный ассорти донер + фри + напиток и дип на выбор (кетчуп, сырный, барбекю)',
          en: 'Standard assorted doner + fries + drink and dip of your choice (ketchup, cheese, BBQ)'
        }, 3490),
        combo('beef', 'm-combof-beef', { kk: 'Комбо сиыр етінен', ru: 'Комбо с говядиной', en: 'Beef combo' }, {
          kk: 'Стандарт сиыр еті донері + фри + таңдауыңыз бойынша сусын мен дипот (кетчуп, сырный, барбекю)',
          ru: 'Стандартный говяжий донер + фри + напиток и дип на выбор (кетчуп, сырный, барбекю)',
          en: 'Standard beef doner + fries + drink and dip of your choice (ketchup, cheese, BBQ)'
        }, 3590)
      ]
    },
    {
      id: 'drinks', layout: 'big',
      name: { kk: 'Сусын мен соус', ru: 'Напитки и соусы', en: 'Drinks & sauces' },
      items: [
        drink('cola', 'd-cola', 'Coca-Cola', [['0,5', 795], ['0,45', 845]]),
        drink('zero', 'd-zero', 'Coca-Cola Zero', [['0,5', 795], ['0,45', 845]]),
        drink('fanta', 'd-fanta', 'Fanta', [['0,5', 795], ['0,45', 845]]),
        drink('sprite', 'd-sprite', 'Sprite', [['0,5', 795], ['0,45', 845]]),
        drink('fuse', 'd-fuse', 'Fuse Tea', [['0,5', 795], ['0,45', 845]]),
        drink('piko', 'd-piko', 'Piko', [['0,2', 595]]),
        drink('bonaqua', 'd-bonaqua', 'Bonaqua', [['0,5', 595]]),
        drink('ayran', 'd-ayran', { kk: 'Айран', ru: 'Айран', en: 'Ayran' }, [['0,45', 595]]),
        extra('fries', 'd-fries', { kk: 'Фри', ru: 'Фри', en: 'Fries' }, { kk: 'картошкалары', ru: 'картофель', en: 'potato fries' }, 895),
        extra('add-chicken', 's-chicken', { kk: 'Тауық еті', ru: 'Курица', en: 'Chicken' }, { kk: 'қосымша 50 грамм', ru: 'дополнительно 50 г', en: 'extra 50 g' }, 590),
        extra('add-beef', 's-beef', { kk: 'Сиыр еті', ru: 'Говядина', en: 'Beef' }, { kk: 'қосымша 50 грамм', ru: 'дополнительно 50 г', en: 'extra 50 g' }, 690),
        extra('sauce', 's-sauce', { kk: 'Соустар', ru: 'Соусы', en: 'Sauces' }, { kk: 'ақ және қызыл', ru: 'белый и красный', en: 'white and red' }, 200),
        extra('pepper', 's-pepper', { kk: 'Перчиктер', ru: 'Перчик', en: 'Peppers' }, { kk: 'ащы', ru: 'острый', en: 'hot' }, 100),
        extra('heinz-cheese', 's-heinz-cheese', { kk: 'Соус Heinz', ru: 'Соус Heinz', en: 'Heinz sauce' }, { kk: 'ірімшік', ru: 'сырный', en: 'cheese' }, 200),
        extra('heinz-ketchup', 's-heinz-ketchup', { kk: 'Соус Heinz', ru: 'Соус Heinz', en: 'Heinz sauce' }, { kk: 'кетчуп', ru: 'кетчуп', en: 'ketchup' }, 200),
        extra('heinz-bbq', 's-heinz-bbq', { kk: 'Соус Heinz', ru: 'Соус Heinz', en: 'Heinz sauce' }, { kk: 'BBQ', ru: 'BBQ', en: 'BBQ' }, 200)
      ]
    }
  ]
};
