$(function(){
//myskills栏目显示隐藏
	$('.mySkills-des li').on({
		'mouseenter':function(){
			$(this).find('.msd').animate({'bottom':0});
		},
		'mouseleave':function(){
			$(this).find('.msd').animate({'bottom':-80});
		},
	});
	
//myskills--变换位置

	var aLi=$('.mySkills-des li');
	var aPos=[]; 
	var arr1=[];
	var mySkillsBok1=false;//开关
	
		//布局转换
	for(var i=0;i<aLi.length;i++){
		aPos[i]={left:aLi.eq(i).position().left,top:aLi.eq(i).position().top};
	}
	for(var i=0;i<aLi.length;i++){
		aLi.eq(i).css({
			'position':'absolute',
			'left':aPos[i].left,
			'top':aPos[i].top,
			'margin':0,
		});
		aLi.eq(i)[0].index=i;//自定义属性
		arr1[i]=i;
	}
	
	$('.mySkills-btn1').on('click',change);
	function change(){
		
		if(mySkillsBok1)return;
		mySkillsBok1=true;
		
		arr1.sort(function(){
			return Math.random()-0.5;
		});
		
		for(var i=0;i<aLi.length;i++){
			aLi.eq(i).animate({
				'left':aPos[arr1[i]].left,
				'top':aPos[arr1[i]].top
			},800,function(){
				mySkillsBok1=false;
			});
			
		}
		return false;//阻止默认事件
	}
	
//myskills--点击一下试试吧
	var timer1=null;
	var timer2=null;
	var mySkillsBok2=false;//开关
	
	$('.mySkills-btn2').on('click',tmp);
	function tmp(){
		
		if(mySkillsBok2)return;
		mySkillsBok2=true;
		
		var count=0;
		clearInterval(timer1);
		timer1=setInterval(function(){
			(function(index){
				move(aLi[index],{left:600,top:750,width:0,height:0},{fn:function(){
					if(index==aLi.length-1){
						index=aLi.length-1;
						clearInterval(timer2);
						timer2=setInterval(function(){
							if(index==0){
								move(aLi[index],{width:300,height:150,left:aPos[index].left,top:aPos[index].top},{fn:function(){
									mySkillsBok2=false;//所有运动完成之后才可以再次点击
								}});
							}else{
								move(aLi[index],{width:300,height:150,left:aPos[index].left,top:aPos[index].top});
							}
							
							index--;
							if(index==-1){
								clearInterval(timer2);
							}
						},100);
					}
				}});
			})(count);
			count++;
			if(count==aPos.length){
				clearInterval(timer1);
			}
		},100)
	}
	
});

//myskills-echarts
$(function(){
	
	var myChart=echarts.init(document.getElementById('myskillsMain'));
	option = {
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        x: 'left',
	        data:['html','css','javascript','jquery','angular/vue','nodeJs/php'],
	         textStyle:{
	                	color:'red',
	                    fontSize: '16',
	                   }
		},
	    series: [
	        {
	            name:'技术熟练程度统计',
	            type:'pie',
	            radius: ['50%', '70%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                    	color:'red',
	                        fontSize: '30',
	                        fontWeight: 'bold',
	                        
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {value:200, name:'html'},
	                {value:260, name:'css'},
	                {value:300, name:'javascript'},
	                {value:300, name:'jquery'},
	                {value:100, name:'angular/vue'},
	                {value:80, name:'nodeJs/php'}
	            ]
	        }
	    ]
	};

	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
})


//myWorks的无缝轮播
$(function(){
	var oParent=$('.myWorks-img ul');
	var oPre=$('.myWorks-img .pre');
	var oNext=$('.myWorks-img .next');
	var oChild=$('.myWorks-img ul li');
	var timer=null;
	var l=0;       //存储left值
	var speed=10;  //运动增值
	var ow=oChild.eq(0).outerWidth();//第一个li的宽度
	var ol=oChild.length*2;//li的个数
	if(oChild.eq(0)){
		var zw=(oChild.eq(0).outerWidth()+20)*2;//一次运动2个li
	}else{return;}
	
	oParent[0].innerHTML+=oParent[0].innerHTML;//复制一份
	oParent.css({
		'width':(ow+20)*ol,//20是margin的值
	});
	var w=oParent.outerWidth()/2;
	function tab(){
		l+=speed;
		if(l%zw==0){
			clearInterval(timer);
		}
		oParent.css({
			'left':(l%w-w)%w,
		});
	}
	oPre.on('click',function(){
			speed=-10;
			clearInterval(timer);
			timer=setInterval(tab,30);
	});
	oNext.on('click',function(){
		speed=10;
		clearInterval(timer);
		timer=setInterval(tab,30);
	});
	
});


