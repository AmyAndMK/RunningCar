/**
 * Created by wanght on 15/5/9.
 * @Author wanght
 * @Email whtoo@qq.com
 */

var UIBaseLayer = cc.Layer.extend({
    _mainNode:null,
    _topDisplayText:null,
    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();

        //add main node
        var mainNode = new cc.Node();
        var scale = winSize.height / 320;
        //mainNode.attr({anchorX: 0, anchorY: 0, scale: scale, x: (winSize.width - 480 * scale) / 2, y: (winSize.height - 320 * scale) / 2});
        this.addChild(mainNode);

        var topDisplayText = new ccui.Text();
        topDisplayText.attr({
            string: "",
            font: "20px Arial",
            x: 240,
            y: 320-50
        });
        mainNode.addChild(topDisplayText,100);

        this._mainNode = mainNode;
        this._topDisplayText = topDisplayText;
    },

    _parseUIFile: function(file){
        if(cocoStudioOldApiFlag == 0){
            cc.log("ccs.load : %s", file);
            var json = ccs.load(file);
            return json.node;
        }else{
            //ccs.uiReader.widgetFromJsonFile only supports 1.x file.
            cc.log("ccs.uiReader.widgetFromJsonFile : %s", file);
            return ccs.uiReader.widgetFromJsonFile(file)
        }
    },

    backEvent: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            runGuiTestMain();
        }
    }
});

