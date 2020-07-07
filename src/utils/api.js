export const getLanguages = async () => {
  const language = 'ru';
  const key = 'trnsl.1.1.20170527T103722Z.e029d2e911e534e8.4ac60c7700c1be3c525e6d80829748ba4783715f';

  const myHeaders = new Headers();
  myHeaders.append('Host', 'translate.yandex.net');
  myHeaders.append('Accept', '*/*');
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  const fetchParams = {
    method: 'POST',
    headers: myHeaders
  };

  const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=${language}&key=${key}`, fetchParams);
  const info = await response.json();
  return (info.langs);

}

export const translate = async (originalText, originalLanguage, translationLanguage) => {
  const lang = `${originalLanguage}-${translationLanguage}`;
  const key = 'trnsl.1.1.20170527T103722Z.e029d2e911e534e8.4ac60c7700c1be3c525e6d80829748ba4783715f';
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
  const info = await response.json();
  return(info.text);
}

export const getTextLanguage = async(text) => {
  const key = 'trnsl.1.1.20170527T103722Z.e029d2e911e534e8.4ac60c7700c1be3c525e6d80829748ba4783715f';
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
  const info = await response.json()
  return(info.lang);
}
