var chose = '<div id="notification"><h1 class="text-primary">X or O?</h1><button type="button" class="btn btn-default" id="xButton"><div id="x">X</div></button><button type="button" class="btn btn-default" id="oButton"><div id="o">O</div></button></div>';
var win = '<div id="notification"><h1 class="text-primary">You win</h1><button type="button" class="btn btn-default" id="replay">Replay</button></div>';
var lost = '<div id="notification"><h1 class="text-primary">You lost</h1><button type="button" class="btn btn-default" id="replay">Replay</button></div>';
var tied = '<div id="notification"><h1 class="text-primary">Tied</h1><button type="button" class="btn btn-default" id="replay">Replay</button></div>';
var usr = '', bot = '', usrCell = '', botCell = '';

var pl = [[0, 0, 0], [0, 0, 0], [0, 0, 0], 0];
var arr = [];
var obj = { 1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [1, 0], 5: [1, 1], 6: [1, 2], 7: [2, 0], 8: [2, 1], 9: [2, 2] };
var count = 0;

const $ = require('jquery');

play();

$('#00').click(function(){ if(arr.indexOf(1) > -1) { pl[0][0] = usr; $('#00').html(usrCell); pl[3]++; arr.splice(arr.indexOf(1), 1); }});
$('#01').click(function(){ if(arr.indexOf(2) > -1) { pl[0][1] = usr; $('#01').html(usrCell); pl[3]++; arr.splice(arr.indexOf(2), 1); }});
$('#02').click(function(){ if(arr.indexOf(3) > -1) { pl[0][2] = usr; $('#02').html(usrCell); pl[3]++; arr.splice(arr.indexOf(3), 1); }});
$('#10').click(function(){ if(arr.indexOf(4) > -1) { pl[1][0] = usr; $('#10').html(usrCell); pl[3]++; arr.splice(arr.indexOf(4), 1); }});
$('#11').click(function(){ if(arr.indexOf(5) > -1) { pl[1][1] = usr; $('#11').html(usrCell); pl[3]++; arr.splice(arr.indexOf(5), 1); }});
$('#12').click(function(){ if(arr.indexOf(6) > -1) { pl[1][2] = usr; $('#12').html(usrCell); pl[3]++; arr.splice(arr.indexOf(6), 1); }});
$('#20').click(function(){ if(arr.indexOf(7) > -1) { pl[2][0] = usr; $('#20').html(usrCell); pl[3]++; arr.splice(arr.indexOf(7), 1); }});
$('#21').click(function(){ if(arr.indexOf(8) > -1) { pl[2][1] = usr; $('#21').html(usrCell); pl[3]++; arr.splice(arr.indexOf(8), 1); }});
$('#22').click(function(){ if(arr.indexOf(9) > -1) { pl[2][2] = usr; $('#22').html(usrCell); pl[3]++; arr.splice(arr.indexOf(9), 1); }});

function step(){
	var set = setInterval(function(){
		if(count > 9){
			$('#popup').html(tied);
			clearInterval(set);
		} //Tied;
		if(pl[3] === count){
			if(checkUsr() === usr){
				$('#popup').html(win);
				clearInterval(set);
			} //Usr win;
			else{
				var tmp = botPlay();
				arr.splice(arr.indexOf(tmp[2]), 1);
				$(getId(tmp[0], tmp[1])).html(botCell);
				pl[tmp[0]][tmp[1]] = bot;
				pl[3]++;
				if(checkBot() === bot){
					$('#popup').html(lost);
					clearInterval(set);
				} //Bot win;

				count += 2;
			}
		}
		$('#replay').click(function(){
			$('#notification').remove();
			rePlay();
			play();
		});
	}, 100);
}

