type RFSMethodName =
  | 'webkitRequestFullScreen'
  | 'requestFullscreen'
  | 'msRequestFullscreen'
  | 'mozRequestFullScreen';
type EFSMethodName =
  | 'webkitExitFullscreen'
  | 'msExitFullscreen'
  | 'mozCancelFullScreen'
  | 'exitFullscreen';
type FSEPropName =
  | 'webkitFullscreenElement'
  | 'msFullscreenElement'
  | 'mozFullScreenElement'
  | 'fullscreenElement';

export function useFullscreen(
  target: HTMLElement = document.documentElement,
  options?: FullscreenOptions
) {
  let isFullscreenRef = false;
  const el = document.documentElement;
  let RFC_METHOD_NAME: RFSMethodName = 'requestFullscreen';
  let EFS_METHOD_NAME: EFSMethodName = 'exitFullscreen';
  let FSE_PROP_NAME: FSEPropName = 'fullscreenElement';

  if ('webkitRequestFullScreen' in el) {
    RFC_METHOD_NAME = 'webkitRequestFullScreen';
    EFS_METHOD_NAME = 'webkitExitFullscreen';
    FSE_PROP_NAME = 'webkitFullscreenElement';
  } else if ('msRequestFullscreen' in el) {
    RFC_METHOD_NAME = 'msRequestFullscreen';
    EFS_METHOD_NAME = 'msExitFullscreen';
    FSE_PROP_NAME = 'msFullscreenElement';
  } else if ('mozRequestFullScreen' in el) {
    RFC_METHOD_NAME = 'mozRequestFullScreen';
    EFS_METHOD_NAME = 'mozCancelFullScreen';
    FSE_PROP_NAME = 'mozFullScreenElement';
  } else if (!('requestFullscreen' in el)) {
    throw new Error('当前浏览器不支持Fullscreen API !');
  }
  function enterFullscreen(): Promise<void> {
    isFullscreenRef = true;
    return (target as any)[RFC_METHOD_NAME](options);
  }

  function exitFullscreen(): Promise<void> {
    isFullscreenRef = false;
    return (document as any)[EFS_METHOD_NAME]();
  }

  function isFullscreen(): boolean {
    return target === (document as any)[FSE_PROP_NAME];
  }

  async function toggleFullscreen(): Promise<void> {
    if (!target) return;
    return isFullscreen() ? exitFullscreen() : enterFullscreen();
  }

  return {
    toggleFullscreen,
    exitFullscreen,
    isFullscreen,
    enterFullscreen,
    isFullscreenRef,
  };
}

export const loadIconfontStyle = (url: string) => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

export function downloadUtl(res: any) {
  const fileLink = document.createElement("a");
  fileLink.style.display = "none";
  fileLink.href = res.request.responseURL;
  document.body.appendChild(fileLink);
  fileLink.click();
  document.body.removeChild(fileLink);
}

export function loadscript(url: string) {
  const script = document.createElement("script");
  script.type = "text/javacript";
  script.src = url;
  document.body.appendChild(script);
}

export function setLocalStorageValue(key: string, value: string) {
  localStorage.setItem(key, value);
}


export function getLocalStorageValue(key: string) {
  return localStorage.getItem(key);
}

export function removeStorageValue(key: string) {
  localStorage.removeItem(key);
}