let currentUser = null;
let rounds = [];

// Show/hide sections
function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(section + '-section').style.display = 'block';
}

// Simple auth simulation (localStorage)
function handleAuth() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        currentUser = username;
        localStorage.setItem('currentUser', username);
        document.getElementById('auth-status').textContent = `Welcome, ${username}!`;
        document.getElementById('auth-modal').style.display = 'none';
        loadFeed();
    } else {
        document.getElementById('auth-message').textContent = 'Please enter username and password.';
    }
}

// Post round
document.getElementById('round-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentUser) {
        alert('Please log in first!');
        return;
    }
    const course = document.getElementById('course').value;
    const date = document.getElementById('date').value;
    const score = parseInt(document.getElementById('score').value);
    const notes = document.getElementById('notes').value;

    rounds.unshift({
        user: currentUser,
        course,
        date,
        score,
        notes
    });

    alert('Round posted! Great work on the course.');
    loadFeed();
    document.getElementById('round-form').reset();
});

// Load feed
function loadFeed() {
    const feedEl = document.getElementById('feed');
    feedEl.innerHTML = '';
    rounds.forEach(round => {
        const div = document.createElement('div');
        div.className = 'round-post';
        div.innerHTML = `
            <strong>${round.user}</strong> played ${round.course} on ${round.date}<br>
            Score: <strong>${round.score}</strong><br>
            ${round.notes ? `<em>${round.notes}</em>` : ''}
            <button onclick="addComment(this)">Comment</button>
        `;
        feedEl.appendChild(div);
    });
}

// Dummy leaderboard
function loadLeaderboard() {
    const tbody = document.querySelector('#leaderboard tbody');
    tbody.innerHTML = `
        <tr><td>1</td><td>${currentUser || 'Player1'}</td><td>82</td><td>15</td></tr>
        <tr><td>2</td><td>Friend2</td><td>88</td><td>18</td></tr>
    `;
}

// Simple comment
function addComment(btn) {
    const comment = prompt('Drop a comment:');
    if (comment) {
        const post = btn.parentElement;
        const p = document.createElement('p');
        p.textContent = `Comment: ${comment}`;
        post.appendChild(p);
    }
}

// Init
window.onload = () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        document.getElementById('auth-status').textContent = `Welcome back, ${savedUser}!`;
    } else {
        document.getElementById('auth-modal').style.display = 'flex';
    }
    showSection('feed');
    loadLeaderboard();
};