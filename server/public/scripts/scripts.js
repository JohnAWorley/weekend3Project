$(document).ready(readyNow);

function readyNow() {
    console.log('js up yoyo');
    // getTasks();
    clickListener();
    getTasks();
}

function getTasks(params) {
    console.log('in get tasks');

    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(function (response) {
        console.log(response);
        displayToDo(response);
    })
}



function clickListener() {
    $('#inputContainer').on('click', '#addButton', function () {
        let toDoToSend = {
            task: $('#task').val(),
            description: $('#description').val(),
            status: $('#status').val()

        }

        saveToDO(toDoToSend);// sends our list


    })
} // end add task

function emptyInputs() {
    $('#task').val('');
    $('#description').val('');
    $('#genderIn').val('');
}

function saveToDO(params) {
    console.log('posting toDO with ajax', params);
    $.ajax({
        method: 'POST',
        url: '/list',
        data: params
    }).then(function (response) {
        console.log(response);
        emptyInputs();
        getTasks();

    }).catch(function (response) {
        console.log(response);

    })
}

function displayToDo(response) {
    let el = $('#listItemContainer')
    el.empty();
    for (let i = 0; i < response.length; i++) {
        let toDo = response[i];

        console.log(toDo);
        let tableRow = $(`
    <tr>
        <td>${toDo.task}</td>
        <td>${toDo.description}</td>
        <td>${toDo.status}</td>
        <td><button class="deleteButton">Delete</button></td>
    </tr>
    `);
        el.append(tableRow);
        tableRow.data('object', toDo);
        

    }

}