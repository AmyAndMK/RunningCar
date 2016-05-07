/**
 * Created by wanght on 15/5/9.
 * @Author wanght
 * @Email whtoo@qq.com
 */
Object.prototype.extends = function(child,parent){
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c._superUp = p;

}