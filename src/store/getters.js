const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, /* 在根级的getters上开发子模块的属性给别人看给别人用 */
  name: state => state.user.userInfo.username, // 获取用户信息
  userId: state => state.user.userInfo.userId, // 获取用户信息Id
  staffPhoto: state => state.user.userInfo.staffPhoto, // 获取用户头像
  companyId: state => state.user.userInfo.companyId, // 获取公司ID
  routes: state => state.permission.routes // 导出当前的路由
}
export default getters
