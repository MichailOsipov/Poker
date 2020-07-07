import * as React from 'react';
import styled from 'styled-components'
import { getLanguages, translate, getTextLanguage } from '../utils/api'

const Container = styled.div`
  padding: 0 20px;
`

const Block = styled.div`
  display: flex;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding-right: 20px;
`

const Select = styled.select`
  border: none;
  height: 20px;
  margin-bottom: 10px;
  appearance: none;
`

const Textarea = styled.textarea`
  border-color: grey;
  border-radius: 10px;
  padding: 5px;
  min-height: 100px;
`

const TitleText = styled.h1`
  font-size: 30px;
  color: grey;
`

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

  async onFieldChange(field, value) {
    await this.setState({[field]: value});

    if (!this.state.originalLanguage) {
      const originalLanguage = await getTextLanguage(this.state.originalText);
      this.setState({originalLanguage})
    }

    const translatedText = await translate(this.state.originalText, this.state.originalLanguage, this.state.translationLanguage);
    this.setState({translatedText})
  }

  render() {
    return (
      <Container>
        <TitleText>Translator</TitleText>
        <Block>
          <Wrapper>
            <Select value={this.state.originalLanguage} onChange={(e) => this.onFieldChange('originalLanguage', e.currentTarget.value)}>
              {Object.keys(this.state.languages).map(key =>
                <option key={key} value={key}>{this.state.languages[key]}</option>
              )}
            </Select>
            <Textarea
              placeholder="Введите текст"
              value={this.state.originalText}
              onChange={(e) => this.onFieldChange('originalText', e.currentTarget.value)}
            />
          </Wrapper>
          <Wrapper>
            <Select value={this.state.translationLanguage} onChange={(e) => this.onFieldChange('translationLanguage', e.currentTarget.value)}>
              {Object.keys(this.state.languages).map(key =>
                <option key={key} value={key}>{this.state.languages[key]}</option>
              )}
            </Select>
            <Textarea placeholder="Перевод" value={this.state.translatedText} readOnly/>
          </Wrapper>
        </Block>
      </Container>
    )
  }
}
