import styled, { css, DefaultTheme } from 'styled-components'
import { cssCreateStyles, cssGetSize, getSize } from '../../utils'
import { cssUseBackground } from '../../utils/colors/getBackground'
import { spacerMargin, spacerPadding } from '../../utils/spacer'
import {
  BoxWrapperProps,
  containerMaxSizesInterface,
  ContainerProps
} from './BoxTypes'
/**
 * Sizes for containers in rems
 */
const maxSizes: containerMaxSizesInterface = {
  max: '100%',
  xl: 250,
  l: 200,
  m: 150,
  s: 100
}

const getContainerMaxWidth = (size?: ContainerProps['size']): number | string =>
  typeof size === 'number' ? size : maxSizes[size ?? 'l']

export const buildContainer = ({ size, padding }: ContainerProps) => css`
  max-width: ${cssGetSize(getContainerMaxWidth(size))};
  ${padding &&
  css`
    padding-left: ${({ theme }) => theme.layout.colGap}rem;
    padding-right: ${({ theme }) => theme.layout.colGap}rem;
  `}
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
`

const buildInnerSpace = (space: string, direction: string) => {
  switch (direction) {
    case 'row':
      return `margin-right: ${space};`
    case 'column':
      return `margin-bottom: ${space};`
    default:
      return `margin-right: ${space};`
  }
}

const addProp = (propName: string, value: any) =>
  value &&
  `
	${propName}: ${value};
`

const flexBox = css<BoxWrapperProps>`
  display: flex;
  flex-wrap: ${({ noWrap }) => (noWrap ? 'nowrap' : 'wrap')};
  flex-direction: ${(props) => props.direction || 'row'};
`
const getColCount = (colCount: number | boolean, theme: DefaultTheme) =>
  (colCount !== true && colCount) || theme.layout.colCount

export const BoxWrapper = styled.div<BoxWrapperProps>`
  ${spacerMargin}
  ${spacerPadding}
	${({ flex }) => flex && flexBox}
	${({ align }) => addProp('align-items', align)}
	${({ justify }) => addProp('justify-content', justify)}
	${({ space, direction = 'row', theme }) =>
    space &&
    `
      & > *:not(:last-child) {
        ${buildInnerSpace(getSize(space, theme), direction)}
      }
    `}
	${({ colCount, theme }) =>
    colCount &&
    `
		display: grid;
		grid-template-columns: repeat(${getColCount(colCount, theme)}, 1fr);
		grid-gap: ${theme.layout.colGap + 'rem'};
	`}
	${({ span }) => !!span && `grid-column:span ${span};`}
	${({ container, containerSize }) =>
    container && buildContainer({ size: containerSize || 'l', padding: true })}
	${({ grow }) =>
    grow !== undefined &&
    `
			flex-grow: ${grow ? 1 : 0};
		`}
  ${cssUseBackground}
  ${cssCreateStyles}
`
