import React, { useState } from 'react'

import { Box } from '../Box/Box'
import { CircleButton } from '../CircleButton/CircleButton'
import { Text } from '../Text/Text'
import {
  StyledAccContent,
  StyledAccHeader,
  StyledAccordion
} from './AccordionStyles'
import {
  AccContentProps,
  AccHeaderProps,
  AccordionProps
} from './AccordionTypes'

export const Accordion: React.FC<AccordionProps> = ({
  onChange,
  expanded,
  unmountOnExit = false,
  children,
  title,
  px = 4,
  headerOptions,
  noControl,
  defaultExpanded,
  ...props
}) => {
  const startExpanded = defaultExpanded || false
  const controlled = typeof expanded !== 'undefined'
  const [isExpanded, setIsExpanded] = useState<boolean>(
    typeof expanded !== 'undefined' ? expanded : startExpanded
  )

  const handleChange = (e: React.SyntheticEvent) => {
    if (controlled) {
      // Controlled component
      if (typeof onChange === 'function') {
        onChange(e, !expanded)
      }
    } else {
      // No controlled component
      setIsExpanded(!isExpanded)
    }
  }

  const accordionExpanded: boolean =
    typeof expanded !== 'undefined' ? expanded : isExpanded

  const componentChildren =
    !accordionExpanded && unmountOnExit ? undefined : children

  return (
    <StyledAccordion {...props} px={px}>
      <AccHeader
        onToggle={noControl ? undefined : handleChange}
        expanded={accordionExpanded}
        title={title}
        headerOptions={headerOptions}
        py={2}
        noControl={noControl}
      />
      <AccContent expanded={accordionExpanded}>{componentChildren}</AccContent>
    </StyledAccordion>
  )
}

const AccHeader: React.FC<AccHeaderProps> = ({
  title,
  expanded,
  onToggle,
  headerOptions,
  children,
  noControl,
  ...props
}) => {
  const hasHeaderOptions = typeof headerOptions !== 'undefined'
  return (
    <StyledAccHeader
      onClick={!hasHeaderOptions ? onToggle : undefined}
      flex
      align='center'
      justify='space-between'
      space={4}
      noControl={noControl}
      {...props}
    >
      {children}
      {title && (
        <Text sx={{ userSelect: 'none' }} mb={0} variant='h6'>
          {title}
        </Text>
      )}
      {!noControl && (
        <Box flex align='center'>
          <CircleButton>
            <Box
              sx={{
                transform: `rotate(${expanded ? 180 : 0}deg)`,
                transition: 'transform 0.2s ease'
              }}
            >
              ▼
            </Box>
          </CircleButton>
        </Box>
      )}
    </StyledAccHeader>
  )
}

const AccContent: React.FC<AccContentProps> = ({
  expanded,
  children,
  ...props
}) => {
  return (
    <StyledAccContent expanded={expanded} {...props}>
      <Box pb={4}>{children}</Box>
    </StyledAccContent>
  )
}
