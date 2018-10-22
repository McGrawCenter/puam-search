<?php
   /*
   Plugin Name: Princeton University Image Search
   Description: 
   Version: 1.0
   License: GPL2
   */


/*****************
* This adds a new button above the editor next to 'insert media'

function add_puam_media_button() {
    echo '<a href="#" id="insert-puam-media" class="button">Princeton Art Museum</a>';
}

add_action('media_buttons', 'add_puam_media_button', 15);

*/


/*****************
* This adds a new link on the left hand side of the media uploader

function puamsearch_add_mediaupload_tab($settings) {
  $settings['tabs'] = array('puamsearch' => 'Insert from PUAM');
  return $settings;
}
add_filter('media_view_settings', 'puamsearch_add_mediaupload_tab');

*******************/


/********************************
* Add a new link to the Add media dialog
*********************************/

function puamsearch_upload_tab($tabs) {
    $tabs['puamsearch'] = "Princeton University Art Museum";
    return $tabs;
}
add_filter('media_upload_tabs', 'puamsearch_upload_tab');



/********************************
* Include js and css in the dialog iframe 
* and call function to populate with html
*********************************/

function puamsearch_add_upload_form() {
    wp_register_script( 'puamsearch', plugins_url( '/js/puamsearch.js', __FILE__ ) );
    wp_enqueue_script( 'puamsearch' );
    $dataforJS = array(	'site_url' => site_url(),'iiif_server' => "http://puam-lori-elasticl-w22fk7028hd9-1675803086.us-east-1.elb.amazonaws.com/loris");
    wp_localize_script( 'puamsearch', 'vars', $dataforJS );
    wp_register_style('puamsearch-css', plugins_url('css/style.css',__FILE__ ));
    wp_enqueue_style('puamsearch-css');

    wp_iframe('puamsearch_upload_tab_content');

}
add_action('media_upload_puamsearch', 'puamsearch_add_upload_form');


/********************************
* populate the iframe with the search interface html
*********************************/

function puamsearch_upload_tab_content() {
  $html = media_upload_header();
  $html .= "<p><label for='search'/><input type='text' id='puamsearch' name='search' placeholder='Search' class='search' /> <input type='button' id='puam' value='Search'/></p>";
  $html .= "<ul id='puamsearchresults' class='attachments ui-sortable ui-sortable-disabled' tabindex='-1'></ul>";
  echo $html;
}






/********************************
* populate the iframe with the search 
* interface html
********************************

function include_puam_media_button_js_file() {
    wp_register_script( 'puammedia', plugins_url( '/js/puammedia.js', __FILE__ ) );
    wp_enqueue_script( 'puammedia' ,array('jquery'), '1.0', true);

}
add_action('wp_enqueue_media', 'include_puam_media_button_js_file');
*/





/********************************
* expose json interface (easier than trying to do jsonp)
********************************/

if(isset($_GET['puam'])) {
  if(isset($_GET['q'])) { 
	$searchstr = urlencode($_GET['q']);
	$json = file_get_contents("http://data.artmuseum.princeton.edu/search?q={$searchstr}&type=artobjects");
	}
  if(isset($_GET['id'])) { 
	$id = $_GET['id'];
	$json = file_get_contents("http://data.artmuseum.princeton.edu/objects/{$id}");
	}
  header('Content-Type: application/json');
  die($json);
}





?>
