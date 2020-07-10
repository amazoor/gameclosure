###Fat Cat Adventurer

### Description
The game about the cat businessman who want to create an empire for earning a lot of money.
There are several food businesses available for the cat. The tastiest produces more money that the cheapest ones. 
Working on several businesses is very hard so the managers can be hired to do the work instead of the cat. 
Of course the managers will not work for free. You have to hire them. And after hiring the manager your business will be
automated and the cat can just sit and look how the amount of money is growing.

### Solution, technologies and architecture
- The game has to be developed. This game must work in all types of the web browsers. Initially the data for the game
must be requested from the server. After the data has received it will be stored in local storage, so the user can access 
the next time he enters the game. The solution is not ideal. It's better to create a database on the game server 
but this part of work has to be done on the server (the client's storage can be erased, manipulated or stolen, etc.).
- I've chosen the node.js because it uses the same language as the client. 
- The client has fully written is JavaScript(ES6).
- Rendering engine is the latest version of PIXI.js. This engine currently has very good performance (WebGL), easy to use 
and is a standard for many casual/gambling game development companies. 
- The game uses OOP approach. It is broken down on several logical modules. Custom fonts can be added to the game to make it looks better. 
- In the next version it's better to create a config file to control the layout of the visual elements in one file. 
Currently, there are just hardcoded values used for the visual element's positions so better to change them and give 
ability to the artists to control the layout without developers help. 
- The local storage's size is limited so it's also better to store data on the server.  
- All the initial configuration stored in the `./config/initialData.json`

### Running the game 
1. Initially run npm command `npm i` to install all the dependencies
1. You have to start local server to get the initial request. (`npm start-server`)
1. `npm start` will start the game.
1. If you want to create a bundle for production run `npm build`. 
