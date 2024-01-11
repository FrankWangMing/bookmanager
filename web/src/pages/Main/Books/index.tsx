import { observer } from 'mobx-react-lite'
import { useCallback, useEffect } from 'react'
import BookContent from './table'
import { viewmodel } from 'model'
import {
  Button,
  Drawer,
  Modal,
  Space,
  Upload,
  UploadProps,
  message
} from 'antd'
import { read, utils, writeFile } from 'xlsx'
import { useState } from 'react'
import { isEmpty, isNull, uniqueId } from 'lodash'
import UploadDrawer, { President } from './Upload'

export const Books = observer(() => {
  const [pres, setPres] = useState<President[]>([])

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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOk = () => {}
  const handleCancel = () => {}
  return (
    <div className="">
      <Space>
        <Button
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          上传
        </Button>
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
      <Drawer
        title={'上传图书'}
        placement="right"
        onClose={handleCancel}
        open={isModalOpen}
        size={'large'}
        width={1800}
        // onOk={handleOk}
        // onCancel={handleCancel}
      >
        <UploadDrawer></UploadDrawer>
      </Drawer>
    </div>
  )
})
