import { debounce } from 'lodash'
import {fetchLanguages, translate, fetchLanguage} from './api'

export const FETCH_LANGUAGES = 'FETCH_LANGUAGES';
export const SET_ORIGINAL_LANGUAGE = 'SET_ORIGINAL_LANGUAGE';
export const SET_TRANSLATION_LANGUAGE = 'SET_TRANSLATION_LANGUAGE ';
export const SET_ORIGINAL_TEXT = 'SET_ORIGINAL_TEXT';
export const SET_TRANSLATED_TEXT = 'SET_TRANSLATED_TEXT';
export const SET_POSSIBLE_LANGUAGE = 'SET_POSSIBLE_LANGUAGE';

export const setOriginalLanguage = (language) => (
 {
    type: SET_ORIGINAL_LANGUAGE,
    payload: language
  }
)

export const setTranslationLanguage = (language) => (
  {
    type: SET_TRANSLATION_LANGUAGE,
    payload: language
  }
)

export const setOriginalText = (text) => (
  {
    type: SET_ORIGINAL_TEXT,
    payload: text
  }
)

export const getLanguages = () => async (dispatch) => {
  try {
    const info = await fetchLanguages();
    dispatch({ type: FETCH_LANGUAGES, payload: info.langs });
  }
  catch (error) {
    console.log(error)
  }
}

export const getTranslatedText = (originalText, originalLanguage, translationLanguage) => debounce(async (dispatch) => {
  try {
    const info = await translate(originalText, originalLanguage, translationLanguage);
    dispatch({ type: SET_TRANSLATED_TEXT, payload: info.text[0] });
  }
  catch(error) {
    console.log(error)
  }
}, 400)

export const getTextLanguage = (text) => async (dispatch) => {
  try {
    const info = await fetchLanguage(text);
    dispatch({ type: SET_POSSIBLE_LANGUAGE, payload: info.lang })
  }
  catch(error) {
    console.log(error)
  }
}
