var jq2 = jQuery.noConflict();
jq2(function( $ ) {
   var n = 1;
   var activeTab =0;
     function form_default (ext =""){
let fm = `<div class ="opch_wrap" id="theme_content_${n}">
       
        <div class ="opch_txt_block">
        <input type ="hidden" name ="option_names" id = "option_name_${n}">
            <div class = "opch_txt_left"> <strong> Tema ${n} : </strong> </div> 
            <div><input type ="text"  size = "70" name="theme_name" id="theme_name_${n}" placeholder="Escribe el nombre del tema" autocomplete="off" ></div>
        </div>
        <div class ="opch_txt_block">
            <div class ="opch_txt_left">Selecciona un tema: </div>
            <div>
                <input type = "text" name = "tema" size = "70" id = "tema_${n}" placeholder="Buscar tema " autocomplete="off" >
                <input type ="hidden" name ="tema_id" id = "tema_id_${n}">
            </div>
            <div class="resultado_temas_cont" id="resultado_temas_${n}"></div>
        </div>

        <div class ="opch_txt_block">
            <div class = "opch_txt_left">Nota principal : </div>
            <div>
                <input type = "text" name = "name_main_note" size = "70" id = "nmn_${n}" placeholder="Buscar nota principal" autocomplete="off" >
                <input type ="hidden" name ="id_main_note" id = "imn_${n}">
            </div>
            <div class="resultado_temas_cont" id="res_nmn_${n}"></div>
         </div>

      
        <div class="opc_subhead_cont">
            <div class = "opch_subhead"> Activar  </div>
            <div class = "opch_subhead_1"> Notas secundarias  </div>
            <div class = "opch_subhead_2"> Thumbnail</div>
        </div>

        <!-- ***************    AQUI INICIA NOTAS SECUNDARIA  #1 ********************* -->
        <div class ="opch_txt_block"> 
            <div class = "opch_txt_left"> Nota 1 : </div>
            <div class = "opch_check_active"><input type ="checkbox" name ="activo_${n}" id = "ckact_1_${n}"></div>
             <div  class="opch_ohter_notes">
                <input type ="text" name = "name_notes" size = "65" id = "nn_1_${n}" placeholder="Buscar nota # 1" autocomplete="off" >
                <input type ="hidden" name ="id_notes_${n}" id = "in_1_${n}">
            </div>
            <div class="resultado_temas_cont_2" id="res_nn_1_${n}"></div>
            <div class ="opch_check_thumb">	
                <input type ="checkbox" name ="thumbnails_${n}" id = "thum_1_${n}"> 
            </div>
        </div>

        <div class ="opch_txt_block">
            <div class = "opch_txt_left">Nota 2 : </div>
            <div class = "opch_check_active">	<input type ="checkbox" name ="activo_${n}" id = "ckact_2_${n}"></div>
                <div class="opch_ohter_notes">	
                    <input type ="text" name = "name_notes" size = "65" id = "nn_2_${n}" placeholder="Buscar nota # 2" autocomplete="off" >
                    <input type ="hidden" name ="id_notes_${n}" id = "in_2_${n}">
                </div>
                <div class="resultado_temas_cont_2" id="res_nn_2_${n}"></div>
                <div class ="opch_check_thumb">	
                    <input type ="checkbox" name ="thumbnails_${n}" id = "thum_2_${n}"> 	
                </div>
         </div>

        <div class ="opch_txt_block">
            <div class = "opch_txt_left">Nota 3 : </div>
            <div class = "opch_check_active"><input type ="checkbox" name ="activo_${n}" id = "ckact_3_${n}"></div>
                <div  class="opch_ohter_notes">	
                    <input type ="text" name = "name_notes" size = "65" id = "nn_3_${n}" placeholder="Buscar nota # 3" autocomplete="off" >
                    <input type ="hidden" name ="id_notes_${n}" id = "in_3_${n}">
                </div>
                <div class="resultado_temas_cont_2" id="res_nn_3_${n}"></div>
                <div class ="opch_check_thumb">
                    <input type ="checkbox"  name ="thumbnails_${n}"  id = "thum_3_${n}"> 
                </div>
         </div>

         <div class ="opch_txt_block">
            <div class = "opch_txt_left">  Orden del Tema  :  </div> 
            
            <div>
                <input type ="text" size = "3" name ="order_themes"  value ="${n}" id = "order_${n}">
            </div>
 
         </div>

        <div class ="opch_save">
            <input type ="button" name ="btn_save_themes" id ="save_theme_${n}" value ="Guardar" class="button button-primary button-large">
            &nbsp  &nbsp  &nbsp  &nbsp
            <input type ="button"  name ="btn_delete_themes" id ="delete_theme_${n}" class="button tagadd" value ="Eliminar">
         </div>
    </div>`;
    n++;
    return fm;
   
    }

  

    /* Agrega nuevo tema vacio */
    jq2(document).on("click","#add_theme",function(e){
       
        if(n<7){
            jq2("#bt_save_them_1").remove();
            jq2("#bt_orden_them_1").remove();
            let fmdefault = form_default();
            jq2("div#tabs-1").append(fmdefault);
            nametema();
        }else {
            return false;
        }
        btn_generales_tab1();
    });
    /* Genera un nombre al tema para option name = 'home_theme_#' */
    let nametema = () => {
        let allNames = [];
        for(let j=0; j<7; j++){
            allNames.push(j+1);
        }
        let id = "";
        jq2(`input[name='option_names']`).each(function() {
            let existName = jq2(this).val();
           
                existName =parseInt (existName.substr(-1));
                if(Number.isInteger(existName)){
                 let pos = allNames.indexOf(existName);
                    allNames.splice(pos, 1)
                }else{
                    id = jq2(this).attr("id");
                }
        });
        let name_opc =  allNames[0];
        jq2(`#${id}`).val(`home_theme_${name_opc}`);
    }

    /* obiene los temas  taxonomy ='TEMA' */
    function get_topic(m){
        jq2("#resultado_temas_"+m).html("");
        let valor1 = jq2("#tema_"+m).val();
          jq2.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'get_topic',
                search : valor1
            }            
        })
        .success(function( result ) {
           
          let obj = JSON.parse(result);
            let size = obj.length;
            let idSelectable = "selectable"+m;

            let opc = `<ol class="selector" id="${idSelectable}">` 
            for(let i =0 ;  i<size ; i++){
                let id =  obj[i]["id"];
                let tema=  obj[i]["tema"];
                opc+= `<li id="${id}"> ${tema}</li>`
            }
            opc+= `</ol>` 

            jq2("#resultado_temas_"+m).html(opc);
            jq2(`#${idSelectable}`).selectable({
                selected: function(event, ui) {
                   let selected_id = jq2(ui.selected).attr('id');
                   let selected_name = jq2(ui.selected).text();
                   jq2("#tema_"+m).val(selected_name);
                   jq2("#tema_id_"+m).val(selected_id);
                   jq2("#resultado_temas_"+m).html("");
                }
            });
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
             console.log( "La solicitud a fallado: " +  textStatus +" - "  +errorThrown);
         });
    }


    /* keyup los temas */
   jq2(document).on("keyup",  "input[name='tema']" ,function(e){
    let item = jq2(this).attr('id');
    let k = item.substr(5);
    let minlength =1;
    let that = this, value = jq2(this).val();
    if(value.length >= minlength ) {
        get_topic(k);
        return false;
    }
     });

     /* Obtiene los post post_type = 'post' */
    function get_posts(m){
       jq2("#res_nmn_"+m).html("");
        let tema_id = jq2("#tema_id_"+m).val();
        if(tema_id =="") tema_id=0;
        let search_title = jq2("#nmn_"+m).val();
        if(search_title =="") search_title=0;

        jq2.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'get_posts',
                search : tema_id ,
                title : search_title
            },
            beforeSend: function(){   
                jq2("#res_nmn_"+m).html('<div class="imgload">Buscando resultados ...</div>');
            },           
            success : function( result ) {   
                //console.log(result);
                
                    let obj = JSON.parse(result);
                    let size = obj.length;
                    let idSelectable = "selectable_mn"+m;   
                    let opc = `<ol class="selector" id="${idSelectable}">` 
                    for(let i =0 ;  i<size ; i++){
                        let id =  obj[i]["id"];
                        let title=  obj[i]["post_title"];
                        opc+= `<li id="${id}">${title}</li>`
                    }
                    opc+= `</ol>` 
                    jq2("#res_nmn_"+m).html(opc);
        
                    jq2(`#${idSelectable}`).selectable({
                        selected: function(event, ui) {
                           let selected_id = jq2(ui.selected).attr('id');
                           let selected_name = jq2(ui.selected).text();
                           jq2("#nmn_"+m).val(selected_name);
                           jq2("#imn_"+m).val(selected_id);
                           jq2("#res_nmn_"+m).html("");
                        }
                    });
                
                },
                fail: function( jqXHR, textStatus, errorThrown ) {
                    console.log( "La solicitud de nota principal ha fallado: " +  textStatus +" - "  +errorThrown);
                }
            })    
    }

