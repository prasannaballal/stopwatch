var	stopwatchClass = function() {
	var t1;
	var	startAt1	= 0;	
	var	lapTime1	= 0;
	var splitHistory = new Array();
	var elementId;
	var exportId;


	var	now	= function() {
		return (new Date()).getTime(); 
	}; 

	this.setEelemtId = function(id){
		elementId = id;
	};
	this.setExportId = function(id){
		exportId = id;
	};
	// Stop or pause
	this.stop = function () {
		// If running, update elapsed time otherwise keep it
		lapTime1	= startAt1 ? lapTime1 + now() - startAt1 : lapTime1;
		startAt1	= 0; // Paused
	};

	// Reset
	this.resetWatch = function () {
		lapTime1 = startAt1 = 0;
		splitHistory = new Array();
	};

	// Spli

	this.split = function (){
		var spliTime = this.formatTime(startAt1 ? lapTime1 + now() - startAt1 : lapTime1);
		splitHistory.push(spliTime);
		this.export();
	};

	// Duration
	this.time = function () {
		return lapTime1 + (startAt1 ? now() - startAt1 : 0); 
	};


	this.pad = function (num, size) {
		var s = "0000" + num;
		return s.substr(s.length - size);
	}

	this.formatTime = function (time) {
		var h = m = s = ms = 0;
		var newTime = '';

		h = Math.floor( time / (60 * 60 * 1000) );
		time = time % (60 * 60 * 1000);
		m = Math.floor( time / (60 * 1000) );
		time = time % (60 * 1000);
		s = Math.floor( time / 1000 );
		ms = time % 1000;

		newTime = this.pad(h, 2) + ':' + this.pad(m, 2) + ':' + this.pad(s, 2) + ':' + this.pad(ms, 3);
		return newTime;
	}

	this.show = function(){
		document.getElementById(elementId).innerHTML = this.formatTime(this.time());
	}

	this.export = function(){
		var myNode = document.getElementById(exportId);
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
		var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(splitHistory));

		var a = document.createElement('a');
		a.href = 'data:' + data;
		a.download = 'data.json';
		a.innerHTML = 'Export JSON';

		var container = document.getElementById(exportId);
		container.appendChild(a);
	}

	this.timer = function (that){
		t1 = setInterval(function(){
			startAt1	= startAt1 ? startAt1 : now();
			document.getElementById(elementId).innerHTML = that.formatTime(that.time());
		},1);
	}
	this.timerstop = function (){
		clearInterval(t1);
		var spliTime = this.formatTime(startAt1 ? lapTime1 + now() - startAt1 : lapTime1);
		splitHistory.push(spliTime);
		this.export();
		this.stop();
	}
};

function stopwatchInstance (id,exportId){
	var stopwatch = new stopwatchClass();
	stopwatch.setEelemtId(id);
	stopwatch.setExportId(exportId);
	stopwatch.show();
	return stopwatch;
};