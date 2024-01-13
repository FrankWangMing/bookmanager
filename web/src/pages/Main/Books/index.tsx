import { observer } from 'mobx-react-lite'
import { useCallback, useEffect } from 'react'
import BookContent, { DataType } from './table'
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
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [data, setData] = useState<DataType[]>([])
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className="">
      <Space className="mb-3">
        <Button
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          上传
        </Button>
      </Space>
      <BookContent />
      <Drawer
        title={'上传图书'}
        placement="right"
        onClose={handleCancel}
        open={isModalOpen}
        size={'large'}
        width={1800}
      >
        <UploadDrawer></UploadDrawer>
      </Drawer>
    </div>
  )
})
