const key = 'trnsl.1.1.20170527T103722Z.e029d2e911e534e8.4ac60c7700c1be3c525e6d80829748ba4783715f';

export const fetchLanguages = async () => {
  const language = 'ru';
  const myHeaders = new Headers();
  myHeaders.append('Host', 'translate.yandex.net');
  myHeaders.append('Accept', '*/*');
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  const fetchParams = {
    method: 'POST',
    headers: myHeaders
  };

  const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=${language}&key=${key}`, fetchParams);
  const info = response.json();
  return info;
}

export const translate = async (originalText, originalLanguage, translationLanguage) => {
  const lang = `${originalLanguage}-${translationLanguage}`;
  const myHeaders = new Headers();
  myHeaders.append('Host', 'translate.yandex.net');
  myHeaders.append('Accept', '*/*');
  myHeaders.append('Content-Length', '17');
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  const fetchParams = {
    method: 'POST',
    headers: myHeaders
  };

  const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?text=${originalText}&lang=${lang}&key=${key}`, fetchParams);
  const info = response.json();
  return info;
}

export const fetchLanguage = async (text) => {
  const myHeaders = new Headers();
  myHeaders.append('Host', 'translate.yandex.net');
  myHeaders.append('Accept', '*/*');
  myHeaders.append('Content-Length', '17');
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  const fetchParams = {
    method: 'POST',
    headers: myHeaders
  };

  const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/detect?text=${text}&key=${key}`, fetchParams);
  const info = response.json();
  return info;
}
