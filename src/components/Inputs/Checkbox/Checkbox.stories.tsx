import React, { useState } from 'react'
import { Box } from '../../Box/Box'
import { Button } from '../../Button/Button'
import { Text } from '../../Text/Text'
import { Form, SerializedFormEvent } from '../Form'
import { OnChangeFunction } from '../MoraInput'
import { Checkbox } from './Checkbox'

export default {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/o2XarByGc3Ba58PpOk3mYm/Libreria-de-UI?node-id=8%3A13'
    }
  },
  decorators: [
    (Story: any) => (
      <Box py={6} container containerSize='s' direction='column' flex space={3}>
        <Story />
      </Box>
    )
  ]
}

export const Index = () => {
  return (
    <>
      <Checkbox label='Option A' />
      <Checkbox label='Option B' />
      <Checkbox label='Option C' />
      <Text>Selected: TEST</Text>
    </>
  )
}

export const Controlled = () => {
  const [checked, setChecked] = useState({
    A: true,
    B: false,
    C: false
  })
  const handleChange: OnChangeFunction = ({ e }) => {
    console.log(e.target.name)
    console.log(e.target.checked)

    setChecked({ ...checked, [e.target.name]: e.target.checked })
  }
  return (
    <>
      <Checkbox
        name='A'
        label='Option A'
        checked={checked.A}
        onChange={handleChange}
      />
      <Checkbox
        name='B'
        label='Option B'
        checked={checked.B}
        onChange={handleChange}
      />
      <Checkbox
        name='C'
        label='Option C'
        checked={checked.C}
        onChange={handleChange}
      />
      <Text>Selected: TEST</Text>
    </>
  )
}

export const OnForm = () => {
  const Component = () => {
    const [formResult, setFormResult] = useState<string>('')
    interface FormData {
      options: string[]
    }
    const handleSubmit: SerializedFormEvent<FormData> = ({ values }) => {
      // form event is prevented by default
      console.log(values)
      // debug
      setFormResult(JSON.stringify(values))
    }
    return (
      <Form serialize onSubmit={handleSubmit} hash>
        <Box flex direction='column' space={4}>
          <Checkbox name='options[]' value='A' label='Option A' />
          <Checkbox name='options[]' value='B' label='Option B' />
          <Checkbox name='options[]' value='C' label='Option C' />
          <Button span={2} label='Submit' type='submit' />
          <Text>Form result: {formResult}</Text>
        </Box>
      </Form>
    )
  }
  return <Component />
}
