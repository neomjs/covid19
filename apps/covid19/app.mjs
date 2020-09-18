import MainContainer from './view/MainContainer.mjs';

const onStart = () => Neo.app({
    appPath : 'apps/covid19/',
    mainView: MainContainer,
    name    : 'Covid19'
});

export {onStart as onStart};