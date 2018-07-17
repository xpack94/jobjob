$(function(){
    
    var game={
        
        lignes:4,
        colonnes:4,
        url:'img.png',
        tdWidth:125,
        tdHeight:125,
        init:function(){
            this.cachDom();
            this.addEvents();
            this.createGrid();
        },
        
        cachDom:function(){
            this.$grid=$(".grid");
            this.$imageChnager=$(".imageChnager");
            this.$imageUrl=$("#imageUrl");
            this.$nbrLignes=$("#nbrLignes");
            this.$nbrColonnes=$("#nbrColonnes");
            this.$afficher=$(".afficher");
            this.$brasser=$(".brasser");
            this.$deplacements=$(".deplacement span");
        
        
        },
        
        addEvents:function(){
            this.$imageChnager.click(this.changeImage.bind(this));
            this.$afficher.click(this.afficher.bind(this));
            this.$brasser.click(this.brasser.bind(this));
            this.$nbrLignes.change(this.updateLignes.bind(this));
            this.$nbrColonnes.change(this.updateColonnes.bind(this));
        },
        
        createGrid:function(){
         
          let table=$("<table></table>");
          for(let i=0;i<this.lignes;i++){
              let tr=$("<tr></tr>");
              for(let j=0;j<this.colonnes;j++){
                let td=$("<td></td>");
                td.addClass(`td${i}${j}`);
                td.css({
                    "width":this.tdWidth,
                    "height":this.tdHeight,
                    "background-image":`url(${this.url})`,
                    "background-position": `${-j*this.tdWidth}px ${-i*this.tdHeight}px`,
                    "background-repeat":"no-repeat"
                    
                });
                tr.append(td);
              }
                table.append(tr);
            
          }
            this.$grid.html(table);
            
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
        brasser:function(){
            
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
        
        
        
        
    }//fin de l'obejet game
    
    
    
    
    
   
game.init();    
});
