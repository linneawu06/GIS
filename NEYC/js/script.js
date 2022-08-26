 /* === <!-- maincontainer --> box-menuchange === */
const changeBox = document.querySelector(".mainbody");
const changeBtns = document.querySelectorAll(".menuClick");
const changeContents = document.querySelectorAll(".boxcontainer");


changeBox.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    changeBtns.forEach(function (changeBtn) {
	//   console.log(changeBtns)
      changeBtn.classList.remove("active");
    });
      e.target.classList.add("active");

    changeContents.forEach(function (changeContent) {
      changeContent.classList.remove("open");
    });
    const element = document.getElementById(id);
    element.classList.add("open");
  }
});

//  /* === <!-- secondcontainer --> box-menuchange === */
// const hideClick = document.querySelector(".menuClick");
// const secondContents = document.querySelector(".secondcontainer");
// hideClick.addEventListener("click",function(){
//   if (secondContents.classList.contains("hide")){
// 	// console.log(secondContents)
//     secondContents.classList.add("hide");
//   } 
//   else {
//     secondContents.classList.add("hide");
//   }
// });


//  /* === <!-- secondcontainer --> box-menuchange === */
 const changeBox2 = document.querySelector(".maincontainer");
 const changeContents2 = document.querySelectorAll(".secondcontainer .boxcontainer");

 changeBox2.addEventListener("click", function (i) {
	// console.log(changeBox2)
   const id2 = i.target.dataset.id;
	if (id2) {
		changeContents2.forEach(function (changeContent2) {
			console.log(changeContents2)
			changeContent2.classList.remove("open");
		});
		const element = document.getElementById(id2);
		element.classList.add("open");
		}
 });


/* = card flap= */
const flapBox = document.querySelectorAll(".flapwrap");
flapBox  .forEach(function (flapCard) {
  const flapLink = flapCard.querySelector(".cardcontent");
  flapLink.addEventListener("click",function(){
    flapBox.forEach(function (item) {
      if (item !== flapCard) {
        item.classList.remove('show')
        }
    });
    flapCard.classList.toggle('show')
  });
});

/* = search filter = */
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parents('.fileterfieldset');
	next_fs = $(this).parents('.fileterfieldset').next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')','position': 'absolute',});
		next_fs.css({'left': left, 'opacity': opacity,'position': 'static'});
		}, 
		duration: 500, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parents('.fileterfieldset');
	previous_fs = $(this).parents('.fileterfieldset').prev();
	
	//de-activate current step on progressbar

	$("#progressbar li").eq($("fieldset").index(next_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'position': 'absolute'});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity,'position': 'static'});
		}, 
		duration: 500, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
		
	});
});

$(".submit").click(function(){
	return false;
})



