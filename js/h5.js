var autoElementId=0;

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
        this.x=x;
        this.y=y;
    }

    set x(v){
        this._x=v;
    }

    get x(){
        //if(this._x<=1)
            return this._x*scene.width+"px";
        //else 
        //  return this._x+"px";
    }

    set y(v){
        this._y=v;
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
    constructor(name){
        this.name=name;
        this.domClass='';
    }
}

class EnterAction extends Action{
    constructor(domClass){
        super(EnterAction.name);
        this.domClass=domClass;
    }

    static get name(){
        return 'enter-action';
    }
}

class LeaveAction extends Action{
    constructor(domClass){
        super(LeaveAction.name);
        this.domClass=domClass;
    }

    static get name(){
        return 'leave-action';
    }
}


/**
 * 动画 一系列动作的集合
 */
class Animation{
    constructor(){
        this.actions=new Array;
        this.enterAction=new EnterAction('');//特殊动作 入场动作
        this.leaveAction=new LeaveAction('');//特殊动作 离场动作
    }

    add(action){
        this.actions.push(action);
        if(action.name==EnterAction.name){
            this.enterAction=action;
        }
        else if(action.name==LeaveAction.name){
            this.leaveAction=action;
        }
    }


}

class Scene{
    constructor(attributes={}){
        this.pages=new Array;
        this.vues=new Array;
        this.elements=new Array;
        Object.assign(this,attributes);
    }

    static get id(){
        return 'scene';
    }

    static initWithScreen(){
        let screen = new Screen;
        document.write('<div id="'+Scene.id+'" style="margin:0;padding:0;width:'+screen.width+'px;height:'+screen.height+'px;"></div>')
        let tag=$("#"+Scene.id);
        return new Scene({
            width:screen.width,
            height:screen.height,
            container:tag});
    }

    static initWithTag(tagId){
        tag=$('#'+tagId);
        return new Scene({
            width:tag.clientWidth,
            height:tag.clientHeight,
            container:tag});
    }

    add(page){
        //page.position.x=scene.width+1;
        this.pages[page.id]=page;
    }

    display(){
        let html='';
        for(let id in this.pages){
            html+=this.pages[id].build();
        }
        this.container.html(html);

        this.initVues(
            new Vue({
                el:'#'+Scene.id,
                data:{
                    domId:Scene.id
                }
            })
        );
    }

    initVues(vue){
        this.vues[vue.domId]=vue;
        for (let i = 0; i < vue.$children.length; i++) {
            this.initVues(vue.$children[i]);
        }
    }

    show(id){
        this.vues[id].show=true;
    }

    showPage(id){
        for(let _id in this.pages){
            if(_id===id)
                this.show(id);
            else
                this.hide(_id);
        }
    }

    hide(id){
        this.vues[id].show=false;
    }

}


class Element{
    constructor(attributes={}){
        this.position=new Position(0,0);
        this._size;
        this.animation=new Animation;
        this.elements=new Array;
        this._dom='';
        //this.domClass=new Array;
        this._style={
            display:'block',
            position:'absolute',
            margin:'0',
            padding:'0',
        };
        Object.assign(this,attributes);
        if(this.id===undefined) {
            this.id='el'+autoElementId;
            autoElementId++;
        }
    }

    set size(s){
        this._size=s;
    }

    get size(){
        if(this._size!==undefined && this._size.width!==undefined){
            return "width:"+this._size.width+";height:"+this._size.height+";"
        }else return '';
    }

    set position(p){
        this._position=p;
    }

    get position(){
        return "left:"+this._position.x+";top:"+this._position.y+";";
    }

    get domClass(){
        let name='';
        for (let i = 0; i < this.animation.actions.length; i++) {
            name+=this.animation.actions[i].act+" ";
        }
        return name;
    }

    get enterAction(){
        let name='';
        for (let i = 0; i < this.animation.actions.length; i++) {
            name+=this.animation.actions[i].act+" ";
        }
        return name;
    }

    set style(obj={}){
        Object.assign(this._style,obj);
    }

    get style(){
        let txt=this.position+this.size;
        for(name in this._style){
            txt+=name+':'+this._style[name]+';';
        }
        return txt;
        //return "display:block;position:absolute;margin:0;padding:0;left:"+this.position.x+";top:"+this.position.y+";width:"+this.size.width+";height:"+this.size.height+";";
    }


