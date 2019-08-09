/** @format */

// /** @format */

// import { customer, servant, manager, defaultRouer } from '@/router/routers';

// export default {
//   state: {
//     // 动态权限路由
//     addRouters: [],
//     // 当前默认路由
//     routers: defaultRouter
//   },
//   mutations: {
//     /**
//      * @msg:添加动态权限路由
//      * @param {Array} routers 动态权限路由
//      * @return:
//      */
//     SET_ROUTERS: (state, routers) => {
//       state.addRouters = routers;
//       state.routers = defaultRouter.concat(routers);
//     }
//   },
//   actions: {
//     GenerateRoutes({ commit }, roles) {
//       return new Promise(resolve => {
//         let accessRouters;
//         if (roles === 'teacher') {
//           accessRouters = teachRouter;
//         } else {
//           accessRouters = areaSchoolRouter;
//         }
//         commit('SET_ROUTERS', accessRouters);
//         resolve();
//       });
//     }
//   }
// };
