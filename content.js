function hexToRGBA(hex, a=0.1){
    const r = parseInt(hex.substring(1,3),16);
    const g = parseInt(hex.substring(3,5),16);
    const b = parseInt(hex.substring(5,7),16);
    const rgb = 'rgba('+r.toString()+', '+g.toString()+', '+b.toString()+', '+a.toString()+')';
    return rgb;
}

function hexToRGB(hex){
    const r = parseInt(hex.substring(1,3),16);
    const g = parseInt(hex.substring(3,5),16);
    const b = parseInt(hex.substring(5,7),16);
    const rgb = r.toString()+' '+g.toString()+' '+b.toString();
    return rgb;
}



chrome.storage.local.get('overlayColor',({overlayColor})=>
    {
        if(overlayColor){
            const rgb = hexToRGB(overlayColor);
            document.documentElement.style.setProperty('--overlay-color',rgb);
        }
    }
);

chrome.storage.local.get('opacity',({opacity})=>
    {
        if(opacity){
            document.documentElement.style.setProperty('--overlay-opacity',opacity);
        }
    }
);

chrome.storage.onChanged.addListener((color,storageType)=>{
    if(storageType==='local'&&color.overlayColor){
        const rgb = hexToRGB(color.overlayColor.newValue);
        document.documentElement.style.setProperty('--overlay-color',rgb);
    }
}
);

chrome.storage.onChanged.addListener((color,storageType)=>{
    if(storageType==='local'&&color.opacity){
        document.documentElement.style.setProperty('--overlay-opacity',color.opacity.newValue);
    }
}
);