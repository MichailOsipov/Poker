import * as React from 'react';
import styled from 'styled-components'

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

export const MainView = ({originalLanguage, languages, originalText, translationLanguage, translatedText, onFieldChange}) => (
  <Container>
    <TitleText>Translator</TitleText>
    <Block>
      <Wrapper>
        <Select value={originalLanguage} onChange={(e) => onFieldChange('originalLanguage', e.currentTarget.value)}>
          {Object.keys(languages).map(key =>
            <option key={key} value={key}>{languages[key]}</option>
          )}
        </Select>
        <Textarea
          placeholder="Введите текст"
          value={originalText}
          onChange={(e) => onFieldChange('originalText', e.currentTarget.value)}
        />
      </Wrapper>
      <Wrapper>
        <Select value={translationLanguage} onChange={(e) => onFieldChange('translationLanguage', e.currentTarget.value)}>
          {Object.keys(languages).map(key =>
            <option key={key} value={key}>{languages[key]}</option>
          )}
        </Select>
        <Textarea placeholder="Перевод" value={translatedText} readOnly/>
      </Wrapper>
    </Block>
  </Container>
)
