import './index.scss';
// import
// import
// import

console.log('started');

const log = () => null;

const data = () =>
    new Promise((resolve) => {
        log();
        resolve([]);
    });

const fn = async () => {
    const result = await data();

    return result.map((data) => data);
};
