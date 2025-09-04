function hexToRGBA(hex, a=0.1){
    const r = parseInt(hex.substring(1,3),16);
    const g = parseInt(hex.substring(3,5),16);
    const b = parseInt(hex.substring(5,7),16);
    const rgb = 'rgba('+r.toString()+', '+g.toString()+', '+b.toString()+', '+a.toString()+')';
    return rgb;
}

chrome.storage.local.get('overlayColor',({overlayColor})=>
    {
        if(overlayColor){
            const rgba = hexToRGBA(overlayColor);
            document.documentElement.style.setProperty('--overlay-color',rgba);
        }
    }
);

chrome.storage.onChanged.addListener((color,storageType)=>{
    if(storageType==='local'&&color.overlayColor){
        const rgba = hexToRGBA(color.overlayColor.newValue);
        document.documentElement.style.setProperty('--overlay-color',rgba);
    }
}
);