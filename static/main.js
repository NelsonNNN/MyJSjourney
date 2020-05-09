//get elements from html and assign them variables
const divForm = document.querySelector('form');
const userList = document.querySelector('.users');
const userName = document.querySelector('.username')
const passWord = document.querySelector('.password')
const search = document.querySelector('.search')
const filterOpt = document.querySelector('.options')

//add eventlisteners to the elements
divForm.addEventListener('submit', funcSubmit)
userList.addEventListener('click', complTrash)
search.addEventListener('keyup', searchItems)
filterOpt.addEventListener('click', filterItems)
document.addEventListener('DOMContentLoaded', getItem)

//create event function to create a list baased on user input
function funcSubmit(e){
    e.preventDefault();
    if(userName.value==='' || passWord.value===''){
       const message=document.createElement('div');
       message.className='msg'
       message.innerHTML='<p>Please input the values</p>' 
       divForm.insertBefore(message, divForm.childNodes[0])
       setTimeout(()=>
           message.remove(), 2000
       );
    }
    else{
        const lists = document.createElement('li');
        lists.className='lists';
        const details = document.createTextNode(`${userName.value}:${passWord.value}`);
        lists.appendChild(details);
        fromLocalStorage(`${userName.value}:${passWord.value}`)
        const trash = document.createElement('button')
        trash.className='trash';
        trash.appendChild(document.createTextNode('X'));
        const complete= document.createElement('button');
        complete.className='checked'
        complete.appendChild(document.createTextNode('_/'));
        lists.appendChild(trash);
        lists.appendChild(complete)
        userList.appendChild(lists);
        userName.value=''
        passWord.value=''
    }
}

//delete from list and check an item in list
function complTrash(e){
    if(e.target.classList.contains('trash')){
        if(confirm('Are you sure?')){
            const del = e.target.parentElement;
            userList.removeChild(del)
            removelocal(del)
            
        }
    }
    if(e.target.classList.contains('checked')){
        const check = e.target.parentElement;
        check.className='checking'
    }
}

//search for item in list
function searchItems(e){
    var text = e.target.value.toLowerCase();
    var items = userList.getElementsByTagName('li');
    Array.from(items).forEach(function(item){
      var itemName = item.firstChild.textContent;
      if(itemName.toLowerCase().indexOf(text) != -1){
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
}

//filter checked items from list and vise versa
function filterItems(e){
    const selection = userList.childNodes;
    selection.forEach(function(list){
    switch(e.target.value){
        case ('all'):
            list.style.display='flex';
            break;
        case ('completed'):
            if(list.classList.contains('checking')){
                list.style.display='flex';
            }
            else{
                list.style.display='none';
            }
            break;
        case ('incomplete'):
            if(!list.classList.contains('checking')){
                list.style.display='flex';
            }
            else{
                list.style.display='none';
            }
            break;
    }
    })
}

//store and retrieve items in local storage
function fromLocalStorage(local){
    let locals;
    if(localStorage.getItem('locals') === null){
        locals=[]
    }
    else{
        locals = JSON.parse(localStorage.getItem('locals'))
    }
    locals.push(local)
    localStorage.setItem('locals', JSON.stringify(locals))
}
function getItem(){
    let locals;
    if(localStorage.getItem('locals') === null){
        locals=[]
    }
    else{
        locals = JSON.parse(localStorage.getItem('locals'))
    }
    locals.forEach(function(local){
        const lists = document.createElement('li');
        lists.className='lists';
        const details = document.createTextNode(local);
        lists.appendChild(details);
        const trash = document.createElement('button')
        trash.className='trash';
        trash.appendChild(document.createTextNode('X'));
        const complete= document.createElement('button');
        complete.className='checked'
        complete.appendChild(document.createTextNode('_/'));
        lists.appendChild(trash);
        lists.appendChild(complete)
        userList.appendChild(lists);
    });
}

//remove items from local storage
function removelocal(local){
    let locals;
    if(localStorage.getItem('locals') === null){
        locals=[]
    }
    else{
        locals = JSON.parse(localStorage.getItem('locals'))
    }
    const nodeList =local.childNodes[0].nodeValue;
    locals.splice(locals.indexOf(nodeList), 1)
    localStorage.setItem('locals', JSON.stringify(locals))
}