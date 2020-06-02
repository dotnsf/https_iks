//.  app.js
var express = require( 'express' ),
    fs = require( 'fs' ),
    http = require( 'http' ),
    https = require( 'https' ),
    settings = require( './settings' ),
    app = express();

//. SSL
var options = {};
if( settings.ssl_key ){
  options.key = fs.readFileSync( settings.ssl_key );
}
if( settings.ssl_cert ){
  options.cert = fs.readFileSync( settings.ssl_cert );
}
if( settings.ssl_ca ){
  options.ca = fs.readFileSync( settings.ssl_ca );
}
var http_server = http.createServer( app );
var https_server = https.createServer( options, app );
var http_port = 8080;
var https_port = 8443;

app.get( '/', function( req, res ){
  res.contentType( 'text/plain; charset=utf-8' );
  fs.readFile( '/etc/hostname', "utf-8", function( err, text ){
    if( err ){
      res.write( JSON.stringify( err, 2, null ) );
      res.end();
    }else{
      res.write( text );
      res.end();
    }
  });
});

https_server.listen( https_port );
http_server.listen( http_port );
console.log( "server starting on " + http_port + " / " + https_port + " ..." );
//var port = 8080;
//app.listen( port );
//console.log( "server starting on " + port + " ..." );