// Busqueda nota princiapl
   jq2(document).on("keyup",  "input[name='name_main_note']" ,function(e){
    let item = jq2(this).attr('id');
    let k = item.substr(4);
    let code = (e.keyCode ? e.keyCode : e.which); // Si hay un enter , busca el string
    let that = this, value = jq2(this).val();
    if(value.length > 0 ) {
        jq2("#res_nmn_"+k).html("");
        if( code == 13) {
            get_posts(k);
            return false;
          }
    }else if(value.length ==0){
        //console.log("busca otra vez");
        get_posts(k);
    } 
});
 
   // Cuando estas en text de nota principal mustra las ultimas 50 notas
    jq2(document).on("focus",  "input[name='name_main_note']" ,function(e){
        let item = jq2(this).attr('id');
        let k = item.substr(4);    
        let that = this, value = jq2(this).val();
        if(value.length > 0 ) {
            console.log("No busques nada");
        }else {
            get_posts(k);
            return false;
        }
    });
    // Borra resultados si sale del text de la nota principal
    jq2(document).on("focusout",  "input[name='name_main_note']" ,function(e){
        let item = jq2(this).attr('id');
        let k = item.substr(4);
        let minlength =3;
        let that = this, value = jq2(this).val();
        jq2("#res_nmn_"+k).html("");
       return false;
        
    });
    
    
