var ExitLayer = cc.Layer.extend({
	exitBtn:null,
	cancelBtn:null,
	titleLB:null,
	ctor:function(){
		this._super();

		var node = ccs.load(res.exitlayer_json).node;
		this.addChild(node);

		this.exitBtn = ccui.helper.seekWidgetByName(node, "exitBtn");
		this.cancelBtn = ccui.helper.seekWidgetByName(node, "cancelBtn");

		this.initBtn();

		// titleLB = new cc.LabelTTF("LLLLLLLLLLLL","Aria",12);
		// var size = cc.winSize;
		// var centerX = size.width / 2;
		// var centerY = size.height / 2;
		// titleLB.anchorX = 0.5;
		// titleLB.anchorY = 0.5;
		// titleLB.scaleX = 3;
		// titleLB.scaleY = 3;
		// titleLB.color = cc.color._getRed;
		// titleLB.setPosition(centerX,centerY );
		// this.addChild(titleLB);

		return true;
	},
	initBtn:function()
	{
		this.exitBtn.addTouchEventListener(this.touchHandler, this);
		this.cancelBtn.addTouchEventListener(this.touchHandler, this);
	},
	touchHandler:function(sender, type)
	{
		//titleLB.setString(type);
		if (type == ccui.Widget.TOUCH_ENDED) {
			var btn = sender;
			if (btn.name == "exitBtn") {
				cc.director.end();	
			}
			else if (btn.name = "cancelBtn")
			{
				this.visible = false;
			}
		}
	}
});