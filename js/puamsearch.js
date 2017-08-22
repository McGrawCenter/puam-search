

jQuery(document).ready(function(){


	/***********************************
	* inital population of image gallery 
	* in PUAM search interface
	***********************************/

	jQuery.getJSON( vars.site_url+"?puam&q=golden&type=artobjects", function( data ) {
	  var hits = data.hits.hits;
	  jQuery("#puamsearchresults").empty();
	  jQuery.each( hits, function( key, item ) {
	    var id = item._id;
	    var title = item._source.titles[0].title;
	    var url = item._source.media[0].uri+"/full/150,150/0/default.jpg";
	    jQuery("#puamsearchresults").append( '<li class="puamimageblock"><img src="'+url+'" class="puamimage" rel="'+id+'" draggable="false" alt="" style="float:left;"><div>'+title+'</div></li>'  );
	  })
	});



	/***********************************
	* User types in the search box
	***********************************/

	  jQuery( "#puamsearch" ).keyup( function() {
		var searchstr = jQuery("#puamsearch").val();
		console.log('change');
		//alert(vars.site_url+"?puam&q="+searchstr+"&type=artobjects");
		jQuery.getJSON( vars.site_url+"?puam&q="+searchstr+"&type=artobjects", function( data ) {
		  var hits = data.hits.hits;
		  jQuery("#puamsearchresults").empty();
		  jQuery.each( hits, function( key, item ) {
		    var id = item._id;
		    var title = item._source.titles[0].title;
		    var url = item._source.media[0].uri+"/full/150,150/0/default.jpg";
		    //http://puam-lori-elasticl-w22fk7028hd9-1675803086.us-east-1.elb.amazonaws.com/loris/INV12705.jp2/full/200,200/0/default.jpg
		    jQuery("#puamsearchresults").append( '<li class="puamimageblock"><img src="'+url+'" class="puamimage" rel="'+id+'" draggable="false" alt="" style="float:left;"><div>'+title+'</div></li>'  );
		  })
 		});
	  });


	/***********************************
	* User clicks on an image
	***********************************/

	  jQuery( document ).on( "click", ".puamimage", function() {
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



	  });
	


});
