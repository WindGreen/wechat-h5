var scene;

//window.onload=function(){
    scene=Scene.initWithScreen();
    //scene=Scene.initWithTag('scene');
    (function(){
        let page=new Page({
        	id:'p1',
        	size:new Size(1,1)
        });


        let picture=new Picture({
        	position:new Position(0,0),
        	size:new Size(1,1),
        	src:"img/1.jpg"
        });

        let text=new Text({
            content:"Hello World",
            position:new Position(0.5,0.5),
            //size:new Size(1,1),
            'fontSize':0.05,
        });

        page.add(picture);
        page.add(text);
        page.animation.add(new EnterAction(''));
        page.animation.add(new LeaveAction('animated bounceOutLeft'));
        scene.add(page);

    })();
    (function(){
        let page=new Page({
        	id:'p2',
			size:new Size(1,1)
		});

        let picture=new Picture({
            position:new Position(0,0),
            size:new Size(1,1),
            src:"img/2.jpg",
        });

        page.add(picture);
        page.animation.add(new EnterAction('animated bounceInRight'));
        page.animation.add(new LeaveAction('animated bounceOutLeft'));
        scene.add(page);
    })();
    console.log(scene);

    scene.display();//展示页面
    scene.showPage('p1');


    $('#el0').velocity({
        width: "500px",        // 动画属性 宽度到 "500px" 的动画
    }, {
        /* Velocity 动画配置项的默认值 */
        duration: 400,         // 动画执行时间
        easing: "swing",       // 缓动效果
        queue: "",             // 队列
        begin: undefined,      // 动画开始时的回调函数
        progress: undefined,   // 动画执行中的回调函数（该函数会随着动画执行被不断触发）
        complete: undefined,   // 动画结束时的回调函数
        display: undefined,    // 动画结束时设置元素的 css display 属性
        visibility: undefined, // 动画结束时设置元素的 css visibility 属性
        loop: false,           // 循环
        delay: 5000,          // 延迟
        mobileHA: true         // 移动端硬件加速（默认开启）
    });
//}