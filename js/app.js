var scene;

//window.onload=function(){
    scene=Scene.initWithScreen();
    //scene=Scene.initWithTag('scene');
    (function(){
        let page=new Page({
        	id:'p1',
        	size:new Size(1,1),
            listeners:{
                'enter':function(el,done){
                    $(el).removeClass().addClass('animated bounceInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass();
                        done();
                    });
                },
                'leave':function(el,done){
                    $(el).removeClass().addClass('animated bounceOutLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass();
                        done();
                    });
                },
                'after-enter':function(el){
                    var hammertime = new Hammer(el);
                    hammertime.on('swipeleft', function(e) {
                        scene.showNext();
                    });
                },
            },
        });


        let picture=new Picture({
            id:'pic1',
        	position:new Position(0,0),
        	size:new Size(1,1),
        	src:"img/1.jpg"
        });

        let text=new Text({
            id:'txt',
            content:"Hello World",
            position:new Position(0.5,0.5),
            //size:new Size(1,1),
            'fontSize':0.05,
            listeners:{
                'after-enter':function(el){
                    $(el).on('click',function(){
                        let p=new Position(0.25,0.75);
                        $(this).velocity({
                            left:p.x,
                            top:p.y
                        },200,"swing",function(){
                        });
                    });
                }
            }
        });

        page.add(picture);
        page.add(text);
        scene.add(page);

    })();
    (function(){
        let page=new Page({
        	id:'p2',
			size:new Size(1,1),
            listeners:{
                'enter':function(el,done){
                    $(el).removeClass().addClass('animated bounceInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass();
                        done();
                    });
                },
                'leave':function(el,done){
                    $(el).removeClass().addClass('animated bounceOutLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass();
                        done();
                    });
                },
                'after-enter':function(el){
                    var hammertime = new Hammer(el);
                    hammertime.on('swipeleft', function(e) {
                        scene.showNext();
                    });
                },
            },
		});

        let picture=new Picture({
            position:new Position(0,0),
            size:new Size(1,1),
            src:"img/2.jpg",
        });

        page.add(picture);
        scene.add(page);
    })();
    console.log(scene);

    scene.pages['p2'].nextPage=scene.pages['p1'];
    scene.pages['p1'].prePage=scene.pages['p2'];

    scene.display();//展示页面
    scene.showPage('p1');

//}