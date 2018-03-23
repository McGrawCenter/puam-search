

jQuery(document).ready(function(){


	function populateGallery(hits) {
	  jQuery("#puamsearchresults").empty();
	  jQuery.each( hits, function( key, item ) {
	    // some hits don't have associated images for some reason
	    if( typeof item._source.primaryimage[0] !== 'undefined' ) {
	      var id = item._id;
	      var title = item._source.displaytitle;
	      var url = item._source.primaryimage[0]+"/full/150,/0/default.jpg";
	      var html = '<li class="puamimageblock">';
	      html += '  <div class="puamimageblock-image">';
	      html += '    <img src="'+url+'" class="puamimage" rel="'+id+'" draggable="false" alt="Image of '+title+'" >';
	      html += '  </div>';
	      html += '<div class="puamimageblock-meta">';
	      html += title;
	      html += '</div>';
	      html += '</li>';
	      jQuery("#puamsearchresults").append(  html  );
	    }
	  });
	}



	/***********************************
	* inital population of image gallery 
	* in PUAM search interface
	***********************************/
	jQuery.getJSON( vars.site_url+"?puam&q=princeton&type=artobjects", function( data ) {
	  var hits = data.hits.hits;
	  if( typeof hits !== 'undefined' ) {
	    populateGallery(hits);
	  } 
	});



	/***********************************
	* User types in the search box
	***********************************/

	  jQuery( "#puamsearch" ).keyup( function() {
		var searchstr = jQuery("#puamsearch").val();
		console.log(vars.site_url+"?puam&q="+searchstr+"&type=artobjects");
		jQuery.getJSON( vars.site_url+"?puam&q="+searchstr+"&type=artobjects", function( data ) {
		  var hits = data.hits.hits;
		  if( typeof hits !== 'undefined' ) {
		    populateGallery(hits);
		  } 
 		});
	  });


	/***********************************
	* User clicks on an image
	***********************************/

	  jQuery( document ).on( "click", ".puamimage", function(event) {
        	var imageurl = jQuery(this).attr('src').replace("150,150","800,");
        	var id = jQuery(this).attr('rel');

		jQuery.getJSON( vars.site_url+"?puam&id="+id, function( data ) {
		  var title = data.displaytitle;
		  var credit = data.creditline;
		  var creditrepro = data.creditlinerepro;
		  var date = data.displaydate;
		  var maker = data.displaymaker;
		  var medium = data.medium;
		  html = '<figure class="wp-caption alignleft" style="width: 800px">';
		  html += '<img src="'+imageurl+'">';
		  html += '<figcaption class="wp-caption-text">'+title+', '+maker+', '+date+'<br />'+medium+', '+credit+', '+creditrepro+'</figcaption>';
		  html += '</figure>';
        	  parent.wp.media.editor.insert(html);
 		});

	   event.preventDefault();

	  });
	


});
