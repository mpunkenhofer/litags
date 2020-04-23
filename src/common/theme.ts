import { Theme } from "./types";

// reference: https://github.com/ornicar/lila/tree/master/ui/common/css/theme  
export const getTheme = (): Theme => {
    if (document.body.classList.contains('transp')) {
        return {
            primaryBackgroundColor: 'hsla(0, 0%, 0%, .8)',
            secondaryBackgroundColor: 'hsla(0, 0%, 0%, .6)',
            borderColor: '#404040'
        }
    } else if (document.body.classList.contains('dark')) {
        return {
            primaryBackgroundColor: 'hsl(37, 7%, 14%)', // $c-bg-high
            secondaryBackgroundColor: 'hsl(37, 5%, 18%)', // $c-bg-zebra
            borderColor: 'hsl(0, 0%, 25%)' // $c-border
        }
    }
    else {
        return {
            primaryBackgroundColor: 'hsl(0, 0%, 100%)',
            secondaryBackgroundColor: 'hsl(37, 12%, 96.5%)',
            borderColor: 'hsl(0, 0%, 85%)'
        }
    }
}