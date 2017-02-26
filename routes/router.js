/**
 * [router 页面的url请求和api请求的路由]
 * @param {[object] app [web服务的主对象]}
 * @param {[object] express [express框架的主对象]}
 * @param {[string] path [url请求和api请求的路径]}
 */
var router = function(app, express, path){
    /**
     * 页面的url请求
     * GET请求
     */
    // index首页
    var index = require('./index');
    app.use('/', index);
    app.use('/index', index);
    //login登录
    var login = require('./login');
    app.use('/login', login);
    // room 房间
    var room = require('./room');
    app.use('/room', room);
    app.ready = function(server){
        room.roomSocketIo(server);
    };

    /**
     * 页面的api请求
     * GET，POST请求
     * 所有api下放到专门的api文件下
     */

    var loginApi = require('./api/login');
    app.use('/api', loginApi);
    var registerApi = require('./api/register');
    app.use('/api', registerApi);
    var createRoomApi = require('./api/createRoom.js');
    app.use('/api', createRoomApi);
    var getRoomList = require('./api/getRoomList.js');
    app.use('/api', getRoomList);

    app.use(express.static(path.join(__dirname, '../www')));

    //404
    app.use(function(req, res, next){
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    //错误程序处理
    app.use(function(err, req, res, next){
        // 设置本地环境，只在开发环境下才输出错误
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err: {};

        // 显示错误页面吧
        res.status(err.status || 500);
        res.render('./error/error');
    });
}

module.exports = router;