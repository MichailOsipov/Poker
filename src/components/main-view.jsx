import React from 'react';
import {useSelector} from 'react-redux';

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

const Modal = styled.div`
  display: flex;
  align-items: baseline;
  width: 400px;
  height: 100px;
  position: absolute;
  z-index: 1;
  left: 100px;
  top: 50px;
  background-color: #fff;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;
`

const Button = styled.button`
  width: auto;
  margin: 15px;
  padding: 5px 10px;
`

export const MainView = ({onFieldChange, originalLanguage, translationLanguage, languages, originalText, translatedText, showModal, onModalClick}) => {
  const possibleLanguage = useSelector(state => state.possibleLanguage);
  const possibleLanguageName = languages[Object.keys(languages).find(key => key === possibleLanguage)];

  return (
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
      {showModal &&
        <Modal>
          <div>{`Ваш язык ${possibleLanguageName}?`}</div>
          <div>
            <Button onClick={() => {onModalClick(true, possibleLanguage)}}>Да</Button>
            <Button onClick={() => {onModalClick(false)}}>Нет, я выберу сам</Button>
          </div>
        </Modal>
      }
    </Container>
  )
}
