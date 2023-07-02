import { Router } from '../router';

export class Page {
    header: HTMLElement | null = null;
    body: HTMLElement | null = null;
    footer: HTMLElement | null = null;
    router: Router;

    constructor(router: Router) {
        this.router = router;
        this.router.onRouteChange(this.handleRouteChange.bind(this));
    }

    handleRouteChange(path: string) {
        console.log(path);
    }

    addEventListeners() {
        this.header && this.header.addEventListener('click', this.onHeaderClick);
    }

    createFooter() {
        return document.createElement('footer');
    }

    createBody() {
        return document.createElement('main');
    }

    createHeader() {
        return document.createElement('header');
    }

    onHeaderClick = () => {
        if (this.header) {
            this.header.style.display = 'none';
        }
    };

    render() {
        this.header = this.createHeader();
        this.body = this.createBody();
        this.footer = this.createFooter();

        [this.header, this.body, this.footer].forEach((elem) => {
            document.body.append(elem);
        });
    }
}
