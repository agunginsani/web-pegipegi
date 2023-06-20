import { RouteMeta } from 'vue-router';

export default defineNuxtRouteMiddleware((to, from) => {
  const enterTransition: RouteMeta['pageTransition'] = {
    enterActiveClass:
      'fixed left-0 right-0 top-0 transition-all duration-[0.4s] pointer-events-none',
    leaveActiveClass:
      'fixed left-0 right-0 top-0 transition-all duration-[0.4s] pointer-events-none',
    enterFromClass: 'translate-x-full',
    enterToClass: 'translate-x-0',
    leaveToClass: 'translate-x-[-100%] brightness-50',
    mode: 'in-out',
  };

  const leaveTransition: RouteMeta['pageTransition'] = {
    enterActiveClass:
      'fixed left-0 right-0 top-0 transition-all duration-[0.4s] pointer-events-none',
    leaveActiveClass:
      'fixed left-0 right-0 top-0 transition-all duration-[0.4s] pointer-events-none',
    enterFromClass: 'translate-x-[-100%] brightness-50',
    enterToClass: 'translate-x-0',
    leaveToClass: 'translate-x-full',
    mode: 'in-out',
  };

  function getDepth(path: string) {
    return path.split('/').filter((item) => item.length > 0).length;
  }

  // TODO: check if going to /select-date or /select-location
  if (getDepth(to.path) >= getDepth(from.path)) {
    to.meta.pageTransition = enterTransition;
    from.meta.pageTransition = enterTransition;
  } else {
    to.meta.pageTransition = leaveTransition;
    from.meta.pageTransition = leaveTransition;
  }
});
