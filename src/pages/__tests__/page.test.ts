import { Router } from '../../router';
import { Page } from '../page';

// пример мока методов с использованием наследования
const handleRouteChangeMock: jest.Mock = jest.fn();
class PageTest extends Page {
    handleRouteChange(...args: [string]): void {
        handleRouteChangeMock(...args);
    }
}

describe('page tests', () => {
    let router: Router;
    let instance: PageTest;

    let header: HTMLCollectionOf<HTMLElement>;
    let main: HTMLCollectionOf<HTMLElement>;
    let footer: HTMLCollectionOf<HTMLElement>;

    const setup = () => {
        // очищаем все созданные ранее элементы перед каждым тестом
        document.body.innerHTML = '';

        // создаем новые инстансы
        router = new Router();
        instance = new Page(router);
        instance.render();

        // берем из виртуального дом наши элементы
        header = document.getElementsByTagName('header');
        main = document.getElementsByTagName('main');
        footer = document.getElementsByTagName('footer');
    };

    beforeEach(() => {
        // обновляем тесты
        jest.clearAllMocks();
        setup();
    });

    it('extend PageTest ex: should call initial methods', () => {
        // пример создания унаследованного класса
        new PageTest(new Router());
        expect(handleRouteChangeMock).toHaveBeenNthCalledWith(1, 'some/path');
    });

    it('Page ex: should call initial methods', () => {
        const routeChangeMock = jest.spyOn(Page.prototype, 'handleRouteChange');
        // вызываем stup еще раз т.к spyOn был вызван после создания класса в beforeAll
        setup();
        expect(routeChangeMock).toHaveBeenNthCalledWith(1, 'some/path');
    });

    it('should render elements', () => {
        expect([header[0], main[0], footer[0]]).toStrictEqual([instance.header, instance.body, instance.footer]);
    });

    it('should subscribe to events', () => {
        // подписываемся до вызова функции
        const subscribeMock = jest.spyOn(instance.header as HTMLElement, 'addEventListener');
        instance.addEventListeners();
        expect(subscribeMock).toHaveBeenNthCalledWith(1, 'click', instance.onHeaderClick);
    });

    it('should change display property on click', () => {
        instance.addEventListeners();
        header[0].click();
        expect(header[0].style.display).toBe('none');
    });
});
