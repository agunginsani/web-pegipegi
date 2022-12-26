export default defineNuxtRouteMiddleware((to, from) => {
  type Transition = typeof to.meta.pageTransition;

  const leftTransition: Transition = {
    enterActiveClass: "fixed left-0 right-0 top-0 transition-all duration-300",
    leaveActiveClass: "fixed left-0 right-0 top-0 transition-all duration-300",
    enterFromClass: "translate-x-full",
    enterToClass: "translate-x-0",
    leaveToClass: "translate-x-[-100%] brightness-50",
    mode: "in-out",
  };

  const rightTransition: Transition = {
    enterActiveClass: "fixed left-0 right-0 top-0 transition-all duration-300",
    leaveActiveClass: "fixed left-0 right-0 top-0 transition-all duration-300",
    enterFromClass: "translate-x-[-100%] brightness-50",
    enterToClass: "translate-x-0",
    leaveToClass: "translate-x-full",
    mode: "in-out",
  };

  function getDepth(path: string) {
    return path.split("/").filter((item) => item.length > 0).length;
  }

  if (getDepth(to.path) > getDepth(from.path)) {
    to.meta.pageTransition = leftTransition;
    from.meta.pageTransition = leftTransition;
  } else {
    to.meta.pageTransition = rightTransition;
    from.meta.pageTransition = rightTransition;
  }
});
