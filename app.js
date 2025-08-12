const button = document.getElementById('touchButton');
const log = document.getElementById('log');

let touches = JSON.parse(localStorage.getItem('touches')) || [];

function renderLog() {
    log.innerHTML = '';
    touches.forEach(t => {
        const li = document.createElement('li');
        li.textContent = `${t.time}`;
        log.appendChild(li);
    });
}

button.addEventListener('click', () => {
    const now = new Date();
    const entry = { time: now.toLocaleString() };
    touches.push(entry);
    localStorage.setItem('touches', JSON.stringify(touches));
    renderLog();
});

renderLog();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
