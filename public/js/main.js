window.onload = function () {

	const chatForm = document.getElementById('chat-form');
	const chatMessages = document.querySelector('.chat-messages');
	const roomName = document.getElementById('room-name');
	const userList = document.getElementById('users');
	
	//get username and room from URL
	const { username, room } = Qs.parse(location.search, {
		ignoreQueryPrefix: true
	});
	
	 // establish socket.io connection
	const socket = io();

	//Join chatroom
	socket.emit('join-room', {username,room});

	//get room users
	socket.on('room-users',({room,users}) => {
		outputRoomName(room,roomName);
		outputRoomUsers(users,userList);

	})

	//Message from server
	socket.on('message', message => {
		console.log(message);
		outputMessage(message);
		chatMessages.scrollTop = chatMessages.scrollHeight;

	});

	//Event Listener form
	chatForm.addEventListener('submit', (e) => {
		e.preventDefault();

		//get message text
		const msg = e.target.elements.msg.value;

		//Sending message to server
		socket.emit('chat-message', msg);

		e.target.elements.msg.value='';
		e.target.elements.msg.focus();

	});

}

function outputMessage(message) {
	var div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML=`
	<p class='meta'>${message.username} <span> ${message.time}</span></p>
	<p class='text'>${message.text}</p>
	`;
	document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room,roomName){
	roomName.innerText=room
}

function outputRoomUsers(users,userList){
	userList.innerHTML=`
	${users.map(user =>`<li>${user.username}</li>`).join('')}
	`;
}
/*
function removeUser(person,userList){

	var list = document.querySelectorAll('#users li');
	for (let i = 0; i < list.length; i++) {
		if (list[i].innerText === person){
			userList.removeChild(list[1]);;
		}	
	}

}
*/