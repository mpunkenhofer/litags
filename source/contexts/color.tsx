import React, {useState} from "react";

const shadeRGBAColor = (color, percent) => {
    const f = color.split(","), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent;
    const R = parseInt(f[0].replace(/\D/g,'')), G = parseInt(f[1]), B = parseInt(f[2]);
    const A = f.length > 3 ? parseFloat(f[3]) : 1;

    return "rgba(" +
        (Math.round((t - R) * p) + R) + "," +
        (Math.round((t - G) * p) + G) + "," +
        (Math.round((t - B) * p) + B) + "," +
        (Math.min(Math.max(A + (A * -percent), 0.0), 1.0)) + ")";
};

const ColorContext = React.createContext(null);

const ColorProvider = ({baseColor, children}) => {
    const [color, setColor] = useState(baseColor);

    const shade = (percent) => {
        return shadeRGBAColor(color, percent)
    };

    return (
        <ColorContext.Provider value={{color, shade}}>
            {children}
        </ColorContext.Provider>
    );
};

export {ColorProvider, ColorContext}
