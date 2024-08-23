// script.js
let isAuthenticated = false;

// 发表留言并保存到本地存储
function postMessage() {
    const messageInput = document.getElementById('message-input');
    const username = document.getElementById('username').value;
    const message = messageInput.value;
    if (!isAuthenticated) {
        alert('请先登录！');
        return;
    }
    if (message.trim() === '') {
        alert('留言不能为空！');
        return;
    }
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(`${username}: ${message}`);
    localStorage.setItem('messages', JSON.stringify(messages));
    messageInput.value = '';
    alert('留言已发表');
    loadMessages(); // 重新加载留言
}

// 加载留言
function loadMessages() {
    const messagesList = document.getElementById('messages-list');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messagesList.innerHTML = '';
    messages.forEach(message => {
        const listItem = document.createElement('li');
        listItem.textContent = message;
        messagesList.appendChild(listItem);
    });
}

// 切换主题模式
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        alert('切换到白日模式');
    } else {
        body.classList.add('dark');
        alert('切换到夜间模式');
    }
}

// 登录验证
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password === '1029347') {
        isAuthenticated = true;
        alert('登录成功');
        window.location.href = 'message-board.html';
    } else {
        alert('用户名或密码错误');
    }
});

// 更新日期和时间
function updateDateTime() {
    const now = new Date();
    const datetime = document.getElementById('datetime');
    datetime.textContent = now.toLocaleString();
}

// 监听页面加载完毕
window.onload = function() {
    if (window.location.href.includes('our-messages.html')) {
        loadMessages();
    }
    updateDateTime();
    setInterval(updateDateTime, 1000); // 每秒更新时间
};