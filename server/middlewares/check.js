let responseData = {
    code: 1,
    msg: "未授权登录"
}
// 是否登录
export const checkLogin = (req, res, next)=>{
    if (!req.session.user) {
        return res.json(responseData);
    }
    next();
}
// 是否是管理员
export const checkAdmin = (req,res,next) =>{
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.json(responseData);
    }
    next();
}