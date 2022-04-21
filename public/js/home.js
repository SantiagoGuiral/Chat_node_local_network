window.onload=function(){

    roomDisplay = document.getElementById('room');

    //Create room
    createForm.addEventListener('submit', e => {
        e.preventDefault();

        const room = e.target.elements.newRoom.value;
        createRoom(room,roomDisplay);

        e.target.elements.newRoom.value='';
		e.target.elements.newRoom.focus();
    });
}

function createRoom (room,roomDisplay){
    var opt = document.createElement('option');
    var text = document.createTextNode(room);
    opt.appendChild(text);
    opt.value=room;
    roomDisplay.appendChild(opt);
}