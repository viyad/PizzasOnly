/** Version: 1.0
 *  Project: PizzasOnly ordering form
 *  Company: PizzasOnly
 *  Program: The Server.js is where to configure all routes in this project.
 *			 Configuring the path, port, localhost, html header file, css or javaScript hearder file 
 *	Author:	 Viyada Tarapornsin
 */

 /**
 * Instantiate (import) necessary objects into the file
 */
const path = require('path');
var express = require('express');
var app = express(); // Create express app
const http = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '127.0.0.1';
const port = 8080;

/**
 * Get full path
 */
app.use(express.static(path.join(__dirname + '/')));

let handleRequest = (request, response) => {
	/**
	 * Configure file path
	 */
	var q = url.parse(request.url, true);
    var filename = "." + q.pathname;
	var ext = path.extname(filename).substr(1);
	console.log(ext);

	fs.readFile(filename, null, function(error, data)
	{
		/**
		 * If file is not found, redirect to index.html page
		 */
		if (error)
		{
			response.writeHead(301,
				{Location: 'index.html'}
			  );
			  response.end();
		}
		/**
		 * If file type is css, create header for css file
		 * and write content in the file as a css file
		 */
		else if (ext === 'css')
		{
			// Check for css
			response.writeHead(200, {'Content-Type': 'text/css'});
			response.write(data);
		}
		/**
		 * If file type is html, create header for html file
		 * and write content in the file as a html file
		 */
		else
		{
      		response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
		}
		response.end();
	});
};

/**
 * Create a server at the given hostname and port 
 * and display in the terminal
 */
http.createServer(handleRequest).listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`)});