

class Color{
    static get black(){
        return '#000';
    }

    static get white(){
        return '#FFF';
    }

    static get red(){
        return '#F00';
    }

    static get blue(){
        return '#00F';
    }

    static get green(){
        return '#0F0';
    }
}

class Screen{
    constructor(){
        // this.width=document.body.clientWidth;
        // this.height=document.body.clientHeight;

        // this.width=window.screen.availWidth;
        // this.height=window.screen.availHeight;
        
        this.width=window.innerWidth;
        this.height=window.innerHeight;
    }
}

class Size{
    constructor(width,height){
        this._width=width;
        this._height=height;
    }

    get width(){
        //if(this._width<=1)
            return scene.width*this._width+"px";
        //else
            //return this._width+"px";
    }

    get height(){
        //if(this._height<=1)
            return scene.height*this._height+"px";
        //else
            //return this._height+"px";
    }
}

class Position{
    constructor(x,y){
        this._x=x;
        this._y=y;
    }

    get x(){
        //if(this._x<=1)
            return this._x*scene.width+"px";
        //else 
        //  return this._x+"px";
    }

    get y(){
        //if(this._y<=1)
            return this._y*scene.height+"px";
        //else
            //return this._y;
    }
}

/**
 * 动作
 */
class Action{
    constructor($name){
        this.name=$name;
    }

    get act(){
        return this.name;
    }
}

class AnimateCss extends Action{
}

class MoveAction extends Action{
    get act(){
        return "animated bounce";
    }
}

/**
 * 动画 一系列动作的集合
 */
class Animation{
    constructor(){
        this.actions=new Array;
    }

    add(action){
        this.actions.push(action);
    }


}

class Scene{
    constructor(width,height,tag){
        this.width=width;
        this.height=height;
        this.pages=new Array;
        this.doms=new Array;
        this.container=tag;
        this.vues=new Array;
    }

    static initWithScreen(){
        let screen = new Screen;
        document.write('<div id="scene" style="margin:0;padding:0;width:'+screen.width+'px;height:'+screen.height+'px;"></div>')
        let tag=$("#scene");
        return new Scene(screen.width,screen.height,tag);
    }

    static initWithTag(tagId){
        tag=$('#'+tagId);
        return new Scene(tag.clientWidth,tag.clientHeight,tag);
    }

    add(page){
        this.pages.push(page);
    }


    /**
     * 切换页面-进入
     * @Author   WindGreen<yqfwind@163.com>
     * @DateTime 2017-04-18T09:38:42+0800
     * @param    {[type]}                   i [description]
     * @return   {[type]}                     [description]
     */
    enter(i){
        if(this.pages[i]!==undefined){
            this.doms[i]=this.pages[i].show();
        }else{
            console.log(i+" of pages not defined!");
        }

        this.display();
    }

    /**
     * 切换页面-离开
     * @Author   WindGreen<yqfwind@163.com>
     * @DateTime 2017-04-18T09:39:00+0800
     * @param    {[type]}                   i [description]
     * @return   {[type]}                     [description]
     */
    leave(i){
        this.doms[i]='';

        this.display();
    }

    display(){
        let html='';
        for (var i = 0; i < this.doms.length; i++) {
            html+=this.doms[i];
        }
        this.container.html(html);

        this.vues['scene']=new Vue({
            el:'#scene'
        });
        this.initVues(this.vues['scene']);
    }

    initVues(vue){
        this.vues[vue.id]=vue;
        for (var i = 0; i < vue.$children.length; i++) {
            this.initVues(vue.$children[i]);
        }
    }

}


class Element{
    constructor(id){
        this.id=id;
        this.position;
        this.size;
        this.animation=new Animation;
        this.tagName='div';
        this.elements=new Array;
        this._dom='';
    }


    get className(){
        let name='';
        for (var i = 0; i < this.animation.actions.length; i++) {
            name+=this.animation.actions[i].act+" ";
        }
        return name;
    }

    get style(){
        return "display:block;position:absolute;margin:0;padding:0;left:"+this.position.x+";top:"+this.position.y+";width:"+this.size.width+";height:"+this.size.height+";";
    }


    /**
     * 将元素生成dom
     * @Author   WindGreen<yqfwind@163.com>
     * @DateTime 2017-04-18T09:40:40+0800
     * @return   {[type]}                   [description]
     */
    get dom(){
        this._dom='';
        for (var i = 0; i < this.elements.length; i++) {
            this._dom+=this.elements[i].show();
        }
        return this._dom;
    }

    add(element){
        this.elements.push(element);
    }

    show(){
        return this.vue();//构建vue组件
    }

    vue(){
        let element=this;
        Vue.component(this.id,{
            template:'<'+this.tagName+' :id="id" :class="className" :style="style">'+this.dom+'</'+this.tagName+'>',
            methods:{
                getProperty:function(name){
                    return element[name];
                }
            },
            data:function(){
                return {
                    id:element.id,
                    tagName:element.tagName,
                    className:element.className,
                    style:element.style,
                };
            }
        });
        return '<'+this.id+'></'+this.id+'>';
    }


}


class Page extends Element{
    constructor(id){
        super(id);
        this.elements=new Array;
        this.animation=new Animation;
    }


    get style(){
        return "display:block;position:absolute;margin:0;padding:0;width:"+this.size.width+";height:"+this.size.height+";";
    }

}

class Picture extends Element{
    constructor(id){
        super(id);
        this.src;
        this.tagName='img';
    }

    get template(){
        return ;
    }

    vue(){
        let element=this;
        Vue.component(this.id,{
            template:'<'+this.tagName+' :id="id" :class="className" :style="style" :src="src"></img>',
            data:function(){
                return {
                    id:element.id,
                    tagName:element.tagName,
                    className:element.className,
                    style:element.style,
                    src:element.src
                };
            }
        });
        return '<'+this.id+'></'+this.id+'>';
    }
}

class Text extends Element{
    constructor(id){
        super(id);
        this.content;
        this.color=Color.black;
        this._fontSize;
        this.tagName='p';
    }

    set fontSize(value){
        this._fontSize=value;
    }

    get fontSize(){
        return this._fontSize*scene.width;
    }

    get style(){
        let style=super.style;
        return style+"color:"+this.color+";font-size:"+this.fontSize+"px;";
    }

    vue(){
        let element=this;
        Vue.component(this.id,{
            template:'<'+this.tagName+' :id="id" :class="className" :style="style">{{content}}</'+this.tagName+'>',
            data:function(){
                return {
                    id:element.id,
                    tagName:element.tagName,
                    className:element.className,
                    style:element.style,
                    content:element.content
                };
            }
        });
        return '<'+this.id+'></'+this.id+'>';
    }
}

class Voice extends Element{
    constructor(position,size,src=''){
        super(position,size);
        this.src=src;
    }
}

class Video extends Element{
    constructor(position,size,src=''){
        super(position,size);
        this.src=src;
    }
}

class Button extends Element{
    constructor(position,size){
        super(position,size);
    }
}

