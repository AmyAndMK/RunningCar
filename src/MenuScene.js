/**
 * Created by wanght on 15/5/9.
 * @Author wanght
 * @Email whtoo@qq.com
 */
var gameLayer = null;
var menuLayer = null;
var FrontLayer = cc.Layer.extend({
    titleLB:null,
    delegate:null,
    _menuStartBtn:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        this.loadMenu(size);
        return true;
    },
    loadMenu:function(size){
        var centerX = size.width / 2;
        var centerY = size.height / 2;

        var normalBtn = new cc.Sprite(res.Btnn_png);
        var selBtn = new cc.Sprite(res.Btns_png);
        var menuStartBtn = new cc.MenuItemSprite(normalBtn,selBtn,this.onStart,this);
        var menu = new cc.Menu(menuStartBtn);
        menu.setPosition(Math.ceil(size.width/2),Math.ceil(size.height/2));
        //runAction 必须写在addChild之前
       // var flipY = new cc.ScaleTo(1,-1,1);
        //var flipBack = new cc.ScaleTo(1,1,1);
        this._menuStartBtn = menuStartBtn;
        menuStartBtn.scaleX = 3;
        menuStartBtn.scaleY = 3;
        menuStartBtn.opacity = 0.2;
        var fadeIn = new  cc.FadeIn(1);
        var scaleIn = new cc.ScaleTo(1,1,1);
        menuStartBtn.runAction(new cc.Spawn(fadeIn,scaleIn));
        this.addChild(menu,1,0);

        var str = "RunningCar";
// if (cc.sys.os == cc.sys.OS_OSX || cc.sys.os == cc.sys.OS_ANDROID) 
//             {
//                 if ('touches' in cc.sys.capabilities) {
//                     if (cc.sys.capabilities["touches"]) 
//                     {
//                         str =  "ht ";
//                     }
//                     else
//                     {
//                         str =  "nt ";
//                     }
                    
//                 }

//                 if ('mouse' in cc.sys.capabilities) {
//                     if (cc.sys.capabilities["mouse"]) {
//                         str +=  "hm ";
//                     }
//                     else
//                     {
//                         str +=  "nm ";
//                     }
//                 };
                

//                 if ('keyboard' in cc.sys.capabilities) {
//                     if (cc.sys.capabilities["keyboard"]) {str +=  "hk ";}
//                     else {str +=  "nk ";}
                    
//                 }

                
//             }

        //str=JSON.stringify(self.capabilities);
        titleLB = new cc.LabelTTF(str,"微软雅黑",24);

        //create the move action
        //Jump(To | By) func 需要全量参数
        var actionTo = new cc.JumpTo(0.6, cc.p(centerX, centerY * 1.5),50,4);
        var scaleTo = new cc.ScaleTo(0.6,1,1);
        titleLB.anchorX = 0.5;
        titleLB.anchorY = 0.5;
        titleLB.scaleX = 3;
        titleLB.scaleY = 3;
        titleLB.color = cc.color._getRed;
        titleLB.setPosition(centerX,centerY * 2);
        this.addChild(titleLB,0,2);

        titleLB.runAction(new cc.Spawn(actionTo,scaleTo));

    },
    init:function(){

    },
    onStart:function(){
        this._menuStartBtn.stopAllActions();
        this._menuStartBtn.scaleX = 1;
        this._menuStartBtn.scaleY = 1;
        this._menuStartBtn.opacity = 255;
        //this.removeFromParent(true);
        this.visible = false;
        cc.audioEngine.playEffect(res.btn_mp3,false);
        gameLayer.startGame();

    },
    popUp:function(){
        //this.delegate.addChild(menuLayer);
        this.visible = true;
    }
});

var MenuScene = cc.Scene.extend({
    gameOverLayer:null,
    ctor:function (bPortrait) {
        this._super();
        this.init();},
    onEnter:function () {
        this._super();
        menuLayer = new FrontLayer();
        menuLayer.delegate = this;
        this.addChild(menuLayer);

        gameLayer = new GameView();
        this.addChild(gameLayer,-1,1);




    }

});

