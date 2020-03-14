import MainContainer from './view/MainContainer.mjs';

Neo.onStart = function() {
    Neo.app({
        appPath : 'apps/covid19/',
        mainView: MainContainer,
        name    : 'covid19'
    });
};