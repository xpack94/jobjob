$(function(){
    
    var game={
        
        lignes:4,
        colonnes:4,
        url:'img.png',
        tdWidth:125,
        tdHeight:125,
        couleurImageVide:"grey",
        taille:0,
        nbrTour:300,
        init:function(){
            this.cachDom();
            this.addEvents();
            this.createGrid();
            this.addTdEvents();
        },
        
        cachDom:function(){
            this.$grid=$(".grid");
            this.$imageChnager=$(".imageChnager");
            this.$imageUrl=$("#imageUrl");
            this.$nbrLignes=$("#nbrLignes");
            this.$nbrColonnes=$("#nbrColonnes");
            this.$afficher=$(".afficher");
            this.$affichageOrdre=$("#affichageOrdre");
            this.$brasser=$(".brasser");
            this.$deplacements=$(".deplacements span");
            this.$window=$(window);
        
        
        },
        
        addEvents:function(){
            this.$imageChnager.click(this.changeImage.bind(this));
            this.$afficher.click(this.afficher.bind(this));
            this.$brasser.click(this.shuffle.bind(this));
            this.$nbrLignes.change(this.updateLignes.bind(this));
            this.$nbrColonnes.change(this.updateColonnes.bind(this));
            this.$affichageOrdre.click(this.showOrder.bind(this));
            this.$window.keydown(this.handleKeyPress.bind(this));
        },
        //fonction qui ajoute les evenements de drag au cases de la table
        addTdEvents:function(){
           [...this.$grid.find("table").find("td")].forEach((td)=>{
                $(td).on ("dragenter",this.checkDrag.bind(this));
           });
        },
        
        createGrid:function(){
            
            
        
          ordreDesCase=0;
          let table=$("<table></table>");
          for(let i=0;i<this.lignes;i++){
              let tr=$("<tr></tr>");
              for(let j=0;j<this.colonnes;j++){
                let td=$("<td></td>");
                let span=$("<span></span>");
                //verifier que ce n'est pas la derniere case ou se trouve l'image vide
                if(i*j!=(this.lignes-1)*(this.colonnes-1)){
                    td.attr("draggable",'true');
                    td.attr("data-order",++ordreDesCase);
                    td.addClass(`td${i}${j}`);
                     td.css({
                    "width": this.tdWidth,
                    "height":this.tdHeight,
                    "background-image":`url(${this.url})`,
                    "background-position": `${-j*this.tdWidth}px ${-i*this.tdHeight}px`,
                    "background-repeat":"no-repeat"
                    
                });
                
                }else{
                    //mettre la derniere case comme case vide
                    td.addClass("vide");
                    td.css({
                    "width":this.tdWidth,
                    "height":this.tdHeight,
                    "background-color":this.couleurImageVide
                    
                });  
                }
                span.html(ordreDesCase);
                td.append(span);   
                tr.append(td);
              }
                table.append(tr);
                
          }
            
            this.$grid.html(table);
            this.taille=ordreDesCase;
            this.resetCounter();
            
            
            
        },
        
        
        
        changeImage:function(){
            if(this.$imageUrl.val()!=""){
               this.url=this.$imageUrl.val();
               this.createGrid();
            }else{
                alert("taper un url");
            }
        },
        
        afficher:function(){
           
        },
            
        showOrder:function(){
           if(this.$affichageOrdre.is(":checked")){
               $("td span").css("opacity",1);
           }else{
               $("td span").css("opacity",0);
           }
        },
        
        updateLignes:function(){
          
              let nbLignes=parseInt(this.$nbrLignes.val());
              this.lignes=nbLignes;
              this.createGrid();
        },
        updateColonnes:function(){
              let nbLignes=parseInt(this.$nbrColonnes.val());
              this.colonnes=nbLignes;
              this.createGrid();
        },
        
        shuffle:function(){
            for(let i=0;i<this.nbrTour;i++){
                let caseVide=$(".vide");
                let rand=Math.floor(Math.random()*this.taille +1);
                let caseDuTableau=$(`[data-order="${rand}"] `) ;
                //faire le switch de la case generer en random avec la case vide
                this.swap(caseDuTableau,caseVide);     
            }
            
        },
       //fonction qui swap deux elements 
       swap:function(to,from) {
         
            var copy_to = $(to).clone(true);
            $(from).replaceWith(copy_to);
            $(to).replaceWith(from);
           
        },
        
        //fonction qui gere les bouttons du clavier
        handleKeyPress:function(e){
            let table=this.$grid.find("table");
            let caseVide=table.find(".vide");
            let deplacementPermit=false;
            if(e.which==39){
               //fleche droite est cliqué
                if(caseVide.prev().is("td")){ //verifier que l'element qui vient avant est un element td
                    deplacementPermit=true;
                    this.swap(caseVide,caseVide.prev());
                }
                
            }else if(e.which==37){
                //fleche gauche est cliqué
                if(caseVide.next().is("td")){//verifier que l'element qui vient apres est un element td
                    deplacementPermit=true;
                    this.swap(caseVide,caseVide.next());
                }
                
            }else if(e.which==38){
                //fleche haut est cliqué
                 let parent=caseVide.parent();
                 let positionCaseVide=caseVide.index();
                 if(parent.next().is("tr")){
                     deplacementPermit=true;
                     this.swap(caseVide,parent.next().children().eq(positionCaseVide));
                 }
                
            }else if(e.which==40){
                //fleche bas est cliqué
                let parent=caseVide.parent();
                let positionCaseVide=caseVide.index();
                if(parent.prev().is("tr")){
                    deplacementPermit=true;
                    this.swap(caseVide,parent.prev().children().eq(positionCaseVide));
                }
            }else{
                return;
            }
        
            //permet de verifier si un deplacement a été fait
            if(deplacementPermit){
               this.updateCounter();
               this.isWin(); 
            } 
            
        },
        //fonction qui met a jours le nombre de deplacements
        updateCounter:function(){
            this.$deplacements.html(parseInt(this.$deplacements.text())+1)           
        },
        resetCounter:function(){
            this.$deplacements.html("0");        
        },
        
        //fonction qui verifie si la partie est gagné
        isWin:function(){
            let tdTable=[...this.$grid.find("table").find("td")];
            for(let i=0;i<tdTable.length-1;i++){
                if( parseInt($(tdTable[i]).attr("data-order"))!=i+1){
                    return;
                }
            }
            alert(`vous avez gagné!en éffectuant ${this.$deplacements.html()} deplacements`);
        },
        
        checkDrag:function(e){
            let elementCible=$(e.originalEvent.target);
            let elementOrigine=$(e.originalEvent.relatedTarget);
            if(elementCible.is("td.vide") && elementOrigine.not("td.vide") ){
                // console.log(e.originalEvent.relatedTarget,e.originalEvent.target);   
                if(this.isNeighbor(elementOrigine,elementCible)){
                    this.swap(elementCible,elementOrigine);
                    this.isWin();
                    return;
                }
            }
            
           
        },
        //verifie si element1 est un voisin de l'element2
        isNeighbor:function(element1,element2){
            let parent=element2.parent();
            let positionElement2=element2.index();
            if(element2.prev().is(element1)){
                //element1 vient avant l'element2
                return true;
            }else if(element2.next().is(element1)){
                //element1 vient apres l'element2
                return true;
            }else if(parent.prev().children().eq(positionElement2).is(element1)){
                return true;
            }else if(parent.next().children().eq(positionElement2).is(element1)){
                return true;    
            }
            return false;
            
            }
            
        

        
        
    }//fin de l'obejet game
    
    
    
    
    
   
game.init();    
});
