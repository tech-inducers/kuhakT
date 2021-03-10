import { useEffect } from 'react'

interface Props<T> {
  onChange: (value: T, formikProps: any) => void
  value: T
  formikprops: any
}

export function FormikObserver<T>(props: Props<T>) {
  useEffect(() => {
    props.onChange(props.value, props.formikprops)
    // eslint-disable-next-line
  }, [Object.values(props.value).join(', ')])
  return null
}

FormikObserver.defaultProps = {
  onChange: () => null,
}