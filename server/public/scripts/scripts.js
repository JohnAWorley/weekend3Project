$(document).ready(readyNow);

function readyNow() {
    console.log('js up yoyo');
    // getTasks();
    clickListener();
    
}

// function getTasks(params) {
//     $.ajax({
//         method: 'GET',
//         url: '/list'
//     }).then(function( response) {
//         console.log(response);
//         displayListItems(response);
//     })
// }



function clickListener(){
    $('#inputContainer').on('click', '#addButton', function(){
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
    }).then(function(response) {
        console.log(response);
        emptyInputs();
        
    }).catch(function(response){
        console.log(response);
        
    })
}