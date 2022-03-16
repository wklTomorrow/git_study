import react, { useEffect, useMemo, useRef, useState } from 'react'

function useTableRequest(query, api) {
    const firstQuest = useRef(false)
    const [tableData, setTableData] = useState({
        list: [],
        total: 0,
        page: 1,
        pageSize: 10
    })

    const [pageOption, setPageOptions] = useState({
        page: 1,
        pageSize: 10
    })
    
    const getList = useMemo((() => {
        return async payload => {
            if (!api) return
            const data = await api(payload || {...query, ...pageOption})
            if (data.code === 0) {
                setTableData(data.data)
                firstQuest.current = true
            }
        }
    }, []))

    useEffect(() => {
        firstQuest.current && getList({
            ...query,
            ...pageOption
        })
    }, [pageOption])

    useEffect(() => {
        getList({
            ...query,
            ...pageOption,
            page: 1
        })
    }, [query])

    const handleChange = useMemo(() => option => setPageOptions({...option}), [])

    return [tableData, handleChange, getList]
}

export default useTableRequest
