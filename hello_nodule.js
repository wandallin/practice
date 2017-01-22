var net = require('net');

//建立object儲存要送出的命令和參數
var cmd = {
	command: process.argv[2],
	args:[]
};

//取得所有命令參數
for(var i = 3; i < process.argv.length; i++)
{
	cmd.args.push(process.argv[i]);
}
console.log('1');
//建立一個socket連線
var socket = new net.Socket();

//連線到localhost畚箕的56789port
socket.connect(56789, 'localhost', function(){
	//將命令物件轉乘ＪＳＯＮ送出
	socket.write(JSON.stringify(cmd));
console.log('2');
	//接收結果
	socket.on('data',function(data){
		console.log(data.toString());
	});
console.log('3');
	//連線中斷
	/*socket.on('end', function(){
		process.exit();
	})*/

});
