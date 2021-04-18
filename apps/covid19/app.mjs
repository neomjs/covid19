import MainContainer from './view/MainContainer.mjs';

const onStart = () => Neo.app({
    mainView: MainContainer,
    name    : 'Covid19'
});

export {onStart as onStart};