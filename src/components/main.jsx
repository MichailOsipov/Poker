import * as React from 'react';
import {connect} from 'react-redux';
import {MainView} from './main-view'
import { setOriginalLanguage, setTranslationLanguage, getTranslatedText, getLanguages, translate, getTextLanguage, setOriginalText } from '../store/actions';

class MainPageComp extends React.Component {
  componentDidMount() {
    this.props.getLanguages();
  }

  setFieldValue = (field, value) => {
    switch(field) {
      case 'originalLanguage':
        this.props.setOriginalLanguage(value)
        break
      case 'originalText':
        this.props.setOriginalText(value)
        break
      case 'translationLanguage':
        this.props.setTranslationLanguage(value)
        break
    }
  }

  onFieldChange = async (field, value) => {
    await this.setFieldValue(field, value);

    if (!this.props.originalLanguage) {
      this.props.getTextLanguage(this.props.originalText);
    } else if (this.props.originalText) {
      this.props.getTranslatedText(this.props.originalText, this.props.originalLanguage, this.props.translationLanguage);
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
