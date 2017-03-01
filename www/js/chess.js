/**
 * ==============================
 * 
 * 下棋 => chess
 * @author      : fakerli
 * @datetime    : 2017/03/01
 * 
 * ==============================
 */
(function () {
    var socket = io('ws://10.240.19.184:8080');
    var chessModel = new Vue({
        el: '#app',
        name: 'chess',
        data: {
            gameOver: false,    //游戏结束
            boardWidth: 11,     //正方形棋盘宽度
            last: '',           // 上一步的坐标
            pieces: {},
            pieceClass: { b: 'b', w: 'w' },
            player: 1,          // 1:player1 class==b 黑棋子  0:player2 class==w 白棋子
            socket: {},
            canPlay: false,
            otherSid: '',   //其他主机sid
        },
        created: function () {
            var _this = this;
            _this.init();

            socket.on('linked', function () {
                console.log('有主机连接成功，等待对方下棋');
            });

            socket.on('linkOK', function () {
                console.log('连接主机成功，开始下棋');
                //连接其他主机，成为白棋子，可以落子
                _this.player = 0;
                _this.canPlay = true;
            });

            //对手落子后数据返回
            socket.on('tick-back', function (d) {
                var data = JSON.parse(d);
                this.pieces = data.pieces;
                this.canPlay = true;
                if (data.gameOver) {
                    alert('game over');
                }
            });
        },
        methods: {
            init: function () {
                this.gameOver = false;
                var center = parseInt(this.boardWidth / 2);
                let pieces = {
                    len: this.boardWidth  //长==宽==this.boardWidth
                };

                //初始化所有坐标
                for (let x = 0; x < pieces.len; x++) {
                    for (let y = 0; y < pieces.eln; y++) {
                        let player = '';
                        //设定中间棋子为黑棋
                        if (x == center && y == center) {
                            player = this.pieceClass.b;
                        }
                        pieces[this._cover(x) + this._cover(y)] = player;

                    }
                }
                this.pieces = pieces;
            },

            tick: function (x, y) {
                if (this.canPlay) {
                    var coordinate = this._cover(x) + this._cover(y);
                    if (!this.pieces[coordinate] && !this.gameOver) {
                        this.pieces[coordinate] = this.player ? this.pieceClass.b : this.pieceClass.w;
                        this.last = coordinate;
                        this.check(x, y);
                        var result = {
                            pieces: this.pieces,
                            gameOver: this.gameOver
                        };
                        socket.emit('tick', JSON.stringify(result));
                        //转换角色
                        this.canPlay = false;
                    }
                }
            },

            //检查输赢
            check: function (x, y) {
                // 横向
                var cx = this._cover(x);
                var cy = this._cover(y);
                var curPiece = this.pieces(cx + cy);
                let count = 0;
                for (let i = 0; i < this.boardWidth; i++) {
                    if (curPiece == this.pieces[cx + this._cover(i)]) {
                        count++;
                    }
                    else {
                        count = 0;
                    }

                    if (count == 5) {
                        alert('you win');
                        this.gameOver = true;
                        return true;
                    }
                }

                //纵向
                count = 0;
                for(let i = 0; i < this.boardWidth; i++){
                    if(curPiece == this.pieces[this._cover(i) + cy]){
                        count++;
                    }
                    else{
                        count = 0;
                    }

                    if(count == 5){
                        alert('you win');
                        this.gameOver = true;
                        return true;
                    }
                }

                // \方向
                count = 0;
                let sub = Math.min(x, y);
                sub = sub > 5 ? 5 : sub;

                // \方向上
                // 从当前落子点往左上方后退sub(最大5)个位置后的坐标(_x, _y)
                let _x = x - sub;
                let _y = y - sub;

                //(this.boardWidth - Math.abs(x - y)):该方向上最多棋子数目
                // 从(_x, _y)开始往右下角方向逐一的比较
                // 根据该方向上是否有连续5个相同的棋子判断结果
                for(let i = 0; i < this.boardWidth - Math.abs(x - y); i++){
                    if(curPiece == this.pieces[this._cover(_x + i) + this._cover(_y + i)]){
                        count++;
                    }
                    else{
                        count = 0;
                    }

                    if(count==5){
                        alert('you win');
                        this.gameOver = true;
                        return true;
                    }
                }

                // /方向，想象成方向\方向的镜像
                count = 0;
                _x = this.boardWidth - x - 1;
                _y = y;
                sub = Math.min(_x, _y);

                sub = sub > 5 ? 5 : sub;

                _y = _y - sub;
                _x = _x - sub;

                // /方向上
                // 从当前落子点往左下方后退sub(最大5)个位置后的坐标(_y, this.boardWidth - _x - 1)
                // 相当于\的方向的镜像
            }

        }
    });
});