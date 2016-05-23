var RankScoreManager = 
{
    topScores:null,
    gameBestScore:0,
    gameCurScore:0,
    getRankScores:function()
    {
        var bestScore = cc.sys.localStorage.getItem("topScores");
        if (bestScore) {
            this.topScores = JSON.parse(bestScore);
        }
        else
        {
            this.topScores = [];
        }
        return this.topScores;
    },
    getHighestScore:function()
    {
        if (this.topScores == null) {
            this.getRankScores();
        }
        if (this.topScores) {
            this.gameBestScore = this.topScores.length > 0 ? parseInt(this.topScores[0],10) : 0;
        }
        return this.gameBestScore;
    },
    CalcRankScore:function()
    {
        if (this.gameCurScore <= 0) {
            return;
        }

        if (this.topScores == null) {
            this.getRankScores();
        }

        function sortNumber(a,b)
        {
            return b - a;
        }
        this.topScores.sort(sortNumber);
        var found = false;
        for (var i = this.topScores.length - 1; i >= 0; i--) {
            if (this.topScores[i] == this.gameCurScore)
            {
                found = true;
            }
        };
        if (!found){
            this.topScores.push(this.gameCurScore.toString());
            this.topScores.sort(sortNumber);
            if (this.topScores.length > 10) {
                this.topScores.pop();
            };
        }
        cc.sys.localStorage.setItem("topScores", JSON.stringify(this.topScores));
    },
    resetGameCurScore:function(){
    	this.gameCurScore = 0;
    },
    getGameCurScore:function(){
        return this.gameCurScore;
    },
    addGameCurScore:function(score){
        this.gameCurScore += score;
    }
};