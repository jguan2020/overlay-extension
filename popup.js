const colorPicker = document.getElementById('color');
const alphaValue = document.getElementById('alphaValue');
const alphaText = document.getElementById('alphaText');
const colorString = document.getElementById('colorString');

function hexToRGBA(hex, a=1){
    const r = parseInt(hex.substring(1,3),16);
    const g = parseInt(hex.substring(3,5),16);
    const b = parseInt(hex.substring(5,7),16);
    const rgb = 'rgba('+r.toString()+', '+g.toString()+', '+b.toString()+', '+a.toString()+')';
    return rgb;
}

chrome.storage.local.get('overlayColor',({overlayColor})=>
    {
        if(overlayColor){
            colorPicker.value = overlayColor;
            document.documentElement.style.setProperty('--thumb-color',overlayColor);
            colorString.textContent = overlayColor.toString();
        }
        
    }
);

chrome.storage.local.get('opacity', ({opacity})=>
    {
        if(opacity){
            alphaValue.value = opacity;
            alphaText.textContent = opacity.toString() + '%';
        }
    }
);

alphaValue.addEventListener('input', opacity=>
{
    chrome.storage.local.set({
        opacity:opacity.target.value
    });
    alphaText.textContent = opacity.target.value.toString() + '%';
}
);



colorPicker.addEventListener('input', color=>
    chrome.storage.local.set({
        overlayColor:color.target.value,
}));




chrome.storage.onChanged.addListener((color,storageType)=>{
    if(storageType==='local'&&color.overlayColor){
        const rgba = hexToRGBA(color.overlayColor.newValue);
        document.documentElement.style.setProperty('--thumb-color',rgba);
        colorString.textContent = color.overlayColor.newValue.toString();
    }
}
);



