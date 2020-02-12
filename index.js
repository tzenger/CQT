const express = require('express');
const app = require('express')();
app.use(express.static('public'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://scrooble:8sowmvsU@scroobledb-06tsw.mongodb.net/test?retryWrites=true&w=majority';

let node;

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	console.log("Database opened!");
	dbo = db.db("scroobleDB");
	//get the highscore and word count from database
	dbo.collection("scrooble").find({}).toArray(function(err, result) {
	if (err) throw err;
		node = result[4].questionNode;
		db.close();
		});
  });
function updateQuestionNode(node) {
	MongoClient.connect(url, {
		useNewUrlParser: true
	}, function(err, db) {
		if (err) throw err;
		dbo = db.db("scroobleDB");
		var myquery = {
			name: 'q1'
		};
		var newvalues = {
			$set: {
				questionNode: node
			}
		};
		console.log(myquery);
		dbo.collection("scrooble").updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log("Nodes Updated");
			db.close();
		});
	});
}

io.on('connection', function(socket) {
  console.log(`Connected to ${socket.id}`);
	io.sockets.emit('node', node);

	socket.on('updateNode', function(coolNode) {
		node = coolNode;
		updateQuestionNode(node);
		io.sockets.emit('node', node);
	});
});


http.listen(process.env.PORT || 3333, function() {
	console.log('listening on 3333');
});