/* Busqueda notas secundarias */
   jq2(document).on("keyup",  "input[name='name_notes']" ,function(e){
    let item = jq2(this).attr('id');
   // console.log("este es el id" +  item);
   let tema = item.substr(5);
   let elem = item.substr(3 , 1) ;
   let that = this, value = jq2(this).val();
   let code = (e.keyCode ? e.keyCode : e.which); // Si hay un enter , busca el string
    if(value.length > 0 ) {
        jq2(`#res_nn_${elem}_${tema}`).html("");
        if( code == 13) {
            get_notes(tema, elem);   
            return false;
        }
    }else if(value.length ==0){
        get_notes(tema, elem);
        
    }
     });

    jq2(document).on("focus",  "input[name='name_notes']" ,function(e){
        console.log("on focus ...");
        let item = jq2(this).attr('id');
        let tema = item.substr(5);
        let elem = item.substr(3 , 1) ;
      
      let that = this, value = jq2(this).val();
        if(value.length > 0 ) {
            console.log("No busques nada");
        }else {
            get_notes(tema, elem);
            return false;
        }
    });
    
    jq2(document).on("focusout",  "input[name='name_notes']" ,function(e){
        let item = jq2(this).attr('id');
        let tema = item.substr(5);
        let elem = item.substr(3 , 1) ;
        let res_notas = `res_nn_${elem}_${tema}`;
        jq2(`#${res_notas}`).html("");
    });

       /* OBTIENE LAS NOTAS secundarias*/
    function get_notes(tema, elem){
        let res_notas = `res_nn_${elem}_${tema}`;
        jq2(`#${res_notas}`).html("");
        let tema_id = jq2("#tema_id_"+tema).val();
        if(tema_id == "") tema_id=0;
     
        let search_title = jq2(`#nn_${elem}_${tema}`).val();
        if(search_title =="") search_title=0;
        jq2.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'get_posts',
                search : tema_id,
                title : search_title
            },
            beforeSend: function(){
                jq2(`#${res_notas}`).html('<div class="imgload">Buscando resultados ...</div>');
            },    
            success : function( result ) {
                // console.log(result);
                  let obj = JSON.parse(result);
                 // console.log(obj);
                   let size = obj.length;
                   let idSelectable = `selectable_nn_${elem}_${tema}`;
       
                   let opc = `<ol class="selector" id="${idSelectable}">` 
                   for(let i =0 ;  i<size ; i++){
                       let id =  obj[i]["id"];
                       let title=  obj[i]["post_title"];
                       opc+= `<li id="${id}">${title}</li>`
                   }
                   opc+= `</ol>` ;
                   
                   jq2(`#${res_notas}`).html(opc);
                   
                   jq2(`#${idSelectable}`).selectable({
                       selected: function(event, ui) {
                          let selected_id = jq2(ui.selected).attr('id');
                          let selected_name = jq2(ui.selected).text();
                          jq2(`#nn_${elem}_${tema}`).val(selected_name);
                          jq2(`#in_${elem}_${tema}`).val(selected_id);
                          jq2(`#res_nn_${elem}_${tema}`).html("");
                       }
                   });
               } ,
            fail : function( jqXHR, textStatus, errorThrown ) {
                console.log( "La solicitud de nota principal ha fallado: " +  textStatus +" - "  +errorThrown);
            }
        })     
    }

    jq2(document).on("click",  "input[name='btn_save_themes']" ,function(e){
        let item = jq2(this).attr('id');
        let tema = item.substr(11);
        save_themes(tema);  
    });

    function save_themes(t){
        let temahome = jq2(`#option_name_${t}`).val();
       // let temahome = `home_theme_${t}`;
        let theme_name= jq2(`#theme_name_${t}`).val();
        let theme_id= jq2(`#tema_id_${t}`).val();
        let tema_name= jq2(`#tema_${t}`).val();
        let idmn= jq2(`#imn_${t}`).val();
        let nmn= jq2(`#nmn_${t}`).val();
        let theme_orden= jq2(`#nmn_${t}`).val();
        
        let myTheme = new Object();
        myTheme.name = theme_name;
        myTheme.taxonomy_id = theme_id;
        myTheme.taxonomy_name = tema_name;
        myTheme.main_note_id =  idmn;
        myTheme.main_note_name =  nmn;
        let arrayNotes = [];
        
        jq2(`input[name='id_notes_${t}']`).each(function() {
            let notes = new Object();
            let idElemt = jq2(this).attr('id');
            let item = idElemt.substr(3,1);
            let theme = idElemt.substr(5,1);
            let name_note =  jq2(`#nn_${item}_${theme}`).val();
            let id_note = jq2(this).val();
            if(name_note  == ""){
                id_note = jq2(this).val("");
            }else{   
               // console.log("  id nota " +idElemt );
                let n_note = name_note;
                let active =  jq2(`#ckact_${item}_${theme}`).is(':checked');
                let thumb =   jq2(`#thum_${item}_${theme}`).is(':checked');
                
                notes.note_id = id_note;
                notes.note_name = n_note;
                notes.active = active;
                notes.thumbnail =  thumb;
                
                arrayNotes.push(notes);
            }
        });
        console.log(`Saved theme : ${temahome}`);
        console.log(myTheme);
        myTheme.notes =  arrayNotes;
            jq2.ajax({
                url: opc_vars.ajaxurl,
                type: "POST",
                data: {
                    action : 'save_themes',
                    tema : temahome,
                    datos : myTheme
                }            
            })
            .success(function( result ) {
                updateMainTheme();
                location.reload();
            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
                 console.log( "La solicitud a fallado: " +  textStatus +" - "  +errorThrown);
             });
    }

    async function get_themes_home(){
        jq2("div#tabs-1").html("<h1>Temas del Home</h1>");
        await  jq2.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'get_themes'
            } ,
            success : function( result ) {
                //  console.log( `: ${obj}`); 
              if(result != "" ) {    
                  let obj = JSON.parse(result);
                  let size = obj.length;
              if(size > 0) {
                  for(let i = 0; i< size ; i++){
                      let k = i+1;
      
                      let fmdefault = form_default(k);
                      jq2("div#tabs-1").append(fmdefault);
      
                      let option_name = obj[i]["option_name"];
                      let order = k;   
                      let name  = obj[i]["value"]["name"];
                      let mainnoteid  = obj[i]["value"]["main_note_id"];
                      let mainnotename  = obj[i]["value"]["main_note_name"];
                      let taxonomyid  = obj[i]["value"]["taxonomy_id"];
                      let taxonomyname = obj[i]["value"]["taxonomy_name"];
                      let arry_notes = obj[i]["value"]["notes"];
                      
                      jq2(`#theme_name_${k}`).val(name);
                      jq2(`#imn_${k}`).val(mainnoteid);
                      jq2(`#nmn_${k}`).val(mainnotename);
                      jq2(`#tema_id_${k}`).val(taxonomyid);
                      jq2(`#tema_${k}`).val(taxonomyname);
                      jq2(`#option_name_${k}`).val(option_name);
                      jq2(`#order_${k}`).val(order);
                      //console.log( `${name} : main_note ${mainnoteid} : taxonomyid  ${taxonomyid} :  taxonomyname ${taxonomyname}`);
                      if( arry_notes !== undefined){
                          let tn = arry_notes.length;
                          let a = 1;
                          for(let m = 0 ; m<tn ; m++ ){
                              
                          let noteid =     arry_notes[m]["note_id"];
                          let notename =     arry_notes[m]["note_name"];
                          let active =    JSON.parse(arry_notes[m]["active"]);
                          let thumbnail = JSON.parse( arry_notes[m]["thumbnail"]);
      
                          jq2(`#in_${a}_${k}`).val(noteid);
                          jq2(`#nn_${a}_${k}`).val(notename);
      
                          jq2(`#ckact_${a}_${k}`).prop('checked', active );
                          jq2(`#thum_${a}_${k}`).prop('checked', thumbnail);
                          
                          a++;
                          } 
                      }
                     // console.log(` ........... ${k} ........  `);
                  } 
                }
              }else{
                  console.log("No hay themas guardados");
                  let fmdefault = form_default();
                  jq2("div#tabs-1").append(fmdefault);
                  nametema();
              }
              },
              fail : function( jqXHR, textStatus, errorThrown ) {
                   console.log( "La solicitud de obtener get_themes_home ha fallado: " +  textStatus +" - "  +errorThrown);
               }
        });
        await btn_generales_tab1();
     
    }

