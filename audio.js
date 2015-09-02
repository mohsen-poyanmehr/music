var player = document.querySelector('#audioPlayer');

function play(idPlayer, control) {
	var player = document.querySelector('#' + idPlayer);
	if (player.paused) {
		player.play();
		//control.textContent =" pause";
		$('#btn1').find('i').addClass('fa-pause');
 	} 
	else {
		player.pause(); 
		//control.textContent = "play";
		//$('button').find('i').addClass('fa-play');
		$('#btn1').find('i').removeClass('fa-pause');
	}
}


function resume(idPlayer) {
	var player = document.querySelector('#' + idPlayer);
    	player.currentTime = 0;
    	player.pause();
	$('#btn1').find('i').removeClass('fa-pause');
}

function volume(idPlayer, vol) {
	var player = document.querySelector('#' + idPlayer);
    	player.volume = vol;    
}

function update(player) {
	var duration = player.duration;    // Durée totale
	var time     = player.currentTime; // Temps écoulé
	var fraction = time / duration;
	var percent  = Math.ceil(fraction * 100);

	var progress = document.querySelector('#progressBar');
	var koli = document.querySelector('#koli');

	progress.style.backgroundColor = "gray";
	progress.style.color = "#ffffff";
	progress.style.width = percent + '%';
	progress.style.backgroundColor =  "gray" + percent +'%';

	document.querySelector('#progressTime').textContent =formatTime(time) + "   " + percent + '%';
}

function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins  = Math.floor((time % 3600) / 60);
    var secs  = Math.floor(time % 60);
    
    if (secs < 10) {
        secs = "0" + secs;
    }
    
    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }
        
        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return mins + ":" + secs; // mm:ss
    }
}

function getMousePosition(event) {
    return {
        x: event.pageX,
        y: event.pageY
    };
}

function getPosition(element){
    var top = 0, left = 0;
    
    do {
        top  += element.offsetTop;
        left += element.offsetLeft;
    } while (element = element.offsetParent);
    
    return { x: left, y: top };
}

function clickProgress(idPlayer, control, event) {
    var parent = getPosition(control);    // La position absolue de la progressBar
    var target = getMousePosition(event); // L'endroit de la progressBar où on a cliqué
    var player = document.querySelector('#' + idPlayer);
  
    var x = target.x - parent.x; 
    var wrapperWidth = document.querySelector('#progressBarControl').offsetWidth;
    
    var percent = Math.ceil((x / wrapperWidth) * 100);    
    var duration = player.duration;
    
    player.currentTime = (duration * percent) / 100;
}

/*$('.fix button .control').click(function(){
    //$(this).next('ul').slideToggle('500');
    $(this).find('i').toggleClass('fa fa-play fa fa-pause')
});*/


