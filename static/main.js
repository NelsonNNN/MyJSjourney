
const myForm = document.querySelector('form')
const message = document.querySelector('.msg')
const submit = document.querySelector('.submits')
const users = document.querySelector('.users')
const passWord = document.querySelector('.inputs2')
const username = document.querySelector('.inputs1')


myForm.addEventListener('submit', onsubmit)

function onsubmit(e){
    e.preventDefault();
    if (username.value==='' || passWord.value===''){
        message.innerHTML='<p>Please fill out the forms</p>'
        setTimeout(() => message.remove(), 3000);
        message.classList.add('error-msg');
    }
    else{
        const list = document.createElement('li');
        list.appendChild(document.createTextNode(`${username.value} : ${passWord.value}`));
        users.appendChild(list)
    }
}
username.value='';
passWord.value='';