jq2(document).on("click","input[name=btn_delete_themes]",function(e){
    let theme = jq2(this).attr('id');
    theme = theme.substr(-1);
    delete_theme = jq2(`#option_name_${theme}`).val();
    console.log(`delete theme : ${delete_theme}`);
    let conf = confirm(`¿Está seguro de eliminar el tema  ${theme}?`);
    if(conf){
            console.log("Eliminando.....");
            jq2.ajax({
                url: opc_vars.ajaxurl,
                type: "POST",
                data: {
                    action : 'delete_theme',
                    theme_name : delete_theme
                }            
            })
            .success(function( result ) {
                jq2(`#theme_content_${theme}`).empty();
                updateMainTheme();
                location.reload();
            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
                 console.log( "La solicitud de eliminar tema ha fallado: " +  textStatus +" - "  +errorThrown);
             });
    }
});

    jq2(document).on("focusout","input[name=order_themes]",function(e){
        let theme = jq2(this).attr('id');
        theme = theme.substr(-1);
        let valor = parseInt(jq2(this).val());
        if(valor> 0 && valor <  n) {
            console.log(theme +" "+valor);  
        }else{
            alert("Solo se permiten valores del 1 al " +(n-1));
            jq2(this).val(theme);
            jq2(this).focus();
            return false;
        }
    });

    
    jq2(document).on("click","#change_order_theme",function(e){
        let valores = [];
        let duplicados = [];
        let arrayTheme = [];
        jq2("input[name='order_themes']").each(function( ind, elem) {
            let theme = new Object();
            let item = jq2(elem).val();
            let id = jq2(elem).attr('id');
                id = id.substr(-1);
            let opc_name_them = jq2(`#option_name_${id}`).val();
            theme.order = item;
            theme.option_name = opc_name_them;
            arrayTheme.push(theme);
            valores.push(item);
                        
        });
        const tempArray = [...valores].sort();
        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i + 1] === tempArray[i]) {
              duplicados.push(tempArray[i]);
              alert(`¡Error! El orden del tema ${tempArray[i]} esta duplicado` );
              return false;
            }
          }
          if(duplicados.length == 0){
                jq2.ajax({
                    url: opc_vars.ajaxurl,
                    type: "POST",
                    data: {
                        action : 'change_order',
                        datos : arrayTheme
                    }            
                })
                .success(function( result ) {
                  location.reload();
                 // console.log(result);
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    console.log( "La solicitud de eliminar tema ha fallado: " +  textStatus +" - "  +errorThrown);
                });
          }
    });

    function updateMainTheme(){
        let arrayTheme = [];
        let i=1;
        jq2("input[name='order_themes']").each(function( ind, elem) {
            let theme = new Object();
            let item = jq2(elem).val();
            let id = jq2(elem).attr('id');
                id = id.substr(-1);
            let opc_name_them = jq2(`#option_name_${id}`).val();
            theme.order = i;
            theme.option_name = opc_name_them;
            arrayTheme.push(theme);
           
          i++;              
        });
        console.log(arrayTheme);
        jq2.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'save_main_theme_home',
                datos : arrayTheme
                
            }            
        })
        .success(function( result ) {
         console.log(result);
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            console.log( "La solicitud de eliminar tema ha fallado: " +  textStatus +" - "  +errorThrown);
        });
    }

    function btn_generales_tab1(){
        let btn_gral  =` <div  class="bt_save_them" id ="bt_save_them_1"> <input type ="button" class ="button tagadd" value="Añadir tema" id="add_theme"></div>
                <div class="bt_orden_them" id ="bt_orden_them_1">	<input type ="button" class ="button tagadd" value="Guardar orden de los temas" id="change_order_theme"></div>`;     
             jq2("div#tabs-1").append(btn_gral);     
    }
 
    let mediaUploader;
    jq2('#upload-button').click(function(e) {
		e.preventDefault();
	  // If the uploader object has already been created, reopen the dialog
		if (mediaUploader) {
			mediaUploader.open();
			return;
		}
	  // Extend the wp.media object
	  mediaUploader = wp.media.frames.file_frame = wp.media({
				title: 'Selecciona una imagen',
				button: {
				text: 'Selecciona una imagen'
			}, multiple: false });
	  // When a file is selected, grab the URL and set it as the text field's value
	  mediaUploader.on('select', function() {
			attachment = mediaUploader.state().get('selection').first().toJSON();
			$('#image-url').val(attachment.url);
		});

	  // Open the uploader dialog
	  mediaUploader.open();
	});

    jq2("#save_transmision_vivo").click(function (){
        let transmision = new Object();
        let title_trans   = jq2("#title_trans_vivo").val();
        let imagen_trans = jq2("#image-url").val();
        let active_trans = jq2('#active_transmision').is(':checked');

       transmision.title =  title_trans;
       transmision.image =  imagen_trans;
       transmision.active = active_trans;

       console.log( active_trans);
        jq2.ajax({
            url: opc_vars.ajaxurl,
            type : "POST",
            data : {
                action : 'save_trans_vivo',
                datos :transmision
                
            },
            success : function (res){
                //console.log(res );
                location.reload();
            }
        })
    });

