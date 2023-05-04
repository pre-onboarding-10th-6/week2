import React, { Dispatch, SetStateAction } from 'react'
import { BiSearch } from 'react-icons/bi'
import styled from 'styled-components'

import { color } from '../assets/colors'
import { useScrollToSelected } from '../hooks/useScrollToSelected'
import { IDisease } from '../types/disease'

interface IProps {
  suggestList: IDisease[]
  selectedIdx: number
  setSelectedIdx: Dispatch<SetStateAction<number>>
}

const SuggestSearchList = ({
  suggestList,
  selectedIdx,
  setSelectedIdx
}: IProps) => {
  const suggestListRef = useScrollToSelected(selectedIdx)

  const renderList = () => {
    if (suggestList?.length === 0) {
      return <StLi>검색어 없음</StLi>
    }
    return (
      <>
        {suggestList.map((item, idx) => {
          return (
            <StLi
              key={item.id}
              onMouseEnter={() => setSelectedIdx(idx)}
              onMouseLeave={() => setSelectedIdx(-1)}
              isActive={selectedIdx === idx}
            >
              <BiSearch size={12} />
              <span>{item.name}</span>
            </StLi>
          )
        })}
      </>
    )
  }
  return (
    <StSuggestListContainer>
      <StSearch>추천검색어</StSearch>
      <StSuggestList ref={suggestListRef}>
        {suggestList && renderList()}
      </StSuggestList>
    </StSuggestListContainer>
  )
}

export default SuggestSearchList

const StSuggestListContainer = styled.div`
  text-align: left;
  width: 360px;
  background-color: ${color.WHITE};
  border-radius: 10px;
  padding: 16px 0;
  overflow: hidden;
`
const StSearch = styled.p`
  padding: 4px 16px;
`
const StSuggestList = styled.ul`
  overflow-y: scroll;
  max-height: 200px;
  svg {
    margin-right: 8px;
  }
`

interface IStLiProps {
  readonly isActive?: boolean
}
const StLi = styled.li<IStLiProps>`
  padding: 4px 16px;
  font-size: 0.8rem;
  background-color: ${props => (props.isActive ? color.HOVER : 'none')};
`