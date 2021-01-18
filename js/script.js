var jq2 = jQuery.noConflict();
jq2(function( $ ) {
   var n = 1;
     function form_default (ext =""){
       
let fm = `<div class ="opch_wrap" id="theme_content_${n}">
       
        <div class ="opch_txt_block">
        <input type ="hidden" name ="option_names" id = "option_name_${n}">
            <div class = "opch_txt_left"> <strong> Tema ${n} : </strong> </div> 
            <div><input type ="text"  size = "70" name="theme_name" id="theme_name_${n}" placeholder="Escribe el nombre del tema"></div>
        </div>
        <div class ="opch_txt_block">
            <div class ="opch_txt_left">Selecciona un tema: </div>
            <div>
                <input type = "text" name = "tema" size = "70" id = "tema_${n}" placeholder="Buscar tema ">
                <input type ="hidden" name ="tema_id" id = "tema_id_${n}">
            </div>
            <div class="resultado_temas_cont" id="resultado_temas_${n}"></div>
        </div>

        <div class ="opch_txt_block">
            <div class = "opch_txt_left">Nota principal : </div>
            <div>
                <input type = "text" name = "name_main_note" size = "70" id = "nmn_${n}" placeholder="Buscar nota principal">
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
                <input type ="text" name = "name_notes" size = "65" id = "nn_1_${n}" placeholder="Buscar nota # 1">
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
                    <input type ="text" name = "name_notes" size = "65" id = "nn_2_${n}" placeholder="Buscar nota # 2">
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
                    <input type ="text" name = "name_notes" size = "65" id = "nn_3_${n}" placeholder="Buscar nota # 3">
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

    function formIni (){
        jq2("div.wrap").html("<h1>Opciones del Home</h1>");
    }

    /* Agrega nuevo tema vacio */
    jq2(document).on("click","#add_theme",function(e){
       
        if(n<6){
            let fmdefault = form_default();
            jq2("div.wrap").append(fmdefault);
            nametema();
        }else {
            return false;
        }
        
    });

    let nametema = () => {
        let allNames = [];
        for(let j=0; j<5; j++){
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
        //console.log("qqqq" +id );
        let name_opc =  allNames[0];
        jq2(`#${id}`).val(`home_theme_${name_opc}`);
    }

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
           // console.log(result);
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

   jq2(document).on("keyup",  "input[name='tema']" ,function(e){
    let item = jq2(this).attr('id');
    let k = item.substr(5);
    let minlength =3;
    //console.log("onkeyup");
    let that = this, value = jq2(this).val();
    if(value.length >= minlength ) {
        get_topic(k);
        return false;
    }
     });


    function get_posts(m){
       jq2("#res_nmn_"+m).html("");
        let tema_id = jq2("#tema_id_"+m).val();
        if(tema_id =="") tema_id=0;
        let search_title = jq2("#nmn_"+m).val();
        if(search_title =="") search_title=0;
        let $f = $(this);
     //  if(tema_id != ""){ console.log(tema_id); } 
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
                // console.log(result);
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
    let minlength =15;
    let that = this, value = jq2(this).val();
    if(value.length >= minlength ) {
        get_posts(k);
        return false;
    }
     });
 
   
    jq2(document).on("focus",  "input[name='name_main_note']" ,function(e){
        let item = jq2(this).attr('id');
        let k = item.substr(4);
        let minlength =3;
        let that = this, value = jq2(this).val();
      
            get_posts(k);
            return false;
        
    });
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
    let minlength =15;
    let that = this, value = jq2(this).val();
    if(value.length >= minlength ) {
        get_notes(tema, elem);
        return false;
    }
     });


    jq2(document).on("focus",  "input[name='name_notes']" ,function(e){
        let item = jq2(this).attr('id');
       // console.log("este es el id" +  item);
        let tema = item.substr(5);
        let elem = item.substr(3 , 1) ;
        let that = this, value = jq2(this).val();
       
            get_notes(tema, elem);
            return false;
        
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
    

        jq2.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'get_posts',
                search : tema_id
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

    jq2(document).on("click",  ".button.button-large " ,function(e){
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

    
    function get_themes_home(){
        jq2.ajax({
            url: opc_vars.ajaxurl,
            type: "POST",
            data: {
                action : 'get_themes'
            }            
        })
        .success(function( result ) {
          //  console.log( `: ${obj}`); 

        if(result != "" ) {    
            let obj = JSON.parse(result);
            let size = obj.length;
           // console.log(size);
        if(size > 0) {
            for(let i = 0; i< size ; i++){
                let k = i+1;

                let fmdefault = form_default(k);
                jq2("div.wrap").append(fmdefault);

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
            } 
        }
    }else{
        console.log("No hay themas guardados");
        let fmdefault = form_default();
        jq2("div.wrap").append(fmdefault);
        nametema();
    }
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
             console.log( "La solicitud de obtener get_themes_home ha fallado: " +  textStatus +" - "  +errorThrown);
         });
        
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
         // location.reload();
          console.log(result);
        
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            console.log( "La solicitud de eliminar tema ha fallado: " +  textStatus +" - "  +errorThrown);
        });

    }


/** Inicializa el tema 1 */
formIni();  
get_themes_home();


 

});



