var LoaderLayer = cc.Layer.extend({
	ctor:function(){
		this._super();

		this.addChild(ccs.load(res.loader_json).node);

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