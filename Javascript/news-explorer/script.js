const searchInput = document.getElementById('searchInput');
const tagsContainer = document.querySelector('.tags');
const newsCards = document.getElementById('newsCards');
const showMoreBtn = document.getElementById('showMoreBtn');

let activeTags = new Set(['all']);
let filteredNews = [...newsData];
let searchTerm = '';
let isShowMore = false;

const sortedNews = (newsArr) => {
  return [...newsArr].sort((a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime));
};

const highlightMatch = (text, term) => {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, `<span class="highlight">$1</span>`);
};

const renderNews = (newsArr) => {
  newsCards.innerHTML = '';
  const endIndex = isShowMore ? newsArr.length : 7;
  const displayedNews = newsArr.slice(0, endIndex);

  displayedNews.forEach((news) => {
    const card = document.createElement('div');
    card.className = 'news';

    card.innerHTML = `<h2 class="title">${highlightMatch(news.title, searchTerm)}</h2>
                <p class="date">${news.dateAndTime}</p>
                <p class="content">${highlightMatch(news.content, searchTerm)}</p>`;

    newsCards.appendChild(card);
  });

  showMoreBtn.style.display = newsArr.length > 7 && !isShowMore ? 'inline-block' : 'none';
};

const applyFilters = () => {
  let filtered = [...newsData];

  if (!activeTags.has('all')) {
    filtered = filtered.filter((item) => activeTags.has(item.category));
  }

  if (searchTerm.trim()) {
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filteredNews = sortedNews(filtered);
  renderNews(filteredNews);
};

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

searchInput.addEventListener(
  'input',
  debounce((e) => {
    searchTerm = e.target.value.trim();
    isShowMore = false;
    applyFilters();
  }, 500)
);

tagsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('tag')) {
    const selected = e.target.dataset.category;

    if (selected === 'all') {
      activeTags.clear();
      activeTags.add('all');
    } else {
      activeTags.delete('all');

      if (activeTags.has(selected)) {
        activeTags.delete(selected);
      } else {
        activeTags.add(selected);
      }

      if (activeTags.size === 0) {
        activeTags.add('all');
      }
    }

    document.querySelectorAll('.tag').forEach((tag) => {
      const cat = tag.dataset.category;
      tag.classList.toggle('active', activeTags.has(cat));
    });

    isShowMore = false;
    applyFilters();
  }
});

showMoreBtn.addEventListener('click', () => {
  isShowMore = true;
  renderNews(filteredNews);
});

applyFilters();
