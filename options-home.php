<?php
/*
Plugin Name: Opciones del home 
Plugin URI: http:///plugins/options-home/
Description: Este plugin permite configurar el contenido del home de este sitio
Author:Laura Ram&iacute;rez
Version: 1.0
*/

// in the main plugin file
add_action( 'admin_menu', 'add_plugin_page' );
add_action( 'admin_init', 'page_init'  );
/* Obtiene la busqueda de los temas */
add_action('wp_ajax_get_topic','get_taxonomy_tema');
/* Obtiene la busqueda de los temas */
add_action('wp_ajax_get_posts','get_posts_by_tema');
/* Guarda los temas */
add_action('wp_ajax_save_themes','save_theme');
/* Obtiene los temas */
add_action('wp_ajax_get_themes','get_all_themes');
/* Eliminar los temas */
add_action('wp_ajax_delete_theme','delete');
/* Cambia el orden de los temas */
add_action('wp_ajax_change_order','chenge_order_themes');


add_action('wp_ajax_save_main_theme_home','save_main_theme');

	/* Add options page	 */
	function add_plugin_page(){
		// This page will be under "Settings"
		add_options_page(
			'Opciones del home',
			'Opciones del home',
			'manage_options',
			'options-home',
			'create_admin_page' 
		);
	}

	function nombre_de_la_funcion(){
	
		// Nuestro código de manipulación de los datos
		
	}

	function create_admin_page(){
		add_action('admin_post_accion', 'nombre_de_la_funcion'); // Para usuarios logueados
		
		?>
	
	<div class="wrap">
	
		</div><!-- wrap -->
		<div  class="bt_save_them">
		<input type ="button" class ="button tagadd" value="Añadir tema" id="add_theme">	</div>

		<div class="bt_orden_them">
		<input type ="button" class ="button tagadd" value="Guardar orden de los temas" id="change_order_theme">	
		</div>

		

		<?php
	}

     function page_init(){
		$title_plugin =get_admin_page_title();
		 if( $title_plugin  !="Opciones del home") 
		 return false ;
		 else {
		wp_register_script('opc_home', plugin_dir_url( __FILE__ ) . 'js/script.js', 
							array('jquery' , 
									'jquery-effects-core', 
									'jquery-core' ,
									'jquery-ui-selectable'), '1', true );

		wp_enqueue_script('opc_home');
	  	wp_localize_script('opc_home','opc_vars',
							  [ 'ajaxurl' => admin_url('admin-ajax.php') ]);

	  	wp_register_style('opc_style',   plugin_dir_url( __FILE__ ) . 'css/style.css' );
		wp_enqueue_style('opc_style');    
		 
	//	wp_register_style('opc_style_2','https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css');
	//	wp_enqueue_style('opc_style_2'); 
		 
		 
		}

	}

	function get_taxonomy_tema(){
		global  $wpdb;
		$arr = array();
		$str = $_POST["search"];
		$filter ="";
		if($str != "") 
				$filter =  " AND t.name LIKE '%".$str."%' " ; 
		
		$qry = "SELECT t.name, t.term_id, term_taxonomy_id 
				FROM wp_term_taxonomy tt
				INNER JOIN wp_terms t using (term_id)
				WHERE taxonomy ='TEMA' ".$filter." ORDER BY term_taxonomy_id LIMIT 0, 20 ;";
		$temas = $wpdb->get_results( $qry );
		$n=0;
		foreach( $temas as $row ) {
			$id = $row->term_taxonomy_id;
			$description = $row->name;
			$arr[$n]["id"] = $id;
			$arr[$n]["tema"] =$description ;
			$n++;
			
		  }
		 	$json = json_encode ($arr);
			echo $json;
		  	wp_die();
	}

	function get_posts_by_tema(){
		global  $wpdb;
		$arr = array();
		//$str = $_POST["search"];
		//$title_post =  $_POST["title"];
		$filter =[];
		
		if( isset ($_POST["search"]) && $_POST["search"] != 0) 
				array_push($filter,  " term_id = ".$_POST["search"]);
		if(isset ($_POST["title"]) && $_POST["title"] != 0)
				array_push($filter,  " post_title LIKE '%".$_POST["title"]."%'");
			
				
		$fil_total = count($filter);
		
		
		if($fil_total  == 2) {
			$qry_where  = " WHERE ".$filter[0]. " AND ".$filter[1]. " AND post_status ='publish'";

			$qry = "SELECT t.term_id, name , term_taxonomy_id , ID, post_title , post_name
				FROM wp_terms t 
				INNER JOIN wp_term_taxonomy USING(term_id)
				INNER JOIN wp_term_relationships tr USING (term_taxonomy_id)
				INNER JOIN wp_posts p ON tr.object_id =p.ID 
				 ".$qry_where ." ORDER BY post_modified DESC  LIMIT 0, 20 ";
				 
		}
		else if($fil_total  == 1){
			$qry_where  = " WHERE ".$filter[0] . " AND post_status ='publish'";

			$qry = "SELECT t.term_id, name , term_taxonomy_id , ID, post_title , post_name
				FROM wp_terms t 
				INNER JOIN wp_term_taxonomy USING(term_id)
				INNER JOIN wp_term_relationships tr USING (term_taxonomy_id)
				INNER JOIN wp_posts p ON tr.object_id =p.ID 
				 ".$qry_where ." ORDER BY post_modified DESC  LIMIT 0, 50 ";
		}
		else if($fil_total  == 0){
			$qry ="SELECT  ID, post_title , post_name FROM  wp_posts  
			WHERE post_status ='publish' ORDER BY post_modified DESC  LIMIT 0, 70 ;";
		
		}

		//echo ($qry );
		
			$posts = $wpdb->get_results( $qry );
		
		$n=0;
		foreach( $posts as $row ) {
			$id = $row->ID;
			$post_title = $row->post_name;
			$arr[$n]["id"] = $id;
			$arr[$n]["post_title"] =$post_title ;
			$n++;
		}
	 	$json = json_encode ($arr);
		echo $json;
		wp_die();
	//	echo $arr;

	
	 	
	}

	function save_theme(){
		$opc = $_POST["tema"];
		$val = $_POST["datos"];
		
		
		update_option($opc , $val  , "no" );
		
		wp_die();
	}