var gameOverPtr = null;
var cocoStudioOldApiFlag = 0;
var GameOverLayer = cc.Layer.extend({
    scoreLb:null,
    bestLb:null,
    homeBtn:null,
    gameCBtn:null,
    gameMBtn:null,
    shareBtn:null,
    restartBtn:null,
    delegate:null,
    ctor:function(){
        this._super();
        gameOverPtr = this;
        //if (cc.LayerColor.prototype.init.call(this, cc.color(77,77,77,165)))
        //this._super(cc.color(77,77,77,165));
        //{
            var node = ccs.load(res.gameEnd_json).node;
            this.addChild(node);
             //var root = ccs.load(res.button_json).node;
            // var back_label = ccui.helper.seekWidgetByName(root, "back");
            // back_label.addTouchEventListener(this.backEvent,this);

             // var button = ccui.helper.seekWidgetByName(node, "Button_123");
             // button.addTouchEventListener(this.touchEvent,this);

            // var title_button = ccui.helper.seekWidgetByName(root, "Button_126");
            // title_button.addTouchEventListener(this.touchEvent,this);

            // var scale9_button = ccui.helper.seekWidgetByName(root, "Button_129");
            // scale9_button.addTouchEventListener(this.touchEvent,this);


            this.scoreLb = ccui.helper.seekWidgetByName(node,"scoreLb");
            this.bestLb = ccui.helper.seekWidgetByName(node,"bestLb");
            this.homeBtn = ccui.helper.seekWidgetByName(node,"homeBtn");
            this.gameCBtn = ccui.helper.seekWidgetByName(node,"gameCBtn");
            this.gameMBtn = ccui.helper.seekWidgetByName(node,"gameMBtn");
            this.shareBtn = ccui.helper.seekWidgetByName(node,"shareBtn");
            this.restartBtn = ccui.helper.seekWidgetByName(node,"restartBtn");

            this.restartBtn.addTouchEventListener(this.touchHandler,this);
            this.restartBtn.clicked = false;
            this.homeBtn.addTouchEventListener(this.touchHandler,this);
            this.homeBtn.clicked = false;
            this.gameCBtn.addTouchEventListener(this.touchHandler,this);
            this.gameCBtn.clicked = false;
            this.gameMBtn.addTouchEventListener(this.touchHandler,this);
            this.gameMBtn.clicked = false;
            this.shareBtn.addTouchEventListener(this.touchHandler,this);
            this.shareBtn.clicked = false;

            // this.getBtnAction(this.homeBtn);
            // this.getBtnAction(this.gameCBtn);
            // this.getBtnAction(this.gameMBtn);
            // this.getBtnAction(this.shareBtn);
            // this.bestLb.setString(1000);
            //this.restartBtn.addTouchEventListener(this.touchEvent,this);
            //this.getBtnAction(this.restartBtn);

            
            //this.addChild(root);
        //}
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                this.bestLb.setString("Touch Down");
                break;

            case ccui.Widget.TOUCH_MOVED:
                this.bestLb.setString("Touch Move");
                break;

            case ccui.Widget.TOUCH_ENDED:
                this.bestLb.setString("Touch Up");
                break;

            case ccui.Widget.TOUCH_CANCELED:
                this.bestLb.setString("Touch Cancelled");
                break;

            default:
                break;
        }
    },
    setScoreS:function(score,best){
      this.scoreLb.setString(score);
      this.bestLb.setString(best);
        //this.tipBest();
    },
    tipBest:function(){
        var scaleBig = cc.ScaleTo(0.1,2,2);
        var scale = cc.ScaleTo(0.1,1,1);
        this.bestLb.runAction(cc.sequence(scaleBig,scale));
    },
    test:function()
    {},
    popMenu:function(superLayer,score,best){
        //superLayer.addChild(this);
        // var scene = new cc.Scene();
        // var newOver = new GameOverLayer();
        // newOver.delegate = superLayer;
        // scene.addChild(newOver);
        // cc.director.runScene(scene);
        // newOver.setScoreS(score,best);

        this.visible = true;
        this.setScoreS(score, best);
    },
    dismissMenu:function(superLayer){
        this.visible = false;
    },
    getBtnAction:function(btn){
        btn.clicked = false;
        //cocos studio里面的button时ccui
        //用cc.eventManager会有问题
        btn.addTouchEventListener(this.touchEvent,btn);
    },
    touchHandler:function (sender, type) {
            //this.bestLb.setString(type);
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    var btn = sender;
                    if( btn.clicked == false){
                        //this.bestLb.setString(btn.name);
                        var time = 0.05;
                        var scale = cc.ScaleTo(time,0.8,0.8);
                        var dropDown = cc.MoveBy(time,cc.p(0,-12));
                        var scaleB = cc.ScaleTo(time,1,1);
                        var popB = cc.MoveBy(time,cc.p(0,12));
                        var spawn = cc.spawn(scale,dropDown);
                        var spawnB = cc.spawn(scaleB,popB);
                        var callBack = null;
                        var seq = null;
                        
                        if(btn.name == "restartBtn"){
                            callBack = cc.CallFunc(gameOverPtr.resetGame,gameOverPtr);
                            seq = cc.sequence(spawn,spawnB,callBack)
                        }
                        else if(btn.name =="homeBtn"){
                            callBack = cc.CallFunc(gameOverPtr.toHome,gameOverPtr);
                            seq = cc.sequence(spawn,spawnB,callBack)
                        }
                        else{
                            seq = cc.sequence(spawn,spawnB);
                        }
                        
                        btn.runAction(seq);
                    }


                    break;

                case ccui.Widget.TOUCH_MOVED:

                    break;

                case ccui.Widget.TOUCH_ENDED:
                    var btn = sender;
                    btn.clicked = false;
                    break;

                case ccui.Widget.TOUCH_CANCELED:
                    var btn = sender;
                    btn.clicked = false;
                    break;

                default:
                    break;
            }
    },
    resetGame:function(){

        // var scene = new cc.Scene();
        // var newGame = new GameView();
        // scene.addChild(newGame);
        // cc.director.runScene(scene);
        // newGame.startGame();
        // newGame._start = true;
        // newGame.ps.player.y = this.delegate.ps.player.getContentSize().height * 0.5+ obSize.height;
        // newGame.ps.player.x = gameOverPtr.delegate.obLayer.getRealW(gameOverPtr.delegate.obLayer.prevOb) -  gameOverPtr.delegate.ps.player.width * 0.5;

        // newGame.ps.player.stopAllActions();
        // newGame.ps.player.rotation = 0;
        // newGame.ps.yao()
        // //cc.director.runScene(new MenuScene());
        // cc.eventManager.removeListeners(gameOverPtr.delegate);
        // gameOverPtr.delegate.removeFromeParent(true);


        // gameOverPtr.bestLb.setString("244");
        gameOverPtr.delegate.startGame(true);
        gameOverPtr.delegate._start = true;
        gameOverPtr.delegate.ps.player.y = gameOverPtr.delegate.ps.GetPlayerHeight() * 0.5+ obSize.height;
        gameOverPtr.delegate.ps.player.x = gameOverPtr.delegate.obLayer.getRealW(gameOverPtr.delegate.obLayer.prevOb) -  gameOverPtr.delegate.ps.GetPlayerWidth() * 0.5;

        // //gameOverPtr.dismissMenu(gameOverPtr.delegate);
        gameOverPtr.visible = false;
        // gameOverPtr.bestLb.setString("251");

        gameOverPtr.delegate.ps.player.stopAllActions()
        gameOverPtr.delegate.ps.player.rotation = 0;
        gameOverPtr.delegate.ps.yao(0.1);
        //gameOverPtr.bestLb.setString("256");

        if(gameOverPtr.delegate.oldStick){
            gameOverPtr.delegate.oldStick.removeFromParent(true);
            gameOverPtr.delegate.oldStick = null;
        }
        //gameOverPtr.bestLb.setString("27");
    },
    toHome:function()
    {
        gameOverPtr.delegate.toHome();
    }

});