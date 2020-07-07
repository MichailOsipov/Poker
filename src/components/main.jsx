import * as React from 'react';
import { debounce } from 'lodash';
import { getLanguages, translate, getTextLanguage } from '../utils/api'
import { MainView } from './main-view'

export class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      languages: {},
      originalLanguage: '',
      translationLanguage: 'en',
      originalText: '',
      translatedText: ''
    }
  }

  async componentDidMount() {
    const languages = await getLanguages();
    this.setState({languages});
  }

  getLanguage = async (text) => {
    const originalLanguage = await getTextLanguage(text);
    this.setState({originalLanguage})
  }

  translateText = debounce( async (originalText, originalLanguage, translationLanguage) => {
    const translatedText = await translate(originalText, originalLanguage, translationLanguage);
    this.setState({translatedText})
  }, 400)

  onFieldChange = (field, value) => {
    const newState = this.state;
    newState[field] = value;

    if (!newState.originalLanguage) {
      this.getLanguage(newState.originalText);
    } else if (newState.originalText) {
      this.translateText(newState.originalText, newState.originalLanguage, newState.translationLanguage);
    }
    this.setState({newState});
  }

  render() {
    return (
      <MainView
        onFieldChange={this.onFieldChange}
        originalLanguage={this.state.originalLanguage}
        originalText={this.state.originalText}
        translationLanguage={this.state.translationLanguage}
        translatedText={this.state.translatedText}
        languages={this.state.languages}
      />
    )
  }
}
