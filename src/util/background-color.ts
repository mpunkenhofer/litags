export const getBackgroundColor = () => {
    const backgroundElement = document.querySelector('.round__app__table');
    if (backgroundElement) {
        const style = getComputedStyle(backgroundElement);
        if (style && style.backgroundColor)
            return style.backgroundColor;
    }
    return 'rgba(0,0,0,1)';
};
