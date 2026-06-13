import { Language, Category } from './types';

export interface LocaleStrings {
  welcome: string;
  choose_language: string;
  language_saved: string;
  main_menu_text: string;
  btn_search: string;
  btn_categories: string;
  btn_fines: string;
  btn_favorites: string;
  btn_feedback: string;
  btn_language: string;
  btn_about: string;
  search_prompt: string;
  search_no_results: string;
  search_results: string;
  categories_header: string;
  no_articles: string;
  favorites_header: string;
  no_favorites: string;
  feedback_prompt: string;
  feedback_photo_prompt: string;
  feedback_received: string;
  about_text: string;
  btn_add_favorite: string;
  btn_remove_favorite: string;
  btn_back: string;
  btn_menu: string;
  btn_skip_photo: string;
  btn_cancel: string;
  cancel_confirmed: string;
  article_conditions: string;
  article_exceptions: string;
  article_penalties: string;
  article_legal: string;
  article_sources: string;
  article_updated: string;
  article_no_additional: string;
  error_general: string;
  category_labels: Record<Category, string>;
}

const locales: Record<Language, LocaleStrings> = {
  en: {
    welcome: '👋 Welcome to <b>Poland Life Guide</b>!\n\nThis bot helps you understand life rules in Poland: what is allowed, what is prohibited, fines and official sources.\n\n🌐 Choose your language:',
    choose_language: '🌐 Choose language:',
    language_saved: '✅ Language set to English.',
    main_menu_text: '🏠 <b>Main Menu</b>\n\nWhat would you like to know about life in Poland?',
    btn_search: '🔍 Ask question',
    btn_categories: '📚 Categories',
    btn_fines: '⚖️ Fines',
    btn_favorites: '⭐ Favorites',
    btn_feedback: '💡 Suggest improvement',
    btn_language: '🌐 Language',
    btn_about: 'ℹ️ About',
    search_prompt: '🔍 <b>Search</b>\n\nEnter your question or keywords:\n\n<i>Examples:\n• can I park here\n• grilling in park\n• noise after 22:00\n• swimming in river</i>',
    search_no_results: '❌ No results found for "<b>{query}</b>".\n\nTry different keywords or browse categories.',
    search_results: '🔍 Results for "<b>{query}</b>" — {count} found:',
    categories_header: '📚 <b>Categories</b>\n\nChoose a topic:',
    no_articles: 'No articles in this category yet. Check back soon!',
    favorites_header: '⭐ <b>Your Saved Articles</b>',
    no_favorites: '⭐ You have no saved articles yet.\n\nBrowse categories or search for topics, then tap ⭐ to save.',
    feedback_prompt: '💡 <b>Suggest Improvement</b>\n\nDescribe what to add, fix, or improve. You can also send a photo.',
    feedback_photo_prompt: '📷 Would you like to attach a photo? Send it now, or tap "Skip" to submit without a photo.',
    feedback_received: '✅ Thank you! Your suggestion has been saved and will be reviewed.',
    about_text: 'ℹ️ <b>Poland Life Guide Bot</b>\n\n<b>Topics covered:</b>\n🏠 Housing &amp; rent\n🚗 Transport &amp; parking\n💼 Work &amp; permits\n🛒 Shopping &amp; returns\n🌿 Nature &amp; outdoor\n👶 Children\n🏦 Banks &amp; finances\n📬 Mail &amp; packages\n⚖️ Fines &amp; penalties\n🐾 Pets\n\n<b>Languages:</b> English, Polski, Українська, Русский\n\n⚠️ <i>This bot provides general information only. Always verify with official sources or a legal professional.</i>',
    btn_add_favorite: '⭐ Save',
    btn_remove_favorite: '★ Unsave',
    btn_back: '🔙 Back',
    btn_menu: '🏠 Menu',
    btn_skip_photo: 'Skip →',
    btn_cancel: '❌ Cancel',
    cancel_confirmed: '↩️ Cancelled. Back to menu.',
    article_conditions: '📋 <b>Conditions:</b>',
    article_exceptions: '⚠️ <b>Exceptions:</b>',
    article_penalties: '💰 <b>Penalties:</b>',
    article_legal: '⚖️ <b>Legal basis:</b>',
    article_sources: '🔗 <b>Sources:</b>',
    article_updated: '📅 Updated',
    article_no_additional: '<i>No additional restrictions.</i>',
    error_general: '❌ Something went wrong. Please try again.',
    category_labels: {
      housing: '🏠 Housing',
      transport: '🚗 Transport',
      work: '💼 Work',
      shopping: '🛒 Shopping',
      nature: '🌿 Nature',
      children: '👶 Children',
      banks: '🏦 Banks',
      mail: '📬 Mail',
      fines: '⚖️ Fines',
      pets: '🐾 Pets',
      emergency: '🚨 Emergency',
    },
  },
  pl: {
    welcome: '👋 Witaj w <b>Poland Life Guide</b>!\n\nTen bot pomaga zrozumieć zasady życia w Polsce: co wolno, czego nie wolno, mandaty i oficjalne źródła.\n\n🌐 Wybierz język:',
    choose_language: '🌐 Wybierz język:',
    language_saved: '✅ Język ustawiony na Polski.',
    main_menu_text: '🏠 <b>Menu główne</b>\n\nCzego chcesz się dowiedzieć o życiu w Polsce?',
    btn_search: '🔍 Zadaj pytanie',
    btn_categories: '📚 Kategorie',
    btn_fines: '⚖️ Mandaty',
    btn_favorites: '⭐ Ulubione',
    btn_feedback: '💡 Zaproponuj ulepszenie',
    btn_language: '🌐 Język',
    btn_about: 'ℹ️ O aplikacji',
    search_prompt: '🔍 <b>Szukaj</b>\n\nWpisz pytanie lub słowa kluczowe:\n\n<i>Przykłady:\n• czy mogę tu zaparkować\n• grillowanie w parku\n• hałas po 22:00\n• pływanie w rzece</i>',
    search_no_results: '❌ Nie znaleziono wyników dla "<b>{query}</b>".\n\nSpróbuj innych słów kluczowych lub przeglądaj kategorie.',
    search_results: '🔍 Wyniki dla "<b>{query}</b>" — znaleziono {count}:',
    categories_header: '📚 <b>Kategorie</b>\n\nWybierz temat:',
    no_articles: 'Brak artykułów w tej kategorii. Wróć wkrótce!',
    favorites_header: '⭐ <b>Twoje zapisane artykuły</b>',
    no_favorites: '⭐ Nie masz jeszcze zapisanych artykułów.\n\nPrzeglądaj kategorie lub wyszukaj tematy, a następnie dotknij ⭐ aby zapisać.',
    feedback_prompt: '💡 <b>Zaproponuj ulepszenie</b>\n\nOpisz co dodać, poprawić lub ulepszyć. Możesz też wysłać zdjęcie.',
    feedback_photo_prompt: '📷 Chcesz dołączyć zdjęcie? Wyślij je teraz lub kliknij "Pomiń".',
    feedback_received: '✅ Dziękujemy! Twoja propozycja została zapisana.',
    about_text: 'ℹ️ <b>Poland Life Guide Bot</b>\n\n<b>Tematy:</b>\n🏠 Mieszkanie i wynajem\n🚗 Transport i parkowanie\n💼 Praca i zezwolenia\n🛒 Zakupy i zwroty\n🌿 Natura i outdoor\n👶 Dzieci\n🏦 Banki i finanse\n📬 Poczta i paczki\n⚖️ Mandaty i kary\n🐾 Zwierzęta\n\n<b>Języki:</b> English, Polski, Українська, Русский\n\n⚠️ <i>Ten bot dostarcza tylko informacji ogólnych. Zawsze weryfikuj z oficjalnymi źródłami.</i>',
    btn_add_favorite: '⭐ Zapisz',
    btn_remove_favorite: '★ Usuń',
    btn_back: '🔙 Wstecz',
    btn_menu: '🏠 Menu',
    btn_skip_photo: 'Pomiń →',
    btn_cancel: '❌ Anuluj',
    cancel_confirmed: '↩️ Anulowano. Powrót do menu.',
    article_conditions: '📋 <b>Warunki:</b>',
    article_exceptions: '⚠️ <b>Wyjątki:</b>',
    article_penalties: '💰 <b>Kary:</b>',
    article_legal: '⚖️ <b>Podstawa prawna:</b>',
    article_sources: '🔗 <b>Źródła:</b>',
    article_updated: '📅 Zaktualizowano',
    article_no_additional: '<i>Brak dodatkowych ograniczeń.</i>',
    error_general: '❌ Coś poszło nie tak. Spróbuj ponownie.',
    category_labels: {
      housing: '🏠 Mieszkanie',
      transport: '🚗 Transport',
      work: '💼 Praca',
      shopping: '🛒 Zakupy',
      nature: '🌿 Natura',
      children: '👶 Dzieci',
      banks: '🏦 Banki',
      mail: '📬 Poczta',
      fines: '⚖️ Mandaty',
      pets: '🐾 Zwierzęta',
      emergency: '🚨 Sytuacje kryzysowe',
    },
  },
  ua: {
    welcome: '👋 Ласкаво просимо до <b>Poland Life Guide</b>!\n\nЦей бот допомагає зрозуміти правила життя в Польщі: що дозволено, що заборонено, штрафи та офіційні джерела.\n\n🌐 Оберіть мову:',
    choose_language: '🌐 Оберіть мову:',
    language_saved: '✅ Мову встановлено: Українська.',
    main_menu_text: '🏠 <b>Головне меню</b>\n\nЩо ви хочете дізнатися про життя в Польщі?',
    btn_search: '🔍 Задати питання',
    btn_categories: '📚 Категорії',
    btn_fines: '⚖️ Штрафи',
    btn_favorites: '⭐ Улюблені',
    btn_feedback: '💡 Запропонувати покращення',
    btn_language: '🌐 Мова',
    btn_about: 'ℹ️ Про бот',
    search_prompt: '🔍 <b>Пошук</b>\n\nВведіть питання або ключові слова:\n\n<i>Приклади:\n• чи можна тут паркуватися\n• шашлики в парку\n• шум після 22:00\n• купання в річці</i>',
    search_no_results: '❌ Нічого не знайдено за запитом "<b>{query}</b>".\n\nСпробуйте інші ключові слова або перегляньте категорії.',
    search_results: '🔍 Результати для "<b>{query}</b>" — знайдено {count}:',
    categories_header: '📚 <b>Категорії</b>\n\nОберіть тему:',
    no_articles: 'У цій категорії ще немає статей. Повертайтесь незабаром!',
    favorites_header: '⭐ <b>Збережені статті</b>',
    no_favorites: '⭐ У вас ще немає збережених статей.\n\nПереглядайте категорії або шукайте теми, потім натисніть ⭐ щоб зберегти.',
    feedback_prompt: '💡 <b>Запропонувати покращення</b>\n\nОпишіть що додати, виправити або покращити. Можна також надіслати фото.',
    feedback_photo_prompt: '📷 Бажаєте додати фото? Надішліть його зараз або натисніть "Пропустити".',
    feedback_received: '✅ Дякуємо! Вашу пропозицію збережено та буде розглянуто.',
    about_text: 'ℹ️ <b>Poland Life Guide Bot</b>\n\n<b>Теми:</b>\n🏠 Житло та оренда\n🚗 Транспорт та паркування\n💼 Робота та дозволи\n🛒 Шопінг та повернення\n🌿 Природа та відпочинок\n👶 Діти\n🏦 Банки та фінанси\n📬 Пошта та посилки\n⚖️ Штрафи та санкції\n🐾 Тварини\n\n<b>Мови:</b> English, Polski, Українська, Русский\n\n⚠️ <i>Цей бот надає лише загальну інформацію. Завжди перевіряйте офіційні джерела.</i>',
    btn_add_favorite: '⭐ Зберегти',
    btn_remove_favorite: '★ Видалити',
    btn_back: '🔙 Назад',
    btn_menu: '🏠 Меню',
    btn_skip_photo: 'Пропустити →',
    btn_cancel: '❌ Скасувати',
    cancel_confirmed: '↩️ Скасовано. Повернення до меню.',
    article_conditions: '📋 <b>Умови:</b>',
    article_exceptions: '⚠️ <b>Винятки:</b>',
    article_penalties: '💰 <b>Штрафи:</b>',
    article_legal: '⚖️ <b>Правова основа:</b>',
    article_sources: '🔗 <b>Джерела:</b>',
    article_updated: '📅 Оновлено',
    article_no_additional: '<i>Додаткових обмежень немає.</i>',
    error_general: '❌ Щось пішло не так. Спробуйте ще раз.',
    category_labels: {
      housing: '🏠 Житло',
      transport: '🚗 Транспорт',
      work: '💼 Робота',
      shopping: '🛒 Покупки',
      nature: '🌿 Природа',
      children: '👶 Діти',
      banks: '🏦 Банки',
      mail: '📬 Пошта',
      fines: '⚖️ Штрафи',
      pets: '🐾 Тварини',
      emergency: '🚨 Надзвичайні ситуації',
    },
  },
  ru: {
    welcome: '👋 Добро пожаловать в <b>Poland Life Guide</b>!\n\nЭтот бот помогает понять правила жизни в Польше: что разрешено, что запрещено, штрафы и официальные источники.\n\n🌐 Выберите язык:',
    choose_language: '🌐 Выберите язык:',
    language_saved: '✅ Язык установлен: Русский.',
    main_menu_text: '🏠 <b>Главное меню</b>\n\nЧто вы хотите узнать о жизни в Польше?',
    btn_search: '🔍 Задать вопрос',
    btn_categories: '📚 Категории',
    btn_fines: '⚖️ Штрафы',
    btn_favorites: '⭐ Избранное',
    btn_feedback: '💡 Предложить улучшение',
    btn_language: '🌐 Язык',
    btn_about: 'ℹ️ О боте',
    search_prompt: '🔍 <b>Поиск</b>\n\nВведите вопрос или ключевые слова:\n\n<i>Примеры:\n• можно ли тут парковаться\n• шашлыки в парке\n• шум после 22:00\n• купание в реке</i>',
    search_no_results: '❌ По запросу "<b>{query}</b>" ничего не найдено.\n\nПопробуйте другие ключевые слова или просмотрите категории.',
    search_results: '🔍 Результаты для "<b>{query}</b>" — найдено {count}:',
    categories_header: '📚 <b>Категории</b>\n\nВыберите тему:',
    no_articles: 'В этой категории пока нет статей. Заходите позже!',
    favorites_header: '⭐ <b>Сохранённые статьи</b>',
    no_favorites: '⭐ У вас пока нет сохранённых статей.\n\nПросматривайте категории или ищите темы, затем нажмите ⭐ чтобы сохранить.',
    feedback_prompt: '💡 <b>Предложить улучшение</b>\n\nОпишите что добавить, исправить или улучшить. Можно также отправить фото.',
    feedback_photo_prompt: '📷 Хотите добавить фото? Отправьте его сейчас или нажмите "Пропустить".',
    feedback_received: '✅ Спасибо! Ваше предложение сохранено и будет рассмотрено.',
    about_text: 'ℹ️ <b>Poland Life Guide Bot</b>\n\n<b>Темы:</b>\n🏠 Жильё и аренда\n🚗 Транспорт и парковка\n💼 Работа и разрешения\n🛒 Покупки и возвраты\n🌿 Природа и отдых\n👶 Дети\n🏦 Банки и финансы\n📬 Почта и посылки\n⚖️ Штрафы и санкции\n🐾 Животные\n\n<b>Языки:</b> English, Polski, Українська, Русский\n\n⚠️ <i>Этот бот предоставляет только общую информацию. Всегда проверяйте официальные источники.</i>',
    btn_add_favorite: '⭐ Сохранить',
    btn_remove_favorite: '★ Удалить',
    btn_back: '🔙 Назад',
    btn_menu: '🏠 Меню',
    btn_skip_photo: 'Пропустить →',
    btn_cancel: '❌ Отмена',
    cancel_confirmed: '↩️ Отменено. Возврат в меню.',
    article_conditions: '📋 <b>Условия:</b>',
    article_exceptions: '⚠️ <b>Исключения:</b>',
    article_penalties: '💰 <b>Штрафы:</b>',
    article_legal: '⚖️ <b>Правовая основа:</b>',
    article_sources: '🔗 <b>Источники:</b>',
    article_updated: '📅 Обновлено',
    article_no_additional: '<i>Дополнительных ограничений нет.</i>',
    error_general: '❌ Что-то пошло не так. Попробуйте ещё раз.',
    category_labels: {
      housing: '🏠 Жильё',
      transport: '🚗 Транспорт',
      work: '💼 Работа',
      shopping: '🛒 Покупки',
      nature: '🌿 Природа',
      children: '👶 Дети',
      banks: '🏦 Банки',
      mail: '📬 Почта',
      fines: '⚖️ Штрафы',
      pets: '🐾 Животные',
      emergency: '🚨 Экстренные ситуации',
    },
  },
};

export function t(lang: Language): LocaleStrings {
  return locales[lang] ?? locales.en;
}
