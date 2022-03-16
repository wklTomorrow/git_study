import {useRef} from 'react'
function useFormChange() {
    const formData = useRef({})
    const [, forceUpdate] = useState(null);
    const handleForm = useMemo(() => {
        const setFormItem = (keys, value) => {
            const form = formData.current
            form[keys] = value
            forceUpdate()
        }

        const resetFormItem = () => {
            const form = formData.current
            for (let i in form) {
                form[i] = null
            }
            forceUpdate()
        }
    }, [])
    return [formData.current, ...handleForm]
}

export default useFormChange