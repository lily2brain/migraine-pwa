let usuario = JSON.parse(localStorage.getItem('usuario')) || null;
let registros = JSON.parse(localStorage.getItem('registros')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (usuario) {
        document.getElementById('cadastro-section').classList.add('hidden');
        document.getElementById('registro-section').classList.remove('hidden');
        document.getElementById('historico-section').classList.remove('hidden');
        atualizarDataHora();
        mostrarRegistros();
    }
});

function salvarCadastro() {
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    if (!nome || !idade) {
        alert('Preencha todos os campos!');
        return;
    }
    usuario = { nome, idade };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    document.getElementById('cadastro-section').classList.add('hidden');
    document.getElementById('registro-section').classList.remove('hidden');
    document.getElementById('historico-section').classList.remove('hidden');
    atualizarDataHora();
}

function atualizarDataHora() {
    const agora = new Date();
    document.getElementById('dataHora').textContent = agora.toLocaleString();
}

function salvarRegistro() {
    const sintomas = document.getElementById('sintomas').value.trim();
    const alimentos = document.getElementById('alimentos').value.trim();
    const dataHora = new Date().toLocaleString();
    registros.push({ dataHora, sintomas, alimentos });
    localStorage.setItem('registros', JSON.stringify(registros));
    document.getElementById('sintomas').value = '';
    document.getElementById('alimentos').value = '';
    atualizarDataHora();
    mostrarRegistros();
}

function mostrarRegistros(lista = registros) {
    const ul = document.getElementById('listaRegistros');
    ul.innerHTML = '';
    lista.forEach(r => {
        const li = document.createElement('li');
        li.textContent = `${r.dataHora} - Sintomas: ${r.sintomas || 'N/A'} | Alimentos: ${r.alimentos || 'N/A'}`;
        ul.appendChild(li);
    });
}

function filtrarPorData() {
    const filtro = document.getElementById('filtroData').value;
    if (!filtro) {
        mostrarRegistros();
        return;
    }
    const filtrados = registros.filter(r => r.dataHora.startsWith(filtro.split('-').reverse().join('/')));
    mostrarRegistros(filtrados);
}

// Registro do Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