function botPlay(){
	// Tan cong
	for(var i = 0; i < 3; i++){
		if(pl[i][0] === 0 && pl[i][1] === bot && pl[i][2] === bot) return [i, 0, 3 * i + 1];
		if(pl[i][1] === 0 && pl[i][0] === bot && pl[i][2] === bot) return [i, 1, 3 * i + 2];
		if(pl[i][2] === 0 && pl[i][0] === bot && pl[i][1] === bot) return [i, 2, 3 * i + 3];
		if(pl[0][i] === 0 && pl[1][i] === bot && pl[2][i] === bot) return [0, i, i + 1];
		if(pl[1][i] === 0 && pl[0][i] === bot && pl[2][i] === bot) return [1, i, i + 4];
		if(pl[2][i] === 0 && pl[0][i] === bot && pl[1][i] === bot) return [2, i, i + 7];
	}
	if(pl[0][0] === 0 && pl[1][1] === bot && pl[2][2] === bot) return [0, 0, 1];
	if(pl[0][0] === bot && pl[1][1] === 0 && pl[2][2] === bot) return [1, 1, 5];
	if(pl[0][0] === bot && pl[1][1] === bot && pl[2][2] === 0) return [2, 2, 9];
	if(pl[0][2] === 0 && pl[1][1] === bot && pl[2][0] === bot) return [0, 2, 3];
	if(pl[0][2] === bot && pl[1][1] === 0 && pl[2][0] === bot) return [1, 1, 5];
	if(pl[0][2] === bot && pl[1][1] === bot && pl[2][0] === 0) return [2, 0, 7];

	// Phong thu
	for(var j = 0; j < 3; j++){
		if(pl[j][0] === 0 && pl[j][1] === usr && pl[j][2] === usr) return [j, 0, 3 * j + 1];
		if(pl[j][1] === 0 && pl[j][0] === usr && pl[j][2] === usr) return [j, 1, 3 * j + 2];
		if(pl[j][2] === 0 && pl[j][0] === usr && pl[j][1] === usr) return [j, 2, 3 * j + 3];
		if(pl[0][j] === 0 && pl[1][j] === usr && pl[2][j] === usr) return [0, j, j + 1];
		if(pl[1][j] === 0 && pl[0][j] === usr && pl[2][j] === usr) return [1, j, j + 4];
		if(pl[2][j] === 0 && pl[0][j] === usr && pl[1][j] === usr) return [2, j, j + 7];
	}
	if(pl[0][0] === 0 && pl[1][1] === usr && pl[2][2] === usr) return [0, 0, 1];
	if(pl[0][0] === usr && pl[1][1] === 0 && pl[2][2] === usr) return [1, 1, 5];
	if(pl[0][0] === usr && pl[1][1] === usr && pl[2][2] === 0) return [2, 2, 9];
	if(pl[0][2] === 0 && pl[1][1] === usr && pl[2][0] === usr) return [0, 2, 3];
	if(pl[0][2] === usr && pl[1][1] === 0 && pl[2][0] === usr) return [1, 1, 5];
	if(pl[0][2] === usr && pl[1][1] === usr && pl[2][0] === 0) return [2, 0, 7];

	// Random
	var index = Math.floor(Math.random() * arr.length);
	var res = obj[arr[index]];
	res.push(arr[index]);
	return res;
}

function getId(a, b){
	return '#' + String.fromCharCode(a + 48) + String.fromCharCode(b + 48);
}

function checkBot(){
	for(var i = 0; i < 3; i++){
		if(pl[i][0] === bot && pl[i][1] === bot && pl[i][2] === bot) return bot;
		else if(pl[0][i] === bot && pl[1][i] === bot && pl[2][i] === bot) return bot;
	}
	if(pl[0][0] === bot && pl[1][1] === bot && pl[2][2] === bot) return bot;
	if(pl[0][2] === bot && pl[1][1] === bot && pl[2][0] === bot) return bot;
	return 0;
}

function checkUsr(){
	for(var i = 0; i < 3; i++){
		if(pl[i][0] === usr && pl[i][1] === usr && pl[i][2] === usr) return usr;
		else if(pl[0][i] === usr && pl[1][i] === usr && pl[2][i] === usr) return usr;
	}
	if(pl[0][0] === usr && pl[1][1] === usr && pl[2][2] === usr) return usr;
	if(pl[0][2] === usr && pl[1][1] === usr && pl[2][0] === usr) return usr;
	return 0;
}

function rePlay(){
	usr = 'O';
	bot = 'X';
	pl = [[0, 0, 0], [0, 0, 0], [0, 0, 0], 0];
	// arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	count = 0;
	clear();
}

function clear(){
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			$(getId(i, j)).html('');
		}
	}
}

function play(){
	$('#popup').html(chose);
	$('#xButton').click(function(){
		$('#notification').remove();
		arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		usr = 'X'; bot = 'O';
		usrCell = '<div class="X">X</div>';
		botCell = '<div class="O">O</div>';
		step();
	});
	$('#oButton').click(function(){
		$('#notification').remove();
		arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		usr = 'O'; bot = 'X';
		usrCell = '<div class="O">O</div>';
		botCell = '<div class="X">X</div>';
		step();
	});
}