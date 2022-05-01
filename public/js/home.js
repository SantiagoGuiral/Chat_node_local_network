window.onload=function(){

    roomDisplay = document.getElementById('room');

    //Create room
    createForm.addEventListener('submit', e => {
        e.preventDefault();

        const roomName = e.target.elements.newRoom.value;
        createRoom(roomName,roomDisplay);

        e.target.elements.newRoom.value='';
		e.target.elements.newRoom.focus();
    });
}

function createRoom (roomName,roomDisplay){
    var opt = document.createElement('option');
    var text = document.createTextNode(roomName);
    opt.appendChild(text);
    opt.value=roomName;
    roomDisplay.appendChild(opt);
}