    /**
     * 将元素生成dom
     * @Author   WindGreen<yqfwind@163.com>
     * @DateTime 2017-04-18T09:40:40+0800
     * @return   {[type]}                   [description]
     */
    get dom(){
        this._dom='';
        for (let i = 0; i < this.elements.length; i++) {
            this._dom+=this.elements[i].build();
        }
        return this._dom;
    }

    get data(){
        return {
            show:true,
            domId:this.id,
            domClass:'',//element.className,
            style:this.style,

            enterClass:'',
            enterActiveClass:this.animation.enterAction.domClass,
            leaveClass:'',
            leaveActiveClass:this.animation.leaveAction.domClass,
        };
    }

    get template(){
        return '<div v-if="show" :id="domId" :class="domClass" :style="style">'+this.dom+'</div>';
    }

    add(element){
        this.elements.push(element);
    }

    build(){
        scene.elements[this.id]=this;//注册到scene
        return this.vue();//构建vue组件
    }

    vue(){
        let element=this;
        Vue.component(this.id,{
            template:'<transition \
                        name="" \
                        v-on:after-enter="afterEnter" \
                        :enter-class="enterClass" \
                        :enter-active-class="enterActiveClass" \
                        :leave-class="leaveClass" \
                        :leave-active-class="leaveActiveClass">\
                            '+element.template+'\
                    </transition>',
            methods:{
                // --------
                // 进入中
                // --------
                beforeEnter: function (el) {
                    // ...
                },
                // 此回调函数是可选项的设置
                // 与 CSS 结合时使用
                enter: function (el, done) {
                    // ...
                    //done();
                },
                afterEnter: function (el) {
                    // ...
                    scene.vues[element.id]=this;
                },
                enterCancelled: function (el) {
                // ...
                },
                // --------
                // 离开时
                // --------
                beforeLeave: function (el) {
                    // ...
                },
                // 此回调函数是可选项的设置
                // 与 CSS 结合时使用
                leave: function (el, done) {
                    // ...
                    //done()
                },
                afterLeave: function (el) {
                    // ...
                },
                // leaveCancelled 只用于 v-show 中
                leaveCancelled: function (el) {
                    // ...
                }

            },
            data:function(){
                return element.data;
            }
        });
        return '<'+this.id+'></'+this.id+'>';
    }

}


class Page extends Element{

    get template(){
        return '<div v-if="show" :id="domId" :class="domClass" :style="style">'+this.dom+'</div>';
    }

    get data(){
        return Object.assign(super.data,{
            show:false,
        });
    }


}

class Picture extends Element{

    get template(){
        return ;
    }

    get data(){
        return Object.assign(super.data,{
            src:this.src
        });
    }

    get template(){
        return '<img v-if="show" :id="domId" :class="domClass" :style="style" :src="src">';
    }


    get data(){
        return Object.assign(super.data,{
            show:true,
            src:this.src
        });
    }
}

class Text extends Element{

    set fontSize(v){
        this._fontSize=v;
    }

    get fontSize(){
        return scene.height*this._fontSize+'px';
    }

    get template(){
        return '<p v-if="show" :id="domId" :class="domClass" :style="style">{{content}}</p>';
    }

    get data(){
        return Object.assign(super.data,{
            show:true,
            content:this.content
        });
    }

    get style(){
        let txt=super.style;
        txt+="font-size:"+this.fontSize+";line-height:"+this.fontSize+";";
        return txt;
    }

}

class Voice extends Element{


}

class Video extends Element{


}

class Button extends Element{


}


/*var scene;

//window.onload=function(){
  scene=Scene.initWithScreen();
  //scene=Scene.initWithTag('scene');
  (function(){
      let page=new Page('p1');
      page.size=new Size(scene.width,scene.height);


      let picture=new Picture("pic1");
      picture.position=new Position(0,0);
      picture.size=new Size(1,1);
      picture.src="img/demo.jpg";
      //picture.animation.add(new AnimateCss('animated bounceInRight infinite'));

      let text=new Text('hello');
      text.size=new Size(1,1);
      text.position=new Position(0.5,0.5);
      text.fontSize=0.05;
      text.content="Hello Word";
      //text.animation.add(new AnimateCss('animated bounceInRight infinite'));

      page.add(picture);
      page.add(text);
      page.animation.add(new AnimateCss('animated bounceInRight'));

      scene.add(page);
  })();
  console.log(scene);

  scene.enter(0);//展示页面

 
  //建立数组来存vue对象 通过ID直接控制vue对象 list['hello'].content='xxx';
//}*/