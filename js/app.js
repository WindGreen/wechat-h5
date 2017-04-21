var scene;

//window.onload=function(){
    scene=Scene.initWithScreen();
    scene.p=0;
    //scene=Scene.initWithTag('scene');
    (function(){
        let page=new Page({
        	id:'p1',
        	size:new Size(3,1),
            listeners:{
                'enter':function(el,done){
                    $(el).removeClass().addClass('animated slideInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass();
                        done();
                    });
                },
                'leave':function(el,done){
                    $(el).removeClass().addClass('animated slideOutLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass();
                        done();
                    });
                },
                'after-enter':function(el){
                    (new Hammer(el)).on('swipeleft', function(e) {
                        let p=new Position(--scene.p,0);
                        let $id=$(el).attr('id');
                        console.log(scene.elements[$id]._size.width+scene.elements[$id]._position.x);
                        if(scene.elements[$id]._size.width+(scene.p+1)*scene.width<0 ||
                            scene.elements[$id]._size.width+scene.p*scene.width>scene.elements[$id]._size.width) {
                            scene.p++;
                            return;
                        }
                        $el=$(el);
                        $(el).velocity({
                            left:p.x,
                            top:p.y
                        },800,"swing",function(){
                        });
                    });
                    (new Hammer(el)).on('swiperight', function(e) {
                        let p=new Position(++scene.p,0);
                        let $id=$(el).attr('id');
                        if(scene.elements[$id]._size.width+scene.p*scene.width>scene.elements[$id]._size.width ||
                            scene.elements[$id]._size.width+(scene.p+1)*scene.width<0) {
                            scene.p--;
                            return;
                        }
                        $(el).velocity({
                            left:p.x,
                            top:p.y
                        },800,"swing",function(){
                        });
                    });
                },
            },
        });


        let pic1=new Picture({
            id:'pic1',
        	position:new Position(0,0),
        	size:new Size(1,1),
        	src:"img/1.jpg"
        });

        let pic2=new Picture({
            id:'pic2',
            position:new Position(1,0),
            size:new Size(1,1),
            src:"img/2.jpg"
        });

        let text=new Text({
            id:'txt',
            content:"Hello World",
            position:new Position(0.5,0.5),
            //size:new Size(1,1),
            'fontSize':0.05,
            listeners:{
                'after-enter':function(el){
                    (new Hammer(el)).on('tap',function(){
                        let p=new Position(0.25,0.75);
                        $(el).velocity({
                            left:p.x,
                            top:p.y
                        },200,"swing",function(){
                        });
                    });
                }
            }
        });

        page.add(pic1);
        page.add(pic2);
        page.add(new Picture({
            position:new Position(2,0),
            size:new Size(1,1),
            src:"img/3.jpg"
        }));
        page.add(new Picture({
            position:new Position(3,0),
            size:new Size(1,1),
            src:"img/4.jpg"
        }));
        page.add(new Picture({
            position:new Position(4,0),
            size:new Size(1,1),
            src:"img/5.jpg"
        }));
        page.add(text);
        scene.add(page);

    })();

    console.log(scene);

    scene.display();//展示页面
    scene.showPage('p1');

//}