/***** Obtiene los datos de transmison en vivo  */
    function get_feed_trasmision_vivo(){
        jq2.ajax({
            url: opc_vars.ajaxurl,
            type : "POST",
            data : {
                action : 'get_trans_vivo',
                
            },
            success : function (res){
                //console.log(res);
                if(res != ""){
                    let obj = JSON.parse(res);
                    jq2("#title_trans_vivo").val(obj["title"]);
                    jq2("#image-url").val(obj["image"]);
                    jq2("#active_transmision").prop('checked', JSON.parse(obj["active"]));
                   // console.log( );

                }
            }
        })
    }
/*** Obtiene datos de seleccion del editor */
    function get_feed_update_edit(){
        jq2.ajax({
            url: opc_vars.ajaxurl,
            type : "POST",
            data : {
                action : 'get_update_edit'
            },
            success : function(res){
                if(res != ""){
                    let obj = JSON.parse(res);
                    jq2("#summary_edit").val(obj["summary"]);
                    jq2("#active_edit_update").prop('checked', JSON.parse(obj["active"]));
                        if(obj.notes  !== undefined){
                         let nota = obj.notes;
                          let tl =   Object.keys(nota).length;
                           for (let i = 0; i< tl; i++){
                               let name = nota[i]["note_name"];
                               let id = nota[i]["note_id"];
                            jq2(`#name_note_edit_${i}`).val(name);
                            jq2(`#id_note_edit_${i}`).val(id);

                           }
                        }
                 }
            }
        })
    }

