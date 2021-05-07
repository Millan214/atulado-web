function myAlert(type, msg){    
    info.classList.remove('display-none')
    info.animate([
            { transform: 'translateY(-100%)' },
            { transform: 'translateY(0%)' }
        ], {
            duration: 200
        }
    ) 
    switch (type) {
        case 'error':
            info.classList.remove('info-info')
            info.classList.add('info-error')
            info.classList.remove('info-waring')
            info.classList.remove('info-ok')
            closeIcon.classList.remove('close-icon-info')
            closeIcon.classList.add('close-icon-error')
            closeIcon.classList.remove('close-icon-warning')
            closeIcon.classList.remove('close-icon-ok')
            message.innerHTML="<b>Error</b>: "+msg
            break;
        case 'warning':
            info.classList.remove('info-info')
            info.classList.remove('info-error')
            info.classList.add('info-warning')
            info.classList.remove('info-ok')
            closeIcon.classList.remove('close-icon-info')
            closeIcon.classList.remove('close-icon-error')
            closeIcon.classList.add('close-icon-warning')
            closeIcon.classList.remove('close-icon-ok')
            message.innerHTML="<b>Warning</b>: "+msg
            break;
        case 'ok':
            info.classList.remove('info-info')
            info.classList.remove('info-error')
            info.classList.remove('info-waring')
            info.classList.add('info-ok')
            closeIcon.classList.remove('close-icon-info')
            closeIcon.classList.remove('close-icon-error')
            closeIcon.classList.remove('close-icon-warning')
            closeIcon.classList.add('close-icon-ok')
            message.innerHTML="<b>Success</b>: "+msg
            break;
        default:
            info.classList.add('info-info')
            info.classList.remove('info-error')
            info.classList.remove('info-waring')
            info.classList.remove('info-ok')
            closeIcon.classList.remove('close-icon-error')
            closeIcon.classList.remove('close-icon-warning')
            closeIcon.classList.remove('close-icon-ok')
            closeIcon.classList.add('close-icon-info')
            message.innerHTML="<b>Info</b>: "+msg
            break;
    }
}

function hideMyAlert(){
    info.classList.add('display-none')
}