import {
  FETCH_LANGUAGES,
  SET_ORIGINAL_LANGUAGE,
  SET_TRANSLATION_LANGUAGE,
  SET_ORIGINAL_TEXT,
  SET_TRANSLATED_TEXT,
  SET_POSSIBLE_LANGUAGE
} from './actions'

const initialState = {
  languages: {},
  originalLanguage: '',
  translationLanguage: 'en',
  originalText: '',
  translatedText: '',
  possibleLanguage: ''
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LANGUAGES:
      return {
        ...state,
        languages: action.payload
      }
    case SET_ORIGINAL_LANGUAGE:
      return {
        ...state,
        originalLanguage: action.payload
      }
    case SET_TRANSLATION_LANGUAGE:
      return {
        ...state,
        translationLanguage: action.payload
      }
    case SET_ORIGINAL_TEXT:
      return {
        ...state,
        originalText: action.payload
      }
    case SET_TRANSLATED_TEXT:
      return {
        ...state,
        translatedText: action.payload
      }
    case SET_POSSIBLE_LANGUAGE:
      return {
        ...state,
        possibleLanguage: action.payload
      }
    default:
      return state;
  }
}
