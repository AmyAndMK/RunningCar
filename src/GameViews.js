/**
 * Created by wanght on 15/5/9.
 * @Author wanght
 * @Email whtoo@qq.com
 */
//背景墙
var bgSize = null;
var obSize = {width:120,height:287};
var minLimit = {between:48,width:88,scaleCnt:3};
var betweenOffSetX  = 120;
var leftW = 0;//除去左边障碍物后视屏剩下的宽度
var GameBgLayer = cc.Layer.extend({
    ctor:function () {
        this._super();//
        bgSize = cc.director.getWinSize();
        var centerX = bgSize.width / 2;
        var centerY = bgSize.height / 2;
        var rnd = Math.ceil(Math.random() * 2 + 1);
        var resStr = 'res.StartBackground_png'+rnd;
        cc.log(resStr);

        // for (var i = 10 - 1; i >= 0; i--) {
            
        //     var scale = parseInt(Math.floor(Math.random() * 7) / 6) + 2;
        //     cc.log(scale);
        // };

        var spriteBg = new cc.Sprite(eval(resStr));
        spriteBg.attr({
            x: centerX,
            y: centerY,
            scale: 1.0,
            rotation: 0
        });

        this.addChild(spriteBg,0,1);

        return true;

    }

});

//猴子
function PlayerSprite(){

    this.sfCache = null;
    this.player = null;
    var self = this;
    this.init=function () {

        self.sfCache = cc.spriteFrameCache;
        // self.sfCache.addSpriteFrames(res.ShakePlist, res.ShakePng);
        // self.sfCache.addSpriteFrames(res.KickPlist, res.KickPng);
        self.sfCache.addSpriteFrames(res.WalkPlist, res.WalkPng);
        self.sfCache.addSpriteFrames(res.YaoPlist, res.YaoPng);

        self.player = new cc.Sprite('#d0001.png');

        //var playSize = self.player.getContentSize();
        self.player.setScale(0.6, 0.6);
        self.player.x = bgSize.width / 2;
        self.player.y = obSize.height + self.GetPlayerHeight() * 0.5;
    };
    this.walkAction=function (flag) {
        //self.player.stopAllActions();
              var animFrames = [];
              var str = "";
              var frame;
              for (var i = 1; i < 10; i++) {
                  str = "z000" + i + ".png";
                  frame = self.sfCache.getSpriteFrame(str);
                  animFrames.push(frame);
              }
              var animation = new cc.Animation(animFrames, flag);
        return cc.animate(animation).repeatForever();
          };
    this.yaoAction=function (flag) {
        //self.player.stopAllActions();
              var animFrames = [];
              var str = "";
              var frame;
              for (var i = 1; i < 10; i++) {
                  str = "d00" + (i < 10 ? ("0" + i) : i) + ".png";
                  frame = self.sfCache.getSpriteFrame(str);
                  animFrames.push(frame);
              }
              var animation = new cc.Animation(animFrames, flag);
        return cc.animate(animation).repeatForever();
          };
    // this.kickAction= function (flag) {
    //     self.player.stopAllActions();
    //           var animFrames = [];
    //           var str = "";
    //           var frame;
    //           for (var i = 1; i < 10; i++) {
    //               str = "t000" + i + ".png";
    //               frame = self.sfCache.getSpriteFrame(str);
    //               animFrames.push(frame);
    //           }
    //           var animation = new cc.Animation(animFrames, flag);
    //     return animate(animation).repeatForever();
    //       };
    // this.shakeAction= function (flag) {
    //     self.player.stopAllActions();
    //           var animFrames = [];
    //           var str = "";
    //           var frame;
    //           for (var i = 1; i < 10; i++) {
    //               str = "dq000" + i + ".png";
    //               frame = self.sfCache.getSpriteFrame(str);
    //               animFrames.push(frame);
    //           }
    //           var animation = new cc.Animation(animFrames, flag);
    //           return cc.animate(animation).repeatForever();
    //       };
        this.walk=function(flag){
            this.player.runAction(this.walkAction(flag));
        },
        // this.shake=function(flag){
        //     this.player.runAction(this.shakeAction(flag));
        // },
        this.yao=function(flag){
            this.player.runAction(this.yaoAction(flag));
        },
        // this.kick=function(flag){
        //     this.player.runAction(this.kickAction(flag));
        // },
        this.GetPlayerHeight=function()
        {
            return this.player.getScaleY() * this.player.getContentSize().height;
        },
        this.GetPlayerWidth=function()
        {
            return this.player.getScaleX() * this.player.getContentSize().width;
        }
};

