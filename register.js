
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Add Item Function
function OnAddItemSubmit(e){
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if (newItem === ""){
    alert('Please a valid  item');
    return;
  }

  addItemToDom(newItem);

  // Add item to local storage
  addItemToStorage(newItem);


  //Create List Item
  // const li = document.createElement('li');
  // const textNode = document.createTextNode(newItem);
  // li.appendChild(textNode);

  // const button = createButton("remove-item btn-link text-red");
  // li.appendChild(button);

  // // Add Li to the DOM
  // itemList.appendChild(li);

  // checkUi();


// Clear input Placeholder
  itemInput.value = '';
}

function addItemToDom(item) {
  //create list item
  const li = document.createElement('li');
  const textNode = document.createTextNode(item);
  li.appendChild(textNode);

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add Li to the DOM
  itemList.appendChild(li);

  checkUi();
}
//Add Item to storage 
function addItemToStorage(item) {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage =JSON.parse(localStorage.getItem('items'));
  }
   
  // Add new item to array
  itemsFromStorage.push(item);

  //convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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

function OnClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement); 
  }
}

function removeItem(item){
  if (confirm("Are you sure?")) {
    //Remove item from DOM
    item.remove();

    //Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUi();

  }
}

function RemoveItemFromStorage(item){
  let itemsFromStorage = getItemsFromStorage();

  // filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems(){
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //Clear from local storage 
  localStorage.removeItem('items');

  checkUi();

  // if (itemList){
  //   itemList.remove();
  // }

  // itemList.innerHTML = "";
}

function filterItems(e){
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
 
  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(text)){
        item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
    
  });
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
itemForm.addEventListener('submit', OnAddItemSubmit);
itemList.addEventListener('click', OnClickItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUi();





