const divForm = document.querySelector('form');
const userList = document.querySelector('.users');
const userName = document.querySelector('.username')
const passWord = document.querySelector('.password')
const search = document.querySelector('.search')
const message=document.querySelector('.msg');
const filterOpt = document.querySelector('.options')


divForm.addEventListener('submit', funcSubmit)
userList.addEventListener('click', complTrash)
search.addEventListener('keyup', searchItems)
filterOpt.addEventListener('click', filterItems)

function funcSubmit(e){
    e.preventDefault();
    if(userName.value==='' || passWord.value===''){
       message.classList.add('msg')
       message.innerHTML='<p>Please input the values</p>' 
       setTimeout(()=>
           message.remove(), 3000
       );
    }
    else{
        const lists = document.createElement('li');
        lists.className='lists';
        lists.appendChild(document.createTextNode(`${userName.value}:${passWord.value}`));
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

function complTrash(e){
    if(e.target.classList.contains('trash')){
        if(confirm('Are you sure?')){
            const del = e.target.parentElement;
            userList.removeChild(del)
        }
    }
    if(e.target.classList.contains('checked')){
        const check = e.target.parentElement;
        check.className='checking'
    }
}

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

function filterItems(e){
    const todo = userList.childNodes;
    todo.forEach(function(list){
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
