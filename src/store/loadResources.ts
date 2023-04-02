export function loadResources (
  urls: string[],
  onProgress: (progress: number) => void,
  onComplete: (blobs: Record<string, string>) => void
) {
  const queue = urls.slice();
  const blobs: Record<string, string> = { };
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  let loadingIndex = 0;
  const loadingLength = queue.length;

  const load = (url: string) => {
    xhr.open('GET', url, true);

    xhr.onprogress = evt => {
      const loaded = evt.loaded / evt.total;
      const progress = (loadingIndex + loaded) / loadingLength;
      onProgress(progress);
    };

    xhr.onload = () => {
      // TODO: сделать когда-нибудь обработку ошибок загрузки
      if (xhr.status !== 200)
        return;
      loadingIndex++;
      onProgress(loadingIndex / loadingLength);

      const blob = xhr.response;
      blobs[url] = URL.createObjectURL(blob);

      const nextUrl = queue.shift();
      if (nextUrl)
        load(nextUrl);
      else
        onComplete(blobs);
    };

    xhr.send();
  };

  const url = queue.shift();
  if (url)
    load(url);
}
