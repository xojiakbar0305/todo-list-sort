var todoListArray = [];

var elForm = $_('.site-form'); //form

var elInput = $_('.site-input', elForm); //input

var siteCheckbox = $_('.danger-input-checkbox', elForm); //checkbox

var elTodoListTemplate = $_('#elToDoListTemplate').content;

var elListGroup = $_('.list-group-boxs')//ol

//clone
createWorkElement = function(i) {
  var elNevWork = elTodoListTemplate.cloneNode(true);
  var resultText = $_('.todolist-text', elNevWork);

  resultText.textContent = i.work;
  return elNevWork;
};

//fragment
var renderWorks = function(works) {
  elListGroup.innerHTML = '';

  var elWorkWrapperFragment = document.createDocumentFragment();

  works.forEach(function(work) {
    elWorkWrapperFragment.appendChild(createWorkElement(work));
  });
  elListGroup.appendChild(elWorkWrapperFragment);
}

var elTodoList = function (evt) {
  evt.preventDefault();

  //input malumoti
  var toDoInputValue = elInput.value.trim();
  //alert
  var alert = $_('.alert');
  //inputning boshligigni tekshiramiz
  if (toDoInputValue === '') {
    alert.textContent = `Ma'lumot kititing`;
    elInput.focus();
    alert.classList.add('d-block');
    return;
  }
  var addedObject = {
    work: toDoInputValue,
    isUrgent: true,
    completed: false,
  };

  //muhim ish bolganda
  if (siteCheckbox.checked) {
    todoListArray.push(addedObject); 
    alert.classList.remove('d-block');
  } 
  // bolmasa ohiriga
  else {
    addedObject.isUrgent = false;
    todoListArray.push(addedObject);
    alert.classList.remove('d-block');
  }

  //sort
  todoListArray.sort(function (a, b) {
    return b.isUrgent - a.isUrgent;
  });
  renderWorks(todoListArray); 

  //bunda texttlarning har biri aynalib chiqildi va class list qoshildi
  var todoListText = $$_('.todolist-text');

  //checkboxlar aynalib chiqildi
  var elCheckboxText = $$_('.todo-list-checkbox');
  elCheckboxText.forEach(function (btn, i) {
    btn.addEventListener('change', function () {
      //button checked boldi
      if (btn.checked) {
        //agar todoListArray[i] completed bolsa va true bolsa 
        todoListArray[i].completed = true;

        //arrayni aynalib chiqib
        todoListArray.forEach(function (work, i) {
          if (work.completed) {
            //va todoListText ga class qo'shadi
            todoListText[i].classList.add('line');
          }
        });
      } 
      // false qaytarsa todoListTextdan classni o'chiradi
      else if (todoListArray[i].completed) {
        todoListText[i].classList.remove('line');
      }
    });
  });
  ///button delete
  var elDeleteButton = $$_('.todo-list-button');
  var elWorkList = $$_('.list-group-item');

  elDeleteButton.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      elWorkList[i].remove();
      todoListArray.splice(i, 1);
    });
  });

  elInput.value = "";
  elInput.focus();
  siteCheckbox.checked = false;
};

elForm.addEventListener('submit', elTodoList);