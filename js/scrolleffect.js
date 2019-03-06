/*a tag で#toのhrefを持つものをクリックするとスクロールアニメーションするよ*/
$(function(){
  $('a[href^="#to"]').on('click',function(){
    var speed = 1000;
    var href= $(this).attr("href");
    var target = $(href == "#to" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});
/*トップへ戻るボタンがスクロールすると出てくるよ
$(function() {
  var topBtnfade = $(".totopbtn_fade");
    topBtnfade.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            topBtnfade.fadeIn("1500",function(){
            $(this).addClass('translate');
        });
        } else {
            topBtnfade.fadeOut("1500");
        }
    });
});
*/
/*
カスタムデータ属性 [data-movebg]を挿入したタグへスクロールイベントをセットする
data-movebgの値によってエフェクトに違いをつける
*/
function exeScrollEvent(){
	const targetBackgrounds = document.querySelectorAll("[data-movebg]");
	const targetBackgroundsLength = targetBackgrounds.length;
	const windowInnerHeight = window.innerHeight;
	/*イベント発生前の初期状態をセットする*/
	for(let i = 0;i < targetBackgroundsLength; i++){
		const datasetMovebg = targetBackgrounds[i].dataset.movebg;
		/*イベントフラグとして[data-status='yet']を設定*/
		targetBackgrounds[i].dataset.status = "yet";
		switch(datasetMovebg){
			case 'btn':
			targetBackgrounds[i].style.transform = "rotateY(45deg)";
			targetBackgrounds[i].style.transformOrigin = "left";
			targetBackgrounds[i].style.transition = "all 2.0s";
			break;
			case 'pouch':
			targetBackgrounds[i].style.backgroundPositionX = "-45%";
			targetBackgrounds[i].style.transition = "all 1.5s";
			break;
			default:
			break;
		}
	}
	console.log(targetBackgrounds);
	
	function effectEvent(scrollTop){		
		for(let i = 0;i < targetBackgroundsLength; i++){
			const datasetMovebg = targetBackgrounds[i].dataset.movebg;
			const BackgroundTop = targetBackgrounds[i].getBoundingClientRect().top + scrollTop;
			//console.log(BackgroundTop);
			if(scrollTop + windowInnerHeight > BackgroundTop && targetBackgrounds[i].dataset.status === "yet"){
				switch(datasetMovebg){
					case 'btn':
					targetBackgrounds[i].style.transform = "rotateY(0deg)";
					targetBackgrounds[i].dataset.status = "done";
					console.log("bg slide in");
					break;
					case 'pouch':
					targetBackgrounds[i].style.backgroundPositionX = "0%";
					targetBackgrounds[i].dataset.status = "done";
					console.log("bg slide in");
					break;
					default:
					break;
				}
			}else if(scrollTop <= windowInnerHeight && targetBackgrounds[i].dataset.status === "done"){
				switch(datasetMovebg){
					case 'btn':
					targetBackgrounds[i].style.transform = "rotateY(45deg)";
					targetBackgrounds[i].dataset.status = "yet";
					console.log("bg slide out");
					break;
					case 'pouch':
					targetBackgrounds[i].style.backgroundPositionX = "-45%";
					targetBackgrounds[i].dataset.status = "yet";
					console.log("bg slide out");
					break;
					default:
					break;
				}
			}
		}//for end
	}//effectEvent

	function scrollEvent(){
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		let flag = false;
		if(!flag) {
			window.requestAnimationFrame(function(){
      effectEvent(scrollTop);
      flag = false;
    	});
    flag = true;
  	}
	}
	
	window.addEventListener('scroll',scrollEvent,false);
}
//exeScrollEvent();

/*
画像ファイル名にpicが含まれているものに
スクロールイベントを設定
*/
function exefade(){
	const targetPicturesAll = document.body.querySelectorAll("img[src*='pic']");
	/*for IE11*/
	const targetPictures = Array.prototype.slice.call(targetPicturesAll,0); 
	targetPictures.forEach(function(element){
		//console.log(element);
		element.style.opacity = "0.0";
		element.style.transform = "translate(0,4rem)";
		element.style.transition = "all 2.0s";
	});

	function scrollFadeInOut(){
		const targetPicturesLength = targetPictures.length;
		const windowInnerHeight = window.innerHeight;
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		for(let i= 0; i < targetPicturesLength; i++){
			//console.log("targetPictures[" + i + "]" + targetPictures[i].getBoundingClientRect().top);
			const targetPictureTop = targetPictures[i].getBoundingClientRect().top;
			if(windowInnerHeight > targetPictureTop && targetPictures[i].style.opacity === "0"){
				console.log("fade in !");
				targetPictures[i].style.opacity = "1.0";
				targetPictures[i].style.transform = "translate(0,0rem)";
			}else if(scrollTop < windowInnerHeight && targetPictures[i].style.opacity === "1"){
				console.log("fade out !");
				targetPictures[i].style.opacity = "0.0";
				targetPictures[i].style.transform = "translate(0,4rem)";
			}
		}//for end
	}
	window.addEventListener('scroll',scrollFadeInOut,false);
}
//exefade();

function effectScroll(){
	const documentHeight = getdocumentHeight();
	const windowHeight = window.innerHeight;
	const pageBottom = documentHeight - windowHeight;
	//console.log("documentHeight:" + documentHeight + " / windowHeight:" + windowHeight);
	console.log("documentHeight:" + documentHeight);
	//console.log("pageBottom:" + pageBottom);
	
	const toTopbtn = document.getElementsByClassName('totopbtn_fade')[0];
	
	let flag = false;
	
	function getdocumentHeight(){
		const body = document.body;
		const documentHeight = body.clientHeight;
		return documentHeight;
		}
	function getscrollTop(){
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		//console.log("scrollTop1:" + scrollTop);
		return scrollTop;
		}
	function toTopbtnStyle(){
		toTopbtn.style.visibility = "hidden";
		toTopbtn.style.opacity = "0";
		}
	function toTopbtnStyleFadeout(){
		toTopbtn.style.visibility = "hidden";
		toTopbtn.style.opacity = "0";
		}
	function toTopbtnStyleFadeIn(toTopbtnStyleHalfOpacity){
			toTopbtn.style.visibility = "visible";
			toTopbtn.style.opacity = "1";
			toTopbtn.style.transition = "visibility 3s ease 0s,opacity 3s ease 0s,bottom 0.3s ease 0s";
			//toTopbtnStyleHalfOpacity();
		}
	function toTopbtnStyleHalfOpacity(){
		setTimeout(function() {
			toTopbtn.style.opacity = "0.5";
			},2000);
		}
	/*トップへ戻るボタンがスクロールすると出てくるよ*/
	function fade(){
		const scrollTop = getscrollTop();
		checkScroll(windowHeight,scrollTop);
		}
	function checkScroll(windowHeight,scrollTop){
		//console.log("windowHeight:" + windowHeight);
		if(windowHeight>scrollTop){
			toTopbtnStyleFadeout();
			}
		else if(windowHeight <= scrollTop){
			toTopbtnStyleFadeIn(toTopbtnStyleHalfOpacity);
			}
		}
	/*ページ末までスクロールするとトップへ戻るボタンがfooterにかぶらないようにするよ*/
	function toBottom(){
		const scrollTop = getscrollTop();
		checkBottom(pageBottom,scrollTop);
		}
	function checkBottom(pageBottom,scrollTop){
		if(pageBottom <= scrollTop){
			console.log("bottom!");
			toTopbtn.style.bottom = "5rem";
			flag = true;
			}
		else if(pageBottom > scrollTop && flag == true){
			console.log("leave bottom!");
			toTopbtn.style.bottom = "1rem";
			flag = false;
			}
		}
	window.addEventListener("load",getdocumentHeight,false);
	window.addEventListener("scroll",getscrollTop,false);
	window.addEventListener("scroll",fade,false);
	window.addEventListener('DOMContentLoaded',toTopbtnStyle,false);
	window.addEventListener("scroll",toBottom,false);
}
effectScroll();