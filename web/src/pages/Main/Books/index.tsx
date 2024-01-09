import { observer } from 'mobx-react-lite'
import { useCallback, useEffect } from 'react'
import BookContent from './table'
import { viewmodel } from 'model'
import { Button, Space, Upload, UploadProps, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { read, utils, writeFile } from 'xlsx'
import { useState } from 'react'
import { isEmpty, isNull, uniqueId } from 'lodash'

interface President {
  中图分类: string
  书名: string
  作者: string
  出版社: string
  印刷时间: string
  图书编号: number
  定价: number
  库位: string
  库存: number
  开本: string
  折扣: number
  条码: number
  读者对象: string
}

export const Books = observer(() => {
  const [pres, setPres] = useState<President[]>([])
  const [file, setFile] = useState<any>(null)
  const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text'
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (e) => {
          if (e.target == null) return
          const arrayBuffer = e.target.result
          console.log('ArrayBuffer:', arrayBuffer)
          setFile(arrayBuffer)

          // 在这里可以执行其他操作，使用 arrayBuffer

          // 如果有异步操作，确保在异步操作完成后调用 resolve
          resolve()
        }

        reader.onerror = (error) => {
          console.error('Error reading file:', error)
          reject()
        }

        reader.readAsArrayBuffer(file)
      })
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        console.log(info)
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
  /* the component state is an array of objects */

  /* Fetch and update the state once */
  useEffect(() => {
    console.log(file)

    if (isNull(file)) return
    console.log('DS')

    const wb = read(file)

    /* generate array of presidents from the first worksheet */
    const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet
    console.log(ws)

    const data: President[] = utils.sheet_to_json<President>(ws, { header: 1 }) // generate objects
    console.log(data)

    /* update state */
    setPres(data) // update state
    data[0]
  }, [file])
  /* get state data and export to XLSX */
  const exportFile = useCallback(() => {
    /* generate worksheet from state */
    const ws = utils.json_to_sheet(pres)
    /* create workbook and append worksheet */
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Data')
    /* export to XLSX */
    writeFile(wb, 'SheetJSReactAoO.xlsx')
  }, [pres])
  return (
    <div className="">
      <Space>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Button onClick={exportFile}>导出</Button>
        <Button
          onClick={() => {
            viewmodel.booksModel.upload({}).then((r) => {
              console.log(r)
            })
          }}
        >
          新增
        </Button>
      </Space>
      <table>
        {/* The `thead` section includes the table header row */}
        <thead>
          <tr>
            <th>中图分类</th>
            <th>书名</th>
            <th>作者</th>
            <th>出版社</th>
          </tr>
        </thead>
        {/* The `tbody` section includes the data rows */}
        <tbody>
          {/* generate row (TR) for each president */}
          {pres.map((row) => (
            <tr key={uniqueId()}>
              {/* Generate cell (TD) for name / index */}
              <td>{row.中图分类}</td>
              <td>{row.书名}</td>
              <td>{row.作者}</td>
              <td>{row.出版社}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BookContent />
      {/* <BookContent /> */}
      {/* <BookContent /> */}
    </div>
  )
})