//myWork抽奖
$(function(){
	var list=$('#content li');
	var len=list.length;
	var begin=$('#begin');
	var index=0;  //li的下标
	var remain=0; //需要运动的长度
	var timer=null;
	var bok=false;
	begin.on('click',function(){
		if(bok)return;//运动完之前防止点击
		bok=true;
		remain = 1500 + Math.random() * 5000;
		timer=setInterval(function(){
			if(remain<200){
				bok=false;
				alert( '你抽中了: '+list[index].innerHTML );
				clearInterval(timer);
			}else{
				list[index].className = "";    // 当前无色
				list[(index+1) % len].className = "current";  //下一个绿色
				index = ++index % len;    //index加一
				remain-= 100;      //减100
			}
		},100);
	})
});


//弹窗效果
$(function(){
	function prop(obj){
		obj.on('click',function(){
			$('.shadow').show();
		});
		$('.prompt h3 a,.btn-s1-small').on('click',function(){
			$('.shadow').hide();
		})
	}
	prop($('.rules a'))
});

//滚动条
window.onload=function(){
		var oBig=document.getElementById("big");
		var oSmall=document.getElementById("small");
		var oBox1=document.getElementById("protopy");
		var oBox2=document.getElementById("protopycon");
		var oPass=document.getElementById("pass");
		var num=0;
		var count=0;
		function setTop(t){
			if(t<0){t=0;}
			else if(t>oBig.offsetHeight-oSmall.offsetHeight){
					t=oBig.offsetHeight-oSmall.offsetHeight;
				}
				var scale=t/(oBig.offsetHeight-oSmall.offsetHeight);
				oSmall.style.top=t+'px';
				oBox2.style.top=scale*(oBox1.offsetHeight-oBox2.offsetHeight)+'px';
		}
		//鼠标事件
		oSmall.onmousedown=function(ev){
			var e=ev||event;
			var disY=e.clientY-oSmall.offsetTop;
			document.onmousemove=function(ev){
				var e=ev||event;
				var t=e.clientY-disY;
				setTop(t);
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oSmall.releaseCapture&&oSmall.releaseCapture();
			}
			oSmall.setCapture&&oSmall.setCapture();
			return false;
		}
		
		//键盘
		document.onkeydown=function(ev){
			var e=ev||event;
			var t=oSmall.offsetTop;
			switch(e.keyCode){
				case 38:
						t-=10;
						break;
				case 40:
						t+=10;
						break;
			}
			setTop(t);
			return false;
		};
		//滚轮事件
		addWheel(oPass,function(bDown){
			var t=oSmall.offsetTop;
			if(bDown){
				t-=10;
			}else{t+=10;}
			setTop(t);
		})
	}


//mypratice文字出现
$(function(){
	var timer1=null;
	var arr=['照片墙：生活中，每张照片都有美丽的故事、美好的回忆。照片墙可以帮你展现出这些承载着家庭重要记忆的照片，照片墙是主人的重要秀场，或是展示主人的风采，或是展示主人的足迹。','穿墙效果：实现类似穿墙的效果，给用户以更好地体验。','手风琴效果：基于各个网站常用效果，当你想在有限的内容空间展示多个内容片段的时候，手风琴效果就非常有用，它可以帮助你以对用户非常友好的方式实现多个内容片段之间的切换。','苹果菜单：原生仿苹果任务栏菜单，具备图标放大效果，鼠标放到菜单上就把图标放大。','视差滚动:视差滚动是指让多层背景以不同的速度移动，形成立体的运动效果，带来非常出色的视觉体验。'];
	var oMyPratice=document.getElementById("myPractice-block");
	
	var count=0;//div的个数
	var num=2;   //层级
	//每个文字一个div
	function show(str){
		for(var i=0;i<str.length;i++){
			var oDiv=document.createElement('div');
			oDiv.innerHTML=str.charAt(i);
			oMyPratice.appendChild(oDiv);
		}
		var aDiv=oMyPratice.getElementsByTagName('div');
		timer1=setInterval(function(){
			move(aDiv[count],{opacity:1},{time:1500});
			count++;
			if(count==aDiv.length){ //创建完成关定时器
				clearInterval(timer1);
			}
		},100);
	};
	
	$('.myPractice-item li').on({
		'mouseenter':function(){
			$('.myPractice-block').stop().animate({'height':120,time:800});//文字框出现
			show(arr[$(this).index()]);//文字运动
			$('.myPractice-block').css({
				'border':'5px solid #996600'
			});
			$(this).css({//鼠标移入的div的层级最高
				'zIndex':num++,
			})
		},
		'mouseleave':function(){
			$('.myPractice-block').stop().animate({'height':0,time:800});
			$('.myPractice-block').html('');
			clearInterval(timer1);
			$('.myPractice-block').css({
				'border':'0px solid #996600'
			});
			count=0;//文字的个数为0
		}
	})
});


