var res = {
    StartBackground_png0 : "res/texture/background0.png",
    StartBackground_png1 : "res/texture/background1.png",
    StartBackground_png2 : "res/texture/background2.png",
    StartBackground_png3 : "res/texture/background3.png",
    Btnn_png : "res/texture/start_normal.png",
    Btns_png : "res/texture/start_select.png",
    ButtonStart_png : "res/texture/arrow.png",
    StickBlack_png : "res/texture/stick_black.png",
    NarrowPillar_png: "res/texture/narrowpillars.png",
    Restart_png : "res/texture/shuaxin.png",
    overScoreBg:"res/texture/overSoreBg.png",
    ShareBtn:"res/texture/notify.png",
    arrow_png:"res/texture/arrow.png",
    guideText:"res/texture/guide_text.png",
    //
    KickPlist : "res/texture/kick.plist",
    KickPng : "res/texture/kick.png",

    ShakePlist : "res/texture/shake.plist",
    ShakePng : "res/texture/shake.png",

    WalkPlist : "res/texture/walk.plist",
    WalkPng : "res/texture/walk.png",

    YaoPlist : "res/texture/yao.plist",
    YaoPng : "res/texture/yao.png",
    FontFelt:"res/fonts/FontFelt.ttf",
    bg_mp3:"res/sound/bg_0.mp3",
    btn_mp3:"res/sound/button.mp3",
    vitory_mp3:"res/sound/victory.wav",
    fall_mp3:"res/sound/fall.wav",
    dead_mp3:"res/sound/dead.wav",
    bump_mp3:"res/sound/sound-bump.mp3",
    wait_mp3:"res/sound/wait.wav",
    start_mp3:"res/sound/start.wav",
    restart_png:"res/texture/btn_replay.png",
    home_png:"res/texture/btn_home.png",
    gameCen_png:"res/texture/btn_gameCenter.png",
    rate_png:"res/texture/btn_rate.png",
    share_png:"res/texture/btn_share.png",
    gameEnd_json:"res/GameOverLayer.json",
    score_json:"res/ScoreLayer.json",
    loader_json:"res/LoaderLayer.json",
    exitlayer_json:"res/ExitLayer.json"
};

var g_fonts = [{
    type:"font",
    name:"FontFelt",
    srcs:["res/fonts/FontFelt.ttf"]
}];

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var k in g_fonts){
    g_resources.push(g_fonts[k]);
}
