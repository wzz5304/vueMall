window.onload = function(){		
//$(".search .card").mouseover(function(){alert(1);});
	
/* left 图片切换*/	
	var arrUrl = [ 'img/1.png', 'img/2.png', 'img/3.png', 'img/4.png','img/5.png'];
	var disImgUrl = [ 'img/1b.jpg', 'img/2b.jpg', 'img/3b.jpg', 'img/4b.jpg','img/5b.jpg'];
	var num = 0;
	var oDiv = document.getElementById('left');
    var oPic = document.getElementById('top');
	var oImg = oPic.getElementsByTagName('img')[0];
	var oA = oDiv.getElementsByTagName('a');
	var oUl  =oDiv.getElementsByTagName('ul')[0];
	var aLi  = oDiv.getElementsByTagName('li');
    var oSpan = oPic.getElementsByTagName('span')[0];
	var o_DisV = document.getElementById('disV');
	var dis_Img = document.getElementById('disImg');
	
	for(var i=1;i<=arrUrl.length;i++)
	{
		oUl.innerHTML+='<li><img src="img/'+i+'.png"/></li>';
		//style="background:url(img/'+i+'.png);
		}
		//oldLi = aLi[num];
	//初始化
	function tabPic(){
		oImg.src = arrUrl[num];
		dis_Img.src = disImgUrl[num]
		//aLi[num].className = 'active';
		for( var i=0; i<aLi.length; i++ ){
			aLi[i].className = '';
		}
		aLi[num].className = 'active';
		}
	tabPic();
	oA[0].onclick =function(){
		//alert(1);
		num--;
		if(num==-1){
			num=arrUrl.length-1;
			}
		tabPic();
		
		}
	oA[1].onclick =function(){
		//alert(1);
		num++;
		if(num==arrUrl.length){
			num=0;
			}
		tabPic();
		
		}
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].onmouseover = function(){
			//alert(this.index);
			num = this.index;
	        tabPic();
			//oldLi.className='';
	       // oldLi = this;
	      //  this.className ='active'; 
			
			}
		
		}
	
	/* 图片放大镜 */
	/*var oSpan = oPic.getElementsByTagName('span')[0];
	var o_DisV = document.getElementById('disV');
	var dis_Img = document.getElementById('disImg');*/
	oPic.onmouseover = function(){
		oSpan.style.display = 'block';
		o_DisV.style.display = 'block';
		}; 
	oPic.onmouseout = function(){
		oSpan.style.display = 'none';
		o_DisV.style.display = 'none';
		}; 
	oPic.onmousemove = function(ev){
		var ev = ev || window.event;
		
		var L = ev.clientX - oPic.offsetLeft - oSpan.offsetWidth/2;
		var T = ev.clientY - oPic.offsetTop - oSpan.offsetHeight/2;
		
		if(L<0){
			L = 0;
		}
		else if(L>oPic.offsetWidth - oSpan.offsetWidth){
			L = oPic.offsetWidth - oSpan.offsetWidth;
		}
		
		if(T<0){
			T = 0;
		}
		else if(T>oPic.offsetHeight - oSpan.offsetHeight){
			T = oPic.offsetHeight - oSpan.offsetHeight;
		}
		
		oSpan.style.left = L + 'px';
		oSpan.style.top = T + 'px';
		
		var scaleX = L/(oPic.offsetWidth - oSpan.offsetWidth);
		var scaleY = T/(oPic.offsetHeight - oSpan.offsetHeight);
		
		dis_Img.style.left = - scaleX * (dis_Img.offsetWidth - o_DisV.offsetWidth) + 'px';
		dis_Img.style.top = - scaleY * (dis_Img.offsetHeight - o_DisV.offsetHeight) + 'px';		
		
	};
	

	/* saleTab tab切换*/
	/*$(".saleList li").click(function(){
		//alert($(this).index());
		$(".saleList #saleTab").eq($(this).index()).css({'display':'block'});
		$(".saleList #saleTab").siblings('#saleTab').css({'display':'none'}); 
		});*/
	// $('.saleList').find('li').click(function(){//alert(1);
	//  // alert($(this).index());
	//     $('.saleList').find('li').removeClass();
	// 	$(".saleList #saleTab").css({'display':'none'});
	// 	$(this).addClass('activeL');
	//     $(".saleList #saleTab").eq($(this).index()).css({'display':'block'});
	//     if($(this).index()==0)
	// 	{
	// 		//alert(1);
	// 		$('footer').css({'margin-top':'5750px'});
	// 		}
	// 	else if($(this).index()==1)
	// 	{
	// 		$('footer').css({'margin-top':'612px'});
	// 		}
	// 	else if($(this).index()==2)
	// 	{
	// 		$('footer').css({'margin-top':'1082px'});
	// 		}
	// 	else if($(this).index()==3)
	// 	{
	// 		$('footer').css({'margin-top':'634px'});
	// 		}
	// 	else if($(this).index()==4)
	// 	{
	// 		$('footer').css({'margin-top':'1494px'});
	// 		}
	// });
	
	
	
	
	
	
	
	
	
	
	
	
	
	};