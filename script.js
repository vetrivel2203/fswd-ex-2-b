// Sample tweet data shown when the page loads.
const tweets = [
  {
    id: 1,
    name: 'Vetrivel P R',
    handle: '@vetri',
    time: '2h',
    text: 'Coffee, soft music, and a quiet plan for the day. Simple habits still matter.',
    likes: 81,
    comments: 8,
    reposts: 7,
    liked: false,
    image: true,
  },
  {
    id: 2,
    name: 'Sri Ram',
    handle: '@invinsible',
    time: '5h',
    text: 'Just finished a long walk and the ideas started flowing again. That is always a good sign.',
    likes: 71,
    comments: 94,
    reposts: 333,
    liked: true,
    image: false,
  },
];

const feed = document.getElementById('feed');
const tweetInput = document.getElementById('tweetInput');
const postBtn = document.getElementById('postBtn');

function renderTweets() {
  feed.innerHTML = '';

  tweets.forEach((tweet) => {
    const card = document.createElement('article');
    card.className = 'tweet-card';

    card.innerHTML = `
      <div class="tweet-top">
        <div class="user-row">
          <div class="avatar">${tweet.name.charAt(0)}</div>
          <div class="user-meta">
            <strong>${tweet.name}</strong>
            <p>${tweet.handle} • ${tweet.time}</p>
          </div>
        </div>
        <span class="meta-label">⋯</span>
      </div>

      <p class="tweet-text">${tweet.text}</p>
      ${tweet.image ? '<div class="image-placeholder">SUNSET MOMENTS</div>' : ''}
      <div class="actions-row">
        <button class="action-btn ${tweet.liked ? 'active' : ''}" data-action="like" data-id="${tweet.id}">💙 <span>${tweet.likes}</span></button>
        <button class="action-btn" data-action="comment" data-id="${tweet.id}">💬 <span>${tweet.comments}</span></button>
        <button class="action-btn">🔁 <span>${tweet.reposts}</span></button>
        <button class="action-btn">📤 <span>Share</span></button>
      </div>
    `;

    feed.appendChild(card);
  });
}

function createNewTweet() {
  const text = tweetInput.value.trim();

  if (!text) {
    tweetInput.focus();
    return;
  }

  const newTweet = {
    id: Date.now(),
    name: 'You',
    handle: '@you',
    time: 'now',
    text,
    likes: 0,
    comments: 0,
    reposts: 0,
    liked: false,
    image: false,
  };

  tweets.unshift(newTweet);
  tweetInput.value = '';
  renderTweets();
}

function handleFeedClick(event) {
  const button = event.target.closest('button[data-action]');

  if (!button) return;

  const id = Number(button.getAttribute('data-id'));
  const action = button.getAttribute('data-action');
  const tweet = tweets.find((item) => item.id === id);

  if (!tweet) return;

  if (action === 'like') {
    tweet.liked = !tweet.liked;
    tweet.likes += tweet.liked ? 1 : -1;
  }

  if (action === 'comment') {
    tweet.comments += 1;
  }

  renderTweets();
}

postBtn.addEventListener('click', createNewTweet);
tweetInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    createNewTweet();
  }
});

feed.addEventListener('click', handleFeedClick);

renderTweets();