/*
	function get_all_themes_2(){
		global  $wpdb;
		$arr2 = array();

		$qry = "SELECT option_id, option_name, option_value 
				FROM wp_options 
				WHERE option_name LIKE  '%home_theme_%' ORDER BY option_name ASC";
		$themes = $wpdb->get_results( $qry );

		$n=0;
		foreach( $themes as $row ) { 
			$value = unserialize ($row->option_value);
			$arr = array();
			$arr["option_id"]=$row->option_id;
			$arr["option_name"] =$row->option_name;
			$arr["value"]=$value ;

			array_push($arr2, $arr);
			$n++;
		}
		$json = json_encode ($arr2 );
		echo $json;
	 	 wp_die();

	}
*/
	function get_all_themes(){
		global  $wpdb;
		$arr2 = array();

		$qry = "SELECT option_id, option_name, option_value 
				FROM wp_options 
				WHERE option_name = 'main_home_theme'";
		$themes = $wpdb->get_results( $qry );

		if(count($themes)>0){
			foreach( $themes as $row ) { 
				$value = unserialize ($row->option_value);
			//	var_dump($value);
				$total_themes = count($value);
				
				for($i=0 ; $i<$total_themes ; $i++){
					$orden = $value[$i]["order"];
					$option_name_child= $value[$i]["option_name"];
					
						$qry2 = "SELECT option_id, option_name, option_value 
						FROM wp_options 
						WHERE option_name =  '$option_name_child'";
						$child_theme= $wpdb->get_results( $qry2 );

						if(count($child_theme)>0){
							$valor2 =  unserialize($child_theme[0]->option_value);
							//var_dump ($child_theme[0]->option_name);
							$arr = array();
							$arr["option_id"]=$child_theme[0]->option_id;	
							$arr["option_name"] =$child_theme[0]->option_name;
							$arr["value"]=$valor2;
							array_push($arr2, $arr);
						}

				}
				
				
			}
			$json = json_encode ($arr2 );
			
		}
		echo $json;
	 	 wp_die();

	}

	function delete(){
		$theme = $_POST["theme_name"];
		$delete = delete_option($theme);
		echo $delete;
		wp_die();

	}

	function chenge_order_themes(){
		$datos = $_POST["datos"];
		foreach ($datos as $clave => $fila) {
			$orden[$clave] = $fila['order'];
			$option_name[$clave] = $fila['option_name'];
		}

		array_multisort($orden, SORT_ASC, $datos);
		print_r($datos);

		update_option("main_home_theme",$datos  , "no" );
		wp_die();

	}

	function save_main_theme(){
		$datos = $_POST["datos"];
		$update =update_option("main_home_theme",$datos  , "no" );
		echo $update ;
		wp_die();

	}


?>