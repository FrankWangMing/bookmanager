import { Tabs, UploadProps, message, Button, Upload, Select } from 'antd'
import { entries, fromPairs, isNull, map, uniqueId } from 'lodash'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { read, utils } from 'xlsx'
import { UploadOutlined } from '@ant-design/icons'
import UploadTable from './UploadTable'
import { RcFile } from 'antd/es/upload'
import { viewmodel } from 'model'

export interface President {
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

export default observer(() => {
  const [tabItems, setTabItems] = useState<any>([])
  const [booksdata, setBooksData] = useState<Map<string, any[]>>(new Map())
  const [activeKey, setActiveKey] = useState<string>('')
  const [supplierCode, setSupplierCode] = useState<string>(
    viewmodel.supplierModel.supplierList[0]?.code
  )
  const onChange = (key: string) => {
    console.log(key)
    setActiveKey(key)
  }
  const createItem = (file: RcFile, data: President[]) => {
    const newPanes = [...tabItems]
    newPanes.push({
      key: file.uid,
      label: file.name,
      children: (
        <UploadTable
          key={uniqueId()}
          data={map(data, (i) => ({ ...i, key: uniqueId() }))}
        ></UploadTable>
      )
    })
    setTabItems(newPanes)
    setActiveKey(file.uid)
    setBooksData(booksdata.set(file.uid, data))
  }

  const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target == null) return
          const arrayBuffer = e.target.result
          console.log(arrayBuffer)

          if (isNull(arrayBuffer)) return

          const wb = read(arrayBuffer)

          /* generate array of presidents from the first worksheet */
          const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet

          const data: President[] = utils.sheet_to_json<President>(ws, {
            // header: 1
          }) // generate objects
          console.log(data)
          console.log(file)
          createItem(file, data)
          //   setFileMap(fileMap.set(file.uid, createItem(file, data))) // 在这里可以执行其他操作，使用 arrayBuffer
          //   console.log(Array.from(fileMap.values()))

          //   setTabItems(Array.from(fileMap.values()))

          // 如果有异步操作，确保在异步操作完成后调用 resolve
          resolve(false)
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
  const getKey = (value: string) => {
    return {
      // 条码: 'j',
      图书编号: 'bookNumber',
      书名: 'name',
      出版社: 'publish',
      定价: 'price',
      折扣: 'discount',
      库存: 'stock',
      开本: 'format',
      作者: 'author',
      印刷时间: 'printTime',
      中图分类: 'classification',
      读者对象: 'readership',
      库位: 'address'
    }[value]
  }
  const uploadBooks = () => {
    viewmodel.booksModel.uploadManyBooks(
      Array.from(booksdata.values()).map((i) => {
        console.log(i)
        return i.map((_i) => {
          return {
            ...fromPairs(
              entries(_i).map((i) => {
                return [getKey(i[0]), i[1]]
              })
            ),
            supplierCode
          }
        })
      })
    )
  }
  return (
    <div className="w-full">
      <Tabs
        tabBarExtraContent={{
          left: (
            <Upload {...props} className="mr-3 mb-1">
              <Button className="tabs-extra-demo-button">选择文件</Button>
            </Upload>
          ),
          right: (
            <>
              <span>供应商：</span>
              <Select
                value={supplierCode}
                onChange={(value) => {
                  console.log(value)
                  setSupplierCode(value)
                }}
                style={{ width: 120 }}
              >
                {viewmodel.supplierModel.supplierList.map((i: any) => {
                  return <Select.Option key={i.code}>{i.name}</Select.Option>
                })}
              </Select>
              <Button
                icon={<UploadOutlined />}
                className="ml-2"
                onClick={() => {
                  uploadBooks()
                }}
                type="primary"
              >
                一键上传
              </Button>
            </>
          )
        }}
        activeKey={activeKey}
        type="card"
        items={tabItems}
        onChange={onChange}
      />
    </div>
  )
})
