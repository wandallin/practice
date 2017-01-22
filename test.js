var net = require('net');
var child_process = require('child_process');

//建立server
var server = net.createServer();

//監聽56789port
console.log('開始監聽56789');
server.listen(56789);

//當新的連線被建立
console.log('有新的連線進來');
server.on('connection', function(socket){
	var child = null;
	var cmdStr = '';

	//接收遙控程式送來的命令
	console.log('接收傳送來的命令');
	socket.on('data', function(data){
		//儲存所有命令字串
		cmdStr += data.toString();
		console.log('命令：'+cmdStr);
		//檢查是否收到換行字元，代表命令接收完成
		console.log('接收到換行字元');
		if(data.toString().indexOf('\n') == -1)
		{
			//還沒收到
			return;
		}
		//收到的事json的字串，必須先將資料內容轉成實體物件
		console.log('json轉成字串');
		var cmd  = JSON.parse(data);

		//執行命令和帶入參數
		console.log('執行命令和帶入參數');
		child = child_process.spawn(cmd.command, cmd.args);

		//接收命令的結果，並直接傳回給遙控程式
		console.log('接收命令的結果，並直接傳回給遙控程式');
		child.stdout.on('data', function(output){
			socket.write(output);
		});
		//當命令結束時，也中斷與遙控程式的連線
		console.log('當命令結束時，也中斷與遙控程式的連線');
		child.on('end', function(){
			socket.destory();
			child = null;
		});
	});
	//若遙控程式先行中斷連線
	console.log('若遙控程式先行中斷連線');
	socket.on('end', function(){
		if(child)
			child.kill();
	});
	console.log('5');
	console.log('hahaha');
});