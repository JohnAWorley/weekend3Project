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
    $('#listItemContainer').on('click', '.deleteButton', deleteToDo);
    $('#listItemContainer').on('click', '.editButton', editFill);
    $('#inputContainer').on('click', '#updateButton', editToDo);
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
        <td><button class="editButton">edit</button></td>
    </tr>
    `);
        if (toDo.status === 'completed') {
            tableRow.addClass('done');
        }
        el.append(tableRow);
        tableRow.data('id', toDo.id);
        tableRow.data('object', toDo);


    }

}

function deleteToDo() {
    console.log('in delete');
    let rowToDelete = $(this).parent().parent().data('id');
    console.log(rowToDelete);
    $.ajax({
        method: 'DELETE',
        url: `/list/${rowToDelete}`
    }).then(function (response) {
        console.log(response);
        getTasks();
    }).catch(function (err) {
        console.log(err);

    })

}

let updateID;

function editToDo (params) {
    console.log('in edit');
    // let rowToEdit = $(this).parent().parent().data('id');
    let toDoToSend = {
        task: $('#task').val(),
        description: $('#description').val(),
        status: $('#status').val()

    }
    $.ajax({
        method: 'PUT',
        url: `/list/${updateID}`,
        data: toDoToSend
    }).then(function(response){
        console.log(response);
        $('#buttonDiv').empty();
        $('#buttonDiv').append(`<button type="button" id="addButton">Add Task</button>`)
        emptyInputs();
        getTasks();
    }).catch(function(err){
        console.log(err);
        
    })
}

function editFill() {
    console.log('filling');
    let toDo = $(this).parent().parent().data('object');
    updateID = toDo.id;
    $('#task').val(toDo.task);
    $('#description').val(toDo.description);
    $('#status').val(toDo.status);

    $('#buttonDiv').empty();
    $('#buttonDiv').append(`<button type="button" id="updateButton">Update Task</button>`)
}