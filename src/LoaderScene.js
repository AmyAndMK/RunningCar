var LoaderLayer = cc.Layer.extend({
	ctor:function(){
		this._super();

		var node = ccs.load(res.loader_json).node;

		this.addChild(node);

		var rotator = ccui.helper.seekWidgetByName(node, "Image_4");

		var rotate = new cc.RotateBy(0.1,90);
		
		rotator.runAction(cc.Repeat.create(rotate, 120));

		return true;
	}
});

var LoaderScene = cc.Scene.extend({

	onEnter: function() {
		this._super();
		var self = this;

		var layer = new LoaderLayer();
		self.addChild(layer);

		self.schedule(self._startMenuScene, 0.5);
	},
	_startMenuScene : function(){
		var self = this;
		self.unschedule(self._startMenuScene);

		var menuScene = new MenuScene();
		var scene = new cc.TransitionFadeDown(1, menuScene);
		cc.director.runScene(scene);
	}
});