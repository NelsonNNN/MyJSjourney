class User{
    constructor(name, password){
        this.name = name;
        this.password = password;
    }
}

class DataCollection{

    addUser(user){
        const lists = document.createElement('tr');
        lists.className='lists';
        lists.innerHTML = `<td>${user.name}</td>
                            <td>${user.password}</td>
                            <td><a href='#' class='checked'>O</a></td>
                            <td><a href='#' class='deleted'>X</a></td>`
        tableList.appendChild(lists);
    }

    alertMessages(mesg, color){
    const message=document.createElement('div');
    message.className='msg';
    message.style.background = color;
    message.appendChild(document.createTextNode(mesg));
    divForm.insertBefore(message, divForm.childNodes[0])  
    setTimeout(()=>
           message.remove(), 2000
       ); 
    }

    checkDelete(target){
        if(target.className === 'deleted'){
            target.parentElement.parentElement.remove()
            this.alertMessages('User has been deleted successfully', 'green')
        }
        if(target.className === 'checked'){
            target.parentElement.parentElement.className='checking';
        }
    }

    searchUp(searchTarget){
        const text = searchTarget.value.toLowerCase();
        const items = userList.getElementsByTagName('tr')
        const listArrays = Array.from(items);
        listArrays.splice(0, 1)
        listArrays.forEach(item => {
            const itemName = item.firstChild.textContent;
            if(itemName.toLowerCase().indexOf(text) != -1){
                item.style.display = 'table-row';
            }else{
                item.style.display = 'none'
            }
        })
    }

    clearValues(user){
        userName.value=''
        passWord.value=''
    }

    filterThrough(target){
        const lists = document.getElementsByTagName('tr')
        const listArray = Array.from(lists);
        listArray.splice(0, 1)

        listArray.forEach(function(list) {
            switch(target.value){
                case ('all'):
                    list.style.display='table-row';
                    break;
                case ('completed'):
                    if(list.classList.contains('checking')){
                        list.style.display='table-row';
                    }
                    else{
                        list.style.display='none';
                    }
                    break;
                case ('incomplete'):
                    if(list.classList.contains('checking')){
                        list.style.display='none';
                    }
                    else{
                        list.style.display='table-row';
                    }
                    break;
            }
        })
    }
}

class LStorage{
    static getItems(){
        let locals;
        if(localStorage.getItem('locals') === null){
            locals=[];
        }
        else{
            locals = JSON.parse(localStorage.getItem('locals'));
        }
        return locals;
    }

    static addItems(local){
        const locals =LStorage.getItems();
        locals.push(local);
        localStorage.setItem('locals', JSON.stringify(locals));
    }
 
    static displayItems(){
        const locals =LStorage.getItems();
        locals.forEach(function(local){
            const dataCollection = new DataCollection();
            dataCollection.addUser(local);
        });
    }

    static removeItems(target){
        const locals =LStorage.getItems();
        locals.forEach((local, index) =>{
            if(local.password === target){
                locals.splice(index, 1);
            }
        });
        localStorage.setItem('locals', JSON.stringify(locals));
    }
}

const userList = document.querySelector('.users');
const divForm = document.querySelector('form');
const search = document.querySelector('.search');
const userName = document.querySelector('.username');
const passWord = document.querySelector('.password');
const filterOpt = document.querySelector('.options');
const tableList = document.querySelector('.tablebody')


divForm.addEventListener('submit', funcSubmit);
search.addEventListener('keyup', searchItems);
userList.addEventListener('click', complTrash);
filterOpt.addEventListener('click', filterItems);
document.addEventListener('DOMContentLoaded', LStorage.displayItems);


function funcSubmit(e){
    e.preventDefault();

    const name = userName.value;
    const password = passWord.value;

    const user = new User(name, password);
    const dataCollection = new DataCollection();

    if(userName.value==='' || passWord.value===''){
        dataCollection.alertMessages('Please input the values', 'red');
    }else{
        dataCollection.addUser(user);
        LStorage.addItems(user);
        dataCollection.alertMessages('User has been successfully created', 'green');
    }    

    dataCollection.clearValues(user)
}

function complTrash(e){
    const dataCollection = new DataCollection();
    dataCollection.checkDelete(e.target);
    if(e.target.className === 'deleted'){
        LStorage.removeItems(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    }
}

function searchItems(e){
    const dataCollection = new DataCollection();
    dataCollection.searchUp(e.target);
}

function filterItems(e){
    const dataCollection = new DataCollection();
    dataCollection.filterThrough(e.target);
}