/*********  Guarda Selección del editor **********************/
  jq2("#save_update_edit").click(function (){
     
    let updateEditorial = new Object();
    let summary = jq2("#summary_edit").val();
    let active_update_editorial = jq2('#active_edit_update').is(':checked');
    let arrayNotes = [];
    jq2(`input[name='note_edit_update']`).each(function() {
        let notes = new Object();
        let idElemt = jq2(this).attr('id');
        let id = idElemt.substr(-1);
        let  name_note =jq2(`#name_note_edit_${id}`).val(); 
        if(name_note  == ""){
            jq2(`#${idElemt}`).val("");
        }else{   
            let n_note = name_note;
            let id_note =  jq2(`#id_note_edit_${id}`).val();
            notes.note_id = id_note;
            notes.note_name = n_note;
            arrayNotes.push(notes);
        }

    });
      updateEditorial.summary = summary;
      updateEditorial.notes = arrayNotes;
      updateEditorial.active = active_update_editorial;
      jq2.ajax({
          url :  opc_vars.ajaxurl,
          type : "POST",
          data :{
            action : 'save_update_edit',
            datos : updateEditorial
          },
          success : function(res){
                    //console.log(res);
                    location.reload();
          }
      })
  });



    function get_post_for_editorial(elem){
        let item = `res_note_edit_${elem}`;
        jq2(`#${item}`).html("");
       let tema_id=0;
       let search_title = jq2("#name_note_edit_"+elem).val();
       if(search_title =="") search_title="0";

        jq2.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'get_posts',
                search : tema_id,
                title  : search_title
            },
            beforeSend: function(){
                jq2(`#${item}`).html('<div class="imgload">Buscando resultados ...</div>');
            },    
            success : function( result ) {
                // console.log(result);
                  let obj = JSON.parse(result);
                 // console.log(obj);
                   let size = obj.length;
                   let idSelectable = `select_editorial_${elem}`;
       
                   let opc = `<ol class="selector" id="${idSelectable}">` 
                   for(let i =0 ;  i<size ; i++){
                       let id =  obj[i]["id"];
                       let title=  obj[i]["post_title"];
                       opc+= `<li id="${id}">${title}</li>`
                   }
                   opc+= `</ol>` ;
                   
                   jq2(`#${item}`).html(opc);
                   
                   jq2(`#${idSelectable}`).selectable({
                       selected: function(event, ui) {
                          let selected_id = jq2(ui.selected).attr('id');
                          let selected_name = jq2(ui.selected).text();
                          jq2(`#name_note_edit_${elem}`).val(selected_name);
                          jq2(`#id_note_edit_${elem}`).val(selected_id);
                          jq2(`#${item}`).html("");
                       }
                   });
               } ,
            fail : function( jqXHR, textStatus, errorThrown ) {
                console.log( "La solicitud de nota principal ha fallado: " +  textStatus +" - "  +errorThrown);
            }
        })     
    }

    jq2(document).on("keyup",  "input[name='note_edit_update']" ,function(e){
        
        let item = jq2(this).attr('id');
        let k = item.substr(-1);
        let code = (e.keyCode ? e.keyCode : e.which); // Si hay un enter , busca el string
        let that = this, value = jq2(this).val();
        if(value.length > 0 ) {
            jq2(`#res_note_edit_${k}`).html("");
            if( code == 13) {
                console.log("KEYUP");
                get_post_for_editorial(k);
                return false;
              }
        }else if(value.length ==0){
            get_post_for_editorial(k);
        } 
    });

    jq2(document).on("focus",  "input[name='note_edit_update']" ,function(e){
        let item = jq2(this).attr('id');
        let k = item.substr(-1);
        console.log(k)
        let that = this, value = jq2(this).val();
        if(value.length > 0 ) {
            console.log("No busques nada");
        }else {
             get_post_for_editorial(k);
        }
          
        });

    jq2(document).on("focusout",  "input[name='note_edit_update']" ,function(e){
        let item = jq2(this).attr('id');
        let elem = item.substr(-1);
        let res_notas = `res_note_edit_${elem}`;
        jq2(`#${res_notas}`).html("");
    });

 /**** TAB-1  */
get_themes_home();
/*****TAB-2 */
//

let tabss = jq2( "#ophome-tabs" ).tabs({
    active: 0,
  });
  
  jq2( "#link_tab_2" ).on( "click", function() {
    get_feed_trasmision_vivo();
  });

  jq2("#link_tab_3").on("click" , function(){
      get_feed_update_edit();
  });

});