//myPractice背景图无缝滚动
$(function(){
	var oParent=$('.myPractice-box');
	var oChild=$('.myPractice-box li');
	var timer=null;
	var l=0;
	var speed=2;//运动速度
	var w=oChild.eq(0).outerWidth();//先存入w里
	var len=oChild.length*2; //由于复制一份，所以length*2
	
	oParent.html(oParent.html()+oParent.html());
	oParent.css({
		'width':w*len,//获取不到，必须在前面定义
	});
	
	var w=oParent.outerWidth()/2;
	function tab(){
		l-=speed;   //向左运动
		oParent.css({
			'left':(l%w-w)%w,
		});
	};
	clearInterval(timer);
	timer=setInterval(tab,30);
	
	oParent.on({
		'mouseover':function(){
			clearInterval(timer);
		},
		'mouseout':function(){
			timer=setInterval(tab,30);
		}
	})
});


//my information--circle
$(function(){
	function rand(n,m){
		return parseInt(Math.random()*(m-n)+n);
	}
	//角度转弧度,n代表角度
	function d2a(n){
		return n*Math.PI/180;
	};
	//角度转弧度,n代表角度
	function a2d(n){
		return n*180/Math.PI;
	};
	var oBox=document.getElementById("habby-box");
	var oName=document.getElementById("habby-name");
	var oBtn=document.getElementById("habby-btn"); 
	//R表示半径
	var R=oBox.offsetWidth/2;
	var N=12;        //小圆环的个数
	var bOk=true;    //控制来回运动
	var bTrue=false; //防止连续点击
	var HobbyArr=['打篮球','打羽毛球','骑单车','爬山','逛街','积极','开朗','大方','乐观','活泼','向上','王者荣耀'];
	for(var i=0;i<N;i++){
		var oLi=document.createElement('li');
		oLi.style.background='rgb('+rand(0,256)+','+rand(0,256)+','+rand(0,256)+')';
		oBox.appendChild(oLi);
	}
	//运动
	function start(){
		var aLi=oBox.getElementsByTagName('li');
		if(bOk){ //去
			for(var i=0;i<aLi.length;i++){
				move(aLi[i],i*30);
			}
		}else{  //回
			for(var i=0;i<aLi.length;i++){
				move(aLi[i],0);
			}
		}
	};
	
	oBtn.onclick=function(){
		if(bTrue)return;//防止连续点击
		bTrue=true;
		start();
		bOk=!bOk;
	};
	
	var aLi=$('#habby-box li');
	$('#habby-box').on('mouseover','li',function(){
		$('#habby-name').html(HobbyArr[$(this).index()])
	});
	
	//封装的move函数
	function move(obj,oTarget,fn){
		var start=obj.left||0;//开始的时候没有obj.left,start=0;
		var dis=oTarget-start;//总距离
		var count=Math.floor(2000/30);//总次数
		var n=0; //当前次数
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			var cur=start+n/count*dis;   //当前位置
			var x=R+R*Math.sin(d2a(cur));//利用弧度求距离
			var y=R-R*Math.cos(d2a(cur));
			obj.style.left=x+'px';
			obj.style.top=y+"px";
			if(n==count){
				clearInterval(obj.timer);
				obj.left=cur;//改变起始位置，用于回去
				bTrue=false;
			}
			
		},30);
	}
	
})


//侧边栏aside
$(function(){
	//回到顶部
	$('.toTop').on('click',function(){
			$('body,html').animate({'scrollTop':0},800);
			return false;
	});
	
	var index="";
	function findInLast(n,arr){  //找n>arr[i]的最后一位i值
		for(var i=0;i<arr.length;i++){
			if(n>arr[i]){  
				index=i;
			}
		}
		return index;
	}
	var myArr=[]; //给下面的点击事件用
	function move1(){
		myArr=[];       //先清空,不然每滚动一次都要push到arr(就会累加)
		//top=滚动条的高度+可视区高度一办
		var top=$(document).scrollTop()+$(window).height()/2;
		$('.item').each(function(index,ele){
			myArr.push($(ele).position().top);//把每一个元素的高度存放在arr;
		});
		var num=findInLast(top,myArr);
		$('.aside li').eq(num).addClass('active').siblings('li').removeClass('active');	
	}
	
	
	$('.aside li').on('click',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
		$('html,body').animate({scrollTop:myArr[$(this).index()]},'800');
		return false;  //阻止默认事件，防止出现选中文字；
		
	});
	$(document).on('scroll',move1);  //滚动改变背景class
	
})



