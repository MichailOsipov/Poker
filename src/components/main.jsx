import * as React from 'react';
import {connect} from 'react-redux';
import {MainView} from './main-view'
import { setOriginalLanguage, setTranslationLanguage, getTranslatedText, getLanguages, translate, getTextLanguage, setOriginalText } from '../store/actions';

class MainPageComp extends React.Component {
  componentDidMount() {
    this.props.getLanguages();
  }

  onFieldChange = (field, value) => {
    let newOriginalLanguage = this.props.originalLanguage;
    let newOriginalText = this.props.originalText;
    let newTranslationLanguage = this.props.translationLanguage;

    switch(field) {
      case 'originalLanguage':
        newOriginalLanguage = value;
        this.props.setOriginalLanguage(value)
        break
      case 'originalText':
        newOriginalText = value;
        this.props.setOriginalText(value)
        break
      case 'translationLanguage':
        newTranslationLanguage = value;
        this.props.setTranslationLanguage(value)
        break
    }

    if (!newOriginalLanguage) {
      this.props.getTextLanguage(newOriginalText);
    } else if (newOriginalText) {
      this.props.getTranslatedText(newOriginalText, newOriginalLanguage, newTranslationLanguage);
    }
  }

  render() {
    const {originalLanguage, translationLanguage, languages, originalText, translatedText} = this.props;
    return (
      <MainView
        onFieldChange={this.onFieldChange}
        originalLanguage={originalLanguage}
        translationLanguage={translationLanguage}
        languages={languages}
        originalText={originalText}
        translatedText={translatedText}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    languages: state.languages,
    originalLanguage: state.originalLanguage,
    translationLanguage: state.translationLanguage,
    originalText: state.originalText,
    translatedText: state.translatedText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOriginalLanguage: (language) => dispatch(setOriginalLanguage(language)),
    setTranslationLanguage: (language) => dispatch(setTranslationLanguage(language)),
    setOriginalText: (text) => dispatch(setOriginalText(text)),
    getLanguages: () => dispatch(getLanguages()),
    getTranslatedText: (originalText, originalLanguage, translationLanguage) => dispatch(getTranslatedText(originalText, originalLanguage, translationLanguage)),
    getTextLanguage: (text) => dispatch(getTextLanguage(text))
  }
}

const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageComp)

export default MainPage
