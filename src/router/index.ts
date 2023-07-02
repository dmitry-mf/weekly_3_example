export class Router {
    onRouteChange(fn: (path: string) => void) {
        fn && fn('some/path');
    }
}
