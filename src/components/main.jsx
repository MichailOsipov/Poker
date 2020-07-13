import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {MainView} from './main-view'
import {getLanguages, setOriginalLanguage, setOriginalText, setTranslationLanguage, getTextLanguage, getTranslatedText} from '../store/actions'

export const MainPage = () => {
  const languages = useSelector(state => state.languages);
  const originalLanguage = useSelector(state => state.originalLanguage);
  const translationLanguage = useSelector(state => state.translationLanguage);
  const originalText = useSelector(state => state.originalText);
  const translatedText = useSelector(state => state.translatedText);
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getLanguages());
  }, [])

  const onModalClick = (agree, possibleLanguage = '') => {
    if (agree) {
      dispatch(setOriginalLanguage(possibleLanguage));
      onFieldChange('originalLanguage', possibleLanguage);
    }
    setShowModal(false);
  }

  const handlePossibleLanguage = async (newOriginalText) => {
    await dispatch(getTextLanguage(newOriginalText));
    setShowModal(true);

  }

  const onFieldChange = (field, value) => {

    let newOriginalText = originalText;
    let newOriginalLanguage = originalLanguage;
    let newTranslationLanguage = translationLanguage;

    switch(field) {
      case 'originalLanguage':
        newOriginalLanguage = value;
        dispatch(setOriginalLanguage(value));
        break
      case 'originalText':
        newOriginalText = value;
        dispatch(setOriginalText(value));
        break
      case 'translationLanguage':
        newTranslationLanguage = value;
        dispatch(setTranslationLanguage(value));
        break
    }

    if (!newOriginalLanguage) {
      handlePossibleLanguage(newOriginalText);
    } else if (newOriginalText) {
      dispatch(getTranslatedText(newOriginalText, newOriginalLanguage, newTranslationLanguage));
    }
  }

  return (
    <MainView
      onFieldChange={onFieldChange}
      originalLanguage={originalLanguage}
      translationLanguage={translationLanguage}
      languages={languages}
      originalText={originalText}
      translatedText={translatedText}
      onModalClick={onModalClick}
      showModal={showModal}
    />
  )
}