var StickSprite = cc.Sprite.extend({
    stickH:0,
    updtH:0.05,
    originalH:287,
    tend:0,
    delegate:null,
    ctor:function(){
        this._super();
        this.initWithFile(res.StickBlack_png);
        return true;
    },
    getRealH:function(){
        return this.getScaleY() * this.getContentSize().height;
    }

});

var GameView = cc.Layer.extend({
    gameBg:null,
    gameOverLayer:null,
    //guideText:null,
    ps:null,
    audioEngine:cc.audioEngine,
    obLayer:null,
    stickSprite:null,
    tipLayer:null,
    self:null,
    _start:true,
    _toHome:false,
    gameScore:0,
    gameBestScore:0,
    oldStick:null,
    titleLB:null,
    waitSoundId:0,
    exitLayer : null,
    init:function () {
        // this._super();
        // this.ids = {};
        // this.unused_sprites = [];
        // titleLB = new cc.LabelTTF("LLLLL","Aria",12);
        // var size = cc.winSize;
        // var centerX = size.width / 2;
        // var centerY = size.height / 2;

        // titleLB.anchorX = 0.5;
        // titleLB.anchorY = 0.5;
        // titleLB.scaleX = 3;
        // titleLB.scaleY = 3;
        // titleLB.color = cc.color._getRed;
        // titleLB.setPosition(centerX,centerY);
        // this.addChild(titleLB,10,2);
    },
    ctor:function(){
        this._super();
        this.init();

        this.self = this;
        this.gameBg = new GameBgLayer();
        this.addChild(this.gameBg,0,1);

        //this.guideText = new cc.LabelTTF('','宋体',42);
        //this.addChild(this.guideText,1,2);

        this.ps = new PlayerSprite();
        this.ps.init();
        var npc = this.ps.player;
        this.addChild(npc);
        this.ps.yao(0.1);

        this.audioEngine.playMusic(res.bg_mp3,true);

        this.obLayer = new ObStaclesLayer();
        this.addChild(this.obLayer,0,3);

        gameOverLayer = new GameOverLayer();
        gameOverLayer.delegate = this;
        this.addChild(gameOverLayer,5);
        gameOverLayer.visible = false;

        //this.addChild(this.gameOverLayer,100);
        // this.gameOverLayer.visible = false;
        // this.gameOverLayer.setScoreS(100,100);
        this.tipLayer = new TipLayer();
        this.tipLayer.x = 0;
        this.tipLayer.y = bgSize.height - this.tipLayer.getContentSize().height;
        this.addChild(this.tipLayer);
        this.tipLayer.visible = false;
        var bestScore =   cc.sys.localStorage.getItem("bestS")? cc.sys.localStorage.getItem("bestS"):0;
        this.gameBestScore = bestScore;

        exitLayer = new ExitLayer();
        this.addChild(exitLayer,6);
        exitLayer.visible = false;

        if(cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID)
            this.createBackButtonListener();

        return true;
    },
    nextGen:function(restart=false){
        if(this.stickSprite != null){
            this.oldStick = this.stickSprite;

        }
        this.stickSprite = new StickSprite();
        this.stickSprite.anchorX = 0.5;
        this.stickSprite.anchorY = 0;
        this.stickSprite.scaleY = 0;
        this.stickSprite.delegate = this;
        this.addChild(this.stickSprite);

        this.obLayer.generateOb();

        var prevObCenterX = this.obLayer.prevPosX;
        var moveBy = new cc.MoveBy(prevObCenterX/ 500,cc.p(-prevObCenterX,0));
        var gap = this.ps.player.x;
        gap = gap < prevObCenterX ? prevObCenterX : gap;
        //gap = start ? -gap : gap;
        var cloneMoveBy = new cc.MoveTo(prevObCenterX / 500,cc.p(this.obLayer.getRealW(this.obLayer.prevOb) * 0.5,this.ps.player.y));
        this.stickSprite.x = this.obLayer.prevOb.getContentSize().width * this.obLayer.prevOb.getScaleX();
        this.stickSprite.y = obSize.height;
        this.audioEngine.playEffect(res.vitory_mp3);
        var playWait = cc.callFunc(this.startPlayWaitSound, this);
        var moveSeq = cc.sequence(cloneMoveBy, playWait, cc.CallFunc(this.ps.player.yao, this.ps.player, 0.01), cc.CallFunc(this.enableStart, this));

        if (restart) {
            this.obLayer.x = this.obLayer.x - prevObCenterX;
        }
        else
        {
            this.ps.player.runAction(moveSeq);
            this.obLayer.runAction(moveBy);
        }

        if(this.oldStick != null){
            if (this._toHome) {
                this.oldStick = null;
            }
            else{
                var seq = cc.sequence(moveBy.clone(),cc.CallFunc(this.removeStick,this));
                this.oldStick.runAction(seq);
            }
            
        }
        if (this._toHome)
        {
            this._toHome = false;
        }
    },
    enableStart:function()
    {
        this._start = true;
    },
    removeStick:function(target,data){
        if(this.oldStick){
            this.oldStick.stopAllActions();
            this.oldStick.removeFromParent(true);
            this.oldStick = null;
        }
    },
    startX:function(){
        cc.log('bind this');
        this.schedule(this.updateDB,0.02);
    },
    stopX:function(){
        //titleLB.setString("stopX");
        this.unschedule(this.updateDB);
        this._start = false;
            //schedule的响应事件对js的function包裹消耗是非常敏感的
            cc.log(this.stickSprite.getRealH());
            var data = this.stickSprite.getRealH();
            var callFunc = cc.CallFunc(this.onEndGrow,this,data);
            this.stickSprite.runAction
            (
                cc.sequence
                (
                    cc.delayTime(0.3),
                    cc.rotateBy(0.1, 90),
                    callFunc
                )
            );

    },
    updateDB:function(dt){
        var self = this.stickSprite;
        var scaleY = self.getScaleY();
        self.setScaleY(scaleY+0.03);
        cc.log("a"+scaleY);

    },
    onTouchBegan:function(touch, event) {
        //titleLB.setString("onTouchBegan");
        var self = event.getCurrentTarget();
        if (self == null) {
            //titleLB.setString("self is null");
        };
        //TEST
        // self.ps.player.y += 150;
        cc.log("I "+event.getCurrentTarget());
        if (self._start) {
            cc.log("I picked a tile!!");
            self.startX();
            return true;
        }
        return false;
    },
    onToucheEnded:function(touch,event){
        //titleLB.setString("onToucheEnded");
        var self = event.getCurrentTarget();
        cc.log("touch End!!");
        self.stopX();
        return true;
    },
    onTouchesEnded:function(touches, event) {
            //titleLB.setString("onTouchesEnded");
            //TEST
                    // var self = event.getCurrentTarget();
                    // self.ps.player.y += 150;
                },
    startGame:function(restart=false){
        var self = this;

        //TEST
        /*
        if (cc.sys.os == cc.sys.OS_OSX) 
            {
                //self.ps.player.y += 250;
            };

        if (cc.sys.os == cc.sys.OS_ANDROID) 
            {
                //self.ps.player.x += 250;
            };
        */

        // var listener = cc.EventListener.create({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     swallowTouches: false,
        //     onTouchBegan:self.onTouchBegan,
        //     onTouchEnded:self.onToucheEnded
        // });
        // cc.log(this.isTouchEnabled ? "true": "false");
        this.isTouchEnabled = true;
        // cc.log(this.isTouchEnabled ? "true": "false");

        // cc.log(this.isTouchEnabled ? "true": "false");
        // self.userInteractionEnabled = true;
        // cc.log(this.isTouchEnabled ? "true": "false");

       this.nextGen(restart);


       this.gameScore = 0;

       this.tipLayer.visible = true;
       this.tipLayer.scoreLb.setString(0);
       this.tipLayer.setLocalZOrder(10);

        //if (!restart) {
            cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:self.onTouchBegan,
            onTouchEnded:self.onToucheEnded
            },this);

        //}
        //TEST
        // if( 'touches' in cc.sys.capabilities )
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        //         onTouchesEnded:self.onTouchesEnded
        //     }, this);
    },
    endGame:function(){
        //cc.eventManager.removeAllListeners();
        this.tipLayer.dismissMenu(this);
    },
    toHome:function(){
        gameOverLayer.dismissMenu(this);
        //titleLB.setString("442");
        this.obLayer.beginInit();
        //titleLB.setString("443");
        if(this.obLayer.nextOb){
            this.obLayer.nextOb.removeFromParent(true);
            this.obLayer.nextOb = null;
        }
        //titleLB.setString("448");
        // if(this.oldStick){
        //     //titleLB.setString("4511");
        //     //this.oldStick.removeFromParent(true);
        //     //titleLB.setString("4513");
        //     this.oldStick = null;
        // }
        //titleLB.setString("451");
        if (this.stickSprite) {
            this.stickSprite.removeFromParent(true);
        }

        this.tipLayer.dismissMenu(this);
        //titleLB.setString("454");
        menuLayer.popUp();

        this.ps.player.x = bgSize.width /2;
        this.ps.player.y = obSize.height +  this.ps.GetPlayerHeight() * 0.5;
        this.ps.player.stopAllActions();
        this.ps.player.rotation = 0;
        this.ps.yao(0.1);

        this._start = true;
        this._toHome = true;
    },
    onEndGrow:function(realH,data){
        //titleLB.setString("onEndGrow");
        cc.log(data);
        var leftX = betweenOffSetX;
        var rightX = leftX + this.obLayer.getRealW(this.obLayer.nextOb);
        var moveBy = null;
        cc.log('leftW'+rightX);
        var seq = null;
        var walktime = null;
        this.obLayer.prevPosX = (betweenOffSetX + this.obLayer.getRealW(this.obLayer.prevOb));
        this.stopPlayWaitSound();
        //this.audioEngine.playEffect(res.bump_mp3);
        this.audioEngine.playEffect(res.start_mp3);
        //this.startPlayWaitSound();

        if(data < leftX || data > rightX ){
            if (data > rightX)
                data = rightX;
            
            var jumpFall = new cc.MoveBy(0.5,cc.p(50,-(this.ps.player.y + this.ps.GetPlayerHeight())));

            var rotate = new cc.RotateBy(90 / 500,90);
            //titleLB.setString("421");
            var callFunc = cc.callFunc(this.playDead,this);
            if (this.playDead == null) {
                //titleLB.setString("playDead is null");
            }
            else
            {
                //titleLB.setString("playDead is not  null");
            }
            if (callFunc == null) {
                //titleLB.setString("callFunc is null");
            }
            else
            {
                //titleLB.setString("callFunc is not  null");
            }
            //titleLB.setString("423");
            var stickFunc = cc.callFunc(this.stickFall,this);
            //titleLB.setString("425");
            walktime = data / 500;
            //titleLB.setString("427");
            moveBy = cc.moveBy(walktime,cc.p(data + this.obLayer.getRealW(this.obLayer.prevOb) * 0.5,0));
            //titleLB.setString("429");
            seq = cc.sequence(moveBy,cc.callFunc(this.stopPlayWaitSound,this),stickFunc,cc.spawn(jumpFall,rotate),callFunc);
            //titleLB.setString("431");

            if(this.gameScore > this.gameBestScore){
                //titleLB.setString("448");
                this.gameBestScore = this.gameScore;
                //titleLB.setString("450");
                cc.sys.localStorage.setItem('bestS',this.gameScore);
                //titleLB.setString("452");
            }
            this.endGame();

        }
        else{
            //titleLB.setString("442");
            //new cc.Sequence 和 cc.sequence 在单action时行为不同，
            //Sequence类有bug会导致单度action被double
            this.gameScore += 1;


            //var line = rightX - this.ps.GetPlayerWidth() * 0.5;
            var line = rightX - this.obLayer.getRealW(this.obLayer.nextOb) * 0.5;
            walktime = line/ 500;
            moveBy = cc.moveBy(walktime, cc.p(line,0));
            seq =  cc.sequence(moveBy,cc.callFunc(this.stopPlayWaitSound,this),cc.callFunc(this.playVic,this));
        }
        ////titleLB.setString("454");
        this.ps.player.runAction(seq);
        this.ps.walk(0.01);

    },
    stickFall:function(){
        var rotate = new cc.RotateBy(90 / 500,90);
        this.stickSprite.runAction(rotate);
    },
    playDead:function(){
        this.audioEngine.playEffect(res.fall_mp3);
        this.audioEngine.playEffect(res.dead_mp3);
        //titleLB.setString("playDead11");
        // if (this.gameOverLayer == null) {
        //     //titleLB.setString("gameOverLayer is null");
        // }
        //this.gameOverLayer.test();
        //exitLayer.visible = true;
        gameOverLayer.popMenu(this,this.gameScore,this.gameBestScore);
        //this.addChild(this.gameOverLayer,100);
        //this.gameOverLayer.visible = true;
        //titleLB.setString("playDead2");
        //this.gameOverLayer.setScoreS(this.gameScore,this.gameBestScore);
        //titleLB.setString("playDead3");
    },
    playVic:function(){
        this.audioEngine.playEffect(res.vitory_mp3);
        //this._start = true;
        this.obLayer.stopAllActions();
        this.ps.player.stopAllActions();
        this.nextGen();

        this.tipLayer.scoreLb.setString(this.gameScore);
        var scaleTip = cc.ScaleTo(0.1,3,3);
        var scaleB = cc.ScaleTo(0.2,1,1);
        var seq = cc.sequence(scaleTip,scaleB);
        this.tipLayer.scoreLb.runAction(seq);

    },
    startPlayWaitSound:function()
    {
        this.audioEngine.stopAllEffects();
        waitSoundId = this.audioEngine.playEffect(res.wait_mp3, true);
    },
    stopPlayWaitSound:function()
    {
        if (waitSoundId == null || waitSoundId == 0)
            return;
        this.audioEngine.stopEffect(waitSoundId);
        waitSoundId = 0;
    },
    createBackButtonListener: function(){
        var self = this;

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyReleased:function(key, event) {
                if(key == cc.KEY.back){
                    if (gameOverLayer.visible) {
                        return;
                    }

                    //cc.director.end(); //this will close app
                    if (!exitLayer.visible) {
                        exitLayer.visible = true;
                        cc.director.pause();
                    }
                    else
                    {
                        exitLayer.visible = false;
                        cc.director.resume();
                    }
                    //gameOverLayer.visible = false;
                }
            }
        }, this);
    }
});

