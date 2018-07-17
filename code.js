$(function(){
    
    var game={
        
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
            this.$imageChnager.click(this.changerImage.bind(this));
            this.$afficher.click(this.afficher.bind(this));
            this.$brasser.click(this.brasser.bind(this));
        },
        
        createGrid:function(){
          
            console.log(this.$grid);
        },
        
        changerImage:function(){
            
        },
        afficher:function(){
        
        },
        brasser:function(){
            
        }
        
        
        
    }//fin de l'obejet game
    
    
    
    
    
   
game.init();    
});
