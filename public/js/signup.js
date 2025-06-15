
const btn = document.querySelector('#verSenha');
const btnConfirm = document.querySelector('#verConfirmSenha');

const nome = document.querySelector('#nome');
const labelNome = document.querySelector('#labelNome');

const usuario = document.querySelector('#usuario');
const labelUsuario = document.querySelector('#labelUsuario');

const email = document.querySelector('#email');
const labelEmail = document.querySelector('#labelEmail');

const numero = document.querySelector('#numero');
const labelNumero = document.querySelector('label[for="numero"]');

const cpf = document.querySelector('#cpf');
const labelCPF = document.querySelector('label[for="cpf"]');

const senha = document.querySelector('#senha');
const labelSenha = document.querySelector('#labelSenha');

const confirmSenha = document.querySelector('#confirmSenha');
const labelConfirmSenha = document.querySelector('#labelConfirmSenha');

const msgError = document.querySelector('#msgError');
const msgSuccess = document.querySelector('#msgSuccess');

let validNome = false;
let validUsuario = false;
let validEmail = false;
let validNumero = false;
let validCPF = false;
let validSenha = false;
let validConfirmSenha = false;


// Validação de nome
nome.addEventListener('keyup', () => {
  if (nome.value.length <= 2) {
    labelNome.style.color = 'red';
    labelNome.textContent = 'Nome *Insira no mínimo 3 caracteres';
    nome.style.borderColor = 'red';
    validNome = false;
  } else {
    labelNome.style.color = 'green';
    labelNome.textContent = 'Nome';
    nome.style.borderColor = 'green';
    validNome = true;
  }
});

// Validação de usuário
usuario.addEventListener('keyup', () => {
  if (usuario.value.length <= 4) {
    labelUsuario.style.color = 'red';
    labelUsuario.textContent = 'Usuário *Insira no mínimo 5 caracteres';
    usuario.style.borderColor = 'red';
    validUsuario = false;
  } else {
    labelUsuario.style.color = 'green';
    labelUsuario.textContent = 'Usuário';
    usuario.style.borderColor = 'green';
    validUsuario = true;
  }
});

// Validação de e-mail
email.addEventListener('keyup', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    labelEmail.style.color = 'red';
    labelEmail.textContent = 'E-mail *Insira um e-mail válido (exemplo@email.com)';
    email.style.borderColor = 'red';
    validEmail = false;
  } else {
    labelEmail.style.color = 'green';
    labelEmail.textContent = 'E-mail';
    email.style.borderColor = 'green';
    validEmail = true;
  }
});

// Validação de número
numero.addEventListener('keyup', () => {
  const numeroRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  if (!numeroRegex.test(numero.value)) {
    labelNumero.style.color = 'red';
    labelNumero.textContent = 'Número *Insira um número válido ((99) 99999-9999)';
    numero.style.borderColor = 'red';
    validNumero = false;
  } else {
    labelNumero.style.color = 'green';
    labelNumero.textContent = 'Número';
    numero.style.borderColor = 'green';
    validNumero = true;
  }
});

// Validação de CPF
cpf.addEventListener('keyup', () => {
  if (!validarCPF(cpf.value)) {
    labelCPF.style.color = 'red';
    labelCPF.textContent = 'CPF *Insira um número de CPF válido';
    cpf.style.borderColor = 'red';
    validCPF = false;
  } else {
    labelCPF.style.color = 'green';
    labelCPF.textContent = 'CPF';
    cpf.style.borderColor = 'green';
    validCPF = true;
  }
});

// Validação de senha
senha.addEventListener('keyup', () => {
  if (senha.value.length <= 5) {
    labelSenha.style.color = 'red';
    labelSenha.textContent = 'Senha *Insira no mínimo 6 caracteres';
    senha.style.borderColor = 'red';
    validSenha = false;
  } else {
    labelSenha.style.color = 'green';
    labelSenha.textContent = 'Senha';
    senha.style.borderColor = 'green';
    validSenha = true;
  }
});

// Validação de confirmação de senha
confirmSenha.addEventListener('keyup', () => {
  if (senha.value !== confirmSenha.value) {
    labelConfirmSenha.style.color = 'red';
    labelConfirmSenha.textContent = 'Confirmar Senha *As senhas não conferem';
    confirmSenha.style.borderColor = 'red';
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.style.color = 'green';
    labelConfirmSenha.textContent = 'Confirmar Senha';
    confirmSenha.style.borderColor = 'green';
    validConfirmSenha = true;
  }
});

nome.addEventListener('keyup', () => {
  if(nome.value.length <= 2){
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})


// Função para cadastrar
function cadastrar() {
  if (validNome && validUsuario && validEmail && validNumero && validCPF && validSenha && validConfirmSenha) {
    const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      emailCad: email.value,
      numeroCad: numero.value,
      cpfCad: cpf.value,
      senhaCad: senha.value,
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    msgSuccess.style.display = 'block';
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
    msgError.style.display = 'none';

    setTimeout(() => {
      window.location.href = 'signin.html';
    }, 3000);
  } else {
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.style.display = 'none';
  }
}

// Alternar visibilidade de senha
btn.addEventListener('click', () => {
  senha.type = senha.type === 'password' ? 'text' : 'password';
});

btnConfirm.addEventListener('click', () => {
  confirmSenha.type = confirmSenha.type === 'password' ? 'text' : 'password';
});

// Validação de CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}
