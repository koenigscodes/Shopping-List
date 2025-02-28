
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Add Item Function
function addItem(e){
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if (newItem === ""){
    alert('Please a valid  item');
    return;
  }

  //Create List Item
  const li = document.createElement('li');
  const textNode = document.createTextNode(newItem);
  li.appendChild(textNode);

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add Li to the DOM
  itemList.appendChild(li);

  checkUi();


// Clear input Placeholder
  itemInput.value = '';
}

// Create Button Function
function createButton(classes){
  const button = document.createElement('button');
  button.className = classes;
  const icon =createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// Create Icon Function
function createIcon(classes){
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}


function removeItem(e){
  if (e.target.parentElement.classList.contains('remove-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove(); 
      checkUi(); 
    }
  }
}

function clearItems(){
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUi();

  // if (itemList){
  //   itemList.remove();
  // }

  // itemList.innerHTML = "";
}

function checkUi(){
  const items = itemList.querySelectorAll('li');
  if (items.length === 0){
    clearBtn.style.display = 'none';
    itemFilter.style.display =' none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUi();





