function sendAJAX(url, data){

  var request = $.ajax({
    url: url,
    method: "GET",
    data: data,
    dataType: "text"
  });
   
  request.done(function( data ) {
    console.log( "success" );
    console.log( data );
  });
  
  request.fail(function( jqXHR, textStatus ) {
    console.error( "Request failed: " + textStatus );
  });
  
  request.always(function() {
    console.log( "complete" );
  });

}

