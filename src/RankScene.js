var g_MAXSCORES = 8;
var RankLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var node = ccs.load(res.rankslayer_json).node;

        this.addChild(node);

        var bestScore = cc.sys.localStorage.getItem("topScores");
        bestScore = bestScore ? bestScore : "";

        var topScores = [];
        if (bestScore) {
            topScores = JSON.parse(bestScore);
        };

        var upIdx = topScores.length > g_MAXSCORES ? g_MAXSCORES : topScores.length;
        for (var i = 1; i <= g_MAXSCORES; ++i)
        {
            var rank = ccui.helper.seekWidgetByName(node, "Rank_" + i.toString());
            var score = ccui.helper.seekWidgetByName(node, "Score_" + i.toString());

            if (i > upIdx || topScores[i - 1] <= 0) {
                rank.setVisible(false);
                score.setVisible(false);
            }
            else
            {
                rank.setVisible(true);
                score.setVisible(true);
                score.setString(topScores[i - 1]);
            }
        }

        var closeBtn = ccui.helper.seekWidgetByName(node, "close_Btn");
        closeBtn.addTouchEventListener(this.touchHandler,this);

        return true;
    },
    touchHandler:function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                var btn = sender;
                if (btn.name == "close_Btn") {
                    var menuScene = new MenuScene();
                    var scene = new cc.TransitionProgressInOut(0.2, menuScene);
                    cc.director.runScene(scene);
                }
        }
    }
});

var RankScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var self = this;

        var layer = new RankLayer();
        self.addChild(layer);
    },
});