var TipLayer = cc.Layer.extend({
    goldTxt:null,
    goldIcon:null,
    scoreLb:null,
    tipPic:null,
    ctor:function(){
        this._super();
        //初始化的layer默认anchor在(0，0)
        this.anchorX = 0.5;
        this.anchorY = 0.5;

        var mainNode = new cc.Node();
        this.addChild(mainNode);

        var node = ccs.load(res.score_json).node;
        mainNode.addChild(node);

        this.height = node.getContentSize().height;
        //this.tipPic = node.getChildByName("tipPic");
        //this.scoreLb = node.getChildByName("scoreLb");
        this.tipPic = ccui.helper.seekWidgetByName(node, "tipPic");
        this.scoreLb = ccui.helper.seekWidgetByName(node, "scoreLb");
        node.anchorX = 0.5;
        node.anchorY = 0.5;

        node.x = this.getContentSize().width * 0.5;
        node.y = this.getContentSize().height * 0.5;
        cc.log(this.getContentSize().height+"ddd");
        //this.addChild(node);

        return true;
    },
    popMenu:function(superLayer){
        //superLayer.addChild(this);
        this.visible = true;
    },
    dismissMenu:function(superLayer){
        //this.removeFromParent(true);
        this.visible = false;
    }
})

//障碍物层
var ObStaclesLayer = cc.Layer.extend({
    prevOb:null,
    nextOb:null,
    prevPosX:null,
    nextW:null,
    offSetX:0,
    ctor:function(){
        this._super();
        this.prevOb = new cc.Sprite(res.NarrowPillar_png);
        this.prevOb.anchorX = this.prevOb.anchorY = 0.5;
        this.beginInit();
        this.addChild(this.prevOb);
       return true;
   },
    beginInit:function(){
        var centerX = bgSize.width / 2;
        this.x =0;
        var scaleWTimes = obSize.width / this.prevOb.getContentSize().width;
        this.prevOb.attr({
            x: centerX,
            y: obSize.height / 2 ,
            scaleX: scaleWTimes,
            rotation: 0
        });

        this.prevPosX = this.prevOb.x - (this.getRealW(this.prevOb) * 0.5 );
        this.offSetX = this.prevPosX;
    },
    generateOb:function(){
        cc.log(this.prevPosX);
        this.offSetX = this.prevPosX;
        if(this.nextOb != null){
            var pre = this.prevOb;
            this.prevOb = this.nextOb;
            pre.removeFromParent(true);
            pre = null;
        }

        leftW = bgSize.width - this.getRealW(this.prevOb);

        var scale = Math.floor(Math.random() * 5) / 4 + 2;
        var rndBetween = (leftW-minLimit.width * scale) * Math.random();
        rndBetween = rndBetween > minLimit.between?rndBetween:minLimit.between;
        betweenOffSetX = rndBetween;
        cc.log("xs"+betweenOffSetX);
        this.nextOb = new cc.Sprite(res.NarrowPillar_png);
        this.nextOb.anchorX = this.nextOb.anchorY = 0.5;
        this.nextW = (leftW - rndBetween) % (minLimit.width * (scale - 1)) + minLimit.width;
        var scaleWTimes = this.nextW / this.prevOb.getContentSize().width;
        var centerX = this.prevOb.x + this.getRealW(this.prevOb) * 0.5 + rndBetween + this.nextW * 0.5;
        leftW = betweenOffSetX + this.nextW;
        this.nextOb.attr({
            x: centerX,
            y: obSize.height / 2 ,
            scaleX: scaleWTimes,
            rotation: 0
        });
        this.addChild(this.nextOb);

    },
    getRealW:function(item){
        return  item.getContentSize().width * item.getScaleX();
    }

});